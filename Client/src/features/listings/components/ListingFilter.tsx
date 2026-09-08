import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Chip from '@mui/material/Chip';
import SearchIcon from '@mui/icons-material/Search';
import type { ListingCategory } from '../listingTypes';

interface ListingFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: ListingCategory | 'All';
  onCategoryChange: (category: ListingCategory | 'All') => void;
}

const CATEGORIES: (ListingCategory | 'All')[] = [
  'All',
  'Textbooks',
  'Electronics',
  'Furniture',
  'Clothing',
  'Stationery',
  'Other',
];

export function ListingFilter({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: ListingFilterProps) {
  return (
    <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* Search Input */}
      <TextField
        fullWidth
        placeholder="Search textbooks, electronics, furniture..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />

      {/* Category Chips */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            label={cat}
            clickable
            color={selectedCategory === cat ? 'primary' : 'default'}
            variant={selectedCategory === cat ? 'filled' : 'outlined'}
            onClick={() => onCategoryChange(cat)}
            sx={{
              fontWeight: selectedCategory === cat ? 700 : 400,
              px: 1,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ListingFilter;
