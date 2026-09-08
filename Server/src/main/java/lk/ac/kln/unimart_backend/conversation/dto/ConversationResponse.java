package lk.ac.kln.unimart_backend.conversation.dto;

import java.time.LocalDateTime;

public class ConversationResponse {

    private Long id;
    private Long listingId;
    private Long buyerId;
    private Long sellerId;
    private LocalDateTime createdAt;

    public ConversationResponse() {
    }

    public ConversationResponse(Long id, Long listingId, Long buyerId, Long sellerId, LocalDateTime createdAt) {
        this.id = id;
        this.listingId = listingId;
        this.buyerId = buyerId;
        this.sellerId = sellerId;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public Long getBuyerId() {
        return buyerId;
    }

    public void setBuyerId(Long buyerId) {
        this.buyerId = buyerId;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
