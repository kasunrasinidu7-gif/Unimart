package lk.ac.kln.unimart_backend.review.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.review.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByOrderId(Long orderId);
}
