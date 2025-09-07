import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  Divider,
  InputBase,
  alpha,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  EmojiEvents,
  Analytics,
  Person,
  Settings,
  Logout,
  Search as SearchIcon,
  Notifications,
  Help,
  DarkMode,
  LightMode,
  Close,
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/', description: 'Overview & insights' },
  { text: 'Achievements', icon: <EmojiEvents />, path: '/achievements', description: 'Badges & milestones' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics', description: 'Performance metrics' },
  { text: 'Profile', icon: <Person />, path: '/profile', description: 'Personal details' },
  { text: 'Settings', icon: <Settings />, path: '/settings', description: 'App preferences' },
];

const quickActions = [
  { label: 'New Task', color: '#2563eb' },
  { label: 'Team Chat', color: '#7c3aed' },
  { label: 'Report Issue', color: '#059669' },
];

interface LayoutProps {
  window?: () => Window;
}

export default function Layout(props: LayoutProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleProfileMenuClose();
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Brand Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Box 
            sx={{ 
              width: 40, 
              height: 40, 
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            P
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Pragati
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Performance Platform
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* User Profile Section */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48,
              background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)'
            }}
          >
            JD
          </Avatar>
          <Box flex={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Senior Developer
            </Typography>
            <Box mt={0.5}>
              <Chip 
                label="Level 12" 
                size="small" 
                sx={{ 
                  height: 20,
                  fontSize: '0.7rem',
                  backgroundColor: '#e0f2fe',
                  color: '#0277bd'
                }}
              />
            </Box>
          </Box>
        </Box>
        
        {/* Quick Actions */}
        <Stack direction="row" spacing={1} flexWrap="wrap">
          {quickActions.map((action, index) => (
            <Chip
              key={index}
              label={action.label}
              size="small"
              sx={{
                backgroundColor: `${action.color}15`,
                color: action.color,
                fontSize: '0.7rem',
                '&:hover': {
                  backgroundColor: `${action.color}25`,
                }
              }}
            />
          ))}
        </Stack>
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  '&.Mui-selected': {
                    backgroundColor: '#f1f5f9',
                    color: '#2563eb',
                    '& .MuiListItemIcon-root': {
                      color: '#2563eb',
                    },
                    '&:hover': {
                      backgroundColor: '#e2e8f0',
                    },
                  },
                  '&:hover': {
                    backgroundColor: '#f8fafc',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {item.text}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Help Section */}
      <Box sx={{ p: 3, borderTop: '1px solid #e2e8f0' }}>
        <Paper 
          sx={{ 
            p: 2, 
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0'
          }}
        >
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Help fontSize="small" color="primary" />
            <Typography variant="subtitle2" fontWeight="bold">
              Need Help?
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary" mb={2} display="block">
            Get support or browse our documentation
          </Typography>
          <Box display="flex" gap={1}>
            <Chip label="Support" size="small" variant="outlined" />
            <Chip label="Docs" size="small" variant="outlined" />
          </Box>
        </Paper>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#ffffff',
          color: '#1e293b',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          borderBottom: '1px solid #e2e8f0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            
            {/* Search Bar */}
            <Box
              sx={{
                position: 'relative',
                borderRadius: '12px',
                backgroundColor: alpha('#f1f5f9', 0.8),
                '&:hover': {
                  backgroundColor: alpha('#e2e8f0', 0.8),
                },
                ml: 2,
                width: { xs: 'auto', sm: '400px' },
                border: '1px solid #e2e8f0',
              }}
            >
              <Box
                sx={{
                  padding: '0 16px',
                  height: '100%',
                  position: 'absolute',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SearchIcon sx={{ color: '#64748b' }} />
              </Box>
              <InputBase
                placeholder="Search tasks, people, or docs..."
                sx={{
                  color: 'inherit',
                  width: '100%',
                  '& .MuiInputBase-input': {
                    padding: '12px 12px 12px 48px',
                    fontSize: '0.875rem',
                  },
                }}
              />
            </Box>
          </Box>

          {/* Right Side Actions */}
          <Box display="flex" alignItems="center" gap={1}>
            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton
                size="large"
                onClick={handleNotificationOpen}
                sx={{
                  backgroundColor: alpha('#f1f5f9', 0.8),
                  '&:hover': {
                    backgroundColor: alpha('#e2e8f0', 0.8),
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Theme Toggle */}
            <Tooltip title="Toggle theme">
              <IconButton
                size="large"
                sx={{
                  backgroundColor: alpha('#f1f5f9', 0.8),
                  '&:hover': {
                    backgroundColor: alpha('#e2e8f0', 0.8),
                  },
                }}
              >
                <LightMode />
              </IconButton>
            </Tooltip>

            {/* Profile */}
            <Tooltip title="Account settings">
              <IconButton
                size="large"
                onClick={handleProfileMenuOpen}
                sx={{ ml: 1 }}
              >
                <Avatar 
                  sx={{ 
                    width: 36, 
                    height: 36,
                    background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)'
                  }}
                >
                  JD
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#ffffff',
              borderRight: '1px solid #e2e8f0',
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={handleDrawerToggle}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              backgroundColor: '#ffffff',
              borderRight: '1px solid #e2e8f0',
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 220,
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle2" fontWeight="bold">
            John Doe
          </Typography>
          <Typography variant="caption" color="text.secondary">
            john.doe@company.com
          </Typography>
        </Box>
        <MenuItem onClick={() => navigate('/profile')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
          <ListItemIcon>
            <Logout fontSize="small" color="error" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: 320,
            maxWidth: 400,
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid #e2e8f0' }}>
          <Typography variant="subtitle2" fontWeight="bold">
            Notifications
          </Typography>
          <Typography variant="caption" color="text.secondary">
            You have 3 new notifications
          </Typography>
        </Box>
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {[
            { title: 'New Achievement Unlocked', description: 'Code Quality Champion badge earned', time: '2h ago', type: 'success' },
            { title: 'Performance Review Due', description: 'Complete your Q2 self-assessment', time: '1d ago', type: 'warning' },
            { title: 'Team Meeting Tomorrow', description: 'Sprint planning at 10:00 AM', time: '1d ago', type: 'info' },
          ].map((notification, index) => (
            <MenuItem key={index} sx={{ py: 2, borderBottom: index < 2 ? '1px solid #f1f5f9' : 'none' }}>
              <Box>
                <Typography variant="body2" fontWeight="medium" mb={0.5}>
                  {notification.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" mb={0.5} display="block">
                  {notification.description}
                </Typography>
                <Typography variant="caption" color="primary.main">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Box>
        <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid #e2e8f0', textAlign: 'center' }}>
          <Typography variant="caption" color="primary.main" sx={{ cursor: 'pointer' }}>
            View all notifications
          </Typography>
        </Box>
      </Menu>
    </Box>
  );
}
