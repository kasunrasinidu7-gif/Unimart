package lk.ac.kln.unimart_backend.listing.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.auth.entity.User;
import lk.ac.kln.unimart_backend.auth.repository.UserRepository;
import lk.ac.kln.unimart_backend.category.entity.Category;
import lk.ac.kln.unimart_backend.category.repository.CategoryRepository;
import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.listing.dto.ListingCreateRequest;
import lk.ac.kln.unimart_backend.listing.dto.ListingResponse;
import lk.ac.kln.unimart_backend.listing.dto.ListingUpdateRequest;
import lk.ac.kln.unimart_backend.listing.entity.Listing;
import lk.ac.kln.unimart_backend.listing.repository.ListingRepository;

@Service
public class ListingService {

    private final ListingRepository listingRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ListingService(ListingRepository listingRepository,
                         UserRepository userRepository,
                         CategoryRepository categoryRepository) {
        this.listingRepository = listingRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public ListingResponse createListing(ListingCreateRequest request) {
        User seller = userRepository.findById(request.getSellerId())
                .orElseThrow(() -> new ResourceNotFoundException("Seller not found with id: " + request.getSellerId()));
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        Listing listing = new Listing();
        listing.setSeller(seller);
        listing.setCategory(category);
        listing.setTitle(request.getTitle().trim());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setStatus(request.getStatus() != null ? request.getStatus() : listing.getStatus());
        listing.setVersion(1);

        return toResponse(listingRepository.save(listing));
    }

    @Transactional(readOnly = true)
    public List<ListingResponse> getAllListings() {
        return listingRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ListingResponse getListingById(Long id) {
        return toResponse(findListingOrThrow(id));
    }

    @Transactional
    public ListingResponse updateListing(Long id, ListingUpdateRequest request) {
        Listing listing = findListingOrThrow(id);
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + request.getCategoryId()));

        listing.setCategory(category);
        listing.setTitle(request.getTitle().trim());
        listing.setDescription(request.getDescription());
        listing.setPrice(request.getPrice());
        listing.setStatus(request.getStatus());
        listing.setVersion(listing.getVersion() == null ? 1 : listing.getVersion() + 1);

        return toResponse(listingRepository.save(listing));
    }

    @Transactional
    public void deleteListing(Long id) {
        Listing listing = findListingOrThrow(id);
        listingRepository.delete(listing);
    }

    private Listing findListingOrThrow(Long id) {
        return listingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + id));
    }

    private ListingResponse toResponse(Listing listing) {
        return new ListingResponse(
                listing.getId(),
                listing.getSeller() != null ? listing.getSeller().getId() : null,
                listing.getCategory() != null ? listing.getCategory().getId() : null,
                listing.getTitle(),
                listing.getDescription(),
                listing.getPrice(),
                listing.getStatus(),
                listing.getVersion(),
                listing.getCreatedAt(),
                listing.getUpdatedAt()
        );
    }
}
