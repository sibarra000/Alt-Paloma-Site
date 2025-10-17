import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const handleScrollDown = () => {
    const nextSection = document.querySelector('#integrations');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const text = "Unify your great AI workflow. Access every major language model through one powerful interface. No more juggling APIs or wrestling with complexity.";
  const words = text.split(' ');

  return (
    <section className="relative bg-[#F5F5F5] py-16 md:py-24 min-h-[70vh] flex items-center overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="lg:max-w-xl">
            <p className="text-[#1A1A1A] leading-relaxed max-w-md">
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    ease: "easeOut"
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </p>
          </div>

          {/* Right side - Bold headline */}
          <div>
            <h1 className="text-[60px] md:text-[90px] lg:text-[110px] leading-[0.85] tracking-tight text-[#1A1A1A] uppercase">
              ONE PLATFORM.
              <br />
              EVERY AI
              <br />
              MODEL.
            </h1>
          </div>
        </div>
      </div>

      {/* Scroll indicator - bottom left */}
      <motion.button
        onClick={handleScrollDown}
        className="absolute bottom-8 left-8 flex flex-col items-center gap-2 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer group z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
