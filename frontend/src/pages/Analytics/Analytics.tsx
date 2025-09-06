import React from 'react';
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
} from 'recharts';
import { TrendingUp, TrendingDown, Remove } from '@mui/icons-material';

// Mock data
const skillsData = [
  { skill: 'Technical Skills', score: 92 },
  { skill: 'Communication', score: 88 },
  { skill: 'Leadership', score: 76 },
  { skill: 'Problem Solving', score: 94 },
  { skill: 'Collaboration', score: 90 },
  { skill: 'Innovation', score: 85 },
];

const monthlyPerformance = [
  { month: 'Jan', performance: 85, collaboration: 80, innovation: 75 },
  { month: 'Feb', performance: 87, collaboration: 82, innovation: 78 },
  { month: 'Mar', performance: 89, collaboration: 85, innovation: 80 },
  { month: 'Apr', performance: 92, collaboration: 88, innovation: 85 },
  { month: 'May', performance: 95, collaboration: 90, innovation: 88 },
  { month: 'Jun', performance: 98, collaboration: 92, innovation: 90 },
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
    description: 'Explore cloud technologies and DevOps practices to enhance your technical profile.',
    priority: 'medium',
  },
  {
    title: 'Presentation Skills Workshop',
    description: 'Improving presentation skills would complement your strong technical abilities.',
    priority: 'low',
  },
];

const getTrendIcon = (current: number, previous: number) => {
  if (current > previous) return <TrendingUp color="success" />;
  if (current < previous) return <TrendingDown color="error" />;
  return <Remove color="disabled" />;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'info';
    default: return 'default';
  }
};

const Analytics: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Analytics & Insights
      </Typography>

      <Grid container spacing={3}>
        {/* Skills Radar Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Skills Assessment
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Trends */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Performance Trends
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="performance" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="collaboration" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="innovation" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Strengths */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="success.main">
                Key Strengths
              </Typography>
              <List dense>
                {strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp color="success" sx={{ mr: 1 }} />
                          <Typography variant="body2">{strength}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Improvement Areas */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="warning.main">
                Areas for Improvement
              </Typography>
              <List dense>
                {improvementAreas.map((area, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp color="warning" sx={{ mr: 1 }} />
                          <Typography variant="body2">{area}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom color="primary.main">
                AI Recommendations
              </Typography>
              <List dense>
                {recommendations.map((rec, index) => (
                  <ListItem key={index} sx={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                      <Typography variant="subtitle2">{rec.title}</Typography>
                      <Chip
                        label={rec.priority}
                        size="small"
                        color={getPriorityColor(rec.priority) as any}
                      />
                    </Box>
                    <Typography variant="body2" color="textSecondary">
                      {rec.description}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Detailed Performance Metrics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Detailed Performance Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={skillsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
