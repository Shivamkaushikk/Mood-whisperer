import React, { useState } from 'react';
import { TrendingUp, Calendar, BarChart3, LineChart, PieChart, Filter, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { Mood } from './MoodTracker';

interface MoodEntry {
  id: string;
  mood: string;
  timestamp: string;
  intensity: number;
  notes?: string;
}

interface MoodHistoryProps {
  selectedMood?: Mood;
}

const mockMoodData: MoodEntry[] = [
  { id: '1', mood: 'happy', timestamp: '2024-01-15T09:00:00Z', intensity: 8, notes: 'Great morning workout' },
  { id: '2', mood: 'calm', timestamp: '2024-01-15T14:00:00Z', intensity: 6, notes: 'Peaceful lunch break' },
  { id: '3', mood: 'anxious', timestamp: '2024-01-15T18:00:00Z', intensity: 4, notes: 'Work stress' },
  { id: '4', mood: 'happy', timestamp: '2024-01-16T08:00:00Z', intensity: 7, notes: 'Good sleep' },
  { id: '5', mood: 'sad', timestamp: '2024-01-16T16:00:00Z', intensity: 5, notes: 'Missing friends' },
  { id: '6', mood: 'energized', timestamp: '2024-01-17T10:00:00Z', intensity: 9, notes: 'Creative breakthrough' },
  { id: '7', mood: 'calm', timestamp: '2024-01-17T20:00:00Z', intensity: 7, notes: 'Evening meditation' },
  { id: '8', mood: 'happy', timestamp: '2024-01-18T12:00:00Z', intensity: 8, notes: 'Lunch with family' },
  { id: '9', mood: 'anxious', timestamp: '2024-01-18T19:00:00Z', intensity: 3, notes: 'Upcoming deadline' },
  { id: '10', mood: 'sad', timestamp: '2024-01-19T11:00:00Z', intensity: 6, notes: 'Rainy day blues' },
];

const moodColors = {
  happy: 'bg-yellow-500',
  calm: 'bg-blue-500',
  sad: 'bg-purple-500',
  anxious: 'bg-green-500',
  energized: 'bg-pink-500'
};

const moodEmojis = {
  happy: '🌟',
  calm: '✨',
  sad: '💙',
  anxious: '🌸',
  energized: '⚡'
};

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 3 months' },
  { value: '1y', label: 'Last year' }
];

const chartTypes = [
  { value: 'line', label: 'Line Chart', icon: LineChart },
  { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
  { value: 'pie', label: 'Pie Chart', icon: PieChart }
];

export const MoodHistory: React.FC<MoodHistoryProps> = ({ selectedMood }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [chartType, setChartType] = useState('line');
  const [selectedEntry, setSelectedEntry] = useState<MoodEntry | null>(null);

  const getMoodStats = () => {
    const moodCounts = mockMoodData.reduce((acc, entry) => {
      acc[entry.mood] = (acc[entry.mood] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalEntries = mockMoodData.length;
    const averageIntensity = mockMoodData.reduce((sum, entry) => sum + entry.intensity, 0) / totalEntries;
    const mostFrequentMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0];

    return {
      totalEntries,
      averageIntensity: Math.round(averageIntensity * 10) / 10,
      mostFrequentMood: mostFrequentMood ? { mood: mostFrequentMood[0], count: mostFrequentMood[1] } : null,
      moodDistribution: moodCounts
    };
  };

  const stats = getMoodStats();

  const getMoodTrend = () => {
    const recentMoods = mockMoodData.slice(-5);
    const intensities = recentMoods.map(entry => entry.intensity);
    const trend = intensities[intensities.length - 1] - intensities[0];
    
    if (trend > 1) return { direction: 'up', message: 'Your mood is improving! 🌟' };
    if (trend < -1) return { direction: 'down', message: 'You might need some extra care 💙' };
    return { direction: 'stable', message: 'Your mood is stable ✨' };
  };

  const trend = getMoodTrend();

  return (
    <Card className="mood-card p-8 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <TrendingUp className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Mood History</h2>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map(range => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-muted-foreground" />
          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {chartTypes.map(type => (
                <SelectItem key={type.value} value={type.value}>
                  <div className="flex items-center gap-2">
                    <type.icon className="w-4 h-4" />
                    {type.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" size="sm" className="ml-auto">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-muted/30 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{stats.totalEntries}</p>
          <p className="text-sm text-muted-foreground">Total Check-ins</p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-xl text-center">
          <p className="text-2xl font-bold text-primary">{stats.averageIntensity}/10</p>
          <p className="text-sm text-muted-foreground">Avg Intensity</p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">{stats.mostFrequentMood ? moodEmojis[stats.mostFrequentMood.mood as keyof typeof moodEmojis] : '📊'}</span>
            <p className="text-lg font-bold text-primary">{stats.mostFrequentMood?.count || 0}</p>
          </div>
          <p className="text-sm text-muted-foreground">Most Frequent</p>
        </div>
        
        <div className="p-4 bg-muted/30 rounded-xl text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className={`w-5 h-5 ${
              trend.direction === 'up' ? 'text-green-600' : 
              trend.direction === 'down' ? 'text-red-600' : 'text-blue-600'
            }`} />
            <p className="text-lg font-bold text-primary capitalize">{trend.direction}</p>
          </div>
          <p className="text-sm text-muted-foreground">Trend</p>
        </div>
      </div>

      {/* Trend Message */}
      <div className="mb-6 p-4 bg-mood-gradient rounded-xl border border-primary/20">
        <p className="text-center font-medium text-foreground">{trend.message}</p>
      </div>

      {/* Mood Distribution */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Mood Distribution</h3>
        <div className="space-y-3">
          {Object.entries(stats.moodDistribution).map(([mood, count]) => (
            <div key={mood} className="flex items-center gap-4">
              <div className="flex items-center gap-2 w-24">
                <span className="text-lg">{moodEmojis[mood as keyof typeof moodEmojis]}</span>
                <span className="text-sm font-medium capitalize">{mood}</span>
              </div>
              <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full ${moodColors[mood as keyof typeof moodColors]} transition-all duration-1000`}
                  style={{ width: `${(count / stats.totalEntries) * 100}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Entries */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Entries</h3>
        <div className="space-y-3">
          {mockMoodData.slice(-5).reverse().map((entry) => (
            <div
              key={entry.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover-lift ${
                selectedEntry?.id === entry.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => setSelectedEntry(selectedEntry?.id === entry.id ? null : entry)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${moodColors[entry.mood as keyof typeof moodColors]}`} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{moodEmojis[entry.mood as keyof typeof moodEmojis]}</span>
                      <span className="font-medium capitalize">{entry.mood}</span>
                      <Badge variant="secondary" className="text-xs">
                        {entry.intensity}/10
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                {entry.notes && (
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground italic">"{entry.notes}"</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-muted/30 rounded-xl">
        <h4 className="font-semibold text-foreground mb-2">💡 Insights</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• You check in most often in the morning</li>
          <li>• Your mood tends to improve throughout the day</li>
          <li>• Exercise and social activities boost your mood</li>
          <li>• Consider journaling when feeling anxious</li>
        </ul>
      </div>
    </Card>
  );
};

export default MoodHistory;
