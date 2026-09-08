import type { Listing } from './listingTypes';

/**
 * Mock listings dataset for development and initial UI presentation.
 * Adheres strictly to the client-only requirement until API integration in later steps.
 */
export const MOCK_LISTINGS: Listing[] = [
  {
    id: 1,
    title: 'Database Management Systems 8th Edition',
    description: 'Comprehensive textbook used in Level 2 Information Technology courses. Excellent condition with highlighted key sections and practice exercises.',
    price: 3500,
    category: 'Textbooks',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
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
      phone: '+94 76 555 1212',
      joinedDate: 'Feb 2024',
    },
    status: 'AVAILABLE',
    condition: 'Like New',
    createdAt: '2026-08-05',
    location: 'Main University Gate',
  },
  {
    id: 4,
    title: 'Casio Scientific Calculator fx-991EX',
    description: 'Standard scientific calculator required for engineering and statistics courses.',
    price: 4500,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 104,
      fullName: 'Dilini Jayawardena',
      universityEmail: 'dilini-im21099@kln.ac.lk',
      department: 'Department of Physics',
      joinedDate: 'May 2024',
    },
    status: 'PENDING',
    condition: 'Brand New',
    createdAt: '2026-08-07',
    location: 'Science Library',
  },
  {
    id: 5,
    title: 'University Lab Coat (Size M)',
    description: 'White cotton lab coat required for chemistry and microbiology laboratory practicals.',
    price: 1500,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 105,
      fullName: 'Ruwan Gunasekara',
      universityEmail: 'ruwan-im21034@kln.ac.lk',
      department: 'Department of Microbiology',
      joinedDate: 'Jun 2024',
    },
    status: 'SOLD',
    condition: 'Good',
    createdAt: '2026-07-28',
    location: 'Faculty Canteen',
  },
  {
    id: 6,
    title: 'A4 Graphic Sketchbook & Marker Set',
    description: 'Set of 80 GSM A4 sketch paper notebook along with dual-tip alcohol art markers.',
    price: 1200,
    category: 'Stationery',
    images: [
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=600&q=80',
    ],
    seller: {
      id: 106,
      fullName: 'Amaya Wickramasinghe',
      universityEmail: 'amaya-im21077@kln.ac.lk',
      department: 'Department of Fine Arts',
      joinedDate: 'Jul 2024',
    },
    status: 'AVAILABLE',
    condition: 'Brand New',
    createdAt: '2026-08-08',
    location: 'Student Complex',
  },
];

/**
 * Placeholder API function to get all mock listings.
 */
export async function getMockListings(): Promise<Listing[]> {
  return MOCK_LISTINGS;
}

/**
 * Placeholder API function to get a single listing by ID.
 */
export async function getMockListingById(id: number): Promise<Listing | undefined> {
  return MOCK_LISTINGS.find((item) => item.id === id);
}
