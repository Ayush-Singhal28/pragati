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
  IconButton,
  InputAdornment,
  Divider,
  Stack,
  Chip,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Microsoft,
  TrendingUp,
  EmojiEvents,
  Group,
  Speed,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
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
        background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 50%, #F6AD55 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Cinematic Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)',
          animation: 'cinematicPulse 8s ease-in-out infinite',
          '@keyframes cinematicPulse': {
            '0%, 100%': { opacity: 0.8 },
            '50%': { opacity: 1 },
          },
        }}
      />
      
      {/* Floating Particles */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='60' cy='60' r='3'/%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3Ccircle cx='100' cy='40' r='2'/%3E%3Ccircle cx='40' cy='100' r='2'/%3E%3Ccircle cx='80' cy='80' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'float 20s linear infinite',
          '@keyframes float': {
            '0%': { transform: 'translateY(0px) translateX(0px)' },
            '100%': { transform: 'translateY(-120px) translateX(-120px)' },
          },
        }}
      />
      
      <Container maxWidth="lg">
        {/* Cinematic Main Card */}
        <Card
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ 
            duration: 1.2, 
            ease: "easeOut",
            type: "spring",
            stiffness: 80,
            damping: 15
          }}
          sx={{
            borderRadius: 6,
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.2)',
            backdropFilter: 'blur(25px)',
            background: 'rgba(255,255,255,0.95)',
            border: '1px solid rgba(255,255,255,0.3)',
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', minHeight: 700 }}>
            {/* Left Side - Branding */}
            <Box
              sx={{
                flex: 1,
                background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 50%, #F6AD55 100%)',
                display: { xs: 'none', md: 'flex' },
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
                color: 'white',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background Pattern */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box sx={{ mb: 4, zIndex: 1 }}>
                  <img 
                    src="/pragati-logo.svg" 
                    alt="Pragati Logo" 
                    style={{ 
                      width: 140, 
                      height: 140, 
                      filter: 'brightness(0) invert(1) drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
                    }}
                  />
                </Box>
              </motion.div>
              
              {/* Brand Text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Typography 
                  variant="h2" 
                  fontWeight="bold" 
                  sx={{ 
                    mb: 2, 
                    textAlign: 'center',
                    background: 'linear-gradient(45deg, #ffffff, #f0f8ff)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                  }}
                >
                  Pragati
                </Typography>
                
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 2, 
                    textAlign: 'center',
                    opacity: 0.95,
                    letterSpacing: '0.15em',
                    fontWeight: 300,
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                  }}
                >
                  Track. Grow. Rise.
                </Typography>
                
                <Typography 
                  variant="caption" 
                  sx={{ 
                    mb: 6, 
                    textAlign: 'center',
                    opacity: 0.8,
                    display: 'block',
                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                  }}
                >
                  mosAIc: AI in action with The Product Folks 🚀
                </Typography>
              </motion.div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Stack spacing={3} sx={{ width: '100%', maxWidth: 400 }}>
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            minWidth: 48,
                            height: 48,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box>
                          <Typography variant="h6" fontWeight="600">
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Box>

            {/* Right Side - Login Form */}
            <Box
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: { xs: 4, md: 6 },
                background: 'rgba(255,255,255,0.95)',
              }}
            >
              {/* Mobile Logo */}
              <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mb: 4 }}>
                <img 
                  src="/pragati-logo.svg" 
                  alt="Pragati Logo" 
                  style={{ width: 80, height: 80 }}
                />
              </Box>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  Welcome Back
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                  Sign in to continue your performance journey
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Email"
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
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    sx={{ mb: 4 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePasswordVisibility} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{
                      mb: 3,
                      py: 1.5,
                      background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 50%, #F6AD55 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #5AA5EF 0%, #A684E6 50%, #E59C45 100%)',
                      },
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>

                  <Divider sx={{ mb: 3 }}>
                    <Chip label="or continue with" />
                  </Divider>

                  <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Google />}
                      sx={{ py: 1.5 }}
                    >
                      Google
                    </Button>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={<Microsoft />}
                      sx={{ py: 1.5 }}
                    >
                      Microsoft
                    </Button>
                  </Stack>

                  <Typography variant="body2" color="text.secondary" textAlign="center">
                    Don't have an account?{' '}
                    <Button variant="text" sx={{ textTransform: 'none' }}>
                      Sign up for free
                    </Button>
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
