import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  Divider,
  Stack,
  Chip,
  alpha,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Microsoft,
  Apple,
  TrendingUp,
  EmojiEvents,
  Group,
  Speed,
} from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    { icon: <TrendingUp />, title: 'Performance Tracking', description: 'Real-time insights into your work performance' },
    { icon: <EmojiEvents />, title: 'Achievement System', description: 'Gamified goals and milestone recognition' },
    { icon: <Group />, title: 'Team Collaboration', description: 'Enhanced teamwork and communication analytics' },
    { icon: <Speed />, title: 'AI-Powered Insights', description: 'Smart recommendations for career growth' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            flexWrap: { xs: 'wrap', lg: 'nowrap' },
          }}
        >
          {/* Left Side - Branding & Features */}
          <Box
            sx={{
              flex: 1,
              color: 'white',
              textAlign: { xs: 'center', lg: 'left' },
              mb: { xs: 4, lg: 0 },
            }}
          >
            <Box mb={4}>
              <Box display="flex" alignItems="center" gap={2} mb={2} justifyContent={{ xs: 'center', lg: 'flex-start' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.8rem',
                  }}
                >
                  P
                </Box>
                <Typography variant="h3" fontWeight="bold">
                  Pragati
                </Typography>
              </Box>
              <Typography variant="h5" mb={2} sx={{ opacity: 0.9 }}>
                AI-Powered Performance Platform
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 500 }}>
                Transform your career with intelligent performance tracking, personalized insights, 
                and gamified achievement systems designed for modern professionals.
              </Typography>
            </Box>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 3,
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" fontWeight="bold" mb={1}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {feature.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right Side - Login Form */}
          <Box sx={{ flex: 1, maxWidth: 480 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: '24px',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              }}
            >
              <CardContent sx={{ p: 0 }}>
                <Box textAlign="center" mb={4}>
                  <Typography variant="h4" fontWeight="bold" mb={1}>
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Sign in to your Pragati account
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="action" />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha('#2563eb', 0.2),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha('#2563eb', 0.4),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2563eb',
                        },
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 3 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: '12px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha('#2563eb', 0.2),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha('#2563eb', 0.4),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#2563eb',
                        },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #1d4ed8 0%, #6d28d9 100%)',
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)',
                        transform: 'translateY(-1px)',
                      },
                      '&:disabled': {
                        background: '#94a3b8',
                        color: 'white',
                      },
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <Box textAlign="center" mb={3}>
                    <Typography variant="body2" color="text.secondary">
                      Forgot your password?{' '}
                      <Typography
                        component="span"
                        color="primary"
                        sx={{ cursor: 'pointer', fontWeight: 'medium' }}
                      >
                        Reset it here
                      </Typography>
                    </Typography>
                  </Box>

                  <Divider sx={{ mb: 3 }}>
                    <Chip label="Or continue with" size="small" />
                  </Divider>

                  <Stack direction="row" spacing={2} mb={3}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Google />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: alpha('#2563eb', 0.2),
                        color: '#64748b',
                        '&:hover': {
                          borderColor: '#2563eb',
                          backgroundColor: alpha('#2563eb', 0.05),
                        },
                      }}
                    >
                      Google
                    </Button>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Microsoft />}
                      sx={{
                        py: 1.5,
                        borderRadius: '12px',
                        textTransform: 'none',
                        fontWeight: 600,
                        borderColor: alpha('#2563eb', 0.2),
                        color: '#64748b',
                        '&:hover': {
                          borderColor: '#2563eb',
                          backgroundColor: alpha('#2563eb', 0.05),
                        },
                      }}
                    >
                      Microsoft
                    </Button>
                  </Stack>

                  <Box textAlign="center">
                    <Typography variant="body2" color="text.secondary">
                      Don't have an account?{' '}
                      <Typography
                        component="span"
                        color="primary"
                        sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        Sign up for free
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Demo Credentials */}
            <Box
              sx={{
                mt: 3,
                p: 2,
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                textAlign: 'center',
              }}
            >
              <Typography variant="caption" color="white" display="block" mb={1}>
                Demo Credentials
              </Typography>
              <Typography variant="body2" color="white" sx={{ opacity: 0.9 }}>
                Email: demo@pragati.com • Password: demo123
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
