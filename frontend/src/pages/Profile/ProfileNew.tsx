import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Chip,
  IconButton,
  Stack,
  Divider,
  LinearProgress,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit,
  LocationOn,
  Work,
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Language,
  School,
  EmojiEvents,
  Timeline,
  TrendingUp,
  Code,
  Star,
  Settings,
  Notifications,
  Security,
  Save,
  Cancel,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    name: 'Programming Languages',
    skills: [
      { name: 'JavaScript', level: 95, color: '#f7df1e' },
      { name: 'TypeScript', level: 90, color: '#3178c6' },
      { name: 'Python', level: 85, color: '#3776ab' },
      { name: 'Java', level: 80, color: '#ed8b00' },
      { name: 'Go', level: 70, color: '#00add8' },
    ],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      { name: 'React', level: 95, color: '#61dafb' },
      { name: 'Node.js', level: 90, color: '#339933' },
      { name: 'FastAPI', level: 85, color: '#009688' },
      { name: 'Django', level: 80, color: '#092e20' },
      { name: 'Docker', level: 75, color: '#2496ed' },
    ],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 95, color: '#f05032' },
      { name: 'AWS', level: 85, color: '#ff9900' },
      { name: 'PostgreSQL', level: 80, color: '#336791' },
      { name: 'MongoDB', level: 75, color: '#47a248' },
      { name: 'Redis', level: 70, color: '#dc382d' },
    ],
  },
];

const achievements = [
  { name: 'Code Quality Champion', date: '2024-08', type: 'technical', level: 'gold' },
  { name: 'Team Collaborator', date: '2024-07', type: 'collaboration', level: 'silver' },
  { name: 'Innovation Leader', date: '2024-06', type: 'innovation', level: 'bronze' },
  { name: 'Mentor Excellence', date: '2024-05', type: 'leadership', level: 'gold' },
];

