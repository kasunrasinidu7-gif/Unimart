import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';

/**
 * Zod validation schema for Student Login form.
 * Ensures valid email format and required password length.
 */
const loginSchema = z.object({
  universityEmail: z
    .string()
    .min(1, 'University email is required')
    .email('Please enter a valid university email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmitSuccess?: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmitSuccess }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      universityEmail: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    // Client-side validation demo for Step 10
    setSubmittedMessage(`Validation successful for ${data.universityEmail}!`);
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
      {submittedMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {submittedMessage}
        </Alert>
      )}

      <TextField
        fullWidth
        margin="normal"
        label="University Email"
        placeholder="student@kln.ac.lk"
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

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        size="large"
        disabled={isSubmitting}
        sx={{ mt: 3, mb: 2, py: 1.2, borderRadius: 2, fontWeight: 'bold' }}
      >
        Sign In
      </Button>
    </Box>
  );
}

export default LoginForm;
