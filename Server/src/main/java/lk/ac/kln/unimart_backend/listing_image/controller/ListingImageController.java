package lk.ac.kln.unimart_backend.listing_image.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lk.ac.kln.unimart_backend.listing_image.dto.ListingImageCreateRequest;
import lk.ac.kln.unimart_backend.listing_image.dto.ListingImageResponse;
import lk.ac.kln.unimart_backend.listing_image.service.ListingImageService;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ListingImageController {

    private final ListingImageService listingImageService;

    public ListingImageController(ListingImageService listingImageService) {
        this.listingImageService = listingImageService;
    }

    @PostMapping("/listing-images")
    public ResponseEntity<ListingImageResponse> createListingImage(@Valid @RequestBody ListingImageCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(listingImageService.createListingImage(request));
    }

    @GetMapping("/listing-images/listing/{listingId}")
    public ResponseEntity<List<ListingImageResponse>> getImagesByListingId(@PathVariable Long listingId) {
        return ResponseEntity.ok(listingImageService.getListingImagesByListingId(listingId));
    }

    @GetMapping("/listing-images/{id}")
    public ResponseEntity<ListingImageResponse> getListingImageById(@PathVariable Long id) {
        return ResponseEntity.ok(listingImageService.getListingImageById(id));
    }

    @DeleteMapping("/listing-images/{id}")
    public ResponseEntity<Void> deleteListingImage(@PathVariable Long id) {
        listingImageService.deleteListingImage(id);
        return ResponseEntity.noContent().build();
    }
}
