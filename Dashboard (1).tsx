import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, 
  Clock, 
  TrendingUp, 
  Crown, 
  Settings,
  ChevronRight,
  Calendar,
  Target,
  Flame,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Logo } from '@/components/ui/Logo';
import { Scene3D } from '@/components/3d/Scene3D';
import { FloatingMascot } from '@/components/3d/FloatingMascot';
import { FloatingBubble, FloatingStar } from '@/components/3d/FloatingElements';
import { ParticleField } from '@/components/3d/ParticleField';
import { useApp } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';

const recentSessions = [
  { id: '1', date: 'Today', duration: '3:45', score: 78 },
  { id: '2', date: 'Yesterday', duration: '5:20', score: 72 },
  { id: '3', date: '2 days ago', duration: '4:10', score: 65 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, preferences } = useApp();
  const isMobile = useIsMobile();

  const stats = {
    streak: 5,
    totalMinutes: 127,
    sessionsThisWeek: 8,
    averageScore: 72,
    dailyLimitUsed: 3,
    dailyLimit: 5,
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 glass px-4 py-3">
        <div className="flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-warning hover:text-warning"
              onClick={() => navigate('/pricing')}
            >
              <Crown className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Upgrade</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Text left, Mascot right on desktop */}
      <section className="relative px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground">
              Hello, {user?.name || 'Learner'}! 
              <motion.span
                animate={{ rotate: [0, 20, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block ml-2"
              >
                👋
              </motion.span>
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Ready to practice your {preferences.targetLanguage}?
            </p>

            {/* Streak Badge */}
            <motion.div
              className="flex items-center justify-center lg:justify-start gap-3 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-warning/20 border border-warning/30">
                <Flame className="w-5 h-5 text-warning" />
                <span className="font-bold text-warning">{stats.streak} Day Streak!</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Mascot Container */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{ 
              width: isMobile ? '200px' : '280px', 
              height: isMobile ? '200px' : '280px' 
            }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/30 via-transparent to-transparent rounded-full blur-2xl" />
            
            <Scene3D showStars={false} cameraPosition={[0, 0, isMobile ? 4 : 3.5]}>
              <FloatingMascot position={[0, 0, 0]} scale={isMobile ? 0.75 : 0.95} />
              <FloatingBubble position={[-1.5, 0.8, -1]} scale={0.25} color="#14b8a6" />
              <FloatingStar position={[1.5, 0.5, -0.8]} scale={0.2} />
              <ParticleField count={20} color="#14b8a6" />
            </Scene3D>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="relative z-10 bg-card rounded-t-3xl border-t border-border min-h-[60vh]">
        <div className="p-6 space-y-6 max-w-4xl mx-auto">
          {/* Daily Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-4 bg-gradient-to-r from-accent/30 to-accent/10 border-accent/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-medium">Daily Practice</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {stats.dailyLimitUsed}/{stats.dailyLimit} min
                </span>
              </div>
              <Progress 
                value={(stats.dailyLimitUsed / stats.dailyLimit) * 100} 
                className="h-3"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {stats.dailyLimit - stats.dailyLimitUsed} minutes remaining today • Upgrade for unlimited
              </p>
            </Card>
          </motion.div>

          {/* Start Practice Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              size="lg"
              className="w-full h-16 text-lg bg-gradient-primary shadow-glow group"
              onClick={() => navigate('/conversation')}
            >
              <motion.div
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <Mic className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Start Speaking
              </motion.div>
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Flame, value: stats.streak, label: 'Day Streak', color: 'warning' },
              { icon: Clock, value: stats.totalMinutes, label: 'Total Minutes', color: 'primary' },
              { icon: Target, value: `${stats.averageScore}%`, label: 'Avg. Score', color: 'success' },
              { icon: Calendar, value: stats.sessionsThisWeek, label: 'This Week', color: 'accent-foreground' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <Card className="p-4 text-center hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 mx-auto mb-2 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                  </div>
                  <p className="text-2xl font-display font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Sessions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-display font-bold">Recent Sessions</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                See All
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Card 
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors"
                    onClick={() => navigate('/feedback')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{session.date}</p>
                        <p className="text-sm text-muted-foreground">{session.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xl font-bold ${
                        session.score >= 70 ? 'text-success' : 'text-warning'
                      }`}>
                        {session.score}%
                      </span>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upgrade Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card 
              className="p-5 bg-gradient-primary text-primary-foreground cursor-pointer overflow-hidden relative"
              onClick={() => navigate('/pricing')}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
              <div className="absolute -right-2 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
              
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Crown className="w-6 h-6" />
                    <span className="text-lg font-bold">Upgrade to Pro</span>
                  </div>
                  <p className="text-sm opacity-90">
                    Unlimited practice • Full feedback • Priority support
                  </p>
                </div>
                <ChevronRight className="w-6 h-6" />
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
