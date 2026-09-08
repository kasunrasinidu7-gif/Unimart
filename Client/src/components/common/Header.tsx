import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuIcon from '@mui/icons-material/Menu';
import ExploreIcon from '@mui/icons-material/Explore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChatIcon from '@mui/icons-material/Chat';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { logout } from '../../features/auth/authSlice';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    dispatch(logout());
    navigate('/login');
  };

  const navItems = [
    { text: 'Browse Listings', icon: <ExploreIcon />, path: '/' },
    ...(isAuthenticated
      ? [
          { text: 'Post Listing', icon: <AddCircleIcon />, path: '/listings/new' },
          { text: 'My Orders', icon: <ShoppingBagIcon />, path: '/orders' },
          { text: 'Messages', icon: <ChatIcon />, path: '/chat' },
        ]
      : [
          { text: 'Sign In', icon: <LoginIcon />, path: '/login' },
          { text: 'Register', icon: <PersonAddIcon />, path: '/register' },
        ]),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250, pt: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, mb: 2 }}>
        <StorefrontIcon color="primary" sx={{ fontSize: 28 }} />
        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
          UniMart
        </Typography>
      </Box>
      <Divider />
      {isAuthenticated && user && (
        <Box sx={{ p: 2, bgcolor: 'action.hover' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {user.fullName || user.universityEmail}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            {user.universityEmail}
          </Typography>
          <Chip label={user.role} size="small" color="primary" sx={{ mt: 0.5, height: 20, fontSize: '0.65rem' }} />
        </Box>
      )}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ color: 'primary.main' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo & Brand Name */}
          <Box
            onClick={() => navigate('/')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              userSelect: 'none',
            }}
          >
            <StorefrontIcon sx={{ color: 'primary.main', fontSize: 32 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                letterSpacing: '.05rem',
              }}
            >
              UniMart
            </Typography>
          </Box>

          {/* Desktop Navigation Actions */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Button
              color={location.pathname === '/' ? 'primary' : 'inherit'}
              onClick={() => navigate('/')}
              sx={{ fontWeight: location.pathname === '/' ? 600 : 400 }}
            >
              Browse Listings
            </Button>

            {isAuthenticated ? (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<AddCircleIcon />}
                  onClick={() => navigate('/listings/new')}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Post Listing
                </Button>
                <Button
                  color={location.pathname === '/orders' ? 'primary' : 'inherit'}
                  startIcon={<ShoppingBagIcon />}
                  onClick={() => navigate('/orders')}
                  size="small"
                >
                  Orders
                </Button>
                <Button
                  color={location.pathname === '/chat' ? 'primary' : 'inherit'}
                  startIcon={<ChatIcon />}
                  onClick={() => navigate('/chat')}
                  size="small"
                >
                  Chat
                </Button>

                <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 1 }}>
                  <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: 14 }}>
                    {(user?.fullName || user?.universityEmail || 'U').charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  onClick={handleMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {user?.fullName || 'Student'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {user?.universityEmail}
                    </Typography>
                    <Chip label={user?.role} size="small" color="primary" sx={{ mt: 0.5, height: 20, fontSize: '0.65rem' }} />
                  </Box>
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" color="error" /></ListItemIcon>
                    <Typography color="error">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<PersonAddIcon />}
                  onClick={() => navigate('/register')}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={() => navigate('/login')}
                  size="small"
                  sx={{ borderRadius: 2 }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Hamburger Button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{ display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
}

export default Header;
