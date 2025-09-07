import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Badge,
  Paper,
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  WorkspacePremium,
  Psychology,
  TrendingUp,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { motion } from 'framer-motion';

const categoryStats = [
  { category: 'Technical', count: 8, total: 12, color: '#1976d2' },
  { category: 'Collaboration', count: 5, total: 8, color: '#388e3c' },
  { category: 'Innovation', count: 3, total: 6, color: '#f57c00' },
  { category: 'Leadership', count: 2, total: 5, color: '#7b1fa2' },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case 'bronze': return '#cd7f32';
    case 'silver': return '#c0c0c0';
    case 'gold': return '#ffd700';
    case 'platinum': return '#e5e4e2';
    default: return '#c0c0c0';
  }
};

const getLevelIcon = (level: string) => {
  switch (level) {
    case 'bronze': return <WorkspacePremium sx={{ color: '#cd7f32' }} />;
    case 'silver': return <WorkspacePremium sx={{ color: '#c0c0c0' }} />;
    case 'gold': return <WorkspacePremium sx={{ color: '#ffd700' }} />;
    case 'platinum': return <WorkspacePremium sx={{ color: '#e5e4e2' }} />;
    default: return <Star />;
  }
};

const Achievements: React.FC = () => {
  const { achievements, totalPoints } = useSelector((state: RootState) => state.achievements);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
          Achievements 🏆
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your accomplishments and celebrate your progress
        </Typography>
      </Box>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      backgroundColor: '#ed6c0215',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <EmojiEvents sx={{ color: '#ed6c02', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#ed6c02' }}>
                      {achievements.length}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      Total Achievements
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      backgroundColor: '#1976d215',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Star sx={{ color: '#1976d2', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#1976d2' }}>
                      {totalPoints.toLocaleString()}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      Total Points
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 3,
                      backgroundColor: '#9c27b015',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 2,
                    }}
                  >
                    <Psychology sx={{ color: '#9c27b0', fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: '#9c27b0' }}>
                      Expert
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontWeight: 500 }}>
                      Current Level
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Category Progress */}
        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Category Progress
                </Typography>
                {categoryStats.map((stat, index) => (
                  <motion.div
                    key={stat.category}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {stat.category}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stat.count}/{stat.total}
                        </Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={(stat.count / stat.total) * 100}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: 'grey.200',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: stat.color,
                            borderRadius: 4,
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

        {/* Achievements List */}
        <Grid item xs={12} md={8}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                  Recent Achievements
                </Typography>
                <List>
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <ListItem sx={{ mb: 1, px: 0 }}>
                        <ListItemAvatar>
                          <Badge
                            badgeContent={achievement.badge}
                            anchorOrigin={{
                              vertical: 'bottom',
                              horizontal: 'right',
                            }}
                            sx={{
                              '& .MuiBadge-badge': {
                                fontSize: '1rem',
                                minWidth: '24px',
                                height: '24px',
                              },
                            }}
                          >
                            <Avatar 
                              sx={{ 
                                bgcolor: getLevelColor(achievement.level),
                                width: 50,
                                height: 50,
                              }}
                            >
                              {getLevelIcon(achievement.level)}
                            </Avatar>
                          </Badge>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {achievement.title}
                              </Typography>
                              <Chip
                                label={achievement.level}
                                size="small"
                                sx={{
                                  backgroundColor: getLevelColor(achievement.level),
                                  color: 'white',
                                  fontWeight: 'bold',
                                  fontSize: '0.75rem',
                                }}
                              />
                              <Chip
                                label={`+${achievement.points} pts`}
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ fontSize: '0.75rem' }}
                              />
                            </Box>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                {achievement.description}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                              </Typography>
                            </Box>
                          }
                        />
                      </ListItem>
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

export default Achievements;