-- Flyway migration: V1__create_core_tables.sql
-- Place this file at: src/main/resources/db/migration/V1__create_core_tables.sql
-- Flyway runs this automatically on application startup. Do not run it by hand
-- and do not edit it once it has run against a shared/classroom database --
-- create a new V2__... migration for changes instead.

-- ======================================
-- USER
-- ======================================
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    university_email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    role ENUM('BUYER','SELLER','ADMIN') NOT NULL,
    email_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ======================================
-- CATEGORY
-- ======================================
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    active BOOLEAN NOT NULL DEFAULT TRUE
);

-- ======================================
-- LISTING
-- ======================================
CREATE TABLE listings (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    seller_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(12,2) NOT NULL CHECK (price >= 0),
    status ENUM('AVAILABLE','RESERVED','SOLD','ARCHIVED') NOT NULL DEFAULT 'AVAILABLE',
    version INT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (seller_id) REFERENCES users(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- ======================================
-- LISTING IMAGE
-- ======================================
CREATE TABLE listing_images (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    listing_id BIGINT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    sort_order INT NOT NULL DEFAULT 1,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- ======================================
-- CONVERSATION
-- ======================================
CREATE TABLE conversations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    listing_id BIGINT NOT NULL,
    buyer_id BIGINT NOT NULL,
    seller_id BIGINT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (listing_id, buyer_id, seller_id),
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id),
    FOREIGN KEY (seller_id) REFERENCES users(id)
);

-- ======================================
-- MESSAGE
-- ======================================
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    conversation_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    message_text TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    read_at DATETIME,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

-- ======================================
-- ORDERS
-- ======================================
CREATE TABLE orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    listing_id BIGINT NOT NULL,
    buyer_id BIGINT NOT NULL,
    total_amount DECIMAL(12,2) NOT NULL,
    status ENUM('POSTED','PAID','COMPLETED','CANCELLED') NOT NULL DEFAULT 'POSTED',
    payment_method VARCHAR(50),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (listing_id) REFERENCES listings(id),
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

-- ======================================
-- PAYMENT
-- ======================================
CREATE TABLE payments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    amount DECIMAL(12,2) NOT NULL,
    status ENUM('PENDING','SUCCEEDED','FAILED','REFUNDED') NOT NULL DEFAULT 'PENDING',
    provider_reference VARCHAR(255) NOT NULL UNIQUE,
    idempotency_key VARCHAR(255) NOT NULL UNIQUE,
    paid_at DATETIME,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- ======================================
-- REVIEW
-- ======================================
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE,
    reviewer_id BIGINT NOT NULL,
    reviewee_id BIGINT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (reviewer_id) REFERENCES users(id),
    FOREIGN KEY (reviewee_id) REFERENCES users(id)
);

-- ======================================
-- NOTIFICATION
-- ======================================
CREATE TABLE notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ======================================
-- INDEXES
-- ======================================
CREATE INDEX idx_listing ON listings(status, category_id, created_at);
CREATE INDEX idx_message ON messages(conversation_id, created_at);
CREATE INDEX idx_review ON reviews(reviewee_id, created_at);
CREATE INDEX idx_notification ON notifications(user_id, is_read, created_at);