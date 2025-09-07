import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
  Avatar,
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  Divider,
  LinearProgress,
  Tab,
  Tabs,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Remove, 
  Analytics as AnalyticsIcon,
  Timeline,
  Assessment,
  Speed,
  Psychology,
  Group,
  Code,
  FilterList,
  Download,
  Share,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

// Enhanced mock data
const skillsData = [
  { skill: 'Technical Skills', score: 92, color: '#2563eb' },
  { skill: 'Communication', score: 88, color: '#7c3aed' },
  { skill: 'Leadership', score: 76, color: '#059669' },
  { skill: 'Problem Solving', score: 94, color: '#d97706' },
  { skill: 'Collaboration', score: 90, color: '#dc2626' },
  { skill: 'Innovation', score: 85, color: '#0891b2' },
];

const monthlyPerformance = [
  { month: 'Jan', performance: 85, collaboration: 80, innovation: 75 },
  { month: 'Feb', performance: 87, collaboration: 82, innovation: 78 },
  { month: 'Mar', performance: 89, collaboration: 85, innovation: 80 },
  { month: 'Apr', performance: 92, collaboration: 88, innovation: 85 },
  { month: 'May', performance: 95, collaboration: 90, innovation: 88 },
  { month: 'Jun', performance: 98, collaboration: 92, innovation: 90 },
];

const categoryData = [
  { name: 'Technical', value: 35, color: '#2563eb' },
  { name: 'Communication', value: 25, color: '#7c3aed' },
  { name: 'Leadership', value: 20, color: '#059669' },
  { name: 'Innovation', value: 20, color: '#d97706' },
];

const weeklyActivity = [
  { day: 'Mon', commits: 12, reviews: 8, meetings: 3 },
  { day: 'Tue', commits: 8, reviews: 6, meetings: 4 },
  { day: 'Wed', commits: 15, reviews: 10, meetings: 2 },
  { day: 'Thu', commits: 10, reviews: 12, meetings: 5 },
  { day: 'Fri', commits: 6, reviews: 5, meetings: 3 },
  { day: 'Sat', commits: 3, reviews: 2, meetings: 0 },
  { day: 'Sun', commits: 1, reviews: 1, meetings: 0 },
];

const strengths = [
  'Code Quality & Best Practices',
  'Problem-Solving Skills',
  'Technical Documentation',
  'Team Collaboration',
  'Meeting Deadlines',
];

const improvementAreas = [
  'Public Speaking & Presentations',
  'Project Management Skills',
  'Mentoring Junior Developers',
  'Cross-team Communication',
];

