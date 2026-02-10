import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Lightbulb, RotateCcw, Home, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MistakeCard } from '@/components/feedback/MistakeCard';
import { ScoreCircle } from '@/components/feedback/ScoreCircle';
import { Scene3D } from '@/components/3d/Scene3D';
import { FloatingStar, FloatingBubble } from '@/components/3d/FloatingElements';
import { ParticleField } from '@/components/3d/ParticleField';
import { useApp } from '@/contexts/AppContext';

export default function Feedback() {
  const navigate = useNavigate();
  const { lastFeedback } = useApp();

  const feedback = lastFeedback || {
    sessionId: 'demo',
    duration: 180,
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
      {
        id: '3',
        incorrect: "for buying vegetables",
        correct: "to buy vegetables",
        explanation: "Use 'to + verb' to express purpose, not 'for + verb-ing' in this context.",
        explanationUrdu: "مقصد بتانے کے لیے 'to + فعل' استعمال کریں، نہ کہ 'for + فعل-ing'۔",
        type: 'sentence-structure' as const,
      },
    ],
    tips: [
      "Practice using past tense verbs more consistently",
      "Remember: 'since' is for specific time points, 'for' is for duration",
      "Use 'to + infinitive' when expressing purpose after verbs of motion",
    ],
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: "Excellent work!", emoji: "🎉" };
    if (score >= 60) return { text: "Good progress!", emoji: "👍" };
    if (score >= 40) return { text: "Keep practicing!", emoji: "💪" };
    return { text: "Don't give up!", emoji: "🌟" };
  };

  const scoreMessage = getScoreMessage(feedback.overallScore);

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-4 py-3">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-display font-bold text-lg">Session Feedback</h1>
          <div className="w-10" />
        </div>
      </header>

      {/* Score Section with 3D */}
      <section className="relative h-[40vh] min-h-[280px]">
        <div className="absolute inset-0 pointer-events-none">
          <Scene3D showStars={false} cameraPosition={[0, 0, 6]}>
            <FloatingStar position={[-2.5, 1.5, -1]} scale={0.8} />
            <FloatingStar position={[2.5, 2, -1.5]} scale={0.6} />
            <FloatingStar position={[-3, -1, -2]} scale={0.5} />
            <FloatingStar position={[3, -0.5, -1]} scale={0.7} />
            <FloatingBubble position={[-2, -1.5, -1]} scale={0.4} color="#14b8a6" />
            <FloatingBubble position={[2, 1, -2]} scale={0.5} color="#0d9488" />
            <ParticleField count={80} color="#fbbf24" />
          </Scene3D>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ScoreCircle score={feedback.overallScore} label="Overall Score" size="lg" />
          </motion.div>
          
          <motion.div 
            className="mt-4 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-3xl">{scoreMessage.emoji}</span>
            <span className="text-xl font-bold text-foreground">{scoreMessage.text}</span>
          </motion.div>

          <motion.div 
            className="flex items-center gap-4 mt-4 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{formatDuration(feedback.duration)}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{feedback.mistakes.length} corrections</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <div className="relative z-10 bg-card rounded-t-3xl -mt-6 border-t border-border min-h-[50vh]">
        <div className="p-6 space-y-6">
          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-3 gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 text-center bg-success/10 border-success/20">
              <Trophy className="w-5 h-5 mx-auto mb-1 text-success" />
              <p className="text-xs text-muted-foreground">Fluency</p>
              <p className="text-lg font-bold text-success">Good</p>
            </Card>
            <Card className="p-4 text-center bg-warning/10 border-warning/20">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-warning" />
              <p className="text-xs text-muted-foreground">Grammar</p>
              <p className="text-lg font-bold text-warning">Improving</p>
            </Card>
            <Card className="p-4 text-center bg-primary/10 border-primary/20">
              <Lightbulb className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-xs text-muted-foreground">Vocabulary</p>
              <p className="text-lg font-bold text-primary">Strong</p>
            </Card>
          </motion.div>

          {/* Mistakes Section */}
          <div>
            <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center text-sm text-destructive font-bold">
                {feedback.mistakes.length}
              </span>
              Areas to Improve
            </h2>
            
            <div className="space-y-4">
              {feedback.mistakes.map((mistake, index) => (
                <MistakeCard
                  key={mistake.id}
                  {...mistake}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="p-5 bg-gradient-to-br from-accent/50 to-accent/20 border-accent/30">
            <h2 className="text-lg font-display font-bold mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-warning/20 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-warning" />
              </div>
              Pro Tips
            </h2>
            <ul className="space-y-3">
              {feedback.tips.map((tip, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-start gap-3 text-sm text-foreground"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  {tip}
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 pb-8">
            <Button
              variant="outline"
              className="flex-1 h-12"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <Button
              className="flex-1 h-12 bg-gradient-primary shadow-glow"
              onClick={() => navigate('/conversation')}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Practice Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
