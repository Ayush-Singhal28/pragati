import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, #6BB6FF 0%, #B794F6 50%, #F6AD55 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
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
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src="/pragati-logo.svg" 
          alt="Pragati Logo" 
          style={{ 
            width: 120, 
            height: 120,
            filter: 'brightness(0) invert(1)',
            marginBottom: 24,
          }}
        />
      </motion.div>
      
      {/* Brand Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Typography 
          variant="h3" 
          fontWeight="bold" 
          sx={{ 
            color: 'white',
            textAlign: 'center',
            mb: 1,
          }}
        >
          Pragati
        </Typography>
        
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            textAlign: 'center',
            letterSpacing: '0.1em',
            mb: 4,
          }}
        >
          Track. Grow. Rise.
        </Typography>
      </motion.div>

      {/* Loading Spinner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <CircularProgress 
          size={40} 
          sx={{ 
            color: 'rgba(255,255,255,0.8)',
          }} 
        />
      </motion.div>
    </Box>
  );
};

export default LoadingScreen;
