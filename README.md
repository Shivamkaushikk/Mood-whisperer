# Mood Whisperer - Mental Wellness App

## Project Overview

Mood Whisperer is an emotionally intelligent mental wellness application designed to help users track their moods, reflect daily, and build positive habits. The app features a UI/UX that intuitively adapts based on the user's emotional state, providing a personalized and supportive experience.

## Key Features

- **Mood Check-In Flow**: Quick and emotionally adaptive check-ins with sensitive phrasing tailored to current emotional states
- **Non-linear Journaling Interface**: A flexible journaling experience that encourages exploration and emotional expression
- **Micro-Habit Tracker**: Gentle, timely prompts encouraging small, manageable habits to support emotional wellness
- **Mood History Visualization**: Visual storytelling of mood patterns that feel insightful and comforting
- **Emotion-Responsive UI Layer**: UI that perceptively adapts in real-time based on emotional inputs

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript
- **React** - UI library for building user interfaces
- **shadcn/ui** - Accessible and customizable UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **React Query** - Data fetching and state management
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd mood-whisperer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── MoodTracker.tsx # Mood selection component
│   ├── JournalInterface.tsx # Journaling interface
│   ├── HabitTracker.tsx # Habit tracking component
│   └── MoodHistory.tsx # Mood history visualization
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── main.tsx           # Application entry point
```

## Features in Detail

### Emotion-Responsive Design
The app dynamically adapts its theme, colors, and interactions based on the user's selected mood:
- **Happy**: Bright, energetic colors with uplifting animations
- **Calm**: Soft, peaceful colors with gentle transitions
- **Sad**: Warm, comforting colors with supportive messaging
- **Anxious**: Soothing, grounding colors with breathing cues
- **Energized**: Vibrant, motivating colors with dynamic elements

### Intelligent Journaling
- Mood-responsive prompts that adapt to emotional state
- Real-time writing analytics
- Non-linear journaling interface
- Inspiration panel with writing tips

### Habit Tracking
- Micro-habits designed for mental wellness
- Mood-based habit suggestions
- Progress visualization
- Category filtering and difficulty levels

### Mood Analytics
- Visual mood history and trends
- Weekly mood overview
- Mood intensity tracking
- Personalized insights

## Contributing

This is a UI/UX competition project showcasing emotional intelligence in digital wellness applications.

## License

This project is created for educational and competition purposes.
