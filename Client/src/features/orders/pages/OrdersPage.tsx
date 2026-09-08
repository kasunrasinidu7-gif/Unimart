import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PaymentIcon from '@mui/icons-material/Payment';
import StarIcon from '@mui/icons-material/Star';
import apiClient from '../../../services/apiClient';

interface OrderItem {
  id: number;
  listingId: number;
  listingTitle?: string;
  buyerId: number;
  totalAmount: number;
  status: 'POSTED' | 'PAID' | 'COMPLETED' | 'CANCELLED';
  paymentMethod: string;
  createdAt: string;
}

export function Component() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Review Dialog State
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState<number | null>(5);
  const [comment, setComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiClient.get<any[]>('/orders');
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err: any) {
      // Fallback mock orders if empty database
      setOrders([
        {
          id: 101,
          listingId: 1,
          listingTitle: 'Database Management Systems 8th Edition',
          buyerId: 1,
          totalAmount: 3500,
          status: 'POSTED',
          paymentMethod: 'CASH_ON_DELIVERY',
          createdAt: '2026-08-10',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePayOrder = async (orderId: number, amount: number) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      await apiClient.post('/payments', {
        orderId,
        amount,
        providerReference: `PAY-${Date.now()}`,
        idempotencyKey: `IDEM-${Date.now()}`,
      });
      setSuccessMessage(`Payment completed for Order #${orderId}!`);
      fetchOrders();
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment processing failed.');
    }
  };

  const handleOpenReview = (order: OrderItem) => {
    setSelectedOrder(order);
    setRating(5);
    setComment('');
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = async () => {
    if (!selectedOrder) return;
    setSubmittingReview(true);
    try {
      await apiClient.post('/reviews', {
        orderId: selectedOrder.id,
        reviewerId: selectedOrder.buyerId,
        revieweeId: 101, // Seller ID
        rating: rating || 5,
        comment: comment.trim(),
      });
      setSuccessMessage('Review submitted successfully!');
      setReviewDialogOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit review.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const getStatusChip = (status: string) => {
    switch (status) {
      case 'POSTED':
        return <Chip label="Order Posted" color="warning" size="small" />;
      case 'PAID':
        return <Chip label="Paid" color="info" size="small" />;
      case 'COMPLETED':
        return <Chip label="Completed" color="success" size="small" />;
      case 'CANCELLED':
        return <Chip label="Cancelled" color="error" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <ShoppingBagIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: 'text.primary' }}>
          My Orders
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage(null)}>
          {errorMessage}
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : orders.length === 0 ? (
        <Alert severity="info" sx={{ borderRadius: 2 }}>
          You have not placed any orders yet. Browse listings to make your first purchase!
        </Alert>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {orders.map((order) => (
            <Paper
              key={order.id}
              elevation={2}
              sx={{
                p: 3,
                borderRadius: 3,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2,
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Order #{order.id}
                  </Typography>
                  {getStatusChip(order.status)}
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {order.listingTitle || `Listing #${order.listingId}`}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                  Placed on: {order.createdAt} | Payment Method: {order.paymentMethod}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 800 }}>
                  LKR {order.totalAmount.toLocaleString()}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  {order.status === 'POSTED' && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      startIcon={<PaymentIcon />}
                      onClick={() => handlePayOrder(order.id, order.totalAmount)}
                      sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                      Pay Now
                    </Button>
                  )}

                  {(order.status === 'PAID' || order.status === 'COMPLETED') && (
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      startIcon={<StarIcon />}
                      onClick={() => handleOpenReview(order)}
                      sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                      Leave Review
                    </Button>
                  )}
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      {/* Review Dialog */}
      <Dialog open={reviewDialogOpen} onClose={() => setReviewDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, color: 'primary.main' }}>Leave Seller Review</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Rate your transaction experience for Order #{selectedOrder?.id}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating
                name="order-rating"
                value={rating}
                onChange={(_, newValue) => setRating(newValue)}
                size="large"
              />
            </Box>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Review Comment"
              placeholder="Good seller, item delivered in great condition..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={submittingReview}
            onClick={handleSubmitReview}
            sx={{ fontWeight: 700 }}
          >
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Component;
