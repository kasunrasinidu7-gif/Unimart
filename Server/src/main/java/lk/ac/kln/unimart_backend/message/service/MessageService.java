package lk.ac.kln.unimart_backend.message.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.conversation.entity.Conversation;
import lk.ac.kln.unimart_backend.conversation.repository.ConversationRepository;
import lk.ac.kln.unimart_backend.message.dto.MessageCreateRequest;
import lk.ac.kln.unimart_backend.message.dto.MessageResponse;
import lk.ac.kln.unimart_backend.message.entity.Message;
import lk.ac.kln.unimart_backend.message.repository.MessageRepository;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final ConversationRepository conversationRepository;
    private final UserRepository userRepository;

    public MessageService(MessageRepository messageRepository,
                         ConversationRepository conversationRepository,
                         UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.conversationRepository = conversationRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public MessageResponse createMessage(MessageCreateRequest request) {
        Conversation conversation = conversationRepository.findById(request.getConversationId())
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with id: " + request.getConversationId()));
        User sender = userRepository.findById(request.getSenderId())
                .orElseThrow(() -> new ResourceNotFoundException("Sender not found with id: " + request.getSenderId()));

        Message message = new Message();
        message.setConversation(conversation);
        message.setSender(sender);
        message.setMessageText(request.getMessageText().trim());
        message.setCreatedAt(LocalDateTime.now());

        return toResponse(messageRepository.save(message));
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessagesByConversationId(Long conversationId) {
        return messageRepository.findByConversationId(conversationId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MessageResponse getMessageById(Long id) {
        return toResponse(findMessageOrThrow(id));
    }

    private Message findMessageOrThrow(Long id) {
        return messageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Message not found with id: " + id));
    }

    private MessageResponse toResponse(Message message) {
        return new MessageResponse(
                message.getId(),
                message.getConversation() != null ? message.getConversation().getId() : null,
                message.getSender() != null ? message.getSender().getId() : null,
                message.getMessageText(),
                message.getCreatedAt(),
                message.getReadAt()
        );
    }
}
