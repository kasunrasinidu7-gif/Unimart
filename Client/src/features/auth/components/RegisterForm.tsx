import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import apiClient, { ApiError } from '../../../services/apiClient';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters long'),
  universityEmail: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
  role: z.enum(['BUYER', 'SELLER']),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      universityEmail: '',
      password: '',
      role: 'BUYER',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);
    try {
      await apiClient.post('/users', {
        fullName: data.fullName,
        universityEmail: data.universityEmail,
        passwordHash: data.password, // Backend UserService will BCrypt encode passwordHash
        role: data.role,
      });

      setSuccessMessage('Registration successful! Redirecting to sign in...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err: any) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message || 'Registration failed. Email may already be in use.');
      } else {
        setErrorMessage('Failed to connect to backend server.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="Full Name"
        placeholder="e.g. Kasun Perera"
        {...register('fullName')}
        error={!!errors.fullName}
        helperText={errors.fullName?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Email Address"
        placeholder="user@example.com"
        {...register('universityEmail')}
        error={!!errors.universityEmail}
        helperText={errors.universityEmail?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        margin="normal"
        label="Password"
        type={showPassword ? 'text' : 'password'}
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />

      <TextField
        fullWidth
        select
        margin="normal"
        label="Account Role"
        defaultValue="BUYER"
        {...register('role')}
        error={!!errors.role}
        helperText={errors.role?.message}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <BadgeIcon color="action" />
              </InputAdornment>
            ),
          },
        }}
      >
        <MenuItem value="BUYER">Buyer (Buy items & services)</MenuItem>
        <MenuItem value="SELLER">Seller (Post & sell items)</MenuItem>
      </TextField>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.2, borderRadius: 2, fontWeight: 'bold' }}
      >
        {isSubmitting ? 'Registering...' : 'Create Account'}
      </Button>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 600 }}>
            Sign In
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default RegisterForm;
