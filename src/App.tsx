import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { cn } from './lib/utils';

type Phase = 'intro' | 'ask' | 'celebrate';

const App = () => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);

  const noTexts = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely sure?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  const handleYes = () => {
    setPhase('celebrate');
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff1e56', '#ffacb7', '#ee82ee', '#b39cd0']
    });
  };

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
    setNoButtonPos({ x, y });
    setNoCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {phase === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-8 max-w-md px-6"
          >
            <div className="flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="text-primary w-12 h-12 fill-primary/20" />
              </motion.div>
            </div>
            <h1 className="text-4xl font-light tracking-tight text-slate-900">
              I have something I've been meaning to ask you...
            </h1>
            <Button 
              onClick={() => setPhase('ask')}
              variant="default" 
              size="lg"
              className="group"
            >
              Continue <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {phase === 'ask' && (
          <motion.div
            key="ask"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="text-center space-y-12 w-full max-w-2xl px-6 relative"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <p className="text-primary font-medium tracking-widest uppercase text-sm">A Special Question</p>
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900">
                Will you be mine?
              </h1>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Button
                onClick={handleYes}
                size="lg"
                className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
              >
                Yes, absolutely! 💖
              </Button>

              <motion.div
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onMouseEnter={handleNoHover}
                  onClick={handleNoHover}
                  className="text-lg px-8 py-6 border-slate-200 text-slate-500 hover:bg-slate-50"
                >
                  {noTexts[Math.min(noCount, noTexts.length - 1)]}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {phase === 'celebrate' && (
          <motion.div
            key="celebrate"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl font-black text-primary tracking-tighter mb-4">
                YAYYY! 💖
              </h1>
              <p className="text-xl text-slate-600 font-light">
                I'm the luckiest person in the world.
              </p>
            </motion.div>
            
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2 + i * 0.2, 
                    repeat: Infinity,
                    delay: i * 0.1 
                  }}
                >
                  <Heart className={cn(
                    "w-8 h-8",
                    i % 2 === 0 ? "text-primary fill-primary" : "text-pink-400 fill-pink-400"
                  )} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
