package lk.ac.kln.unimart_backend.listing_image.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.listing_image.entity.ListingImage;

public interface ListingImageRepository extends JpaRepository<ListingImage, Long> {
    List<ListingImage> findByListingId(Long listingId);
}
