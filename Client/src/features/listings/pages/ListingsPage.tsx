import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export function Component() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ p: 4, borderRadius: 2, bgcolor: 'background.paper', boxShadow: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
          UniMart Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to UniMart! Browse student listings, search products, and filter by categories.
        </Typography>
      </Box>
    </Container>
  );
}

export default Component;
