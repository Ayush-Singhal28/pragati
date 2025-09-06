import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'task' | 'certification' | 'collaboration' | 'innovation';
  points: number;
  dateEarned: string;
  badge: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface AchievementsState {
  achievements: Achievement[];
  totalPoints: number;
  level: string;
  nextLevelPoints: number;
  loading: boolean;
  error: string | null;
}

const initialState: AchievementsState = {
  achievements: [],
  totalPoints: 0,
  level: 'Beginner',
  nextLevelPoints: 100,
  loading: false,
  error: null,
};

const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    fetchAchievementsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAchievementsSuccess: (state, action: PayloadAction<AchievementsState>) => {
      state.loading = false;
      Object.assign(state, action.payload);
    },
    fetchAchievementsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addAchievement: (state, action: PayloadAction<Achievement>) => {
      state.achievements.unshift(action.payload);
      state.totalPoints += action.payload.points;
    },
  },
});

export const {
  fetchAchievementsStart,
  fetchAchievementsSuccess,
  fetchAchievementsFailure,
  addAchievement,
} = achievementsSlice.actions;

export default achievementsSlice.reducer;
