package lk.ac.kln.unimart_backend.listing_image.dto;

public class ListingImageResponse {

    private Long id;
    private Long listingId;
    private String imageUrl;
    private Integer sortOrder;

    public ListingImageResponse() {
    }

    public ListingImageResponse(Long id, Long listingId, String imageUrl, Integer sortOrder) {
        this.id = id;
        this.listingId = listingId;
        this.imageUrl = imageUrl;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getListingId() {
        return listingId;
    }

    public void setListingId(Long listingId) {
        this.listingId = listingId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }
}
