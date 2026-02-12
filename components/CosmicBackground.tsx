
import React from 'react';

export const CosmicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[-1] w-full h-full overflow-hidden pointer-events-none">
       {/* Grid Overlay with Smooth Faded Edges */}
       <div 
         className="absolute inset-0"
         style={{
           backgroundImage: `linear-gradient(to right, var(--grid-color) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px)`,
           backgroundSize: '50px 50px',
           maskImage: 'radial-gradient(circle at center, black 0%, transparent 85%)',
           WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 85%)',
         }}
       />

      {/* Nebula Orb 1: Top Left - Violet/Purple */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-100 animate-float-slow"
        style={{ 
          background: 'radial-gradient(circle at center, var(--nebula-1) 0%, transparent 60%)',
        }}
      />
      
      {/* Nebula Orb 2: Bottom Right - Blue */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[80px] md:blur-[120px] opacity-100 animate-float-slow"
        style={{ 
          background: 'radial-gradient(circle at center, var(--nebula-2) 0%, transparent 60%)',
          animationDelay: '-5s'
        }}
      />

      {/* Nebula Orb 3: Center/Top - Subtle Pink/Teal */}
      <div 
        className="absolute top-[20%] left-[30%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] md:blur-[140px] opacity-80 animate-pulse-slow"
        style={{ 
          background: 'radial-gradient(circle at center, var(--nebula-3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};
