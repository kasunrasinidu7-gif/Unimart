package lk.ac.kln.unimart_backend.notification.dto;

import jakarta.validation.constraints.NotNull;

public class NotificationUpdateRequest {

    @NotNull(message = "Read flag is required")
    private Boolean isRead;

    public NotificationUpdateRequest() {
    }

    public Boolean getIsRead() {
        return isRead;
    }

    public void setIsRead(Boolean isRead) {
        this.isRead = isRead;
    }
}
