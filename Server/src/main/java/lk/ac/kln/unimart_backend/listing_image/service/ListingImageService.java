package lk.ac.kln.unimart_backend.listing_image.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lk.ac.kln.unimart_backend.common.api.ResourceNotFoundException;
import lk.ac.kln.unimart_backend.listing.entity.Listing;
import lk.ac.kln.unimart_backend.listing.repository.ListingRepository;
import lk.ac.kln.unimart_backend.listing_image.dto.ListingImageCreateRequest;
import lk.ac.kln.unimart_backend.listing_image.dto.ListingImageResponse;
import lk.ac.kln.unimart_backend.listing_image.entity.ListingImage;
import lk.ac.kln.unimart_backend.listing_image.repository.ListingImageRepository;

@Service
public class ListingImageService {

    private final ListingImageRepository listingImageRepository;
    private final ListingRepository listingRepository;

    public ListingImageService(ListingImageRepository listingImageRepository, ListingRepository listingRepository) {
        this.listingImageRepository = listingImageRepository;
        this.listingRepository = listingRepository;
    }

    @Transactional
    public ListingImageResponse createListingImage(ListingImageCreateRequest request) {
        Listing listing = listingRepository.findById(request.getListingId())
                .orElseThrow(() -> new ResourceNotFoundException("Listing not found with id: " + request.getListingId()));

        ListingImage image = new ListingImage();
        image.setListing(listing);
        image.setImageUrl(request.getImageUrl().trim());
        image.setSortOrder(request.getSortOrder() == null ? 1 : request.getSortOrder());

        return toResponse(listingImageRepository.save(image));
    }

    @Transactional(readOnly = true)
    public List<ListingImageResponse> getListingImagesByListingId(Long listingId) {
        return listingImageRepository.findByListingId(listingId).stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ListingImageResponse getListingImageById(Long id) {
        return toResponse(findListingImageOrThrow(id));
    }

    @Transactional
    public void deleteListingImage(Long id) {
        ListingImage image = findListingImageOrThrow(id);
        listingImageRepository.delete(image);
    }

    private ListingImage findListingImageOrThrow(Long id) {
        return listingImageRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Listing image not found with id: " + id));
    }

    private ListingImageResponse toResponse(ListingImage image) {
        return new ListingImageResponse(
                image.getId(),
                image.getListing() != null ? image.getListing().getId() : null,
                image.getImageUrl(),
                image.getSortOrder()
        );
    }
}
