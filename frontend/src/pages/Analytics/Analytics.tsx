import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
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
  Timeline,
  Assessment,
  Speed,
  Psychology,
  Code,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

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

// Cinematic Chart Card Component
const CinematicChartCard = ({ title, subtitle, children, icon, delay = 0 }: any) => (
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
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box>
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
            {subtitle && (
              <Typography variant="body2" color="text.secondary">
                {subtitle}
              </Typography>
            )}
          </Box>
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
        {children}
      </CardContent>
    </Card>
  </motion.div>
);

const Analytics: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
      {/* Cinematic Header - Data Observatory */}
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
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
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
                DATA OBSERVATORY
              </Typography>
            </motion.div>
            
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
            >
              <Box display="flex" alignItems="center" gap={3} mb={3}>
                <motion.div
                  initial={{ rotate: -180, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.8, type: "spring", stiffness: 100 }}
                  style={{ fontSize: '4rem' }}
                >
                  📊
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
                    Performance Analytics
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
                    Deep Insights • Growth Patterns
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
                "In numbers we find truth, in patterns we discover potential. Your data tells a story of excellence..."
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
            <Tab icon={<Timeline />} label="Performance Trends" />
            <Tab icon={<Psychology />} label="Skills Analysis" />
            <Tab icon={<Speed />} label="Activity Metrics" />
          </Tabs>
        </Box>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {tabValue === 0 && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} lg={8}>
                <CinematicChartCard
                  title="Performance Journey"
                  subtitle="Your growth trajectory over time"
                  icon={<TrendingUp />}
                  delay={1.8}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="performance"
                        stroke="#6BB6FF"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="collaboration"
                        stroke="#B794F6"
                        strokeWidth={3}
                      />
                      <Line
                        type="monotone"
                        dataKey="innovation"
                        stroke="#F6AD55"
                        strokeWidth={3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CinematicChartCard>
              </Grid>
              
              <Grid item xs={12} lg={4}>
                <CinematicChartCard
                  title="Category Distribution"
                  subtitle="Focus area breakdown"
                  icon={<Assessment />}
                  delay={2.0}
                >
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
                </CinematicChartCard>
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
              <Grid item xs={12} lg={8}>
                <CinematicChartCard
                  title="Skills Radar"
                  subtitle="Multi-dimensional skill assessment"
                  icon={<Psychology />}
                  delay={1.8}
                >
                  <ResponsiveContainer width="100%" height={400}>
                    <RadarChart data={skillsData}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                      <PolarRadiusAxis
                        domain={[0, 100]}
                        angle={90}
                        tick={{ fontSize: 10 }}
                      />
                      <Radar
                        name="Skills"
                        dataKey="score"
                        stroke="#6BB6FF"
                        fill="#6BB6FF"
                        fillOpacity={0.3}
                        strokeWidth={3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CinematicChartCard>
              </Grid>
              
              <Grid item xs={12} lg={4}>
                <CinematicChartCard
                  title="Skill Breakdown"
                  subtitle="Individual skill scores"
                  icon={<Code />}
                  delay={2.0}
                >
                  <Stack spacing={3}>
                    {skillsData.map((skill, index) => (
                      <motion.div
                        key={skill.skill}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 2.2 + index * 0.1 }}
                      >
                        <Box>
                          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                            <Typography variant="body2" fontWeight="medium">
                              {skill.skill}
                            </Typography>
                            <Typography variant="body2" fontWeight="bold" color={skill.color}>
                              {skill.score}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={skill.score}
                            sx={{
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: '#E5E7EB',
                              '& .MuiLinearProgress-bar': {
                                background: `linear-gradient(45deg, ${skill.color} 30%, ${skill.color}80 90%)`,
                                borderRadius: 4,
                              },
                            }}
                          />
                        </Box>
                      </motion.div>
                    ))}
                  </Stack>
                </CinematicChartCard>
              </Grid>
            </Grid>
          </motion.div>
        )}

        {tabValue === 2 && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <CinematicChartCard
                  title="Weekly Activity"
                  subtitle="Daily productivity metrics"
                  icon={<Speed />}
                  delay={1.8}
                >
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="commits" fill="#6BB6FF" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="reviews" fill="#B794F6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="meetings" fill="#F6AD55" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CinematicChartCard>
              </Grid>
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Analytics;