import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import CardActionArea from '@mui/material/CardActionArea';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import type { Listing } from '../listingTypes';
import { useNavigate } from 'react-router-dom';

interface ListingCardProps {
  listing: Listing;
}

export function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();

  const getStatusColor = (status: Listing['status']) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'PENDING':
        return 'warning';
      case 'SOLD':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={() => navigate(`/listings/${listing.id}`)} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {/* Image & Status Chip */}
        <Box sx={{ position: 'relative', pt: '60%', bgcolor: 'grey.100' }}>
          <CardMedia
            component="img"
            image={listing.images[0] || 'https://via.placeholder.com/300x200?text=UniMart+Item'}
            alt={listing.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          <Chip
            label={listing.status}
            color={getStatusColor(listing.status)}
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 'bold',
              textTransform: 'uppercase',
              fontSize: '0.7rem',
            }}
          />
          <Chip
            label={listing.category}
            size="small"
            sx={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              bgcolor: 'rgba(31, 78, 120, 0.85)',
              color: 'white',
              fontWeight: 500,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        {/* Content Details */}
        <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.3, color: 'text.primary' }} noWrap>
            {listing.title}
          </Typography>

          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
            LKR {listing.price.toLocaleString()}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary', mt: 'auto', pt: 1 }}>
            <PersonOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" noWrap>
              {listing.seller.fullName} ({listing.seller.department.replace('Department of ', '')})
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <LocationOnOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" noWrap>
              {listing.location}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ListingCard;
