import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  Stack,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Assignment,
  EmojiEvents,
  Group,
  Star,
  CheckCircle,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Schedule,
  Notifications,
  Speed,
  Psychology,
  Groups,
  Insights,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';

// Enhanced mock data for demonstration
const performanceData = [
  { month: 'Jan', score: 85, target: 80, efficiency: 78 },
  { month: 'Feb', score: 87, target: 82, efficiency: 82 },
  { month: 'Mar', score: 89, target: 85, efficiency: 86 },
  { month: 'Apr', score: 92, target: 88, efficiency: 90 },
  { month: 'May', score: 95, target: 90, efficiency: 93 },
  { month: 'Jun', score: 98, target: 92, efficiency: 96 },
];

const skillsData = [
  { name: 'Technical Skills', value: 92, color: '#2563eb' },
  { name: 'Communication', value: 88, color: '#7c3aed' },
  { name: 'Leadership', value: 85, color: '#059669' },
  { name: 'Problem Solving', value: 95, color: '#d97706' },
];

const weeklyActivity = [
  { day: 'Mon', tasks: 8, meetings: 3, focus: 85 },
  { day: 'Tue', tasks: 12, meetings: 2, focus: 92 },
  { day: 'Wed', tasks: 6, meetings: 5, focus: 78 },
  { day: 'Thu', tasks: 10, meetings: 1, focus: 95 },
  { day: 'Fri', tasks: 9, meetings: 4, focus: 82 },
  { day: 'Sat', tasks: 3, meetings: 0, focus: 60 },
  { day: 'Sun', tasks: 2, meetings: 0, focus: 40 },
];

const recentTasks = [
  { id: 1, title: 'Complete API Documentation', status: 'completed', priority: 'high', progress: 100, dueDate: 'Today' },
  { id: 2, title: 'Code Review - User Authentication', status: 'in_progress', priority: 'medium', progress: 75, dueDate: 'Tomorrow' },
  { id: 3, title: 'Frontend Component Testing', status: 'pending', priority: 'low', progress: 25, dueDate: 'Next Week' },
  { id: 4, title: 'Database Optimization', status: 'in_progress', priority: 'high', progress: 60, dueDate: '2 days' },
];

const recentAchievements = [
  { title: 'Code Quality Champion', description: 'Maintained 95%+ code quality for 30 days', date: '2 days ago', points: 150, icon: '🏆' },
  { title: 'Team Player', description: 'Helped 5+ team members this week', date: '1 week ago', points: 100, icon: '🤝' },
  { title: 'Innovation Leader', description: 'Proposed 3 efficiency improvements', date: '2 weeks ago', points: 200, icon: '💡' },
];

const notifications = [
  { id: 1, title: 'Performance Review Due', description: 'Complete your Q2 self-assessment', type: 'warning', time: '2h ago' },
  { id: 2, title: 'New Achievement Unlocked', description: 'Code Quality Champion badge earned', type: 'success', time: '1d ago' },
  { id: 3, title: 'Team Meeting Tomorrow', description: 'Sprint planning at 10:00 AM', type: 'info', time: '1d ago' },
];

