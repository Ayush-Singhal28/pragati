import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Avatar,
  Button,
  ButtonGroup,
  Stack,
  Paper,
  IconButton,
  Tooltip,
  Badge,
  Divider,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  TrendingUp,
  Code,
  Group,
  Psychology,
  Speed,
  Security,
  School,
  Visibility,
  Share,
  Lock,
  FilterList,
  Sort,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const achievements = [
  {
    id: 1,
    title: 'Code Quality Champion',
    description: 'Maintained 95%+ code quality score for 30 consecutive days',
    category: 'Technical',
    icon: '🏆',
    rarity: 'legendary',
    points: 500,
    progress: 100,
    unlockedDate: '2 days ago',
    requirements: 'Code quality > 95% for 30 days',
    color: '#FFD700',
    borderColor: '#FF6B35',
  },
  {
    id: 2,
    title: 'Team Player',
    description: 'Helped 10+ team members with code reviews and mentoring',
    category: 'Collaboration',
    icon: '🤝',
    rarity: 'epic',
    points: 300,
    progress: 100,
    unlockedDate: '1 week ago',
    requirements: 'Help 10 team members',
    color: '#7C3AED',
    borderColor: '#3B82F6',
  },
  {
    id: 3,
    title: 'Innovation Leader',
    description: 'Proposed and implemented 5 process improvements',
    category: 'Innovation',
    icon: '💡',
    rarity: 'epic',
    points: 400,
    progress: 100,
    unlockedDate: '2 weeks ago',
    requirements: 'Implement 5 improvements',
    color: '#059669',
    borderColor: '#10B981',
  },
  {
    id: 4,
    title: 'Speed Demon',
    description: 'Complete tasks 20% faster than average for 2 weeks',
    category: 'Performance',
    icon: '⚡',
    rarity: 'rare',
    points: 200,
    progress: 85,
    unlockedDate: null,
    requirements: '20% faster completion for 2 weeks',
    color: '#F59E0B',
    borderColor: '#EAB308',
  },
  {
    id: 5,
    title: 'Bug Hunter',
    description: 'Find and fix 50 bugs across different projects',
    category: 'Technical',
    icon: '🐛',
    rarity: 'rare',
    points: 250,
    progress: 76,
    unlockedDate: null,
    requirements: 'Fix 50 bugs (38/50)',
    color: '#DC2626',
    borderColor: '#EF4444',
  },
  {
    id: 6,
    title: 'Mentor Master',
    description: 'Successfully mentor 3 junior developers to promotion',
    category: 'Leadership',
    icon: '👨‍🏫',
    rarity: 'legendary',
    points: 600,
    progress: 33,
    unlockedDate: null,
    requirements: 'Mentor 3 developers (1/3)',
    color: '#8B5CF6',
    borderColor: '#A855F7',
  },
];

const categories = ['All', 'Technical', 'Collaboration', 'Innovation', 'Performance', 'Leadership'];
const rarities = ['All', 'Common', 'Rare', 'Epic', 'Legendary'];

const rarityColors = {
  common: '#6B7280',
  rare: '#3B82F6',
  epic: '#7C3AED',
  legendary: '#F59E0B',
};

