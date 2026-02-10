import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Clock, XCircle, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { MicrophoneButton } from '@/components/conversation/MicrophoneButton';
import { Waveform } from '@/components/conversation/Waveform';
import { TranscriptPanel } from '@/components/conversation/TranscriptPanel';
import { Scene3D } from '@/components/3d/Scene3D';
import { FloatingMascot } from '@/components/3d/FloatingMascot';
import { SoundWave, FloatingBubble } from '@/components/3d/FloatingElements';
import { ParticleField } from '@/components/3d/ParticleField';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function Conversation() {
  const navigate = useNavigate();
  const { isRecording, addMessage, clearSession, setLastFeedback, currentSession } = useApp();
  const [sessionTime, setSessionTime] = useState(0);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const isMobile = useIsMobile();

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartRecording = () => {
    console.log('Recording started');
  };

  const handleStopRecording = () => {
    const mockUserMessages = [
      "Hello, I want to practice speaking English today.",
      "Yesterday I goes to the market for buying vegetables.",
      "I am studying English since three years.",
      "The weather is very good today, isn't it?",
    ];
    
    const randomMessage = mockUserMessages[Math.floor(Math.random() * mockUserMessages.length)];
    addMessage({ role: 'user', content: randomMessage });

    setAiSpeaking(true);
    setTimeout(() => {
      const aiResponses = [
        "That's wonderful! What would you like to talk about? Feel free to share anything on your mind.",
        "I see! Tell me more about your experience at the market. What did you buy?",
        "That's great dedication to learning! What made you want to learn English?",
        "Yes, it really is! Perfect weather for a walk. Do you enjoy spending time outdoors?",
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage({ role: 'ai', content: randomResponse });
      setAiSpeaking(false);
    }, 2000);
  };

  const handleEndSession = () => {
    const mockFeedback = {
      sessionId: crypto.randomUUID(),
      duration: sessionTime,
      overallScore: 72,
      mistakes: [
        {
          id: '1',
          incorrect: "Yesterday I goes to the market",
          correct: "Yesterday I went to the market",
          explanation: "Use past tense 'went' for actions that happened in the past.",
          explanationUrdu: "ماضی میں ہونے والے کاموں کے لیے 'went' استعمال کریں۔ 'Goes' حال کے لیے ہے۔",
          type: 'grammar' as const,
        },
        {
          id: '2',
          incorrect: "I am studying English since three years",
          correct: "I have been studying English for three years",
          explanation: "Use 'have been' with 'for' to describe duration of ongoing actions.",
          explanationUrdu: "جاری کاموں کی مدت بتانے کے لیے 'have been' اور 'for' استعمال کریں۔",
          type: 'grammar' as const,
        },
      ],
      tips: [
        "Practice using past tense verbs more consistently",
        "Remember: 'since' is for specific time, 'for' is for duration",
      ],
    };

    setLastFeedback(mockFeedback);
    clearSession();
    navigate('/feedback');
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => setShowEndDialog(true)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Logo size="sm" showText={false} />
          <div className="flex items-center gap-2">
            <motion.div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-sm font-medium"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatTime(sessionTime)}
            </motion.div>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Centered layout */}
      <div className="flex-1 flex flex-col relative">
        
        {/* 3D Mascot Section - Properly sized and centered */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div 
            className="relative w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ height: isMobile ? '260px' : '350px' }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/25 via-transparent to-transparent rounded-full blur-3xl" />
            
            <Scene3D showStars={false} cameraPosition={[0, 0, isMobile ? 4.5 : 4]}>
              <FloatingMascot 
                position={[0, isMobile ? 0 : -0.2, 0]} 
                scale={isMobile ? 1 : 1.3} 
                isListening={isRecording || aiSpeaking} 
              />
              <FloatingBubble position={[-2, 1, -1.5]} scale={0.3} color="#14b8a6" />
              <FloatingBubble position={[2, 1, -1.5]} scale={0.25} color="#0d9488" />
              {(isRecording || aiSpeaking) && (
                <SoundWave position={[0, -1.2, 1]} isActive={true} />
              )}
              <ParticleField count={isMobile ? 25 : 40} color="#14b8a6" />
            </Scene3D>
          </motion.div>

          {/* Status Badge - Below mascot */}
          <motion.div
            className={`mt-4 px-5 py-2.5 rounded-full backdrop-blur-md ${
              aiSpeaking 
                ? 'bg-primary/20 text-primary border border-primary/30' 
                : isRecording 
                  ? 'bg-destructive/20 text-destructive border border-destructive/30'
                  : 'bg-card/80 text-muted-foreground border border-border'
            }`}
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex items-center gap-2">
              {aiSpeaking && <Volume2 className="w-4 h-4 animate-pulse" />}
              <span className="text-sm font-medium">
                {aiSpeaking ? 'Oralix is speaking...' : isRecording ? 'Listening...' : 'Tap to speak'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Transcript Toggle & Panel */}
        <div className="bg-card/50 backdrop-blur-sm rounded-t-3xl border-t border-border">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <motion.div 
              className="w-12 h-1 rounded-full bg-muted-foreground/30"
              animate={{ width: showTranscript ? 24 : 48 }}
            />
          </button>

          <AnimatePresence>
            {showTranscript && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden max-h-[30vh]"
              >
                <TranscriptPanel />
              </motion.div>
            )}
          </AnimatePresence>

          {/* User Waveform */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 py-4"
              >
                <Waveform isActive={isRecording} variant="user" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="sticky bottom-0 bg-gradient-to-t from-background via-background/95 to-transparent pt-6 pb-8 px-6">
          <div className="flex flex-col items-center gap-5">
            <MicrophoneButton
              onStart={handleStartRecording}
              onStop={handleStopRecording}
              disabled={aiSpeaking}
            />
            
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setShowEndDialog(true)}
            >
              <XCircle className="w-4 h-4 mr-2" />
              End Session
            </Button>
          </div>
        </div>
      </div>

      {/* End Session Dialog */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>End this session?</AlertDialogTitle>
            <AlertDialogDescription>
              You've been practicing for {formatTime(sessionTime)}. 
              {currentSession.length > 0 
                ? " We'll analyze your conversation and show you feedback on your mistakes."
                : " Start speaking to get personalized feedback!"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Practice</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndSession}>
              {currentSession.length > 0 ? 'See My Feedback' : 'End Session'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
