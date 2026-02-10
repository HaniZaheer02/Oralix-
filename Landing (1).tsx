import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, MessageCircle, Mic, BookOpen, Star, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/Logo';
import { Scene3D } from '@/components/3d/Scene3D';
import { FloatingMascot } from '@/components/3d/FloatingMascot';
import { FloatingBubble, FloatingStar, FloatingBook } from '@/components/3d/FloatingElements';
import { ParticleField } from '@/components/3d/ParticleField';
import { useIsMobile } from '@/hooks/use-mobile';

const features = [
  {
    icon: Mic,
    title: 'Speak Freely',
    description: 'Practice speaking without fear of judgment',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: MessageCircle,
    title: 'Natural Conversations',
    description: 'AI responds like a real speaking partner',
    color: 'from-accent/40 to-accent/10',
  },
  {
    icon: BookOpen,
    title: 'Learn in Urdu',
    description: 'Mistakes explained in your language',
    color: 'from-warning/20 to-warning/5',
  },
];

const testimonials = [
  { name: 'Ahmed', role: 'IELTS Student', text: 'Finally, I can practice speaking anytime!', avatar: '👨‍🎓' },
  { name: 'Fatima', role: 'Job Seeker', text: 'My interview confidence improved so much.', avatar: '👩‍💼' },
  { name: 'Hassan', role: 'University Student', text: 'The Urdu explanations help me understand better!', avatar: '👨‍💻' },
];

export default function Landing() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden">
      {/* Hero Section - Split Layout */}
      <section className="relative min-h-screen flex flex-col">
        {/* Header */}
        <header className="relative z-20 px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Logo size="md" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          </motion.div>
        </header>

        {/* Main Hero Content - Desktop: Side by side, Mobile: Stacked */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-12 gap-8 lg:gap-16">
          
          {/* Text Content - Left side on desktop */}
          <motion.div 
            className="relative z-20 flex-1 max-w-xl text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/80 backdrop-blur-sm border border-border mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-accent-foreground">AI-Powered Language Coach</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
              Speak English with
              <span className="text-gradient block mt-2">Confidence</span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
              Practice speaking with AI. Get corrections explained clearly in Urdu.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto lg:mx-0">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg bg-gradient-primary hover:opacity-90 shadow-glow"
                onClick={() => navigate('/onboarding')}
              >
                Start Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1 h-14 text-lg glass"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </motion.div>

          {/* 3D Mascot - Right side on desktop, top on mobile */}
          <motion.div 
            className="relative flex-1 w-full max-w-lg order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ height: isMobile ? '280px' : '450px' }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
            
            <Scene3D cameraPosition={[0, 0, isMobile ? 5 : 4.5]} showStars={false}>
              <FloatingMascot 
                position={[0, isMobile ? 0 : -0.2, 0]} 
                scale={isMobile ? 0.9 : 1.3} 
              />
              <FloatingBubble position={[-2, 1.5, -2]} scale={isMobile ? 0.4 : 0.6} color="#14b8a6" />
              <FloatingBubble position={[2, -1, -2]} scale={isMobile ? 0.3 : 0.5} color="#0d9488" />
              <FloatingStar position={[2, 1.5, -1.5]} scale={isMobile ? 0.3 : 0.5} />
              <FloatingStar position={[-1.5, -1, -1]} scale={isMobile ? 0.25 : 0.4} />
              {!isMobile && <FloatingBook position={[2.5, -0.5, -1.5]} rotation={[0.2, -0.5, 0.1]} />}
              <ParticleField count={isMobile ? 30 : 60} color="#14b8a6" />
            </Scene3D>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="relative z-10 pb-8 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
            <div className="w-1.5 h-3 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6 bg-card">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose <span className="text-gradient">Oralix</span>?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              The smartest way to improve your English speaking skills
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={`relative p-6 rounded-2xl bg-gradient-to-br ${feature.color} border border-border overflow-hidden group`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="w-14 h-14 rounded-xl bg-background shadow-md flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>

                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Loved by <span className="text-gradient">Students</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-warning text-warning" />
                  ))}
                </div>
                
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-50">
          <Scene3D showStars={true} cameraPosition={[0, 0, 10]}>
            <ParticleField count={150} color="#14b8a6" />
          </Scene3D>
        </div>

        <motion.div 
          className="relative z-10 max-w-2xl mx-auto text-center p-10 rounded-3xl bg-gradient-primary"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Ready to Speak Better?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Start with 5 minutes of free practice daily
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="h-14 px-8 text-lg bg-background text-foreground hover:bg-background/90"
              onClick={() => navigate('/onboarding')}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size="sm" />
          <p className="text-sm text-muted-foreground">
            © 2024 Oralix. Made with ❤️ for language learners.
          </p>
        </div>
      </footer>
    </div>
  );
}
