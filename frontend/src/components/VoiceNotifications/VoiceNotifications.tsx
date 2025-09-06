import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  VolumeUp,
  Download,
  PlayArrow,
  Stop,
} from '@mui/icons-material';
import axios from 'axios';

interface VoiceNotificationsProps {
  achievementTitle?: string;
  achievementPoints?: number;
}

const VoiceNotifications: React.FC<VoiceNotificationsProps> = ({
  achievementTitle,
  achievementPoints,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const generateSpeech = async (type: 'achievement' | 'performance' | 'custom', text?: string) => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';
      let payload = {};

      switch (type) {
        case 'achievement':
          endpoint = '/api/v1/voice/achievement-notification';
          payload = {
            achievement_title: achievementTitle,
            points: achievementPoints,
          };
          break;
        case 'performance':
          endpoint = '/api/v1/voice/performance-summary';
          break;
        case 'custom':
          endpoint = '/api/v1/voice/text-to-speech';
          payload = { text };
          break;
      }

      const response = await axios.post(endpoint, payload, {
        responseType: 'blob',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to generate speech');
    } finally {
      setLoading(false);
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      
      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const link = document.createElement('a');
      link.href = audioUrl;
      link.download = 'pragati-notification.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <VolumeUp sx={{ mr: 1 }} />
          <Typography variant="h6">Voice Notifications</Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          {achievementTitle && (
            <Button
              variant="outlined"
              onClick={() => generateSpeech('achievement')}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : <VolumeUp />}
            >
              Achievement Alert
            </Button>
          )}

          <Button
            variant="outlined"
            onClick={() => generateSpeech('performance')}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <VolumeUp />}
          >
            Performance Summary
          </Button>

          <Button
            variant="outlined"
            onClick={() => {
              const customText = prompt('Enter text to convert to speech:');
              if (customText) {
                generateSpeech('custom', customText);
              }
            }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={16} /> : <VolumeUp />}
          >
            Custom Text
          </Button>
        </Box>

        {audioUrl && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            <IconButton
              onClick={playAudio}
              disabled={isPlaying}
              color="primary"
            >
              {isPlaying ? <Stop /> : <PlayArrow />}
            </IconButton>

            <IconButton
              onClick={downloadAudio}
              color="secondary"
            >
              <Download />
            </IconButton>

            <Typography variant="body2" color="textSecondary">
              Audio ready to play or download
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceNotifications;
