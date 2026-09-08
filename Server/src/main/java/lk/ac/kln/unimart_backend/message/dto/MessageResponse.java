package lk.ac.kln.unimart_backend.message.dto;

import java.time.LocalDateTime;

public class MessageResponse {

    private Long id;
    private Long conversationId;
    private Long senderId;
    private String messageText;
    private LocalDateTime createdAt;
    private LocalDateTime readAt;

    public MessageResponse() {
    }

    public MessageResponse(Long id, Long conversationId, Long senderId, String messageText,
                          LocalDateTime createdAt, LocalDateTime readAt) {
        this.id = id;
        this.conversationId = conversationId;
        this.senderId = senderId;
        this.messageText = messageText;
        this.createdAt = createdAt;
        this.readAt = readAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public String getMessageText() {
        return messageText;
    }

    public void setMessageText(String messageText) {
        this.messageText = messageText;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getReadAt() {
        return readAt;
    }

    public void setReadAt(LocalDateTime readAt) {
        this.readAt = readAt;
    }
}
