import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  EmojiEvents,
  Group,
  Star,
  CheckCircle,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for demonstration
const performanceData = [
  { month: 'Jan', score: 85 },
  { month: 'Feb', score: 87 },
  { month: 'Mar', score: 89 },
  { month: 'Apr', score: 92 },
  { month: 'May', score: 95 },
  { month: 'Jun', score: 98 },
];

const collaborationData = [
  { name: 'Response Time', value: 92, color: '#8884d8' },
  { name: 'Helpfulness', value: 88, color: '#82ca9d' },
  { name: 'Communication', value: 95, color: '#ffc658' },
  { name: 'Teamwork', value: 90, color: '#ff7300' },
];

const recentTasks = [
  { id: 1, title: 'Complete API Documentation', status: 'completed', priority: 'high' },
  { id: 2, title: 'Code Review - User Authentication', status: 'in_progress', priority: 'medium' },
  { id: 3, title: 'Frontend Component Testing', status: 'pending', priority: 'low' },
];

const recentAchievements = [
  { title: 'Code Quality Champion', date: '2 days ago', points: 50 },
  { title: 'Team Collaborator', date: '1 week ago', points: 30 },
  { title: 'Bug Hunter', date: '2 weeks ago', points: 40 },
];

const Dashboard: React.FC = () => {
  useEffect(() => {
    // Fetch dashboard data here
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUp color="primary" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Performance Score
                  </Typography>
                  <Typography variant="h4">
                    98
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    +3% from last month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Assignment color="secondary" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Tasks Completed
                  </Typography>
                  <Typography variant="h4">
                    24
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    This month
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiEvents color="warning" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Achievement Points
                  </Typography>
                  <Typography variant="h4">
                    1,250
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Level: Expert
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Group color="info" sx={{ mr: 1 }} />
                <Box>
                  <Typography color="textSecondary" gutterBottom>
                    Collaboration Score
                  </Typography>
                  <Typography variant="h4">
                    91
                  </Typography>
                  <Typography variant="body2" color="success.main">
                    Top 10%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Performance Trend Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Trend
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Collaboration Breakdown */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Collaboration Breakdown
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={collaborationData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {collaborationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <Box sx={{ mt: 2 }}>
                {collaborationData.map((item) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: item.color,
                        mr: 1,
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="body2" sx={{ flex: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {item.value}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Tasks
              </Typography>
              <List>
                {recentTasks.map((task) => (
                  <ListItem key={task.id}>
                    <ListItemIcon>
                      <CheckCircle
                        color={task.status === 'completed' ? 'success' : 'disabled'}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Chip
                            label={task.status.replace('_', ' ')}
                            size="small"
                            color={
                              task.status === 'completed'
                                ? 'success'
                                : task.status === 'in_progress'
                                ? 'primary'
                                : 'default'
                            }
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={task.priority}
                            size="small"
                            variant="outlined"
                            color={
                              task.priority === 'high'
                                ? 'error'
                                : task.priority === 'medium'
                                ? 'warning'
                                : 'default'
                            }
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <List>
                {recentAchievements.map((achievement, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                        <Star fontSize="small" />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={achievement.title}
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                          <Typography variant="body2" color="textSecondary">
                            {achievement.date}
                          </Typography>
                          <Typography variant="body2" color="primary" fontWeight="bold">
                            +{achievement.points} points
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
