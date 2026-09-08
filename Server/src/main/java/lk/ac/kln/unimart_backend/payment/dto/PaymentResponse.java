package lk.ac.kln.unimart_backend.payment.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lk.ac.kln.unimart_backend.payment.entity.PaymentStatus;

public class PaymentResponse {

    private Long id;
    private Long orderId;
    private BigDecimal amount;
    private PaymentStatus status;
    private String providerReference;
    private String idempotencyKey;
    private LocalDateTime paidAt;

    public PaymentResponse() {
    }

    public PaymentResponse(Long id, Long orderId, BigDecimal amount, PaymentStatus status,
                          String providerReference, String idempotencyKey, LocalDateTime paidAt) {
        this.id = id;
        this.orderId = orderId;
        this.amount = amount;
        this.status = status;
        this.providerReference = providerReference;
        this.idempotencyKey = idempotencyKey;
        this.paidAt = paidAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public PaymentStatus getStatus() {
        return status;
    }

    public void setStatus(PaymentStatus status) {
        this.status = status;
    }

    public String getProviderReference() {
        return providerReference;
    }

    public void setProviderReference(String providerReference) {
        this.providerReference = providerReference;
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public LocalDateTime getPaidAt() {
        return paidAt;
    }

    public void setPaidAt(LocalDateTime paidAt) {
        this.paidAt = paidAt;
    }
}
