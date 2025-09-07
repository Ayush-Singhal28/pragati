import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Button,
  Divider,
  Stack,
  Avatar,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  Chip,
  Alert,
  AlertTitle,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Notifications,
  Security,
  Palette,
  Language,
  Storage,
  VpnKey,
  Delete,
  Download,
  Upload,
  Sync,
  Email,
  Sms,
  PhoneAndroid,
  Computer,
  DarkMode,
  LightMode,
  PersonAdd,
  Block,
  Visibility,
  Edit,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const Settings: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true,
  });

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      achievements: true,
      weeklyReports: true,
      teamUpdates: true,
    },
    privacy: {
      profileVisible: true,
      activityVisible: false,
      allowConnections: true,
    },
    appearance: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC-8',
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
    },
  });

  const [editMode, setEditMode] = useState<string | null>(null);

  const handleSettingChange = (category: string, setting: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [setting]: value,
      },
    }));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (type: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotifications(prev => ({
      ...prev,
      [type]: event.target.checked,
    }));
  };

  // Cinematic Settings Card Component
  const CinematicSettingsCard = ({ title, children, icon, delay = 0 }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        scale: 1.02, 
        rotateY: 2,
        transition: { duration: 0.3 }
      }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)',
          backdropFilter: 'blur(15px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
            transform: 'translateY(-2px)',
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Cinematic Background Effect */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #6BB6FF15 0%, transparent 70%)',
            zIndex: 0,
          }}
        />
        
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography 
              variant="h6" 
              fontWeight="bold"
              sx={{
                background: 'linear-gradient(45deg, #6BB6FF 30%, #B794F6 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {title}
            </Typography>
            {icon && (
              <Box 
                sx={{ 
                  p: 2, 
                  borderRadius: '16px', 
                  background: 'linear-gradient(135deg, #6BB6FF20 0%, #B794F620 100%)',
                  color: '#6BB6FF',
                  boxShadow: '0 4px 12px #6BB6FF30',
                }}
              >
                {icon}
              </Box>
            )}
          </Box>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
      {/* Cinematic Header - Control Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <Box 
          sx={{ 
            mb: 6,
            p: 6,
            borderRadius: 4,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Cinematic Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              animation: 'cinematicFloat 20s ease-in-out infinite',
              '@keyframes cinematicFloat': {
                '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
                '25%': { transform: 'rotate(5deg) scale(1.1)' },
                '50%': { transform: 'rotate(-5deg) scale(0.9)' },
                '75%': { transform: 'rotate(3deg) scale(1.05)' },
              },
            }}
          />
          
          {/* Gear Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M50 15 L55 25 L65 25 L60 35 L70 45 L60 55 L65 65 L55 65 L50 75 L45 65 L35 65 L40 55 L30 45 L40 35 L35 25 L45 25 Z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'parallaxDrift 40s linear infinite',
              '@keyframes parallaxDrift': {
                '0%': { transform: 'translateX(0px) translateY(0px) rotate(0deg)' },
                '100%': { transform: 'translateX(-100px) translateY(-100px) rotate(360deg)' },
              },
            }}
          />
          
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            {/* Chapter Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <Typography 
                variant="overline" 
                sx={{ 
                  fontSize: '0.9rem', 
                  letterSpacing: '0.3em', 
                  opacity: 0.8,
                  display: 'block',
                  mb: 1
                }}
              >
                CONTROL CENTER
              </Typography>
            </motion.div>
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 100 }}
                  style={{ fontSize: '4rem' }}
                >
                  ⚙️
                </motion.div>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    fontWeight="bold"
                    sx={{ 
                      mb: 1,
                      textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                      background: 'linear-gradient(45deg, #ffffff 30%, #f0f9ff 70%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}
                  >
                    Settings & Preferences
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      opacity: 0.95,
                      fontWeight: 300,
                      letterSpacing: '0.1em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    }}
                  >
                    Customize • Configure • Control
                  </Typography>
                </Box>
              </Box>
            </motion.div>
            
            {/* Narrative Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  opacity: 0.9, 
                  mb: 2,
                  fontStyle: 'italic',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }}
              >
                "Fine-tune your experience, shape your digital environment, master your workflow..."
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                mosAIc: AI in action with The Product Folks 🚀
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* Cinematic Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                '&.Mui-selected': {
                  background: 'linear-gradient(45deg, #6BB6FF 30%, #B794F6 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                },
              },
              '& .MuiTabs-indicator': {
                background: 'linear-gradient(45deg, #6BB6FF 30%, #B794F6 90%)',
                height: 3,
              },
            }}
          >
            <Tab icon={<Notifications />} label="Notifications" />
            <Tab icon={<Security />} label="Privacy & Security" />
            <Tab icon={<Palette />} label="Appearance" />
            <Tab icon={<Storage />} label="Data & Storage" />
          </Tabs>
        </Box>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tabValue === 0 && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Notification Preferences" 
                  icon={<Notifications />}
                  delay={1.8}
                >
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.email}
                          onChange={handleNotificationChange('email')}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1">Email Notifications</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Receive notifications via email
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.push}
                          onChange={handleNotificationChange('push')}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1">Push Notifications</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Browser and mobile push notifications
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.sms}
                          onChange={handleNotificationChange('sms')}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1">SMS Notifications</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Text message alerts for critical updates
                          </Typography>
                        </Box>
                      }
                    />
                    <FormControlLabel
                      control={
                        <Switch 
                          checked={notifications.desktop}
                          onChange={handleNotificationChange('desktop')}
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1">Desktop Notifications</Typography>
                          <Typography variant="caption" color="text.secondary">
                            System notifications on your computer
                          </Typography>
                        </Box>
                      }
                    />
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Notification Types" 
                  icon={<Email />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Performance updates"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Achievement notifications"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Weekly reports"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Task reminders"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Team activity"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Marketing updates"
                    />
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 1 && (
          <motion.div
            key="security"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Security Settings" 
                  icon={<Security />}
                  delay={1.8}
                >
                  <Stack spacing={3}>
                    <Alert severity="info">
                      <AlertTitle>Two-Factor Authentication</AlertTitle>
                      Add an extra layer of security to your account
                    </Alert>
                    <Button variant="outlined" fullWidth startIcon={<VpnKey />}>
                      Enable 2FA
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Edit />}>
                      Change Password
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Download />}>
                      Download Login History
                    </Button>
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Privacy Controls" 
                  icon={<Visibility />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Profile visibility"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Activity tracking"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Data sharing with teams"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Anonymous analytics"
                    />
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 2 && (
          <motion.div
            key="appearance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Theme & Display" 
                  icon={<Palette />}
                  delay={1.8}
                >
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Theme</InputLabel>
                      <Select value="light" label="Theme">
                        <MenuItem value="light">Light</MenuItem>
                        <MenuItem value="dark">Dark</MenuItem>
                        <MenuItem value="system">System</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Font Size</InputLabel>
                      <Select value="medium" label="Font Size">
                        <MenuItem value="small">Small</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="large">Large</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Reduced motion"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="High contrast"
                    />
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Language & Region" 
                  icon={<Language />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    <FormControl fullWidth>
                      <InputLabel>Language</InputLabel>
                      <Select value="en" label="Language">
                        <MenuItem value="en">English</MenuItem>
                        <MenuItem value="es">Spanish</MenuItem>
                        <MenuItem value="fr">French</MenuItem>
                        <MenuItem value="de">German</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Time Zone</InputLabel>
                      <Select value="utc-8" label="Time Zone">
                        <MenuItem value="utc-8">Pacific Time (UTC-8)</MenuItem>
                        <MenuItem value="utc-5">Eastern Time (UTC-5)</MenuItem>
                        <MenuItem value="utc+0">UTC</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel>Date Format</InputLabel>
                      <Select value="mm/dd/yyyy" label="Date Format">
                        <MenuItem value="mm/dd/yyyy">MM/DD/YYYY</MenuItem>
                        <MenuItem value="dd/mm/yyyy">DD/MM/YYYY</MenuItem>
                        <MenuItem value="yyyy-mm-dd">YYYY-MM-DD</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 3 && (
          <motion.div
            key="storage"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Data Management" 
                  icon={<Storage />}
                  delay={1.8}
                >
                  <Stack spacing={3}>
                    <Alert severity="warning">
                      <AlertTitle>Storage Usage</AlertTitle>
                      You're using 2.3 GB of 5 GB available storage
                    </Alert>
                    <Button variant="outlined" fullWidth startIcon={<Download />}>
                      Export Data
                    </Button>
                    <Button variant="outlined" fullWidth startIcon={<Upload />}>
                      Import Data
                    </Button>
                    <Button variant="outlined" color="error" fullWidth startIcon={<Delete />}>
                      Clear Cache
                    </Button>
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <CinematicSettingsCard 
                  title="Sync & Backup" 
                  icon={<Sync />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Auto-sync settings"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Backup preferences"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Sync across devices"
                    />
                    <Button variant="outlined" fullWidth>
                      Manual Backup
                    </Button>
                  </Stack>
                </CinematicSettingsCard>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Settings;
