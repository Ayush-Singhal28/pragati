import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsData {
  skillsData: Array<{ skill: string; score: number }>;
  performanceTrends: Array<{ month: string; performance: number; collaboration: number; innovation: number }>;
  strengths: string[];
  improvementAreas: string[];
  recommendations: Array<{ title: string; description: string; priority: string }>;
}

interface AnalyticsState extends AnalyticsData {
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  skillsData: [
    { skill: 'Technical Skills', score: 92 },
    { skill: 'Communication', score: 88 },
    { skill: 'Leadership', score: 76 },
    { skill: 'Problem Solving', score: 94 },
    { skill: 'Collaboration', score: 90 },
    { skill: 'Innovation', score: 85 },
  ],
  performanceTrends: [
    { month: 'Aug', performance: 85, collaboration: 80, innovation: 75 },
    { month: 'Sep', performance: 87, collaboration: 82, innovation: 78 },
    { month: 'Oct', performance: 89, collaboration: 85, innovation: 80 },
    { month: 'Nov', performance: 92, collaboration: 88, innovation: 85 },
    { month: 'Dec', performance: 95, collaboration: 90, innovation: 88 },
    { month: 'Jan', performance: 98, collaboration: 92, innovation: 90 },
  ],
  strengths: [
    'Code Quality & Best Practices',
    'Problem-Solving Skills',
    'Technical Documentation',
    'Team Collaboration',
    'Meeting Deadlines',
  ],
  improvementAreas: [
    'Public Speaking & Presentations',
    'Project Management Skills',
    'Mentoring Junior Developers',
    'Cross-team Communication',
  ],
  recommendations: [
    {
      title: 'Consider Leadership Training',
      description: 'Your collaboration scores suggest leadership potential. Consider enrolling in leadership development programs.',
      priority: 'high',
    },
    {
      title: 'Expand Technical Skills',
      description: 'Explore cloud technologies and DevOps practices to enhance your technical profile.',
      priority: 'medium',
    },
    {
      title: 'Presentation Skills Workshop',
      description: 'Improving presentation skills would complement your strong technical abilities.',
      priority: 'low',
    },
  ],
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setAnalyticsData: (state, action: PayloadAction<Partial<AnalyticsData>>) => {
      Object.assign(state, action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAnalyticsData, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;