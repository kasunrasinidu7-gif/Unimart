export type ListingCategory = 'Textbooks' | 'Electronics' | 'Furniture' | 'Clothing' | 'Stationery' | 'Other';

export type ListingStatus = 'AVAILABLE' | 'PENDING' | 'SOLD';

export interface SellerInfo {
  id: number;
  fullName: string;
  universityEmail: string;
  department: string;
  phone?: string;
  joinedDate: string;
}

export interface Listing {
  id: number;
  title: string;
  description: string;
  price: number;
  category: ListingCategory;
  images: string[];
  seller: SellerInfo;
  status: ListingStatus;
  condition: 'Brand New' | 'Like New' | 'Good' | 'Fair';
  createdAt: string;
  location: string;
}

export interface ListingsFilterState {
  searchQuery: string;
  category: ListingCategory | 'All';
  sortBy: 'latest' | 'priceAsc' | 'priceDesc';
}
