import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from transformers import pipeline
import pickle
from typing import Dict, List, Any

class CollaborationAnalyzer:
    """ML model for analyzing collaboration patterns from Slack data"""
    
    def __init__(self):
        self.sentiment_analyzer = pipeline("sentiment-analysis", 
                                         model="cardiffnlp/twitter-roberta-base-sentiment-latest")
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
    
    def analyze_message_sentiment(self, message: str) -> float:
        """Analyze sentiment of a message"""
        try:
            result = self.sentiment_analyzer(message)[0]
            # Convert to numerical score (-1 to 1)
            if result['label'] == 'POSITIVE':
                return result['score']
            elif result['label'] == 'NEGATIVE':
                return -result['score']
            else:  # NEUTRAL
                return 0.0
        except:
            return 0.0
    
    def extract_features(self, slack_data: List[Dict]) -> np.ndarray:
        """Extract features from Slack activity data"""
        features = []
        
        for activity in slack_data:
            feature_vector = [
                len(activity.get('message_text', '')),  # Message length
                activity.get('response_time', 0),  # Response time
                self.analyze_message_sentiment(activity.get('message_text', '')),  # Sentiment
                len(activity.get('message_text', '').split()),  # Word count
                activity.get('message_text', '').count('?'),  # Questions asked
                activity.get('message_text', '').count('!'),  # Exclamations
            ]
            features.append(feature_vector)
        
        return np.array(features)
    
    def calculate_collaboration_score(self, features: np.ndarray) -> Dict[str, float]:
        """Calculate collaboration metrics"""
        if len(features) == 0:
            return {
                'response_time': 50.0,
                'helpfulness': 50.0,
                'communication': 50.0,
                'teamwork': 50.0
            }
        
        # Response time score (inverse of average response time, normalized)
        avg_response_time = np.mean(features[:, 1])
        response_score = max(0, 100 - (avg_response_time / 3600) * 10)  # Penalize slow responses
        
        # Helpfulness score (based on question answering patterns)
        questions_answered = np.sum(features[:, 4] > 0)
        helpfulness_score = min(100, (questions_answered / len(features)) * 100)
        
        # Communication score (based on sentiment and engagement)
        avg_sentiment = np.mean(features[:, 2])
        communication_score = 50 + (avg_sentiment * 50)  # Convert to 0-100 scale
        
        # Teamwork score (composite metric)
        avg_word_count = np.mean(features[:, 3])
        teamwork_score = min(100, (avg_word_count / 20) * 50 + communication_score * 0.5)
        
        return {
            'response_time': min(100, max(0, response_score)),
            'helpfulness': min(100, max(0, helpfulness_score)),
            'communication': min(100, max(0, communication_score)),
            'teamwork': min(100, max(0, teamwork_score))
        }

class PerformancePredictor:
    """ML model for predicting future performance"""
    
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=100, random_state=42)
        self.is_trained = False
    
    def prepare_features(self, user_data: Dict) -> np.ndarray:
        """Prepare features for performance prediction"""
        features = [
            user_data.get('tasks_completed', 0),
            user_data.get('achievement_points', 0),
            user_data.get('collaboration_score', 0),
            user_data.get('avg_task_completion_time', 0),
            user_data.get('code_quality_score', 0),
            user_data.get('peer_ratings', 0),
        ]
        return np.array(features).reshape(1, -1)
    
    def predict_performance(self, user_data: Dict) -> float:
        """Predict user's future performance score"""
        if not self.is_trained:
            # Use rule-based approach if model isn't trained
            return self._rule_based_prediction(user_data)
        
        features = self.prepare_features(user_data)
        prediction = self.model.predict(features)[0]
        return min(100, max(0, prediction))
    
    def _rule_based_prediction(self, user_data: Dict) -> float:
        """Rule-based performance prediction as fallback"""
        base_score = 50
        
        # Task completion bonus
        tasks_bonus = min(30, user_data.get('tasks_completed', 0) * 2)
        
        # Achievement points bonus
        points_bonus = min(20, user_data.get('achievement_points', 0) / 50)
        
        # Collaboration bonus
        collab_bonus = user_data.get('collaboration_score', 50) * 0.3
        
        total_score = base_score + tasks_bonus + points_bonus + collab_bonus
        return min(100, max(0, total_score))

class RecommendationEngine:
    """AI engine for generating personalized recommendations"""
    
    def __init__(self):
        self.collaboration_analyzer = CollaborationAnalyzer()
        self.performance_predictor = PerformancePredictor()
    
    def generate_recommendations(self, user_profile: Dict, performance_data: Dict) -> List[Dict]:
        """Generate personalized recommendations"""
        recommendations = []
        
        # Analyze collaboration patterns
        collab_scores = performance_data.get('collaboration_scores', {})
        
        # Low response time recommendation
        if collab_scores.get('response_time', 100) < 70:
            recommendations.append({
                'title': 'Improve Response Time',
                'description': 'Consider setting up notifications for important channels and responding within 2 hours during work hours.',
                'priority': 'high',
                'category': 'communication'
            })
        
        # Low collaboration score recommendation
        if collab_scores.get('teamwork', 100) < 60:
            recommendations.append({
                'title': 'Enhance Team Collaboration',
                'description': 'Participate more actively in team discussions and offer help to colleagues.',
                'priority': 'medium',
                'category': 'collaboration'
            })
        
        # Technical skills recommendation
        if performance_data.get('technical_score', 100) < 80:
            recommendations.append({
                'title': 'Expand Technical Skills',
                'description': 'Consider learning new technologies relevant to your role and current projects.',
                'priority': 'medium',
                'category': 'technical'
            })
        
        # Leadership potential
        if collab_scores.get('helpfulness', 0) > 85 and user_profile.get('role') == 'Senior Developer':
            recommendations.append({
                'title': 'Consider Leadership Training',
                'description': 'Your helpfulness scores suggest leadership potential. Consider mentoring or leadership programs.',
                'priority': 'low',
                'category': 'career'
            })
        
        return recommendations
    
    def identify_strengths_and_areas(self, performance_data: Dict) -> Dict[str, List[str]]:
        """Identify strengths and improvement areas"""
        strengths = []
        improvement_areas = []
        
        collab_scores = performance_data.get('collaboration_scores', {})
        
        # Identify strengths
        if collab_scores.get('communication', 0) > 85:
            strengths.append('Excellent Communication Skills')
        
        if performance_data.get('task_completion_rate', 0) > 90:
            strengths.append('High Task Completion Rate')
        
        if collab_scores.get('helpfulness', 0) > 80:
            strengths.append('Team Collaboration')
        
        if performance_data.get('code_quality_score', 0) > 85:
            strengths.append('Code Quality & Best Practices')
        
        # Identify improvement areas
        if collab_scores.get('response_time', 100) < 70:
            improvement_areas.append('Response Time to Messages')
        
        if performance_data.get('innovation_score', 100) < 60:
            improvement_areas.append('Innovation & Creative Problem Solving')
        
        if performance_data.get('mentoring_score', 100) < 50:
            improvement_areas.append('Mentoring Junior Team Members')
        
        return {
            'strengths': strengths,
            'improvement_areas': improvement_areas
        }

# Model persistence
def save_model(model, filename: str):
    """Save trained model to file"""
    os.makedirs('/app/models', exist_ok=True)
    with open(f'/app/models/{filename}', 'wb') as f:
        pickle.dump(model, f)

def load_model(filename: str):
    """Load trained model from file"""
    try:
        with open(f'/app/models/{filename}', 'rb') as f:
            return pickle.load(f)
    except FileNotFoundError:
        return None
