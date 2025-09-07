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
import { motion, AnimatePresence } from 'framer-motion';

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

// Cinematic Achievement Card Component
const CinematicAchievementCard = ({ achievement, index }: any) => {
  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '0 0 30px #FFD700, 0 0 60px #FFD700, 0 0 90px #FFD700';
      case 'epic': return '0 0 20px #7C3AED, 0 0 40px #7C3AED';
      case 'rare': return '0 0 15px #F59E0B, 0 0 30px #F59E0B';
      default: return '0 0 10px #6B7280';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
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
      <Card
        sx={{
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          background: achievement.progress === 100 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.5) 100%)',
          backdropFilter: 'blur(15px)',
          border: `2px solid ${achievement.color}30`,
          boxShadow: achievement.progress === 100 
            ? `${getRarityGlow(achievement.rarity)}, 0 15px 35px rgba(0,0,0,0.1)`
            : '0 10px 25px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: `${getRarityGlow(achievement.rarity)}, 0 25px 50px rgba(0,0,0,0.15)`,
            transform: 'translateY(-5px)',
          },
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: achievement.progress === 100 ? 1 : 0.7,
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
            background: `linear-gradient(135deg, ${achievement.color}15 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />
        
        {/* Rarity Indicator */}
        {achievement.progress === 100 && (
          <Box
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 2,
            }}
          >
            <Chip
              label={achievement.rarity.toUpperCase()}
              size="small"
              sx={{
                background: `linear-gradient(45deg, ${achievement.color} 30%, ${achievement.color}80 90%)`,
                color: 'white',
                fontWeight: 'bold',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                boxShadow: `0 4px 12px ${achievement.color}40`,
              }}
            />
          </Box>
        )}
        
        <CardContent sx={{ position: 'relative', zIndex: 1, p: 3 }}>
          {/* Icon and Points */}
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Box
              sx={{
                fontSize: '3rem',
                filter: achievement.progress === 100 
                  ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
                  : 'grayscale(50%)',
                animation: achievement.progress === 100 
                  ? 'pulse 2s ease-in-out infinite'
                  : 'none',
                '@keyframes pulse': {
                  '0%, 100%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.1)' },
                },
              }}
            >
              {achievement.icon}
            </Box>
            <Typography
              variant="h6"
              sx={{
                color: achievement.color,
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              +{achievement.points}
            </Typography>
          </Box>
          
          {/* Title and Description */}
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            gutterBottom
            sx={{
              background: achievement.progress === 100
                ? `linear-gradient(45deg, ${achievement.color} 30%, ${achievement.color}80 90%)`
                : 'linear-gradient(45deg, #6B7280 30%, #9CA3AF 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            {achievement.title}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ mb: 2, minHeight: '2.5em' }}
          >
            {achievement.description}
          </Typography>
          
          {/* Progress */}
          <Box sx={{ mb: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="caption" color="text.secondary">
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
                backgroundColor: '#E5E7EB',
                '& .MuiLinearProgress-bar': {
                  background: `linear-gradient(45deg, ${achievement.color} 30%, ${achievement.color}80 90%)`,
                  borderRadius: 4,
                  boxShadow: achievement.progress === 100 
                    ? `0 2px 8px ${achievement.color}40`
                    : 'none',
                },
              }}
            />
          </Box>
          
          {/* Unlock Status */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="caption" color="text.secondary">
              {achievement.unlockedDate || 'In Progress'}
            </Typography>
            <Chip
              label={achievement.category}
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: achievement.color,
                color: achievement.color,
                fontSize: '0.7rem',
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Achievements: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Filter achievements based on selected filter
  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    if (filter === 'unlocked') return achievement.progress === 100;
    if (filter === 'locked') return achievement.progress < 100;
    return achievement.category.toLowerCase() === filter.toLowerCase();
  });

  // Sort achievements
  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    switch (sortBy) {
      case 'points':
        return b.points - a.points;
      case 'progress':
        return b.progress - a.progress;
      case 'recent':
      default:
        return new Date(b.unlockedDate || '1970-01-01').getTime() - 
               new Date(a.unlockedDate || '1970-01-01').getTime();
    }
  });

  const totalPoints = achievements
    .filter(a => a.progress === 100)
    .reduce((sum, a) => sum + a.points, 0);
  
  const completedAchievements = achievements.filter(a => a.progress === 100).length;
  const totalAchievements = achievements.length;

  return (
    <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh' }}>
      {/* Cinematic Header - Hall of Fame */}
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
            background: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 50%, #7C3AED 100%)',
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
          
          {/* Trophy Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ctext x='50' y='50' text-anchor='middle' dy='0.3em' font-size='30'%3E🏆%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: 'parallaxDrift 40s linear infinite',
              '@keyframes parallaxDrift': {
                '0%': { transform: 'translateX(0px) translateY(0px)' },
                '100%': { transform: 'translateX(-100px) translateY(-100px)' },
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
                HALL OF LEGENDS
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
                  🏆
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
                    Your Achievements
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
                    {completedAchievements}/{totalAchievements} Unlocked • {totalPoints} Points
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
                "Each achievement tells a story of dedication, growth, and triumph. Your journey continues..."
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7, display: 'block' }}>
                mosAIc: AI in action with The Product Folks 🚀
              </Typography>
            </motion.div>
          </Box>
        </Box>
      </motion.div>

      {/* Filter and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box display="flex" gap={2} alignItems="center">
            <FilterList color="action" />
            <ButtonGroup variant="outlined" size="small">
              <Button 
                onClick={() => setFilter('all')}
                variant={filter === 'all' ? 'contained' : 'outlined'}
              >
                All
              </Button>
              <Button 
                onClick={() => setFilter('unlocked')}
                variant={filter === 'unlocked' ? 'contained' : 'outlined'}
              >
                Unlocked
              </Button>
              <Button 
                onClick={() => setFilter('locked')}
                variant={filter === 'locked' ? 'contained' : 'outlined'}
              >
                Locked
              </Button>
            </ButtonGroup>
          </Box>
          
          <Box display="flex" gap={2} alignItems="center">
            <Sort color="action" />
            <ButtonGroup variant="outlined" size="small">
              <Button 
                onClick={() => setSortBy('recent')}
                variant={sortBy === 'recent' ? 'contained' : 'outlined'}
              >
                Recent
              </Button>
              <Button 
                onClick={() => setSortBy('points')}
                variant={sortBy === 'points' ? 'contained' : 'outlined'}
              >
                Points
              </Button>
              <Button 
                onClick={() => setSortBy('progress')}
                variant={sortBy === 'progress' ? 'contained' : 'outlined'}
              >
                Progress
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </motion.div>

      {/* Achievements Grid */}
      <AnimatePresence>
        <Grid container spacing={3}>
          {sortedAchievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <CinematicAchievementCard achievement={achievement} index={index} />
            </Grid>
          ))}
        </Grid>
      </AnimatePresence>
    </Box>
  );
};

export default Achievements;
