package lk.ac.kln.unimart_backend.payment.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.order.entity.Order;
import lk.ac.kln.unimart_backend.order.repository.OrderRepository;
import lk.ac.kln.unimart_backend.payment.dto.PaymentCreateRequest;
import lk.ac.kln.unimart_backend.payment.dto.PaymentResponse;
import lk.ac.kln.unimart_backend.payment.dto.PaymentUpdateRequest;
import lk.ac.kln.unimart_backend.payment.entity.Payment;
import lk.ac.kln.unimart_backend.payment.entity.PaymentStatus;
import lk.ac.kln.unimart_backend.payment.repository.PaymentRepository;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    public PaymentService(PaymentRepository paymentRepository, OrderRepository orderRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
    }

    @Transactional
    public PaymentResponse createPayment(PaymentCreateRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + request.getOrderId()));

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(request.getAmount());
        payment.setStatus(request.getStatus() != null ? request.getStatus() : PaymentStatus.PENDING);
        payment.setProviderReference(request.getProviderReference().trim());
        payment.setIdempotencyKey(request.getIdempotencyKey().trim());

        if (payment.getStatus() == PaymentStatus.SUCCEEDED && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now());
        }

        return toResponse(paymentRepository.save(payment));
    }

    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {
        return paymentRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PaymentResponse getPaymentById(Long id) {
        return toResponse(findPaymentOrThrow(id));
    }

    @Transactional
    public PaymentResponse updatePayment(Long id, PaymentUpdateRequest request) {
        Payment payment = findPaymentOrThrow(id);
        payment.setAmount(request.getAmount());
        payment.setStatus(request.getStatus());

        if (request.getStatus() == PaymentStatus.SUCCEEDED && payment.getPaidAt() == null) {
            payment.setPaidAt(LocalDateTime.now());
        }

        return toResponse(paymentRepository.save(payment));
    }

    @Transactional
    public void deletePayment(Long id) {
        paymentRepository.delete(findPaymentOrThrow(id));
    }

    private Payment findPaymentOrThrow(Long id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with id: " + id));
    }

    private PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(
                payment.getId(),
                payment.getOrder() != null ? payment.getOrder().getId() : null,
                payment.getAmount(),
                payment.getStatus(),
                payment.getProviderReference(),
                payment.getIdempotencyKey(),
                payment.getPaidAt()
        );
    }
}
