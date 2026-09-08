package lk.ac.kln.unimart_backend.review.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.order.entity.Order;
import lk.ac.kln.unimart_backend.order.repository.OrderRepository;
import lk.ac.kln.unimart_backend.review.dto.ReviewCreateRequest;
import lk.ac.kln.unimart_backend.review.dto.ReviewResponse;
import lk.ac.kln.unimart_backend.review.dto.ReviewUpdateRequest;
import lk.ac.kln.unimart_backend.review.entity.Review;
import lk.ac.kln.unimart_backend.review.repository.ReviewRepository;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public ReviewService(ReviewRepository reviewRepository,
                        OrderRepository orderRepository,
                        UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReviewResponse createReview(ReviewCreateRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + request.getOrderId()));
        User reviewer = userRepository.findById(request.getReviewerId())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewer not found with id: " + request.getReviewerId()));
        User reviewee = userRepository.findById(request.getRevieweeId())
                .orElseThrow(() -> new ResourceNotFoundException("Reviewee not found with id: " + request.getRevieweeId()));

        if (reviewRepository.findByOrderId(request.getOrderId()).isPresent()) {
            throw new IllegalStateException("A review already exists for order id: " + request.getOrderId());
        }

        Review review = new Review();
        review.setOrder(order);
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);
        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());
        LocalDateTime now = LocalDateTime.now();
        review.setCreatedAt(now);
        review.setUpdatedAt(now);

        return toResponse(reviewRepository.save(review));
    }

    @Transactional(readOnly = true)
    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ReviewResponse getReviewById(Long id) {
        return toResponse(findReviewOrThrow(id));
    }

    @Transactional
    public ReviewResponse updateReview(Long id, ReviewUpdateRequest request) {
        Review review = findReviewOrThrow(id);
        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());
        review.setUpdatedAt(LocalDateTime.now());
        return toResponse(reviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(Long id) {
        reviewRepository.delete(findReviewOrThrow(id));
    }

    private Review findReviewOrThrow(Long id) {
        return reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + id));
    }

    private ReviewResponse toResponse(Review review) {
        return new ReviewResponse(
                review.getId(),
                review.getOrder() != null ? review.getOrder().getId() : null,
                review.getReviewer() != null ? review.getReviewer().getId() : null,
                review.getReviewee() != null ? review.getReviewee().getId() : null,
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                review.getUpdatedAt()
        );
    }
}
