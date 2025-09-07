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
  Save,
  Cancel,
  Warning,
  CheckCircle,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Settings: React.FC = () => {
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

  const SettingsSection = ({ title, icon, children }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {icon}
            </Avatar>
            <Typography variant="h6" fontWeight="bold">
              {title}
            </Typography>
          </Stack>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account preferences and application settings
          </Typography>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          {/* Notifications */}
          <SettingsSection title="Notifications" icon={<Notifications />}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.email}
                    onChange={(e) => handleSettingChange('notifications', 'email', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Email Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive notifications via email
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.push}
                    onChange={(e) => handleSettingChange('notifications', 'push', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Push Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive browser push notifications
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.achievements}
                    onChange={(e) => handleSettingChange('notifications', 'achievements', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Achievement Alerts</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Get notified when you earn new achievements
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.weeklyReports}
                    onChange={(e) => handleSettingChange('notifications', 'weeklyReports', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Weekly Reports</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Receive weekly performance summaries
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.notifications.teamUpdates}
                    onChange={(e) => handleSettingChange('notifications', 'teamUpdates', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Team Updates</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Stay informed about team activities
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </SettingsSection>

          {/* Privacy & Visibility */}
          <SettingsSection title="Privacy & Visibility" icon={<Visibility />}>
            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.profileVisible}
                    onChange={(e) => handleSettingChange('privacy', 'profileVisible', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Public Profile</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Make your profile visible to other team members
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.activityVisible}
                    onChange={(e) => handleSettingChange('privacy', 'activityVisible', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Activity Status</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Show your activity status to others
                    </Typography>
                  </Box>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.privacy.allowConnections}
                    onChange={(e) => handleSettingChange('privacy', 'allowConnections', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Allow Connections</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Let others send you connection requests
                    </Typography>
                  </Box>
                }
              />
            </Stack>
          </SettingsSection>

          {/* Appearance */}
          <SettingsSection title="Appearance" icon={<Palette />}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={settings.appearance.theme}
                    label="Theme"
                    onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
                  >
                    <MenuItem value="light">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LightMode fontSize="small" />
                        <span>Light Mode</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="dark">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <DarkMode fontSize="small" />
                        <span>Dark Mode</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value="auto">
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Computer fontSize="small" />
                        <span>System Default</span>
                      </Stack>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={settings.appearance.language}
                    label="Language"
                    onChange={(e) => handleSettingChange('appearance', 'language', e.target.value)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={settings.appearance.timezone}
                    label="Timezone"
                    onChange={(e) => handleSettingChange('appearance', 'timezone', e.target.value)}
                  >
                    <MenuItem value="UTC-8">Pacific Time (UTC-8)</MenuItem>
                    <MenuItem value="UTC-5">Eastern Time (UTC-5)</MenuItem>
                    <MenuItem value="UTC+0">Greenwich Mean Time (UTC+0)</MenuItem>
                    <MenuItem value="UTC+1">Central European Time (UTC+1)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </SettingsSection>

          {/* Security */}
          <SettingsSection title="Security" icon={<Security />}>
            <Stack spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={settings.security.twoFactor}
                    onChange={(e) => handleSettingChange('security', 'twoFactor', e.target.checked)}
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1">Two-Factor Authentication</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Add an extra layer of security to your account
                    </Typography>
                  </Box>
                }
              />
              
              <Box>
                <Typography variant="body1" gutterBottom>
                  Session Timeout
                </Typography>
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={settings.security.sessionTimeout}
                    onChange={(e) => handleSettingChange('security', 'sessionTimeout', e.target.value)}
                  >
                    <MenuItem value={15}>15 minutes</MenuItem>
                    <MenuItem value={30}>30 minutes</MenuItem>
                    <MenuItem value={60}>1 hour</MenuItem>
                    <MenuItem value={240}>4 hours</MenuItem>
                    <MenuItem value={480}>8 hours</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Stack direction="row" spacing={2}>
                <Button variant="outlined" startIcon={<VpnKey />}>
                  Change Password
                </Button>
                <Button variant="outlined" startIcon={<Download />}>
                  Download Data
                </Button>
              </Stack>
            </Stack>
          </SettingsSection>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Quick Actions
                </Typography>
                <Stack spacing={1}>
                  <Button variant="outlined" startIcon={<Sync />} fullWidth>
                    Sync Data
                  </Button>
                  <Button variant="outlined" startIcon={<Upload />} fullWidth>
                    Import Settings
                  </Button>
                  <Button variant="outlined" startIcon={<Download />} fullWidth>
                    Export Settings
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>

          {/* Connected Services */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Connected Services
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Slack Integration" 
                      secondary="Connected"
                    />
                    <ListItemSecondaryAction>
                      <Chip label="Active" color="success" size="small" />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Storage color="disabled" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="GitHub" 
                      secondary="Not connected"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Connect</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Language color="disabled" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Jira" 
                      secondary="Not connected"
                    />
                    <ListItemSecondaryAction>
                      <Button size="small">Connect</Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Account Management
                </Typography>
                <Alert severity="warning" sx={{ mb: 2 }}>
                  <AlertTitle>Danger Zone</AlertTitle>
                  These actions cannot be undone
                </Alert>
                <Stack spacing={1}>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    startIcon={<Delete />} 
                    fullWidth
                  >
                    Delete Account
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Paper 
          sx={{ 
            position: 'fixed', 
            bottom: 24, 
            right: 24, 
            p: 2,
            boxShadow: 3,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            startIcon={<Save />}
            size="large"
          >
            Save All Changes
          </Button>
        </Paper>
      </motion.div>
    </Box>
  );
};

export default Settings;
