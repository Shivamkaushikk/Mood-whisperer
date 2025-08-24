import React, { useState, useEffect } from 'react';
import { Smile, Sun, Cloud, CloudRain, Zap, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Mood {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  prompt: string;
  intensity: number;
  suggestions: string[];
}

const moods: Mood[] = [
  {
    id: 'happy',
    name: 'Joyful',
    icon: <Sun className="w-8 h-8" />,
    color: 'mood-button-happy',
    description: 'Feeling bright and optimistic',
    prompt: "That's wonderful! What's bringing you joy today?",
    intensity: 8,
    suggestions: ['Share your joy with someone', 'Dance to your favorite song', 'Write about what made you smile']
  },
  {
    id: 'calm',
    name: 'Peaceful',
    icon: <Smile className="w-8 h-8" />,
    color: 'mood-button-calm',
    description: 'Centered and at ease',
    prompt: "Beautiful. Take a deep breath and enjoy this moment of peace.",
    intensity: 6,
    suggestions: ['Practice mindful breathing', 'Take a gentle walk', 'Listen to calming music']
  },
  {
    id: 'sad',
    name: 'Down',
    icon: <CloudRain className="w-8 h-8" />,
    color: 'mood-button-sad',
    description: 'Feeling low or melancholic',
    prompt: "I'm here with you. It's okay to feel this way sometimes.",
    intensity: 4,
    suggestions: ['Be gentle with yourself', 'Reach out to a friend', 'Do something comforting']
  },
  {
    id: 'anxious',
    name: 'Anxious',
    icon: <Cloud className="w-8 h-8" />,
    color: 'mood-button-anxious',
    description: 'Worried or restless',
    prompt: "Let's take this one step at a time. You're safe right now.",
    intensity: 3,
    suggestions: ['Try 4-7-8 breathing', 'Ground yourself with your senses', 'Write down your worries']
  },
  {
    id: 'energized',
    name: 'Energized',
    icon: <Zap className="w-8 h-8" />,
    color: 'mood-button-energized',
    description: 'Full of energy and motivation',
    prompt: "Amazing energy! How would you like to channel this feeling?",
    intensity: 9,
    suggestions: ['Channel energy into creativity', 'Move your body', 'Set new goals']
  }
];

interface MoodTrackerProps {
  onMoodSelect: (mood: Mood) => void;
  selectedMood?: Mood;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ onMoodSelect, selectedMood }) => {
  const [hoveredMood, setHoveredMood] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMood) {
      setShowSuggestions(true);
      setSelectedSuggestion(null);
    }
  }, [selectedMood]);

  const handleMoodSelect = (mood: Mood) => {
    onMoodSelect(mood);
    setShowSuggestions(false);
    setTimeout(() => setShowSuggestions(true), 500);
  };

  const getMoodIntensityColor = (intensity: number) => {
    if (intensity >= 8) return 'text-green-600';
    if (intensity >= 6) return 'text-blue-600';
    if (intensity >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="mood-card p-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-8 h-8 text-primary animate-bounce-gentle" />
        </div>
        <h2 className="text-4xl font-bold text-gradient mb-4">
          How are you feeling right now?
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Your emotions matter. Choose what resonates with you today. There's no right or wrong answer.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
        {moods.map((mood, index) => (
          <div
            key={mood.id}
            className="flex flex-col items-center animate-slide-in-left group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Button
              variant="ghost"
              className={`mood-button ${mood.color} w-24 h-24 p-4 mb-4 interactive-scale transition-all duration-500 ${
                selectedMood?.id === mood.id 
                  ? 'ring-4 ring-primary gentle-glow success-pulse scale-110' 
                  : 'hover:scale-105'
              } ${hoveredMood === mood.id ? 'floating-animation' : ''}`}
              onClick={() => handleMoodSelect(mood)}
              onMouseEnter={() => setHoveredMood(mood.id)}
              onMouseLeave={() => setHoveredMood(null)}
            >
              {mood.icon}
            </Button>
            
            <h3 className="font-semibold text-sm text-center mb-2">{mood.name}</h3>
            <p className="text-xs text-muted-foreground text-center max-w-28 mb-2">
              {mood.description}
            </p>
            
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.ceil(mood.intensity / 2) 
                      ? getMoodIntensityColor(mood.intensity).replace('text-', 'bg-')
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="space-y-6 animate-fade-in-up">
          {/* Mood Confirmation */}
          <div className="text-center p-6 bg-mood-gradient rounded-2xl border border-primary/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-foreground">
                You're feeling {selectedMood.name.toLowerCase()}
              </h3>
            </div>
            <p className="text-lg font-medium text-foreground mb-3">
              {selectedMood.prompt}
            </p>
            <p className="text-sm text-muted-foreground">
              Take a moment to acknowledge this feeling. Every emotion is valid and temporary.
            </p>
          </div>

          {/* Suggestions */}
          {showSuggestions && (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-lg font-semibold text-foreground mb-4 text-center">
                Gentle suggestions for this moment:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {selectedMood.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover-lift ${
                      selectedSuggestion === suggestion
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedSuggestion(suggestion)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">{index + 1}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{suggestion}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedSuggestion && (
                <div className="mt-6 text-center">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl">
                    <span>Start this activity</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Mood Intensity */}
          <div className="text-center p-4 bg-muted/50 rounded-xl">
            <p className="text-sm text-muted-foreground mb-2">Mood Intensity</p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    getMoodIntensityColor(selectedMood.intensity).replace('text-', 'bg-')
                  }`}
                  style={{ width: `${(selectedMood.intensity / 10) * 100}%` }}
                />
              </div>
              <Badge variant="secondary" className="text-xs">
                {selectedMood.intensity}/10
              </Badge>
            </div>
          </div>
        </div>
      )}

      {!selectedMood && (
        <div className="text-center p-6 bg-muted/30 rounded-xl">
          <p className="text-muted-foreground">
            💡 Select a mood above to get personalized support and suggestions
          </p>
        </div>
      )}
    </Card>
  );
};

export default MoodTracker;