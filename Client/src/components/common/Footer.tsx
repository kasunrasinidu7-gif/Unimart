import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

export function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'grey.300', mt: 'auto', py: 4, borderTop: 1, borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 'bold' }}>
              UniMart Marketplace
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Department of Industrial Management | Faculty of Science, University of Kelaniya
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/" color="inherit" underline="hover" variant="body2">
              Marketplace
            </Link>
            <Link href="/login" color="inherit" underline="hover" variant="body2">
              Student Auth
            </Link>
          </Box>
        </Box>
        <Divider sx={{ my: 2, borderColor: 'grey.800' }} />
        <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block' }}>
          &copy; {new Date().getFullYear()} UniMart Monolithic Full-Stack Lab Series. B.Sc. (Hons) IT - Level 2.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
