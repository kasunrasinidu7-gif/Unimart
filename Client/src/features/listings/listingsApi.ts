import type { Listing } from './listingTypes';
import apiClient from '../../services/apiClient';

export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    title: 'Database Management Systems 8th Edition',
    description: 'Comprehensive textbook used in Level 2 Information Technology courses. Excellent condition with highlighted key sections.',
    price: 3500,
    category: 'Textbooks',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 101,
      fullName: 'Kasun Perera',
      universityEmail: 'kasun-im21045@kln.ac.lk',
      department: 'Department of Industrial Management',
      phone: '+94 77 123 4567',
      joinedDate: 'Jan 2024',
    },
    status: 'AVAILABLE',
    condition: 'Like New',
    createdAt: '2026-08-01',
    location: 'Faculty of Science Campus',
  },
  {
    id: 2,
    title: 'Dell Wireless Ergonomic Mouse',
    description: 'High-precision 2.4GHz optical mouse with long battery life. Includes USB nano receiver.',
    price: 1800,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 102,
      fullName: 'Nimali Fernando',
      universityEmail: 'nimali-im21088@kln.ac.lk',
      department: 'Department of Industrial Management',
      phone: '+94 71 987 6543',
      joinedDate: 'Mar 2024',
    },
    status: 'AVAILABLE',
    condition: 'Good',
    createdAt: '2026-08-03',
    location: 'Bandaranayake Hall Hostel',
  },
  {
    id: 3,
    title: 'Adjustable Study Desk Lamp',
    description: 'LED desk lamp with 3 brightness modes and flexible neck. Ideal for late night study sessions.',
    price: 2400,
    category: 'Furniture',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 103,
      fullName: 'Sahan Silva',
      universityEmail: 'sahan-im21012@kln.ac.lk',
      department: 'Department of Chemistry',
      joinedDate: 'Feb 2024',
    },
    status: 'AVAILABLE',
    condition: 'Like New',
    createdAt: '2026-08-05',
    location: 'Main University Gate',
  },
];

export async function getListings(): Promise<Listing[]> {
  try {
    const data = await apiClient.get<any[]>('/listings');
    if (Array.isArray(data) && data.length > 0) {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        price: Number(item.price),
        category: (item.categoryName || 'Other') as any,
        images: item.images && item.images.length > 0
          ? item.images.map((img: any) => img.imageUrl || img)
          : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'],
        seller: {
          id: item.sellerId || 1,
          fullName: item.sellerName || 'University Student',
          universityEmail: item.sellerEmail || 'student@kln.ac.lk',
          department: 'University Campus',
          joinedDate: '2026',
        },
        status: item.status || 'AVAILABLE',
        condition: 'Good',
        createdAt: item.createdAt ? String(item.createdAt).substring(0, 10) : '2026-08-01',
        location: 'University Campus',
      }));
    }
  } catch (err) {
    console.warn('Backend API request failed, falling back to local demo listings data:', err);
  }
  return MOCK_LISTINGS;
}

export async function getListingById(id: number): Promise<Listing | undefined> {
  try {
    const item = await apiClient.get<any>(`/listings/${id}`);
    if (item && item.id) {
      return {
        id: item.id,
        title: item.title,
        description: item.description || '',
        price: Number(item.price),
        category: (item.categoryName || 'Other') as any,
        images: item.images && item.images.length > 0
          ? item.images.map((img: any) => img.imageUrl || img)
          : ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80'],
        seller: {
          id: item.sellerId || 1,
          fullName: item.sellerName || 'University Student',
          universityEmail: item.sellerEmail || 'student@kln.ac.lk',
          department: 'University Campus',
          joinedDate: '2026',
        },
        status: item.status || 'AVAILABLE',
        condition: 'Good',
        createdAt: item.createdAt ? String(item.createdAt).substring(0, 10) : '2026-08-01',
        location: 'University Campus',
      };
    }
  } catch (err) {
    console.warn(`Backend fetch failed for listing #${id}, using fallback data:`, err);
  }
  return MOCK_LISTINGS.find((item) => item.id === id);
}

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await apiClient.get<Category[]>('/categories');
    if (Array.isArray(categories) && categories.length > 0) {
      return categories;
    }
  } catch (err) {
    console.warn('Failed to fetch categories from backend:', err);
  }
  return [
    { id: 1, name: 'Textbooks', active: true },
    { id: 2, name: 'Electronics', active: true },
    { id: 3, name: 'Furniture', active: true },
    { id: 4, name: 'Clothing', active: true },
    { id: 5, name: 'Stationery', active: true },
  ];
}

export async function createListing(payload: {
  sellerId: number;
  categoryId: number;
  title: string;
  description: string;
  price: number;
  imageUrl?: string;
}) {
  const response = await apiClient.post('/listings', {
    sellerId: payload.sellerId,
    categoryId: payload.categoryId,
    title: payload.title,
    description: payload.description,
    price: payload.price,
  });

  if (response && response.id && payload.imageUrl) {
    try {
      await apiClient.post(`/listings/${response.id}/images`, {
        imageUrl: payload.imageUrl,
        sortOrder: 1,
      });
    } catch (e) {
      console.error('Failed to attach image to listing:', e);
    }
  }

  return response;
}
