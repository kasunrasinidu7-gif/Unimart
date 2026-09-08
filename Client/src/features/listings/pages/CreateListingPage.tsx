import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import InputAdornment from '@mui/material/InputAdornment';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TitleIcon from '@mui/icons-material/Title';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionIcon from '@mui/icons-material/Description';
import { getCategories, createListing, type Category } from '../listingsApi';
import { useAppSelector } from '../../../app/hooks';

export function Component() {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCats() {
      const data = await getCategories();
      setCategories(data);
      if (data.length > 0) {
        setCategoryId(data[0].id);
      }
    }
    fetchCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !categoryId || !price) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await createListing({
        sellerId: user?.id || 1,
        categoryId: Number(categoryId),
        title: title.trim(),
        description: description.trim(),
        price: parseFloat(price),
        imageUrl: imageUrl.trim() || undefined,
      });

      setSuccessMessage('Listing created successfully! Redirecting to marketplace...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom color="primary.main" sx={{ fontWeight: 800 }}>
          Create New Listing
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
          Post your textbook, electronics, furniture, or stationery for sale on UniMart
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errorMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            required
            label="Listing Title"
            placeholder="e.g. Database Management Systems 8th Edition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ display: 'flex', gap: 2, flexDir: { xs: 'column', sm: 'row' }, my: 1 }}>
            <TextField
              fullWidth
              required
              select
              label="Category"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              margin="normal"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CategoryIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              required
              label="Price (LKR)"
              type="number"
              placeholder="3500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              margin="normal"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <TextField
            fullWidth
            label="Image URL"
            placeholder="https://images.unsplash.com/photo-..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            margin="normal"
            helperText="Provide a direct link to an image of your item"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AddPhotoAlternateIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Item Description"
            placeholder="Provide details about the item condition, edition, specs, or preferred pickup campus location..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            margin="normal"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <DescriptionIcon color="action" />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="inherit" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              sx={{ px: 4, fontWeight: 700, borderRadius: 2 }}
            >
              {isSubmitting ? 'Publishing...' : 'Publish Listing'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default Component;