// Metric Card Component
const MetricCard = ({ title, value, change, icon, color, subtitle }: any) => (
  <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
    <CardContent sx={{ pb: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" component="div" fontWeight="bold" color={color}>
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box 
          sx={{ 
            p: 1.5, 
            borderRadius: '12px', 
            backgroundColor: `${color}15`,
            color: color
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={0.5}>
        {change > 0 ? (
          <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
        ) : (
          <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
        )}
        <Typography 
          variant="body2" 
          color={change > 0 ? 'success.main' : 'error.main'}
          fontWeight="medium"
        >
          {Math.abs(change)}%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          vs last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

// Task Item Component
const TaskItem = ({ task }: any) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      default: return '#059669';
    }
  };

  return (
    <Paper 
      sx={{ 
        p: 2, 
        mb: 1, 
        border: '1px solid #e2e8f0',
        '&:hover': { 
          backgroundColor: '#f8fafc',
          borderColor: '#cbd5e1'
        }
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="subtitle2" fontWeight="medium">
          {task.title}
        </Typography>
        <Box display="flex" gap={1} alignItems="center">
          <Chip 
            label={task.priority} 
            size="small" 
            sx={{ 
              backgroundColor: `${getPriorityColor(task.priority)}20`,
              color: getPriorityColor(task.priority),
              fontSize: '0.75rem'
            }}
          />
          <IconButton size="small">
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
        <Typography variant="caption" color="text.secondary">
          Due: {task.dueDate}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {task.progress}% complete
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={task.progress} 
        sx={{ 
          height: 6, 
          borderRadius: 3,
          backgroundColor: '#e2e8f0',
          '& .MuiLinearProgress-bar': {
            backgroundColor: getPriorityColor(task.priority)
          }
        }} 
      />
    </Paper>
  );
};

export default function Dashboard() {
  useEffect(() => {
    // Fetch dashboard data
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Welcome back, John! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your performance today.
        </Typography>
      </Box>

      {/* Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Performance Score"
            value="94.5"
            change={8.2}
            icon={<Speed />}
            color="#2563eb"
            subtitle="Above target (90)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Tasks Completed"
            value="47"
            change={12.5}
            icon={<Assignment />}
            color="#059669"
            subtitle="This month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Team Collaboration"
            value="89%"
            change={-2.1}
            icon={<Groups />}
            color="#7c3aed"
            subtitle="Interaction score"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Achievements"
            value="12"
            change={15.3}
            icon={<EmojiEvents />}
            color="#d97706"
            subtitle="New this quarter"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Performance Trends */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Performance Trends
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your progress over the last 6 months
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  View Details
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorScore)" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#7c3aed" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    fillOpacity={1} 
                    fill="url(#colorTarget)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Skills Breakdown */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Skills Breakdown
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Current skill levels
                  </Typography>
                </Box>
                <IconButton size="small">
                  <MoreVert />
                </IconButton>
              </Box>
              <Box mb={3}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={skillsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Stack spacing={2}>
                {skillsData.map((skill, index) => (
                  <Box key={index}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={0.5}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Box 
                          sx={{ 
                            width: 12, 
                            height: 12, 
                            borderRadius: '50%', 
                            backgroundColor: skill.color 
                          }} 
                        />
                        <Typography variant="body2" fontWeight="medium">
                          {skill.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" fontWeight="bold">
                        {skill.value}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={skill.value} 
                      sx={{ 
                        height: 6, 
                        borderRadius: 3,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: skill.color
                        }
                      }} 
                    />
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 'fit-content' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Recent Tasks
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {recentTasks.length} active tasks
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  View All
                </Button>
              </Box>
              <Box>
                {recentTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Achievements & Notifications */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            {/* Recent Achievements */}
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Recent Achievements
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Your latest milestones
                    </Typography>
                  </Box>
                </Box>
                <Stack spacing={2}>
                  {recentAchievements.map((achievement, index) => (
                    <Paper 
                      key={index}
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e2e8f0',
                        '&:hover': { backgroundColor: '#f8fafc' }
                      }}
                    >
                      <Box display="flex" gap={2}>
                        <Typography variant="h5">{achievement.icon}</Typography>
                        <Box flex={1}>
                          <Box display="flex" justifyContent="space-between" alignItems="start" mb={0.5}>
                            <Typography variant="subtitle2" fontWeight="bold">
                              {achievement.title}
                            </Typography>
                            <Chip 
                              label={`+${achievement.points} pts`} 
                              size="small" 
                              color="primary"
                              variant="outlined"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary" mb={1}>
                            {achievement.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {achievement.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">
                      Notifications
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recent updates
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    <Notifications />
                  </IconButton>
                </Box>
                <Stack spacing={2}>
                  {notifications.map((notification) => (
                    <Paper 
                      key={notification.id}
                      sx={{ 
                        p: 2, 
                        border: '1px solid #e2e8f0',
                        '&:hover': { backgroundColor: '#f8fafc' }
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {notification.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {notification.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {notification.description}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* Weekly Activity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Weekly Activity
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tasks completed and focus time this week
                  </Typography>
                </Box>
                <Button variant="outlined" size="small">
                  Export Data
                </Button>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="tasks" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="meetings" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
