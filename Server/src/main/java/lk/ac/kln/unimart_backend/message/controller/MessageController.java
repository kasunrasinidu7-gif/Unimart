package lk.ac.kln.unimart_backend.message.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lk.ac.kln.unimart_backend.message.dto.MessageCreateRequest;
import lk.ac.kln.unimart_backend.message.dto.MessageResponse;
import lk.ac.kln.unimart_backend.message.service.MessageService;

@RestController
@RequestMapping("/api/v1")
@Validated
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/messages")
    public ResponseEntity<MessageResponse> createMessage(@Valid @RequestBody MessageCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(messageService.createMessage(request));
    }

    @GetMapping("/messages/conversation/{conversationId}")
    public ResponseEntity<List<MessageResponse>> getMessagesByConversationId(@PathVariable Long conversationId) {
        return ResponseEntity.ok(messageService.getMessagesByConversationId(conversationId));
    }

    @GetMapping("/messages/{id}")
    public ResponseEntity<MessageResponse> getMessageById(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getMessageById(id));
    }
}
