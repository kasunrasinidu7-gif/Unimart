package lk.ac.kln.unimart_backend.order.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.order.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
