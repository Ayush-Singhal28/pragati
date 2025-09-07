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
  Email,
  Phone,
  LinkedIn,
  GitHub,
  EmojiEvents,
  Timeline,
  Code,
  Settings,
  Security,
  Save,
  Cancel,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

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

// Cinematic Profile Card Component
const CinematicProfileCard = ({ title, children, icon, delay = 0 }: any) => (
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
        {title && (
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
        )}
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const Profile: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
      {/* Cinematic Header - Personal Chronicle */}
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
            background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #feca57 100%)',
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
                PERSONAL CHRONICLE
              </Typography>
            </motion.div>
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Box display="flex" alignItems="center" gap={4} mb={3}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 100 }}
                >
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      border: '4px solid rgba(255,255,255,0.3)',
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                    }}
                    src="/api/placeholder/120/120"
                  />
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
                    John Smith
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      opacity: 0.95,
                      fontWeight: 300,
                      letterSpacing: '0.1em',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      mb: 2,
                    }}
                  >
                    Senior Software Engineer
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Chip label="Team Lead" sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    <Chip label="Full Stack" sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} />
                    <Chip label="5+ Years" sx={{ background: 'rgba(255,255,255,0.2)', color: 'white' }} />
                  </Stack>
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
                "Every profile tells a story of growth, passion, and relentless pursuit of excellence..."
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
            <Tab icon={<Timeline />} label="Overview" />
            <Tab icon={<Code />} label="Skills" />
            <Tab icon={<Settings />} label="Settings" />
          </Tabs>
        </Box>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tabValue === 0 && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <CinematicProfileCard 
                  title="Personal Information" 
                  icon={<Edit />}
                  delay={1.8}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={2}>
                        <TextField
                          label="First Name"
                          value="John"
                          fullWidth
                          disabled={!isEditing}
                        />
                        <TextField
                          label="Last Name"
                          value="Smith"
                          fullWidth
                          disabled={!isEditing}
                        />
                        <TextField
                          label="Email"
                          value="john.smith@company.com"
                          fullWidth
                          disabled={!isEditing}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack spacing={2}>
                        <TextField
                          label="Phone"
                          value="+1 (555) 123-4567"
                          fullWidth
                          disabled={!isEditing}
                        />
                        <TextField
                          label="Location"
                          value="San Francisco, CA"
                          fullWidth
                          disabled={!isEditing}
                        />
                        <TextField
                          label="Department"
                          value="Engineering"
                          fullWidth
                          disabled={!isEditing}
                        />
                      </Stack>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    {!isEditing ? (
                      <Button
                        variant="contained"
                        startIcon={<Edit />}
                        onClick={() => setIsEditing(true)}
                        sx={{
                          background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 100%)',
                        }}
                      >
                        Edit Profile
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="contained"
                          startIcon={<Save />}
                          onClick={() => setIsEditing(false)}
                          sx={{
                            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button
                          variant="outlined"
                          startIcon={<Cancel />}
                          onClick={() => setIsEditing(false)}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </Box>
                </CinematicProfileCard>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <CinematicProfileCard 
                  title="Quick Stats" 
                  icon={<EmojiEvents />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Projects Completed
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="primary">
                        47
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Team Members Mentored
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" color="secondary">
                        12
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Code Reviews
                      </Typography>
                      <Typography variant="h4" fontWeight="bold" sx={{ color: '#10B981' }}>
                        245
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Overall Rating
                      </Typography>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="h4" fontWeight="bold" sx={{ color: '#F59E0B' }}>
                          4.8
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          / 5.0
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CinematicProfileCard>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 1 && (
          <motion.div
            key="skills"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              {skillCategories.map((category, categoryIndex) => (
                <Grid item xs={12} md={6} key={category.name}>
                  <CinematicProfileCard 
                    title={category.name} 
                    icon={<Code />}
                    delay={1.8 + categoryIndex * 0.2}
                  >
                    <Stack spacing={3}>
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 2.0 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                        >
                          <Box>
                            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                              <Typography variant="body2" fontWeight="medium">
                                {skill.name}
                              </Typography>
                              <Typography variant="body2" fontWeight="bold" color={skill.color}>
                                {skill.level}%
                              </Typography>
                            </Box>
                            <LinearProgress
                              variant="determinate"
                              value={skill.level}
                              sx={{
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: '#E5E7EB',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: skill.color,
                                  borderRadius: 4,
                                  boxShadow: `0 2px 8px ${skill.color}40`,
                                },
                              }}
                            />
                          </Box>
                        </motion.div>
                      ))}
                    </Stack>
                  </CinematicProfileCard>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}

        {tabValue === 2 && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <CinematicProfileCard 
                  title="Account Settings" 
                  icon={<Settings />}
                  delay={1.8}
                >
                  <Stack spacing={3}>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Email notifications"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Desktop notifications"
                    />
                    <FormControlLabel
                      control={<Switch />}
                      label="Marketing emails"
                    />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label="Performance reminders"
                    />
                  </Stack>
                </CinematicProfileCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <CinematicProfileCard 
                  title="Privacy & Security" 
                  icon={<Security />}
                  delay={2.0}
                >
                  <Stack spacing={2}>
                    <Button variant="outlined" fullWidth>
                      Change Password
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Two-Factor Authentication
                    </Button>
                    <Button variant="outlined" fullWidth>
                      Download Data
                    </Button>
                    <Button variant="outlined" color="error" fullWidth>
                      Delete Account
                    </Button>
                  </Stack>
                </CinematicProfileCard>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Profile;
