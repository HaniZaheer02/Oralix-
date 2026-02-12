import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserPreferences {
  targetLanguage: string;
  baseLanguage: string;
  goal: string;
}

interface ConversationMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface Mistake {
  id: string;
  incorrect: string;
  correct: string;
  explanation: string;
  explanationUrdu: string;
  type: 'grammar' | 'vocabulary' | 'pronunciation' | 'sentence-structure';
}

interface SessionFeedback {
  sessionId: string;
  duration: number;
  mistakes: Mistake[];
  overallScore: number;
  tips: string[];
}

interface AppContextType {
  user: { email: string; name: string } | null;
  setUser: (user: { email: string; name: string } | null) => void;
  preferences: UserPreferences;
  setPreferences: (prefs: UserPreferences) => void;
  currentSession: ConversationMessage[];
  addMessage: (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => void;
  clearSession: () => void;
  lastFeedback: SessionFeedback | null;
  setLastFeedback: (feedback: SessionFeedback | null) => void;
  isRecording: boolean;
  setIsRecording: (recording: boolean) => void;
}

const defaultPreferences: UserPreferences = {
  targetLanguage: 'English',
  baseLanguage: 'Urdu',
  goal: 'speaking-confidence',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [currentSession, setCurrentSession] = useState<ConversationMessage[]>([]);
  const [lastFeedback, setLastFeedback] = useState<SessionFeedback | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const addMessage = (message: Omit<ConversationMessage, 'id' | 'timestamp'>) => {
    const newMessage: ConversationMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setCurrentSession(prev => [...prev, newMessage]);
  };

  const clearSession = () => {
    setCurrentSession([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        preferences,
        setPreferences,
        currentSession,
        addMessage,
        clearSession,
        lastFeedback,
        setLastFeedback,
        isRecording,
        setIsRecording,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
