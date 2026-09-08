package lk.ac.kln.unimart_backend.message.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.message.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationId(Long conversationId);
}
