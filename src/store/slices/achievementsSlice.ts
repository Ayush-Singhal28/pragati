import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  points: number;
  dateEarned: string;
  badge: string;
}

interface AchievementsState {
  achievements: Achievement[];
  totalPoints: number;
  loading: boolean;
  error: string | null;
}

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Code Quality Champion',
    description: 'Maintained 95%+ code quality score for 3 consecutive months',
    category: 'technical',
    level: 'gold',
    points: 100,
    dateEarned: '2024-01-15',
    badge: '🏆',
  },
  {
    id: '2',
    title: 'Team Collaborator',
    description: 'Helped 10+ team members with their tasks',
    category: 'collaboration',
    level: 'silver',
    points: 75,
    dateEarned: '2024-01-10',
    badge: '🤝',
  },
  {
    id: '3',
    title: 'Innovation Leader',
    description: 'Proposed and implemented 3 new features',
    category: 'innovation',
    level: 'platinum',
    points: 150,
    dateEarned: '2023-12-28',
    badge: '💡',
  },
];

const initialState: AchievementsState = {
  achievements: mockAchievements,
  totalPoints: mockAchievements.reduce((sum, a) => sum + a.points, 0),
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    setAchievements: (state, action: PayloadAction<Achievement[]>) => {
      state.achievements = action.payload;
      state.totalPoints = action.payload.reduce((sum, a) => sum + a.points, 0);
    },
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.unshift(action.payload);
      state.totalPoints += action.payload.points;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAchievements, addAchievement, setLoading, setError } = achievementsSlice.actions;
export default achievementsSlice.reducer;