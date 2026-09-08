package lk.ac.kln.unimart_backend.conversation.controller;

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
import lk.ac.kln.unimart_backend.conversation.dto.ConversationCreateRequest;
import lk.ac.kln.unimart_backend.conversation.dto.ConversationResponse;
import lk.ac.kln.unimart_backend.conversation.service.ConversationService;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @PostMapping("/conversations")
    public ResponseEntity<ConversationResponse> createConversation(@Valid @RequestBody ConversationCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(conversationService.createConversation(request));
    }

    @GetMapping("/conversations")
    public ResponseEntity<List<ConversationResponse>> getAllConversations() {
        return ResponseEntity.ok(conversationService.getAllConversations());
    }

    @GetMapping("/conversations/{id}")
    public ResponseEntity<ConversationResponse> getConversationById(@PathVariable Long id) {
        return ResponseEntity.ok(conversationService.getConversationById(id));
    }
}