const recommendations = [
  {
    title: 'Consider Leadership Training',
    description: 'Your collaboration scores suggest leadership potential. Consider enrolling in leadership development programs.',
    priority: 'high',
  },
  {
    title: 'Expand Technical Skills',
    description: 'Explore advanced frameworks and cloud technologies to enhance your technical repertoire.',
    priority: 'medium',
  },
  {
    title: 'Improve Presentation Skills',
    description: 'Join public speaking groups or take presentation courses to boost confidence.',
    priority: 'medium',
  },
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
      id={`analytics-tabpanel-${index}`}
      aria-labelledby={`analytics-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Analytics: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('6m');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const MetricCard = ({ title, value, change, icon, color }: any) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card sx={{ height: '100%', position: 'relative', overflow: 'visible' }}>
        <CardContent>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar sx={{ bgcolor: color, width: 48, height: 48 }}>
              {icon}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" fontWeight="bold" color={color}>
                {value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {title}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                {change > 0 ? (
                  <TrendingUp fontSize="small" color="success" />
                ) : change < 0 ? (
                  <TrendingDown fontSize="small" color="error" />
                ) : (
                  <Remove fontSize="small" color="disabled" />
                )}
                <Typography 
                  variant="caption" 
                  color={change > 0 ? "success.main" : change < 0 ? "error.main" : "text.disabled"}
                >
                  {change > 0 ? '+' : ''}{change}% vs last month
                </Typography>
              </Stack>
            </Box>
          </Stack>
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
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Analytics & Insights
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Track your performance, skills, and career progression
            </Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <ButtonGroup variant="outlined" size="small">
              {['1m', '3m', '6m', '1y'].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'contained' : 'outlined'}
                  onClick={() => setTimeRange(range)}
                >
                  {range}
                </Button>
              ))}
            </ButtonGroup>
            <IconButton size="small">
              <FilterList />
            </IconButton>
            <IconButton size="small">
              <Download />
            </IconButton>
            <IconButton size="small">
              <Share />
            </IconButton>
          </Stack>
        </Box>
      </motion.div>

      {/* Key Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Overall Score"
            value="92"
            change={5.2}
            icon={<Assessment />}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Skills Rating"
            value="4.8"
            change={0.3}
            icon={<Psychology />}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Team Impact"
            value="89%"
            change={-2.1}
            icon={<Group />}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <MetricCard
            title="Code Quality"
            value="95%"
            change={1.8}
            icon={<Code />}
            color="warning.main"
          />
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Performance Overview" icon={<Timeline />} iconPosition="start" />
          <Tab label="Skills Analysis" icon={<Psychology />} iconPosition="start" />
          <Tab label="Activity Trends" icon={<Speed />} iconPosition="start" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Performance Trends */}
            <Grid item xs={12} lg={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[70, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="performance" 
                        stroke="#2563eb" 
                        strokeWidth={3}
                        dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="collaboration" 
                        stroke="#7c3aed" 
                        strokeWidth={3}
                        dot={{ fill: '#7c3aed', strokeWidth: 2, r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="innovation" 
                        stroke="#059669" 
                        strokeWidth={3}
                        dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Category Distribution */}
            <Grid item xs={12} lg={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Performance Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    {categoryData.map((item, index) => (
                      <Stack key={index} direction="row" alignItems="center" spacing={1}>
                        <Box
                          sx={{
                            width: 12,
                            height: 12,
                            bgcolor: item.color,
                            borderRadius: '50%',
                          }}
                        />
                        <Typography variant="body2">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                          {item.value}%
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {/* Skills Radar */}
            <Grid item xs={12} lg={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills Assessment
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={skillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="skill" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Score"
                        dataKey="score"
                        stroke="#2563eb"
                        fill="#2563eb"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>

            {/* Skills Breakdown */}
            <Grid item xs={12} lg={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Skills Breakdown
                  </Typography>
                  <Stack spacing={3}>
                    {skillsData.map((skill, index) => (
                      <Box key={index}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                          <Typography variant="body2">{skill.skill}</Typography>
                          <Typography variant="body2" fontWeight="bold">
                            {skill.score}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={skill.score}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: skill.color,
                            },
                          }}
                        />
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {/* Weekly Activity */}
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Weekly Activity Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="commits" fill="#2563eb" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="reviews" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meetings" fill="#059669" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Card>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  AI-Powered Recommendations
                </Typography>
                <Stack spacing={2}>
                  {recommendations.map((rec, index) => (
                    <Paper
                      key={index}
                      variant="outlined"
                      sx={{ p: 2, bgcolor: rec.priority === 'high' ? 'error.50' : 'grey.50' }}
                    >
                      <Typography variant="subtitle2" gutterBottom>
                        {rec.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {rec.description}
                      </Typography>
                      <Chip
                        label={rec.priority}
                        size="small"
                        color={rec.priority === 'high' ? 'error' : 'default'}
                        sx={{ mt: 1 }}
                      />
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Key Strengths
                </Typography>
                <List dense>
                  {strengths.map((strength, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText
                        primary={strength}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="h6" gutterBottom>
                  Growth Areas
                </Typography>
                <List dense>
                  {improvementAreas.map((area, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemText
                        primary={area}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </motion.div>
    </Box>
  );
};

export default Analytics;
