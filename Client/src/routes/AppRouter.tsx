import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

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
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
