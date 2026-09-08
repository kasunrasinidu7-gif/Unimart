package lk.ac.kln.unimart_backend.conversation.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.conversation.entity.Conversation;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByBuyerId(Long buyerId);
    List<Conversation> findBySellerId(Long sellerId);
}
