import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function Component() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
          Listing Details
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Detailed view of the selected item, photos, seller contact, and order placement.
        </Typography>
      </Box>
    </Container>
  );
}

export default Component;
