import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  EmojiEvents,
  Group,
  Star,
  CheckCircle,
  Schedule,
  Flag,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { motion } from 'framer-motion';

// Mock data
const performanceData = [
  { month: 'Aug', score: 85 },
  { month: 'Sep', score: 87 },
  { month: 'Oct', score: 89 },
  { month: 'Nov', score: 92 },
  { month: 'Dec', score: 95 },
  { month: 'Jan', score: 98 },
];

const collaborationData = [
  { name: 'Response Time', value: 92, color: '#8884d8' },
  { name: 'Helpfulness', value: 88, color: '#82ca9d' },
  { name: 'Communication', value: 95, color: '#ffc658' },
  { name: 'Teamwork', value: 90, color: '#ff7300' },
];

const recentTasks = [
  { id: 1, title: 'Complete API Documentation', status: 'completed', priority: 'high', dueDate: '2024-01-20' },
  { id: 2, title: 'Code Review - User Authentication', status: 'in_progress', priority: 'medium', dueDate: '2024-01-25' },
  { id: 3, title: 'Frontend Component Testing', status: 'pending', priority: 'low', dueDate: '2024-01-30' },
  { id: 4, title: 'Database Optimization', status: 'completed', priority: 'high', dueDate: '2024-01-18' },
];

const recentAchievements = [
  { title: 'Code Quality Champion', date: '2 days ago', points: 100, icon: '🏆' },
  { title: 'Team Collaborator', date: '1 week ago', points: 75, icon: '🤝' },
  { title: 'Bug Hunter', date: '2 weeks ago', points: 50, icon: '🐛' },
];

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}> = ({ title, value, subtitle, icon, color, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography color="text.secondary" gutterBottom variant="body2" sx={{ fontWeight: 500 }}>
              {title}
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, color: color, mb: 1 }}>
              {value}
            </Typography>
            <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
              {subtitle}
            </Typography>
          </Box>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: 3,
              backgroundColor: `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: color,
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

const Dashboard: React.FC = () => {
  const { metrics } = useSelector((state: RootState) => state.dashboard);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's your performance overview for this month
        </Typography>
      </Box>
      
      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Performance Score"
            value={metrics.performanceScore}
            subtitle="+3% from last month"
            icon={<TrendingUp sx={{ fontSize: 28 }} />}
            color="#1976d2"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Tasks Completed"
            value={metrics.tasksCompleted}
            subtitle="This month"
            icon={<Assignment sx={{ fontSize: 28 }} />}
            color="#2e7d32"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Achievement Points"
            value={metrics.achievementPoints.toLocaleString()}
            subtitle="Level: Expert"
            icon={<EmojiEvents sx={{ fontSize: 28 }} />}
            color="#ed6c02"
          />
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Collaboration Score"
            value={metrics.collaborationScore}
            subtitle="Top 10%"
            icon={<Group sx={{ fontSize: 28 }} />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Performance Trend Chart */}
        <Grid item xs={12} lg={8}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Performance Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#1976d2" 
                      strokeWidth={3}
                      dot={{ fill: '#1976d2', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#1976d2', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Collaboration Breakdown */}
        <Grid item xs={12} lg={4}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Collaboration Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={collaborationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
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
          </motion.div>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Tasks
                </Typography>
                <List>
                  {recentTasks.map((task) => (
                    <ListItem key={task.id} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <CheckCircle
                          color={task.status === 'completed' ? 'success' : 'disabled'}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {task.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
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
                              sx={{ fontSize: '0.75rem' }}
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
                              sx={{ fontSize: '0.75rem' }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              Due: {task.dueDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Recent Achievements */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Achievements
                </Typography>
                <List>
                  {recentAchievements.map((achievement, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Avatar 
                          sx={{ 
                            bgcolor: 'primary.main', 
                            width: 40, 
                            height: 40,
                            fontSize: '1.2rem',
                          }}
                        >
                          {achievement.icon}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {achievement.title}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              {achievement.date}
                            </Typography>
                            <Typography variant="body2" color="primary.main" fontWeight="bold">
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
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;