import React, { useState, useEffect } from 'react';
import { PenTool, Save, Sparkles, BookOpen, Smile, Clock, Target, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { Mood } from './MoodTracker';

interface JournalInterfaceProps {
  selectedMood?: Mood;
}

const journalPrompts = {
  happy: [
    "What made you smile today?",
    "Describe a moment of joy you experienced recently",
    "What are you grateful for right now?",
    "Who would you like to share this happiness with?",
    "What does this joy feel like in your body?"
  ],
  calm: [
    "What helps you feel centered?",
    "Describe the peace you're feeling",
    "What brought you to this calm state?",
    "How can you carry this peace forward?",
    "What does tranquility look like to you?"
  ],
  sad: [
    "What would comfort you right now?",
    "It's okay to feel sad. What's on your heart?",
    "How can you be gentle with yourself today?",
    "What do you need most in this moment?",
    "What would help you feel less alone?"
  ],
  anxious: [
    "What's one thing you can control right now?",
    "Take three deep breaths. What do you notice?",
    "What would you tell a friend feeling this way?",
    "What's the smallest step you can take?",
    "What's making you feel unsafe?"
  ],
  energized: [
    "How do you want to use this energy?",
    "What excites you most right now?",
    "What goals feel within reach today?",
    "What creative project calls to you?",
    "How can you channel this motivation?"
  ]
};

const moodEmojis = {
  happy: '🌟',
  calm: '✨',
  sad: '💙',
  anxious: '🌸',
  energized: '⚡'
};

export const JournalInterface: React.FC<JournalInterfaceProps> = ({ selectedMood }) => {
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [writingTime, setWritingTime] = useState(0);
  const [showInspiration, setShowInspiration] = useState(false);
  const [recentEntries, setRecentEntries] = useState([
    { date: '2024-01-15', mood: 'happy', preview: 'Today was amazing...' },
    { date: '2024-01-14', mood: 'calm', preview: 'Feeling peaceful...' },
    { date: '2024-01-13', mood: 'sad', preview: 'It\'s been a tough day...' }
  ]);

  const prompts = selectedMood ? journalPrompts[selectedMood.id as keyof typeof journalPrompts] || [] : [];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTyping) {
      interval = setInterval(() => {
        setWritingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSave = () => {
    const entry = {
      content: journalEntry,
      mood: selectedMood?.id,
      timestamp: new Date().toISOString(),
      wordCount,
      writingTime
    };
    
    // In a real app, this would save to a database
    console.log('Saving journal entry:', entry);
    
    // Add to recent entries
    setRecentEntries(prev => [{
      date: new Date().toISOString().split('T')[0],
      mood: selectedMood?.id || 'neutral',
      preview: journalEntry.substring(0, 50) + '...'
    }, ...prev.slice(0, 2)]);
    
    setIsSaved(true);
    setWritingTime(0);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getWritingEncouragement = () => {
    if (wordCount < 10) return "Start with just one sentence...";
    if (wordCount < 50) return "You're finding your voice!";
    if (wordCount < 100) return "Beautiful flow of thoughts!";
    if (wordCount < 200) return "This is really meaningful writing!";
    return "You're doing amazing work! 🌟";
  };

  const getMoodSpecificPlaceholder = () => {
    if (!selectedMood) return "What's on your mind today? Write freely, without judgment...";
    
    const placeholders = {
      happy: "Share your joy! What's making your heart sing today?",
      calm: "Let your peaceful thoughts flow onto the page...",
      sad: "It's safe to express what's in your heart. Take your time...",
      anxious: "Breathe and write. What's on your mind?",
      energized: "Channel this energy into words! What excites you?"
    };
    
    return placeholders[selectedMood.id as keyof typeof placeholders];
  };

  return (
    <Card className="mood-card p-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-xl">
          <PenTool className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gradient">Journal Your Thoughts</h2>
        <Sparkles className="w-5 h-5 text-primary animate-bounce-gentle" />
      </div>

      {selectedMood && prompts.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{moodEmojis[selectedMood.id as keyof typeof moodEmojis]}</span>
            <p className="text-sm text-muted-foreground">
              Gentle prompts for your {selectedMood.name.toLowerCase()} feelings:
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {prompts.map((prompt, index) => (
              <Badge
                key={index}
                variant="secondary"
                className={`cursor-pointer interactive-scale hover-lift transition-all duration-300 ${
                  selectedPrompt === prompt ? 'ring-2 ring-primary gentle-glow bg-primary/10' : ''
                }`}
                onClick={() => setSelectedPrompt(prompt)}
              >
                {prompt}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {selectedPrompt && (
        <div className="mb-4 p-4 bg-mood-gradient rounded-xl animate-fade-in-up border border-primary/20">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium text-foreground italic">
              "{selectedPrompt}"
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <Textarea
            placeholder={getMoodSpecificPlaceholder()}
            value={journalEntry}
            onChange={(e) => {
              setJournalEntry(e.target.value);
              setWordCount(e.target.value.trim().split(/\s+/).filter(word => word.length > 0).length);
              setIsTyping(true);
              setTimeout(() => setIsTyping(false), 1000);
            }}
            className="min-h-[250px] resize-none border-2 focus:border-primary transition-all duration-300 rounded-xl text-base leading-relaxed"
            style={{ 
              fontSize: '16px',
              lineHeight: '1.6'
            }}
          />
          
          {/* Writing encouragement overlay */}
          {journalEntry.length > 0 && (
            <div className="absolute bottom-4 right-4 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
              {getWritingEncouragement()}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {journalEntry.length > 0 && (
              <>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{journalEntry.length} characters • {wordCount} words</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{Math.floor(writingTime / 60)}:{(writingTime % 60).toString().padStart(2, '0')}</span>
                </div>
                {isTyping && <span className="animate-gentle-bounce">✨</span>}
              </>
            )}
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowInspiration(!showInspiration)}
              className="interactive-scale"
            >
                              <Smile className="w-4 h-4 mr-2" />
              Inspiration
            </Button>
            
            <Button
              onClick={handleSave}
              disabled={journalEntry.trim().length === 0}
              className={`interactive-scale transition-all duration-300 ${
                isSaved ? 'bg-green-500 hover:bg-green-600 success-pulse' : ''
              }`}
            >
              <Save className={`w-4 h-4 mr-2 ${isSaved ? 'animate-gentle-bounce' : ''}`} />
              {isSaved ? 'Saved! ✨' : 'Save Entry'}
            </Button>
          </div>
        </div>
      </div>

      {/* Inspiration Panel */}
      {showInspiration && (
        <div className="mt-6 p-4 bg-muted/30 rounded-xl animate-fade-in-up">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Writing Inspiration
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="text-sm">
              <p className="font-medium mb-1">💭 Remember:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• There's no right or wrong way to journal</li>
                <li>• Your feelings are always valid</li>
                <li>• This is your safe space</li>
              </ul>
            </div>
            <div className="text-sm">
              <p className="font-medium mb-1">✨ Try:</p>
              <ul className="text-muted-foreground space-y-1">
                <li>• Writing without stopping for 5 minutes</li>
                <li>• Using "I feel..." statements</li>
                <li>• Describing physical sensations</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Recent Entries */}
      {recentEntries.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Recent Entries
          </h4>
          <div className="space-y-2">
            {recentEntries.map((entry, index) => (
              <div key={index} className="p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{moodEmojis[entry.mood as keyof typeof moodEmojis] || '📝'}</span>
                  <span className="text-xs text-muted-foreground">{entry.date}</span>
                </div>
                <p className="text-sm text-foreground">{entry.preview}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {!selectedMood && (
        <div className="mt-6 p-4 bg-muted/50 rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            💡 Select a mood above to get personalized writing prompts and emotional support
          </p>
        </div>
      )}
    </Card>
  );
};

export default JournalInterface;