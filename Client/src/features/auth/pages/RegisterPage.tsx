import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import RegisterForm from '../components/RegisterForm';

export function Component() {
  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
          }}
        >
          <PersonAddOutlinedIcon />
        </Box>

        <Typography variant="h5" component="h1" gutterBottom color="primary.main" sx={{ fontWeight: 'bold' }}>
          Student Registration
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a UniMart account using your university credentials
        </Typography>

        <RegisterForm />
      </Paper>
    </Container>
  );
}

export default Component;
