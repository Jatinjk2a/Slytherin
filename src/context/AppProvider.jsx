import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // --- Auth State ---
  const [user, setUser] = useState({
    name: 'Alex Rivera',
    handle: '@arivera',
    role: 'Pro Curator',
    plan: 'Pro Plan',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3K5NqDwndLs2yZwfO-2tcJkdZFhxA84EYaCBQJk-P1cu-3-Ttvcjf1pO9tAxhiINTmKc6evSfP0Z8lDZPQRzYQq4bX9rAhSuRkOlxdHh50KP5nE5YDQoqfuwquAfvVhQmhprcuJB5IYyCy3ucYyt6YufezPdrif0dtrNZmlzpZR0t2AhfnmTWX-kxALbS4MST3m-FQRBhAfQnXzGhOFpuDW7tjdQ9b5Rrco1Dz80aRDtoR9JoLEOzB3ZUdy_0-Kwu_R5LEpIGmSjK'
  });

  // --- Theme State ---
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  }, [theme]);

  // --- History & Editor State ---
  const [history, setHistory] = useState([
    { id: 1, name: 'react-router', time: '2 hours ago', score: 98, status: 'Success' },
    { id: 2, name: 'tailwindcss', time: 'Yesterday', score: 94, status: 'Success' },
    { id: 3, name: 'express-api', time: '3 days ago', score: 85, status: 'Archive' },
  ]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");

  const generateReadme = (url) => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      const newEntry = {
        id: Date.now(),
        name: url.split('/').pop() || 'new-repo',
        time: 'Just now',
        score: Math.floor(Math.random() * (100 - 85) + 85),
        status: 'Success'
      };
      setHistory(prev => [newEntry, ...prev]);
      setIsGenerating(false);
    }, 2500);
  };

  const value = {
    user,
    setUser,
    theme,
    toggleTheme,
    history,
    setHistory,
    isGenerating,
    generateReadme,
    currentPrompt,
    setCurrentPrompt
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
