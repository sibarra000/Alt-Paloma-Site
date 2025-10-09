import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function SnakeArrow() {
  const [trail, setTrail] = useState<{ x: number; y: number; rotation: number }[]>([]);
  
  // Define a smooth curved path around the hero section
  const pathPoints = [
    { x: 15, y: 20 },
    { x: 25, y: 18 },
    { x: 35, y: 22 },
    { x: 45, y: 28 },
    { x: 55, y: 35 },
    { x: 65, y: 40 },
    { x: 75, y: 42 },
    { x: 85, y: 38 },
    { x: 90, y: 32 },
    { x: 88, y: 25 },
    { x: 82, y: 20 },
    { x: 75, y: 22 },
    { x: 68, y: 28 },
    { x: 60, y: 35 },
    { x: 52, y: 42 },
    { x: 45, y: 48 },
    { x: 38, y: 52 },
    { x: 30, y: 55 },
    { x: 22, y: 58 },
    { x: 15, y: 62 },
    { x: 10, y: 68 },
    { x: 12, y: 75 },
    { x: 18, y: 78 },
    { x: 25, y: 75 },
    { x: 32, y: 70 },
    { x: 38, y: 65 },
    { x: 42, y: 58 },
    { x: 35, y: 50 },
    { x: 28, y: 45 },
    { x: 20, y: 38 },
    { x: 15, y: 30 },
    { x: 15, y: 20 },
  ];

  const maxTrailLength = 40;
  const totalDuration = 30; // seconds for one complete loop

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full">
        {/* Draw the snake body/trail */}
        {trail.length > 1 && (
          <motion.path
            d={`M ${trail.map((point) => `${point.x},${point.y}`).join(' L ')}`}
            stroke="#1A1A1A"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.12"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </svg>

      {/* Arrow head */}
      <motion.div
        className="absolute"
        style={{
          width: '32px',
          height: '32px',
        }}
        animate={{
          left: pathPoints.map(p => `${p.x}%`),
          top: pathPoints.map(p => `${p.y}%`),
        }}
        transition={{
          duration: totalDuration,
          repeat: Infinity,
          ease: "linear",
        }}
        onUpdate={(latest) => {
          if (typeof latest.left === 'string' && typeof latest.top === 'string') {
            const x = parseFloat(latest.left);
            const y = parseFloat(latest.top);
            
            setTrail(prev => {
              const newTrail = [...prev];
              
              // Calculate rotation based on direction of movement
              let rotation = 0;
              if (newTrail.length > 0) {
                const lastPoint = newTrail[newTrail.length - 1];
                const dx = x - lastPoint.x;
                const dy = y - lastPoint.y;
                rotation = Math.atan2(dy, dx) * (180 / Math.PI);
              }
              
              newTrail.push({ x, y, rotation });
              
              // Keep trail at max length
              if (newTrail.length > maxTrailLength) {
                newTrail.shift();
              }
              
              return newTrail;
            });
          }
        }}
      >
        {/* Arrow head SVG */}
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transform: trail.length > 0 ? `rotate(${trail[trail.length - 1].rotation}deg)` : 'rotate(0deg)',
          }}
        >
          <path
            d="M5 12h14m0 0l-6-6m6 6l-6 6"
            stroke="#1A1A1A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.15"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