const careerMilestones = [
  { title: 'Senior Software Engineer', company: 'TechCorp', date: '2024-01', current: true },
  { title: 'Software Engineer', company: 'TechCorp', date: '2022-06', current: false },
  { title: 'Junior Developer', company: 'StartupXYZ', date: '2021-01', current: false },
  { title: 'Computer Science Graduate', company: 'University', date: '2020-12', current: false },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    title: 'Senior Software Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    bio: 'Passionate software engineer with 5+ years of experience building scalable web applications. Expert in React, TypeScript, and cloud technologies.',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe',
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setEditMode(false);
    // Here you would typically save to backend
  };

  const handleCancel = () => {
    setEditMode(false);
    // Reset form data if needed
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid white',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  }}
                  src="/api/placeholder/120/120"
                >
                  JD
                </Avatar>
              </Grid>
              <Grid item xs>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h4" fontWeight="bold" color="white">
                      {formData.name}
                    </Typography>
                    <IconButton
                      onClick={() => setEditMode(!editMode)}
                      sx={{ color: 'white' }}
                    >
                      <Edit />
                    </IconButton>
                  </Stack>
                  <Typography variant="h6" color="rgba(255,255,255,0.9)">
                    {formData.title} at {formData.company}
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5} color="rgba(255,255,255,0.8)">
                    <LocationOn fontSize="small" />
                    <Typography variant="body2">{formData.location}</Typography>
                  </Stack>
                  <Typography variant="body1" color="rgba(255,255,255,0.9)" sx={{ mt: 2, maxWidth: 600 }}>
                    {formData.bio}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Stack spacing={2} alignItems="center">
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Typography variant="h3" fontWeight="bold" color="white">
                      92
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Overall Score
                    </Typography>
                  </Paper>
                  <Paper sx={{ p: 2, textAlign: 'center', bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}>
                    <Typography variant="h3" fontWeight="bold" color="white">
                      24
                    </Typography>
                    <Typography variant="body2" color="rgba(255,255,255,0.8)">
                      Achievements
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </motion.div>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Overview" icon={<Timeline />} iconPosition="start" />
          <Tab label="Skills" icon={<Code />} iconPosition="start" />
          <Tab label="Achievements" icon={<EmojiEvents />} iconPosition="start" />
          <Tab label="Settings" icon={<Settings />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {/* Contact Information */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Contact Information
                      </Typography>
                      {editMode ? (
                        <Stack spacing={2}>
                          <TextField
                            label="Email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="Phone"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="LinkedIn"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <TextField
                            label="GitHub"
                            value={formData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            fullWidth
                            size="small"
                          />
                          <Stack direction="row" spacing={1}>
                            <Button
                              variant="contained"
                              startIcon={<Save />}
                              onClick={handleSave}
                              size="small"
                            >
                              Save
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<Cancel />}
                              onClick={handleCancel}
                              size="small"
                            >
                              Cancel
                            </Button>
                          </Stack>
                        </Stack>
                      ) : (
                        <List dense>
                          <ListItem disablePadding>
                            <ListItemIcon><Email /></ListItemIcon>
                            <ListItemText primary={formData.email} />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon><Phone /></ListItemIcon>
                            <ListItemText primary={formData.phone} />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon><LinkedIn /></ListItemIcon>
                            <ListItemText primary={formData.linkedin} />
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemIcon><GitHub /></ListItemIcon>
                            <ListItemText primary={formData.github} />
                          </ListItem>
                        </List>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>

              {/* Career Timeline */}
              <Grid item xs={12} md={6}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Career Timeline
                      </Typography>
                      <Stack spacing={2}>
                        {careerMilestones.map((milestone, index) => (
                          <Box key={index} sx={{ position: 'relative', pl: 3 }}>
                            <Box
                              sx={{
                                position: 'absolute',
                                left: 0,
                                top: 8,
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: milestone.current ? 'primary.main' : 'grey.400',
                              }}
                            />
                            <Typography variant="subtitle2">{milestone.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {milestone.company} • {milestone.date}
                              {milestone.current && (
                                <Chip label="Current" size="small" sx={{ ml: 1 }} />
                              )}
                            </Typography>
                          </Box>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {skillCategories.map((category, categoryIndex) => (
                <Grid item xs={12} md={4} key={categoryIndex}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                  >
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {category.name}
                        </Typography>
                        <Stack spacing={2}>
                          {category.skills.map((skill, skillIndex) => (
                            <Box key={skillIndex}>
                              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                                <Typography variant="body2">{skill.name}</Typography>
                                <Typography variant="body2" fontWeight="bold">
                                  {skill.level}%
                                </Typography>
                              </Stack>
                              <LinearProgress
                                variant="determinate"
                                value={skill.level}
                                sx={{
                                  height: 6,
                                  borderRadius: 3,
                                  bgcolor: 'grey.200',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: skill.color,
                                    borderRadius: 3,
                                  },
                                }}
                              />
                            </Box>
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              {achievements.map((achievement, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        textAlign: 'center',
                        bgcolor: achievement.level === 'gold' ? '#fff8e1' : 
                                achievement.level === 'silver' ? '#f3f4f6' : '#fef2f2',
                        border: `2px solid ${
                          achievement.level === 'gold' ? '#ffc107' : 
                          achievement.level === 'silver' ? '#9e9e9e' : '#cd7f32'
                        }`,
                      }}
                    >
                      <CardContent>
                        <Avatar
                          sx={{
                            width: 60,
                            height: 60,
                            bgcolor: achievement.level === 'gold' ? '#ffc107' : 
                                    achievement.level === 'silver' ? '#9e9e9e' : '#cd7f32',
                            margin: '0 auto 16px',
                          }}
                        >
                          <EmojiEvents />
                        </Avatar>
                        <Typography variant="h6" gutterBottom>
                          {achievement.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {achievement.date}
                        </Typography>
                        <Chip
                          label={achievement.type}
                          size="small"
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Preferences
                    </Typography>
                    <Stack spacing={2}>
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Email notifications"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Weekly progress reports"
                      />
                      <FormControlLabel
                        control={<Switch />}
                        label="Achievement notifications"
                      />
                      <FormControlLabel
                        control={<Switch defaultChecked />}
                        label="Team collaboration alerts"
                      />
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Privacy & Security
                    </Typography>
                    <Stack spacing={2}>
                      <Button variant="outlined" startIcon={<Security />}>
                        Change Password
                      </Button>
                      <Button variant="outlined" startIcon={<Settings />}>
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outlined" color="error">
                        Delete Account
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Profile;
