import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  deadline: string;
  assignedTo: string;
  createdAt: string;
}

interface PerformanceMetric {
  metric: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  period: string;
}

interface DashboardState {
  tasks: Task[];
  recentAchievements: any[];
  performanceMetrics: PerformanceMetric[];
  collaborationScore: number;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  tasks: [],
  recentAchievements: [],
  performanceMetrics: [],
  collaborationScore: 0,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchDashboardDataStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDashboardDataSuccess: (state, action: PayloadAction<Partial<DashboardState>>) => {
      state.loading = false;
      Object.assign(state, action.payload);
    },
    fetchDashboardDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
  },
});

export const {
  fetchDashboardDataStart,
  fetchDashboardDataSuccess,
  fetchDashboardDataFailure,
  updateTask,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
