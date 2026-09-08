package lk.ac.kln.unimart_backend.notification.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.notification.dto.NotificationCreateRequest;
import lk.ac.kln.unimart_backend.notification.dto.NotificationResponse;
import lk.ac.kln.unimart_backend.notification.dto.NotificationUpdateRequest;
import lk.ac.kln.unimart_backend.notification.entity.Notification;
import lk.ac.kln.unimart_backend.notification.repository.NotificationRepository;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationService(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public NotificationResponse createNotification(NotificationCreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + request.getUserId()));

        Notification notification = new Notification();
        notification.setUser(user);
        notification.setType(request.getType().trim());
        notification.setTitle(request.getTitle().trim());
        notification.setBody(request.getBody().trim());
        notification.setIsRead(false);
        notification.setCreatedAt(LocalDateTime.now());

        return toResponse(notificationRepository.save(notification));
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getUserNotifications(Long userId) {
        return notificationRepository.findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public NotificationResponse getNotificationById(Long id) {
        return toResponse(findNotificationOrThrow(id));
    }

    @Transactional
    public NotificationResponse updateNotification(Long id, NotificationUpdateRequest request) {
        Notification notification = findNotificationOrThrow(id);
        notification.setIsRead(request.getIsRead());
        return toResponse(notificationRepository.save(notification));
    }

    @Transactional
    public void deleteNotification(Long id) {
        notificationRepository.delete(findNotificationOrThrow(id));
    }

    private Notification findNotificationOrThrow(Long id) {
        return notificationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notification not found with id: " + id));
    }

    private NotificationResponse toResponse(Notification notification) {
        return new NotificationResponse(
                notification.getId(),
                notification.getUser() != null ? notification.getUser().getId() : null,
                notification.getType(),
                notification.getTitle(),
                notification.getBody(),
                notification.getIsRead(),
                notification.getCreatedAt()
        );
    }
}
