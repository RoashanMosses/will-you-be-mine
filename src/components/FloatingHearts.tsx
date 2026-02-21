import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface FloatingHeart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);

  useEffect(() => {
    // Generate random hearts
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // Random horizontal position (0-100%)
      size: Math.random() * 20 + 10, // Random size between 10px and 30px
      duration: Math.random() * 10 + 10, // Random duration between 10s and 20s
      delay: Math.random() * 10, // Random delay
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 1, 0], // Fade in, then out
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "linear",
          }}
          className="absolute"
        >
          <Heart
            size={heart.size}
            className="text-pink-200 fill-pink-100/50"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
