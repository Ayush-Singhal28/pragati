import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Person,
  Email,
  Work,
  Business,
  CalendarToday,
  Star,
  TrendingUp,
  EmojiEvents,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const profileStats = [
    { label: 'Performance Score', value: 98, color: '#1976d2' },
    { label: 'Collaboration Score', value: 91, color: '#2e7d32' },
    { label: 'Innovation Score', value: 85, color: '#ed6c02' },
    { label: 'Leadership Score', value: 76, color: '#9c27b0' },
  ];

  const recentActivity = [
    { action: 'Completed Code Review', date: '2 hours ago', type: 'task' },
    { action: 'Earned "Team Collaborator" badge', date: '1 day ago', type: 'achievement' },
    { action: 'Submitted project proposal', date: '3 days ago', type: 'innovation' },
    { action: 'Mentored junior developer', date: '1 week ago', type: 'leadership' },
  ];

  const skills = [
    { name: 'React/TypeScript', level: 95 },
    { name: 'Python/FastAPI', level: 88 },
    { name: 'System Design', level: 82 },
    { name: 'Team Leadership', level: 76 },
    { name: 'Project Management', level: 70 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Profile 👤
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your professional profile and career progress
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                    fontSize: '3rem',
                    fontWeight: 700,
                  }}
                >
                  {user?.avatar || user?.name?.charAt(0)}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                  {user?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {user?.role}
                </Typography>
                <Chip
                  label="Expert Level"
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Profile Details */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Profile Information
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <Email color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Email"
                      secondary={user?.email}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Work color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Role"
                      secondary={user?.role}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Business color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Department"
                      secondary={user?.department}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CalendarToday color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Member Since"
                      secondary="January 2023"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Performance Stats */}
        <Grid item xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Performance Overview
                </Typography>
                <Grid container spacing={3}>
                  {profileStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={stat.label}>
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color, mb: 1 }}>
                            {stat.value}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {stat.label}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={stat.value}
                            sx={{
                              mt: 1,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'grey.200',
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: stat.color,
                                borderRadius: 3,
                              },
                            }}
                          />
                        </Box>
                      </motion.div>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Skills */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Skills & Expertise
                </Typography>
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {skill.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {skill.level}%
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={skill.level}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Activity
                </Typography>
                <List>
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ListItem sx={{ px: 0 }}>
                        <ListItemIcon>
                          {activity.type === 'achievement' && <EmojiEvents color="warning" />}
                          {activity.type === 'task' && <Star color="primary" />}
                          {activity.type === 'innovation' && <TrendingUp color="success" />}
                          {activity.type === 'leadership' && <Person color="secondary" />}
                        </ListItemIcon>
                        <ListItemText
                          primary={activity.action}
                          secondary={activity.date}
                        />
                      </ListItem>
                      {index < recentActivity.length - 1 && <Divider />}
                    </motion.div>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;