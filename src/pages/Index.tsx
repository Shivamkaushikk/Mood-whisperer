import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Sparkles, Calendar, Target, BookOpen, Activity, BarChart3, Star, Zap, Flower2, Smile } from 'lucide-react';
import MoodTracker, { type Mood } from '@/components/MoodTracker';
import JournalInterface from '@/components/JournalInterface';
import HabitTracker from '@/components/HabitTracker';
import MoodHistory from '@/components/MoodHistory';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | undefined>();
  const [streakCount, setStreakCount] = useState(7);
  const [totalCheckins, setTotalCheckins] = useState(23);
  const [activeTab, setActiveTab] = useState('overview');
  const [weeklyMood, setWeeklyMood] = useState([
    { day: 'Mon', mood: 'happy' },
    { day: 'Tue', mood: 'calm' },
    { day: 'Wed', mood: 'sad' },
    { day: 'Thu', mood: 'anxious' },
    { day: 'Fri', mood: 'energized' },
    { day: 'Sat', mood: 'happy' },
    { day: 'Sun', mood: 'calm' }
  ]);

  const getMoodMessage = (mood?: Mood) => {
    if (!mood) return "Take a moment to check in with yourself";
    
    const messages = {
      happy: "Your joy is contagious! 🌟",
      calm: "Peace flows through you ✨",
      sad: "It's okay to feel this way. You're not alone 💙",
      anxious: "Breathe. You're safe right now 🌸",
      energized: "Channel this energy into something amazing! ⚡"
    };
    
    return messages[mood.id as keyof typeof messages] || "How are you feeling?";
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setTotalCheckins(prev => prev + 1);
    
    // Apply mood-based theme changes
    const root = document.documentElement;
    const body = document.body;
    
    // Remove previous mood classes
    body.classList.remove('mood-happy', 'mood-calm', 'mood-sad', 'mood-anxious', 'mood-energized');
    body.classList.add(`mood-${mood.id}`);
    
    switch (mood.id) {
      case 'happy':
        root.style.setProperty('--primary', '45 100% 65%');
        root.style.setProperty('--accent', '45 100% 95%');
        root.style.setProperty('--background', '50 60% 98%');
        break;
      case 'calm':
        root.style.setProperty('--primary', '200 85% 60%');
        root.style.setProperty('--accent', '200 85% 95%');
        root.style.setProperty('--background', '200 30% 98%');
        break;
      case 'sad':
        root.style.setProperty('--primary', '250 40% 65%');
        root.style.setProperty('--accent', '250 40% 95%');
        root.style.setProperty('--background', '250 20% 98%');
        break;
      case 'anxious':
        root.style.setProperty('--primary', '160 50% 60%');
        root.style.setProperty('--accent', '160 50% 95%');
        root.style.setProperty('--background', '160 25% 98%');
        break;
      case 'energized':
        root.style.setProperty('--primary', '340 85% 65%');
        root.style.setProperty('--accent', '340 85% 95%');
        root.style.setProperty('--background', '340 30% 98%');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 transition-all duration-700 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Icons */}
        <div className="absolute top-20 left-10 animate-float-gentle">
          <Star className="w-6 h-6 text-blue-400/30" />
        </div>
        <div className="absolute top-40 right-20 animate-float-gentle" style={{ animationDelay: '-2s' }}>
          <Flower2 className="w-8 h-8 text-purple-400/30" />
        </div>
        <div className="absolute top-60 left-1/4 animate-float-gentle" style={{ animationDelay: '-4s' }}>
          <Zap className="w-5 h-5 text-pink-400/25" />
        </div>
        <div className="absolute top-80 right-1/3 animate-float-gentle" style={{ animationDelay: '-6s' }}>
          <Sparkles className="w-7 h-7 text-indigo-400/25" />
        </div>
        
        {/* More floating elements */}
        <div className="absolute bottom-40 left-20 animate-float-gentle" style={{ animationDelay: '-1s' }}>
          <Smile className="w-6 h-6 text-rose-400/30" />
        </div>
        <div className="absolute bottom-60 right-10 animate-float-gentle" style={{ animationDelay: '-3s' }}>
          <Star className="w-5 h-5 text-cyan-400/30" />
        </div>
        <div className="absolute bottom-80 left-1/3 animate-float-gentle" style={{ animationDelay: '-5s' }}>
          <Flower2 className="w-7 h-7 text-emerald-400/25" />
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl animate-pulse-gentle shadow-lg">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MoodWhisperer
                </h1>
                <p className="text-xs text-gray-600">Your emotional wellness companion</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 space-y-8 relative z-10">
        {/* Welcome Section */}
        <div className="text-center space-y-6 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="w-8 h-8 text-purple-500 animate-bounce-gentle" />
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400/30 rounded-full animate-pulse-glow"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400/30 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Safe Space
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            This is a judgment-free zone where your emotions are heard, understood, and supported. 
            Take a moment to check in with yourself.
          </p>
          <div className="flex justify-center">
            <Badge className="text-sm px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200 animate-pulse-gentle">
              {getMoodMessage(selectedMood)}
            </Badge>
          </div>
        </div>

        {/* Weekly Mood Overview */}
        <Card className="bg-white/80 backdrop-blur-md border border-gray-200/50 p-6 animate-fade-in-up animated-card shadow-lg" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl animate-pulse-gentle">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              This Week's Journey
            </h3>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {weeklyMood.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-gray-600 mb-2">{day.day}</div>
                <div className={`w-8 h-8 mx-auto rounded-full mood-indicator-${day.mood} animate-slide-in-left`} 
                     style={{ animationDelay: `${index * 0.1}s` }}>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stats Cards */}
        {selectedMood && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Card className="bg-white/80 backdrop-blur-md p-6 text-center hover-lift animated-card shadow-lg border border-gray-200/50">
              <div className="relative">
                <Smile className="w-10 h-10 text-pink-500 mx-auto mb-4 animate-gentle-bounce" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400/40 rounded-full animate-pulse-glow"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Current Mood</h3>
              <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-2">{selectedMood.name}</p>
              <p className="text-sm text-gray-600">{selectedMood.description}</p>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-md p-6 text-center hover-lift animated-card shadow-lg border border-gray-200/50">
              <div className="relative">
                <TrendingUp className="w-10 h-10 text-green-500 mx-auto mb-4 animate-gentle-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400/40 rounded-full animate-pulse-glow"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Check-ins</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">{totalCheckins}</p>
              <p className="text-sm text-gray-600">Total sessions</p>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-md p-6 text-center hover-lift animated-card shadow-lg border border-gray-200/50">
              <div className="relative">
                <Target className="w-10 h-10 text-purple-500 mx-auto mb-4 animate-gentle-bounce" style={{ animationDelay: '0.4s' }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse-glow"></div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Streak</h3>
              <p className="text-3xl font-bold text-purple-600 mb-2">{streakCount}</p>
              <p className="text-sm text-gray-600">Days in a row</p>
            </Card>
          </div>
        )}

        {/* Mood Tracker */}
        <MoodTracker onMoodSelect={handleMoodSelect} selectedMood={selectedMood} />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <TabsTrigger value="overview" className="flex items-center gap-2 hover:bg-blue-50 transition-colors data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Sparkles className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2 hover:bg-purple-50 transition-colors data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <BookOpen className="w-4 h-4" />
              Journal
            </TabsTrigger>
            <TabsTrigger value="habits" className="flex items-center gap-2 hover:bg-green-50 transition-colors data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
              <Target className="w-4 h-4" />
              Habits
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2 hover:bg-orange-50 transition-colors data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <JournalInterface selectedMood={selectedMood} />
              <HabitTracker selectedMood={selectedMood} />
            </div>
          </TabsContent>

          <TabsContent value="journal" className="space-y-6">
            <JournalInterface selectedMood={selectedMood} />
          </TabsContent>

          <TabsContent value="habits" className="space-y-6">
            <HabitTracker selectedMood={selectedMood} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <MoodHistory selectedMood={selectedMood} />
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-md p-6 animate-fade-in-up animated-card shadow-lg border border-gray-200/50" style={{ animationDelay: '0.6s' }}>
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 text-center">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 bg-white/50 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
              onClick={() => setActiveTab('journal')}
            >
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-gray-700">Read Journal</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 bg-white/50 border-gray-200 hover:bg-purple-50 hover:border-purple-300"
              onClick={() => setActiveTab('history')}
            >
              <Activity className="w-6 h-6 text-purple-600" />
              <span className="text-sm text-gray-700">Mood History</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 bg-white/50 border-gray-200 hover:bg-green-50 hover:border-green-300"
              onClick={() => setActiveTab('habits')}
            >
              <Target className="w-6 h-6 text-green-600" />
              <span className="text-sm text-gray-700">Set Goals</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2 hover-lift transition-all duration-300 bg-white/50 border-gray-200 hover:bg-pink-50 hover:border-pink-300"
            >
              <Smile className="w-6 h-6 text-pink-600" />
              <span className="text-sm text-gray-700">Self Care</span>
            </Button>
          </div>
        </Card>

        {/* Inspirational Footer */}
        <div className="text-center py-8 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
          <div className="max-w-lg mx-auto p-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-3xl hover-lift shadow-lg border border-gray-200/50 relative overflow-hidden">
            <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400/40 rounded-full animate-pulse-glow"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-400/40 rounded-full animate-pulse-glow" style={{ animationDelay: '0.5s' }}></div>
            <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-4 animate-bounce-gentle" />
            <p className="text-xl font-medium text-gray-800 mb-3">
              "Healing is not a destination, it's a journey of self-discovery."
            </p>
            <p className="text-sm text-gray-600">
              Remember: Progress isn't always linear, and that's perfectly okay. 🌱
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;