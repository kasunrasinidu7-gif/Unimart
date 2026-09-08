package lk.ac.kln.unimart_backend.listing.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import lk.ac.kln.unimart_backend.listing.dto.ListingCreateRequest;
import lk.ac.kln.unimart_backend.listing.dto.ListingResponse;
import lk.ac.kln.unimart_backend.listing.dto.ListingUpdateRequest;
import lk.ac.kln.unimart_backend.listing.service.ListingService;

@RestController
@RequestMapping("/api/v1")
@Validated
public class ListingController {

    private final ListingService listingService;

    public ListingController(ListingService listingService) {
        this.listingService = listingService;
    }

    @PostMapping("/listings")
    public ResponseEntity<ListingResponse> createListing(@Valid @RequestBody ListingCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(listingService.createListing(request));
    }

    @GetMapping("/listings")
    public ResponseEntity<List<ListingResponse>> getAllListings() {
        return ResponseEntity.ok(listingService.getAllListings());
    }

    @GetMapping("/listings/{id}")
    public ResponseEntity<ListingResponse> getListingById(@PathVariable Long id) {
        return ResponseEntity.ok(listingService.getListingById(id));
    }

    @PutMapping("/listings/{id}")
    public ResponseEntity<ListingResponse> updateListing(@PathVariable Long id,
                                                      @Valid @RequestBody ListingUpdateRequest request) {
        return ResponseEntity.ok(listingService.updateListing(id, request));
    }

    @DeleteMapping("/listings/{id}")
    public ResponseEntity<Void> deleteListing(@PathVariable Long id) {
        listingService.deleteListing(id);
        return ResponseEntity.noContent().build();
    }
}
