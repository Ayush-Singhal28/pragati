import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DashboardMetrics {
  performanceScore: number;
  tasksCompleted: number;
  achievementPoints: number;
  collaborationScore: number;
}

interface DashboardState {
  metrics: DashboardMetrics;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  metrics: {
    performanceScore: 98,
    tasksCompleted: 24,
    achievementPoints: 1250,
    collaborationScore: 91,
  },
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<DashboardMetrics>) => {
      state.metrics = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setMetrics, setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;