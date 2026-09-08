package lk.ac.kln.unimart_backend.order.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.listing.entity.Listing;
import lk.ac.kln.unimart_backend.listing.repository.ListingRepository;
import lk.ac.kln.unimart_backend.order.dto.OrderCreateRequest;
import lk.ac.kln.unimart_backend.order.dto.OrderResponse;
import lk.ac.kln.unimart_backend.order.dto.OrderUpdateRequest;
import lk.ac.kln.unimart_backend.order.entity.Order;
import lk.ac.kln.unimart_backend.order.repository.OrderRepository;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                       ListingRepository listingRepository,
                       UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public OrderResponse createOrder(OrderCreateRequest request) {
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + request.getListingId()));
        User buyer = userRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found with id: " + request.getBuyerId()));

        Order order = new Order();
        order.setListing(listing);
        order.setBuyer(buyer);
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus(request.getStatus() != null ? request.getStatus() : order.getStatus());
        order.setPaymentMethod(request.getPaymentMethod());

        return toResponse(orderRepository.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id) {
        return toResponse(findOrderOrThrow(id));
    }

    @Transactional
    public OrderResponse updateOrder(Long id, OrderUpdateRequest request) {
        Order order = findOrderOrThrow(id);
        order.setTotalAmount(request.getTotalAmount());
        order.setStatus(request.getStatus());
        order.setPaymentMethod(request.getPaymentMethod());
        return toResponse(orderRepository.save(order));
    }

    private Order findOrderOrThrow(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    private OrderResponse toResponse(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getListing() != null ? order.getListing().getId() : null,
                order.getBuyer() != null ? order.getBuyer().getId() : null,
                order.getTotalAmount(),
                order.getStatus(),
                order.getPaymentMethod(),
                order.getCreatedAt(),
                order.getUpdatedAt()
        );
    }
}
