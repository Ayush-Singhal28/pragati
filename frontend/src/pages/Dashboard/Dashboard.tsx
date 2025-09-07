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
import { motion } from 'framer-motion';
import {
  Assignment,
  EmojiEvents,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
  Notifications,
  Speed,
  Groups,
} from '@mui/icons-material';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';

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

// Cinematic Metric Card Component
const CinematicMetricCard = ({ title, value, change, icon, color, subtitle }: any) => (
  <Card 
    sx={{ 
      height: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
      backdropFilter: 'blur(10px)',
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
        background: `linear-gradient(135deg, ${color}15 0%, transparent 70%)`,
        zIndex: 0,
      }}
    />
    
    <CardContent sx={{ pb: 2, position: 'relative', zIndex: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            gutterBottom
            sx={{ 
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '0.75rem',
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h3" 
            component="div" 
            fontWeight="bold" 
            sx={{
              background: `linear-gradient(45deg, ${color} 30%, ${color}80 90%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: '16px', 
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            color: color,
            boxShadow: `0 4px 12px ${color}30`,
          }}
        >
          {icon}
        </Box>
      </Box>
      <Box display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            px: 1.5,
            py: 0.5,
            borderRadius: '20px',
            backgroundColor: change > 0 ? 'success.main' : 'error.main',
            color: 'white',
          }}
        >
          {change > 0 ? (
            <ArrowUpward sx={{ fontSize: 14 }} />
          ) : (
            <ArrowDownward sx={{ fontSize: 14 }} />
          )}
          <Typography 
            variant="caption" 
            fontWeight="bold"
            sx={{ fontSize: '0.7rem' }}
          >
            {Math.abs(change)}%
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          vs last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

// Original Metric Card Component
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
    <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
      {/* Cinematic Header - Chapter Opening */}
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
            background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 50%, #F6AD55 100%)',
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
          
          {/* Parallax Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='100' cy='40' r='2'/%3E%3Ccircle cx='40' cy='100' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'parallaxDrift 30s linear infinite',
              '@keyframes parallaxDrift': {
                '0%': { transform: 'translateX(0px) translateY(0px)' },
                '100%': { transform: 'translateX(-120px) translateY(-120px)' },
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
                CHAPTER VII: THE JOURNEY CONTINUES
              </Typography>
            </motion.div>
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <motion.img 
                  src="/pragati-logo.svg" 
                  alt="Pragati Logo" 
                  style={{ 
                    width: 64, 
                    height: 64,
                    filter: 'brightness(0) invert(1) drop-shadow(0 8px 16px rgba(0,0,0,0.3))',
                  }}
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 100 }}
                />
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
                    Welcome back, John! 👋
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
                    Track. Grow. Rise.
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
                "Every great journey begins with a single step. Today, we continue writing your success story..."
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                mosAIc: AI in action with The Product Folks 🚀
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* Cinematic Metrics Cards - Act I: The Current State */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #6BB6FF 30%, #B794F6 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          📊 Act I: Your Current Performance
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
          The story of your journey unfolds through these key metrics...
        </Typography>
      </motion.div>
      
      <Grid container spacing={4} mb={6}>
        {[
          { title: "Performance Score", value: "94.5", change: 8.2, icon: <Speed />, color: "#2563eb", subtitle: "Above target (90)", delay: 1.8 },
          { title: "Tasks Completed", value: "47", change: 12.5, icon: <Assignment />, color: "#059669", subtitle: "This month", delay: 2.0 },
          { title: "Team Collaboration", value: "89%", change: -2.1, icon: <Groups />, color: "#7c3aed", subtitle: "Interaction score", delay: 2.2 },
          { title: "Growth Index", value: "127", change: 15.3, icon: <EmojiEvents />, color: "#d97706", subtitle: "Personal best", delay: 2.4 }
        ].map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: metric.delay,
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
            >
              <CinematicMetricCard {...metric} />
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Cinematic Performance Section - Act II */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.8 }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 3, 
            fontWeight: 600,
            background: 'linear-gradient(45deg, #B794F6 30%, #F6AD55 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          📈 Act II: The Performance Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontStyle: 'italic' }}>
          Dive deeper into the narrative of your growth and achievements...
        </Typography>
      </motion.div>

      <Grid container spacing={4}>
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