const AchievementCard = ({ achievement, index }: any) => {
  const isUnlocked = achievement.progress === 100;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          background: isUnlocked 
            ? `linear-gradient(135deg, ${achievement.color}15 0%, ${achievement.borderColor}08 100%)`
            : '#f8fafc',
          border: isUnlocked 
            ? `2px solid ${achievement.borderColor}` 
            : '1px solid #e2e8f0',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isUnlocked 
              ? `0 20px 25px -5px ${achievement.color}20, 0 8px 10px -6px ${achievement.color}10`
              : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          },
          transition: 'all 0.3s ease-in-out',
          opacity: isUnlocked ? 1 : 0.7,
        }}
      >
        {isUnlocked && (
          <Box
            sx={{
              position: 'absolute',
              top: -1,
              right: -1,
              width: 0,
              height: 0,
              borderStyle: 'solid',
              borderWidth: '0 24px 24px 0',
              borderColor: `transparent ${achievement.borderColor} transparent transparent`,
            }}
          />
        )}
        
        <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
            <Box display="flex" alignItems="center" gap={2}>
              <Box
                sx={{
                  fontSize: '2rem',
                  filter: isUnlocked ? 'none' : 'grayscale(100%)',
                }}
              >
                {achievement.icon}
              </Box>
              <Box>
                <Typography variant="h6" fontWeight="bold" mb={0.5}>
                  {achievement.title}
                </Typography>
                <Box display="flex" gap={1} alignItems="center">
                  <Chip
                    label={achievement.category}
                    size="small"
                    sx={{
                      backgroundColor: `${achievement.color}20`,
                      color: achievement.color,
                      fontSize: '0.75rem',
                    }}
                  />
                  <Chip
                    label={achievement.rarity}
                    size="small"
                    sx={{
                      backgroundColor: `${rarityColors[achievement.rarity as keyof typeof rarityColors]}20`,
                      color: rarityColors[achievement.rarity as keyof typeof rarityColors],
                      fontSize: '0.75rem',
                      textTransform: 'capitalize',
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box display="flex" gap={0.5}>
              <Tooltip title="Share achievement">
                <IconButton size="small" disabled={!isUnlocked}>
                  <Share fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title={isUnlocked ? "View details" : "Locked"}>
                <IconButton size="small">
                  {isUnlocked ? <Visibility fontSize="small" /> : <Lock fontSize="small" />}
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Typography variant="body2" color="text.secondary" mb={2} flex={1}>
            {achievement.description}
          </Typography>

          <Box mb={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" fontWeight="medium">
                Progress
              </Typography>
              <Typography variant="caption" fontWeight="bold">
                {achievement.progress}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={achievement.progress}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: '#e2e8f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: achievement.color,
                  borderRadius: 4,
                },
              }}
            />
            <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
              {achievement.requirements}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center" gap={1}>
              <Star sx={{ fontSize: 16, color: '#F59E0B' }} />
              <Typography variant="body2" fontWeight="bold">
                {achievement.points} pts
              </Typography>
            </Box>
            {isUnlocked && (
              <Typography variant="caption" color="success.main" fontWeight="medium">
                Unlocked {achievement.unlockedDate}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Achievements() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRarity, setSelectedRarity] = useState('All');

  const filteredAchievements = achievements.filter(achievement => {
    const categoryMatch = selectedCategory === 'All' || achievement.category === selectedCategory;
    const rarityMatch = selectedRarity === 'All' || achievement.rarity === selectedRarity.toLowerCase();
    return categoryMatch && rarityMatch;
  });

  const unlockedCount = achievements.filter(a => a.progress === 100).length;
  const totalPoints = achievements.filter(a => a.progress === 100).reduce((sum, a) => sum + a.points, 0);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Achievements 🏆
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Track your milestones and unlock new badges as you grow in your career.
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #2563eb15 0%, #7c3aed08 100%)', border: '1px solid #e2e8f0' }}>
              <Typography variant="h3" fontWeight="bold" color="primary.main">
                {unlockedCount}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Achievements Unlocked
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #059669015 0%, #10b98108 100%)', border: '1px solid #e2e8f0' }}>
              <Typography variant="h3" fontWeight="bold" color="success.main">
                {totalPoints}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Points Earned
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper sx={{ p: 3, textAlign: 'center', background: 'linear-gradient(135deg, #f59e0b15 0%, #eab30808 100%)', border: '1px solid #e2e8f0' }}>
              <Typography variant="h3" fontWeight="bold" color="warning.main">
                {Math.round((unlockedCount / achievements.length) * 100)}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Completion Rate
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Filters */}
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h6" fontWeight="bold">
            Your Achievements
          </Typography>
          <Box display="flex" gap={1}>
            <Button variant="outlined" startIcon={<FilterList />} size="small">
              Filters
            </Button>
            <Button variant="outlined" startIcon={<Sort />} size="small">
              Sort
            </Button>
          </Box>
        </Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={3}>
          <Box>
            <Typography variant="subtitle2" fontWeight="medium" mb={1}>
              Category
            </Typography>
            <ButtonGroup variant="outlined" size="small">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCategory(category)}
                  sx={{ textTransform: 'none' }}
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight="medium" mb={1}>
              Rarity
            </Typography>
            <ButtonGroup variant="outlined" size="small">
              {rarities.map((rarity) => (
                <Button
                  key={rarity}
                  variant={selectedRarity === rarity ? 'contained' : 'outlined'}
                  onClick={() => setSelectedRarity(rarity)}
                  sx={{ textTransform: 'none' }}
                >
                  {rarity}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </Stack>
      </Box>

      {/* Achievements Grid */}
      <Grid container spacing={3}>
        {filteredAchievements.map((achievement, index) => (
          <Grid item xs={12} md={6} lg={4} key={achievement.id}>
            <AchievementCard achievement={achievement} index={index} />
          </Grid>
        ))}
      </Grid>

      {filteredAchievements.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary" mb={2}>
            No achievements found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters to see more achievements.
          </Typography>
        </Box>
      )}

      {/* Progress Section */}
      <Box mt={6}>
        <Paper sx={{ p: 4, background: 'linear-gradient(135deg, #667eea15 0%, #764ba208 100%)', border: '1px solid #e2e8f0' }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Keep Going! 🚀
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            You're making great progress. Here are some achievements you're close to unlocking:
          </Typography>
          <Stack spacing={2}>
            {achievements
              .filter(a => a.progress < 100 && a.progress > 50)
              .slice(0, 3)
              .map((achievement) => (
                <Box key={achievement.id} display="flex" alignItems="center" gap={2}>
                  <Box sx={{ fontSize: '1.5rem', filter: 'grayscale(100%)' }}>
                    {achievement.icon}
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2" fontWeight="medium">
                      {achievement.title}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={achievement.progress}
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: '#e2e8f0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: achievement.color,
                        },
                      }}
                    />
                  </Box>
                  <Typography variant="caption" fontWeight="bold">
                    {achievement.progress}%
                  </Typography>
                </Box>
              ))}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
}
