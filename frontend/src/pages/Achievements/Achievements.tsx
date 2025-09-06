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
} from '@mui/material';
import {
  EmojiEvents,
  Star,
  WorkspacePremium,
  Psychology,
  Group,
} from '@mui/icons-material';

// Mock achievements data
const achievements = [
  {
    id: 1,
    title: 'Code Quality Champion',
    description: 'Maintained 95%+ code quality score for 3 consecutive months',
    category: 'technical',
    level: 'gold',
    points: 100,
    dateEarned: '2024-08-15',
    badge: '🏆',
  },
  {
    id: 2,
    title: 'Team Collaborator',
    description: 'Helped 10+ team members with their tasks',
    category: 'collaboration',
    level: 'silver',
    points: 75,
    dateEarned: '2024-08-10',
    badge: '🤝',
  },
  {
    id: 3,
    title: 'Innovation Leader',
    description: 'Proposed and implemented 3 new features',
    category: 'innovation',
    level: 'platinum',
    points: 150,
    dateEarned: '2024-07-28',
    badge: '💡',
  },
  {
    id: 4,
    title: 'Bug Hunter',
    description: 'Found and fixed 20+ critical bugs',
    category: 'technical',
    level: 'bronze',
    points: 50,
    dateEarned: '2024-07-15',
    badge: '🐛',
  },
];

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
  const totalPoints = achievements.reduce((sum, achievement) => sum + achievement.points, 0);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Achievements
      </Typography>

      {/* Summary Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiEvents color="warning" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{achievements.length}</Typography>
                  <Typography color="textSecondary">Total Achievements</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Star color="primary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">{totalPoints}</Typography>
                  <Typography color="textSecondary">Total Points</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Psychology color="secondary" sx={{ mr: 2, fontSize: 40 }} />
                <Box>
                  <Typography variant="h4">Expert</Typography>
                  <Typography color="textSecondary">Current Level</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Category Progress */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Progress
              </Typography>
              {categoryStats.map((stat) => (
                <Box key={stat.category} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">{stat.category}</Typography>
                    <Typography variant="body2">
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
                      },
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Achievements List */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Achievements
              </Typography>
              <List>
                {achievements.map((achievement) => (
                  <ListItem key={achievement.id} sx={{ mb: 1 }}>
                    <ListItemAvatar>
                      <Badge
                        badgeContent={achievement.badge}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                      >
                        <Avatar sx={{ bgcolor: getLevelColor(achievement.level) }}>
                          {getLevelIcon(achievement.level)}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="subtitle1">
                            {achievement.title}
                          </Typography>
                          <Chip
                            label={achievement.level}
                            size="small"
                            sx={{
                              backgroundColor: getLevelColor(achievement.level),
                              color: 'white',
                              fontWeight: 'bold',
                            }}
                          />
                          <Chip
                            label={`+${achievement.points} pts`}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {achievement.description}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
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

export default Achievements;
