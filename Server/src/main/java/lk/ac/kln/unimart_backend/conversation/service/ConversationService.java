package lk.ac.kln.unimart_backend.conversation.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.conversation.dto.ConversationCreateRequest;
import lk.ac.kln.unimart_backend.conversation.dto.ConversationResponse;
import lk.ac.kln.unimart_backend.conversation.entity.Conversation;
import lk.ac.kln.unimart_backend.conversation.repository.ConversationRepository;
import lk.ac.kln.unimart_backend.listing.entity.Listing;
import lk.ac.kln.unimart_backend.listing.repository.ListingRepository;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;
    private final ListingRepository listingRepository;
    private final UserRepository userRepository;

    public ConversationService(ConversationRepository conversationRepository,
                              ListingRepository listingRepository,
                              UserRepository userRepository) {
        this.conversationRepository = conversationRepository;
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ConversationResponse createConversation(ConversationCreateRequest request) {
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + request.getListingId()));
        User buyer = userRepository.findById(request.getBuyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Buyer not found with id: " + request.getBuyerId()));
        User seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id: " + request.getSellerId()));

        Conversation conversation = new Conversation();
        conversation.setListing(listing);
        conversation.setBuyer(buyer);
        conversation.setSeller(seller);
        conversation.setCreatedAt(LocalDateTime.now());

        return toResponse(conversationRepository.save(conversation));
    }

    @Transactional(readOnly = true)
    public List<ConversationResponse> getAllConversations() {
        return conversationRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ConversationResponse getConversationById(Long id) {
        return toResponse(findConversationOrThrow(id));
    }

    private Conversation findConversationOrThrow(Long id) {
        return conversationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Conversation not found with id: " + id));
    }

    private ConversationResponse toResponse(Conversation conversation) {
        return new ConversationResponse(
                conversation.getId(),
                conversation.getListing() != null ? conversation.getListing().getId() : null,
                conversation.getBuyer() != null ? conversation.getBuyer().getId() : null,
                conversation.getSeller() != null ? conversation.getSeller().getId() : null,
                conversation.getCreatedAt()
        );
    }
}
