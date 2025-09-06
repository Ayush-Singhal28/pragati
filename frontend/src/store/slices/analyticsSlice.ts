import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CollaborationData {
  responseTime: number;
  helpfulness: number;
  communication: number;
  teamwork: number;
}

interface PerformanceTrend {
  date: string;
  score: number;
  category: string;
}

interface AnalyticsState {
  collaborationData: CollaborationData;
  performanceTrends: PerformanceTrend[];
  strengths: string[];
  improvementAreas: string[];
  recommendations: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  collaborationData: {
    responseTime: 0,
    helpfulness: 0,
    communication: 0,
    teamwork: 0,
  },
  performanceTrends: [],
  strengths: [],
  improvementAreas: [],
  recommendations: [],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    fetchAnalyticsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAnalyticsSuccess: (state, action: PayloadAction<Partial<AnalyticsState>>) => {
      state.loading = false;
      Object.assign(state, action.payload);
    },
    fetchAnalyticsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
