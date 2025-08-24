import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Target, Flower2, Sparkles, Trophy, TrendingUp, Smile, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Mood } from './MoodTracker';

interface Habit {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  completed: boolean;
  streak: number;
  category: 'wellness' | 'mindfulness' | 'connection' | 'movement' | 'creativity';
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
}

interface HabitTrackerProps {
  selectedMood?: Mood;
}

const moodBasedHabits = {
  happy: [
    { 
      id: 'gratitude', 
      name: 'Share Joy', 
      description: 'Tell someone what made you happy today', 
      icon: <Smile className="w-4 h-4" />,
      category: 'connection' as const,
      difficulty: 'easy' as const,
      timeEstimate: '2 min'
    },
    { 
      id: 'celebrate', 
      name: 'Celebrate Small Wins', 
      description: 'Acknowledge one thing you did well today', 
      icon: <Trophy className="w-4 h-4" />,
      category: 'wellness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '1 min'
    },
    { 
      id: 'dance', 
      name: 'Dance Break', 
      description: 'Move your body to your favorite song', 
      icon: <TrendingUp className="w-4 h-4" />,
      category: 'movement' as const,
      difficulty: 'medium' as const,
      timeEstimate: '5 min'
    },
  ],
  calm: [
    { 
      id: 'meditate', 
      name: 'Mindful Moment', 
      description: '5 minutes of peaceful breathing', 
      icon: <Circle className="w-4 h-4" />,
      category: 'mindfulness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '5 min'
    },
    { 
      id: 'nature', 
      name: 'Nature Connection', 
      description: 'Step outside or look at plants', 
      icon: <Flower2 className="w-4 h-4" />,
      category: 'wellness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '3 min'
    },
    { 
      id: 'gentle-stretch', 
      name: 'Gentle Stretch', 
      description: 'Slow, mindful stretching', 
      icon: <Target className="w-4 h-4" />,
      category: 'movement' as const,
      difficulty: 'easy' as const,
      timeEstimate: '10 min'
    },
  ],
  sad: [
    { 
      id: 'selfcare', 
      name: 'Gentle Care', 
      description: 'Do one kind thing for yourself', 
      icon: <Smile className="w-4 h-4" />,
      category: 'wellness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '5 min'
    },
    { 
      id: 'connection', 
      name: 'Reach Out', 
      description: 'Connect with someone who cares about you', 
      icon: <Target className="w-4 h-4" />,
      category: 'connection' as const,
      difficulty: 'medium' as const,
      timeEstimate: '15 min'
    },
    { 
      id: 'comfort', 
      name: 'Find Comfort', 
      description: 'Wrap yourself in a cozy blanket or warm drink', 
      icon: <Flower2 className="w-4 h-4" />,
      category: 'wellness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '2 min'
    },
  ],
  anxious: [
    { 
      id: 'breathe', 
      name: 'Calm Breathing', 
      description: '4-7-8 breathing technique', 
      icon: <Circle className="w-4 h-4" />,
      category: 'mindfulness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '3 min'
    },
    { 
      id: 'grounding', 
      name: 'Grounding Exercise', 
      description: 'Name 5 things you can see, hear, touch', 
      icon: <Target className="w-4 h-4" />,
      category: 'mindfulness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '2 min'
    },
    { 
      id: 'write-worries', 
      name: 'Write Worries', 
      description: 'Put your worries on paper', 
      icon: <Flower2 className="w-4 h-4" />,
      category: 'creativity' as const,
      difficulty: 'medium' as const,
      timeEstimate: '10 min'
    },
  ],
  energized: [
    { 
      id: 'move', 
      name: 'Move Your Body', 
      description: 'Dance, stretch, or take a walk', 
      icon: <TrendingUp className="w-4 h-4" />,
      category: 'movement' as const,
      difficulty: 'medium' as const,
      timeEstimate: '15 min'
    },
    { 
      id: 'create', 
      name: 'Create Something', 
      description: 'Channel energy into creativity', 
      icon: <Sparkles className="w-4 h-4" />,
      category: 'creativity' as const,
      difficulty: 'medium' as const,
      timeEstimate: '20 min'
    },
    { 
      id: 'plan', 
      name: 'Plan Something Fun', 
      description: 'Make plans for something you\'re excited about', 
      icon: <Target className="w-4 h-4" />,
      category: 'wellness' as const,
      difficulty: 'easy' as const,
      timeEstimate: '5 min'
    },
  ]
};

const defaultHabits: Habit[] = [
  { 
    id: 'water', 
    name: 'Hydrate', 
    description: 'Drink a glass of water', 
    icon: <Circle className="w-4 h-4" />, 
    completed: false, 
    streak: 3,
    category: 'wellness',
    difficulty: 'easy',
    timeEstimate: '1 min'
  },
  { 
    id: 'gratitude', 
    name: 'Gratitude Practice', 
    description: 'Think of 3 things you\'re grateful for', 
    icon: <Smile className="w-4 h-4" />, 
    completed: true, 
    streak: 7,
    category: 'mindfulness',
    difficulty: 'easy',
    timeEstimate: '2 min'
  },
  { 
    id: 'fresh-air', 
    name: 'Fresh Air', 
    description: 'Step outside for a moment', 
    icon: <Target className="w-4 h-4" />, 
    completed: false, 
    streak: 1,
    category: 'wellness',
    difficulty: 'easy',
    timeEstimate: '3 min'
  },
];

