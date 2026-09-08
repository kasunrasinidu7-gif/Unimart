import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        lazy: () => import('../features/listings/pages/ListingsPage'),
      },
      {
        path: 'listings/:id',
        lazy: () => import('../features/listings/pages/ListingDetailsPage'),
      },
      {
        path: 'login',
        lazy: () => import('../features/auth/pages/LoginPage'),
      },
      {
        path: 'register',
        lazy: () => import('../features/auth/pages/RegisterPage'),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'listings/new',
            lazy: () => import('../features/listings/pages/CreateListingPage'),
          },
          {
            path: 'orders',
            lazy: () => import('../features/orders/pages/OrdersPage'),
          },
          {
            path: 'chat',
            lazy: () => import('../features/chat/pages/ChatPage'),
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
