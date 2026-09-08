import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Grid';
import { MOCK_LISTINGS } from '../listingsApi';

export function Component() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const listing = MOCK_LISTINGS.find((item) => item.id === Number(id)) || MOCK_LISTINGS[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const getStatusColor = (status: typeof listing.status) => {
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Back Button */}
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3, fontWeight: 600 }}
      >
        Back to Listings
      </Button>

      <Grid container spacing={4}>
        {/* Left Column: Product Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          {/* Main Display Image */}
          <Paper
            elevation={2}
            sx={{
              position: 'relative',
              pt: '75%',
              borderRadius: 3,
              overflow: 'hidden',
              mb: 2,
              bgcolor: 'grey.100',
            }}
          >
            <Box
              component="img"
              src={
                listing.images[selectedImageIndex] ||
                listing.images[0] ||
                'https://via.placeholder.com/600x400?text=UniMart+Item'
              }
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
          </Paper>

          {/* Thumbnails Gallery */}
          {listing.images.length > 1 && (
            <Box sx={{ display: 'flex', gap: 1.5, overflowX: 'auto', pb: 1 }}>
              {listing.images.map((img, idx) => (
                <Box
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 2,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '2px solid',
                    borderColor: selectedImageIndex === idx ? 'primary.main' : 'transparent',
                    opacity: selectedImageIndex === idx ? 1 : 0.6,
                    transition: 'all 0.2s',
                    '&:hover': { opacity: 1 },
                  }}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Grid>

        {/* Right Column: Details & Actions */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={listing.category} color="primary" variant="outlined" size="small" />
              <Chip
                label={listing.status}
                color={getStatusColor(listing.status)}
                size="small"
                sx={{ fontWeight: 700 }}
              />
              <Chip label={`Condition: ${listing.condition}`} size="small" variant="filled" />
            </Box>

            <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
              {listing.title}
            </Typography>

            <Typography variant="h3" color="primary.main" sx={{ fontWeight: 800 }}>
              LKR {listing.price.toLocaleString()}
            </Typography>

            <Divider />

            {/* Description */}
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              {listing.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 1 }}>
              <LocationOnIcon fontSize="small" />
              <Typography variant="body2">Meetup Location: <strong>{listing.location}</strong></Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <CalendarTodayIcon fontSize="small" />
              <Typography variant="body2">Posted on: {listing.createdAt}</Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Seller Info Card */}
            <Paper elevation={1} sx={{ p: 2.5, borderRadius: 3, bgcolor: 'grey.50', border: 1, borderColor: 'grey.200' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <AccountCircleIcon sx={{ fontSize: 44, color: 'primary.main' }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                    {listing.seller.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.seller.department}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Member since {listing.seller.joinedDate}
                  </Typography>
                </Box>
              </Box>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={listing.status === 'SOLD'}
                startIcon={<EmailIcon />}
                onClick={() => setContactDialogOpen(true)}
                sx={{ py: 1.2, borderRadius: 2, fontWeight: 700 }}
              >
                {listing.status === 'SOLD' ? 'Item Sold' : 'Contact Seller'}
              </Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      {/* Contact Seller Modal */}
      <Dialog
        open={contactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
        maxWidth="xs"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3, p: 1 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.main' }}>
          Seller Contact Details
        </DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mb: 2 }}>
            Reach out directly using official university email or phone.
          </Alert>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <EmailIcon color="primary" />
              <Box>
                <Typography variant="caption" color="text.secondary">
                  University Email
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  <a href={`mailto:${listing.seller.universityEmail}`} style={{ color: 'inherit', textDecoration: 'underline' }}>
                    {listing.seller.universityEmail}
                  </a>
                </Typography>
              </Box>
            </Box>
            {listing.seller.phone && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Phone / WhatsApp
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {listing.seller.phone}
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setContactDialogOpen(false)}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            component="a"
            href={`mailto:${listing.seller.universityEmail}?subject=UniMart Listing Query: ${encodeURIComponent(listing.title)}`}
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Component;

