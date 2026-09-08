package lk.ac.kln.unimart_backend.payment.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.payment.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