const categoryColors = {
  wellness: 'bg-blue-100 text-blue-800',
  mindfulness: 'bg-green-100 text-green-800',
  connection: 'bg-purple-100 text-purple-800',
  movement: 'bg-orange-100 text-orange-800',
  creativity: 'bg-pink-100 text-pink-800'
};

const difficultyColors = {
  easy: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  hard: 'bg-red-100 text-red-700'
};

export const HabitTracker: React.FC<HabitTrackerProps> = ({ selectedMood }) => {
  const [habits, setHabits] = useState<Habit[]>(defaultHabits);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [showMoodHabits, setShowMoodHabits] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleHabit = (habitId: string) => {
    setHabits(prev =>
      prev.map(habit =>
        habit.id === habitId
          ? { ...habit, completed: !habit.completed, streak: habit.completed ? habit.streak : habit.streak + 1 }
          : habit
      )
    );

    // Show success animation for completion
    if (!habits.find(h => h.id === habitId)?.completed) {
      setShowSuccess(habitId);
      setTimeout(() => setShowSuccess(null), 1000);
    }
  };

  const addMoodHabit = (moodHabit: any) => {
    const newHabit: Habit = {
      id: `mood-${moodHabit.id}-${Date.now()}`,
      name: moodHabit.name,
      description: moodHabit.description,
      icon: moodHabit.icon,
      completed: false,
      streak: 0,
      category: moodHabit.category,
      difficulty: moodHabit.difficulty,
      timeEstimate: moodHabit.timeEstimate
    };

    setHabits(prev => [newHabit, ...prev]);
    
    // Show success feedback
    setShowSuccess(newHabit.id);
    setTimeout(() => setShowSuccess(null), 1000);
  };

  const moodHabits = selectedMood ? moodBasedHabits[selectedMood.id as keyof typeof moodBasedHabits] || [] : [];
  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completionRate = totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0;

  const getMoodMessage = () => {
    if (!selectedMood) return "Start with small, manageable habits";
    
    const messages = {
      happy: "Great energy! Channel it into positive habits",
      calm: "Perfect time for gentle, mindful practices",
      sad: "Be kind to yourself. Small steps matter",
      anxious: "Focus on grounding and calming activities",
      energized: "Use this momentum to build lasting habits"
    };
    
    return messages[selectedMood.id as keyof typeof messages];
  };

  return (
    <Card className="mood-card p-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <Target className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Gentle Habits</h2>
        <Sparkles className="w-5 h-5 text-primary animate-bounce-gentle" />
      </div>

      {/* Progress Overview */}
      <div className="mb-6 p-4 bg-muted/30 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Today's Progress</span>
          <span className="text-sm text-muted-foreground">{completedHabits}/{totalHabits} completed</span>
        </div>
        <Progress value={completionRate} className="h-2" />
        <p className="text-xs text-muted-foreground mt-2">{getMoodMessage()}</p>
      </div>

      {selectedMood && moodHabits.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Suggestions for feeling {selectedMood.name.toLowerCase()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMoodHabits(!showMoodHabits)}
              className="text-primary hover:bg-primary/10"
            >
              {showMoodHabits ? 'Hide' : 'Show'} Suggestions
            </Button>
          </div>
          
          {showMoodHabits && (
            <div className="space-y-3 animate-fade-in-up">
              {moodHabits.map((habit, index) => (
                <div
                  key={habit.id}
                  className="flex items-center gap-4 p-4 bg-mood-gradient rounded-xl animate-slide-in-left border border-primary/20"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-primary">{habit.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium text-foreground">{habit.name}</p>
                      <Badge variant="secondary" className={`text-xs ${categoryColors[habit.category]}`}>
                        {habit.category}
                      </Badge>
                      <Badge variant="secondary" className={`text-xs ${difficultyColors[habit.difficulty]}`}>
                        {habit.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{habit.timeEstimate}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:bg-primary/10 interactive-scale"
                    onClick={() => addMoodHabit(habit)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Today's Habits</h3>
          <div className="flex gap-1">
            {['wellness', 'mindfulness', 'connection', 'movement', 'creativity'].map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                className="text-xs"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {habits
          .filter(habit => !selectedCategory || habit.category === selectedCategory)
          .map((habit, index) => (
          <div
            key={habit.id}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer hover-lift animate-slide-in-left ${
              habit.completed
                ? 'bg-green-50 border-green-200 hover:bg-green-100'
                : 'bg-white border-gray-200 hover:border-primary/50 hover:shadow-md'
            } ${showSuccess === habit.id ? 'success-pulse' : ''}`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => toggleHabit(habit.id)}
          >
            <div className="text-primary">
              {habit.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                {habit.icon}
                <h4 className={`font-medium ${habit.completed ? 'text-green-800' : 'text-foreground'}`}>
                  {habit.name}
                </h4>
                <Badge variant="secondary" className={`text-xs ${categoryColors[habit.category]}`}>
                  {habit.category}
                </Badge>
                {habit.streak > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    🔥 {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                  </Badge>
                )}
              </div>
              <p className={`text-sm ${habit.completed ? 'text-green-600' : 'text-muted-foreground'} mb-2`}>
                {habit.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <Badge variant="secondary" className={difficultyColors[habit.difficulty]}>
                  {habit.difficulty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{habit.timeEstimate}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <p className="text-sm font-medium text-foreground">
            {completedHabits > 0 ? `Great job completing ${completedHabits} habit${completedHabits !== 1 ? 's' : ''}!` : 'Start with one small habit today'}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          Small steps lead to big changes. Be proud of every habit you complete! 🌱
        </p>
      </div>
    </Card>
  );
};

export default HabitTracker;