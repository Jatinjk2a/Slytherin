import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const DEFAULT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3K5NqDwndLs2yZwfO-2tcJkdZFhxA84EYaCBQJk-P1cu-3-Ttvcjf1pO9tAxhiINTmKc6evSfP0Z8lDZPQRzYQq4bX9rAhSuRkOlxdHh50KP5nE5YDQoqfuwquAfvVhQmhprcuJB5IYyCy3ucYyt6YufezPdrif0dtrNZmlzpZR0t2AhfnmTWX-kxALbS4MST3m-FQRBhAfQnXzGhOFpuDW7tjdQ9b5Rrco1Dz80aRDtoR9JoLEOzB3ZUdy_0-Kwu_R5LEpIGmSjK';

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  // --- Auth State (persisted) ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('readme_ai_auth') === 'true';
  });

  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('readme_ai_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (userData = {}) => {
    const handle = userData.email
      ? `@${userData.email.split('@')[0]}`
      : userData.handle || '@user';
    const profile = {
      name: userData.name || 'Alex Rivera',
      handle,
      email: userData.email || '',
      role: 'Pro Curator',
      plan: 'Pro Plan',
      avatar: userData.avatar || DEFAULT_AVATAR,
    };
    setUser(profile);
    setIsAuthenticated(true);
    localStorage.setItem('readme_ai_auth', 'true');
    localStorage.setItem('readme_ai_user', JSON.stringify(profile));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('readme_ai_auth');
    localStorage.removeItem('readme_ai_user');
  };

  // --- Theme State (persisted) ---
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('readme_ai_theme') || 'light';
  });

  const toggleTheme = () => {
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('readme_ai_theme', next);
      return next;
    });
  };

  useEffect(() => {
    const htmlEl = document.documentElement;
    if (theme === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }
  }, [theme]);

  // --- History & Editor State (persisted) ---
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('readme_ai_history');
      return saved ? JSON.parse(saved) : [
        { id: 1, name: 'react-router', time: '2 hours ago', score: 98, status: 'Success' },
        { id: 2, name: 'tailwindcss', time: 'Yesterday', score: 94, status: 'Success' },
        { id: 3, name: 'express-api', time: '3 days ago', score: 85, status: 'Archive' },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('readme_ai_history', JSON.stringify(history));
  }, [history]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [generationDone, setGenerationDone] = useState(false);

  const generateReadme = (url) => {
    setGenerationDone(false);
    setIsGenerating(true);
    // TODO: Replace with real backend API call
    setTimeout(() => {
      const parts = url.replace(/\/$/, '').split('/').filter(Boolean);
      const repoName = parts.pop() || 'new-repo';
      const newEntry = {
        id: Date.now(),
        name: repoName,
        time: 'Just now',
        score: Math.floor(Math.random() * (100 - 85) + 85),
        status: 'Success',
      };
      setHistory(prev => [newEntry, ...prev]);
      setIsGenerating(false);
      setGenerationDone(true);
    }, 2500);
  };

  const value = {
    // Auth
    isAuthenticated,
    user,
    setUser,
    login,
    logout,
    // Theme
    theme,
    toggleTheme,
    // History
    history,
    setHistory,
    // Generation
    isGenerating,
    generationDone,
    setGenerationDone,
    generateReadme,
    currentPrompt,
    setCurrentPrompt,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
