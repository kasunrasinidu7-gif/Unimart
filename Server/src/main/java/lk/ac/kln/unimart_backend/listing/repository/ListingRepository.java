package lk.ac.kln.unimart_backend.listing.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import lk.ac.kln.unimart_backend.listing.entity.Listing;

public interface ListingRepository extends JpaRepository<Listing, Long> {
}
