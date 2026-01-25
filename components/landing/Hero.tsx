"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const router = useRouter();

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9] as any,
      },
    }),
  };

  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-indigo-500/30 selection:text-indigo-400">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/15 rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      </div>
      
      {/* Content */}
      <div className="z-10 flex max-w-6xl flex-col items-center px-4 text-center pt-24 pb-12">
        
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl shadow-[0_0_20px_-10px_rgba(255,255,255,0.2)]"
        >
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20">
             <Zap className="h-3 w-3 text-indigo-400 fill-indigo-400" />
          </div>
          <span className="text-sm font-medium text-gray-200 tracking-wide">
            Next Gen Hardware Design
          </span>
        </motion.div>

        {/* Headline */}
        <h1 className="mb-8 text-6xl font-black tracking-[-0.04em] sm:text-7xl md:text-8xl leading-tight">
           <motion.div 
              custom={0} 
              variants={textVariants} 
              initial="hidden" 
              animate="visible"
              className="flex flex-col items-center gap-2"
           >
             <span className="block text-white drop-shadow-2xl">
               Build Hardware
             </span>
             <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600 pb-4">
               At Speed of Code.
             </span>
           </motion.div>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12 max-w-3xl text-lg text-gray-400 md:text-xl font-light leading-relaxed tracking-wide"
        >
          The first browser-based IDE for hardware engineering. <br className="hidden md:block"/>
          <span className="text-gray-300 font-normal">Simulate circuits</span>, <span className="text-gray-300 font-normal">visualize designs</span>, and <span className="text-gray-300 font-normal">code firmware</span>.
        </motion.p>
        
        {/* Buttons Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-col w-full xs:w-auto sm:flex-row items-center justify-center gap-8"
        >
          {/* Primary Glowing Button */}
          <button 
             className="group relative w-full sm:w-auto"
             onClick={() => {}}
          >
             <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-70 blur-md transition duration-200 group-hover:opacity-100 group-hover:blur-lg" />
             <div className="relative flex h-14 w-full sm:w-56 items-center justify-center gap-2 rounded-xl bg-black px-8 font-bold text-white transition-all hover:bg-gray-900 active:scale-95">
               <span>Join Waitlist</span>
               <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
             </div>
          </button>

           {/* Secondary Glass Button */}
           <button 
             onClick={() => router.push('/editor')}
             className="group relative w-full sm:w-auto"
           >
             <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 transition-opacity group-hover:opacity-100" />
             <div className="relative flex h-14 w-full sm:w-56 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 font-semibold text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
               <span>Launch Demo</span>
             </div>
           </button>
        </motion.div>
      </div>
            
    </div>
  );
}
