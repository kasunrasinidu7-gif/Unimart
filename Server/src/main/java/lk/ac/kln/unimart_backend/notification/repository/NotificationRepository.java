package lk.ac.kln.unimart_backend.notification.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    List<Notification> findByUserIdOrderByCreatedAtDesc(Long userId);
}
