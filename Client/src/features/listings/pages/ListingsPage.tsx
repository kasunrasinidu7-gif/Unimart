import { useState, useMemo } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import ListingCard from '../components/ListingCard';
import ListingFilter from '../components/ListingFilter';
import { MOCK_LISTINGS } from '../listingsApi';
import type { ListingCategory } from '../listingTypes';
import { useNavigate } from 'react-router-dom';

export function Component() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ListingCategory | 'All'>('All');

  const filteredListings = useMemo(() => {
    return MOCK_LISTINGS.filter((listing) => {
      const matchesSearch =
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || listing.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          p: { xs: 3, md: 5 },
          mb: 4,
          borderRadius: 4,
          bgcolor: 'primary.main',
          color: 'white',
          boxShadow: 3,
          background: 'linear-gradient(135deg, #1f4e78 0%, #2e75b6 100%)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <StorefrontIcon sx={{ fontSize: 36 }} />
          <Typography variant="h4" component="h1" sx={{ fontWeight: 800 }}>
            UniMart Student Marketplace
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ opacity: 0.9, maxWidth: 700, mb: 3 }}>
          Buy and sell textbooks, lab equipment, electronics, and dorm essentials directly with fellow students at the University of Kelaniya.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/login')}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 700,
            '&:hover': { bgcolor: 'grey.100' },
          }}
        >
          Post a Listing
        </Button>
      </Box>

      {/* Filter and Search Bar */}
      <ListingFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          No listings found matching your search criteria. Try adjusting your filters.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {filteredListings.map((listing) => (
            <Grid key={listing.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ListingCard listing={listing} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Component;

