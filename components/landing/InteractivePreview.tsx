"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function InteractivePreview() {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = ref.current?.getBoundingClientRect();

    if (!rect) return;

    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative z-10 py-24 bg-black overflow-hidden perspective-1000">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-5xl text-white">
          The power of a lab. <br />
          <span className="text-gray-500">In your browser.</span>
        </h2>
        
        {/* Mock Interface Container - With Tilt */}
        <motion.div
           ref={ref}
           onMouseMove={handleMouseMove}
           onMouseLeave={handleMouseLeave}
           style={{
             rotateX,
             rotateY,
             transformStyle: "preserve-3d",
           }}
           initial={{ opacity: 0, scale: 0.9, y: 40 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           viewport={{ once: true }}
           className="relative mx-auto max-w-6xl rounded-xl border border-white/10 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(8,_112,_184,_0.1)] overflow-hidden"
        >
          {/* Reflection Glare */}
          <div 
             className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Header */}
          <div className="flex items-center gap-2 border-b border-white/5 bg-white/5 px-4 py-3">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-500/20 shadow-inner" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/20 shadow-inner" />
              <div className="h-3 w-3 rounded-full bg-green-500/20 shadow-inner" />
            </div>
            <div className="ml-4 h-6 w-64 rounded-md bg-white/5" />
          </div>

          {/* Body Split */}
          <div className="flex h-[500px] flex-col md:flex-row">
            {/* Sidebar */}
            <div className="hidden w-16 flex-col items-center gap-4 border-r border-white/5 py-4 md:flex">
               {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded-md bg-white/5" />
               ))}
            </div>

            {/* Code Editor Mockup */}
            <div className="flex-1 p-6 text-left font-mono text-sm">
                <div className="text-gray-500">1</div>
                <div className="text-gray-500">2</div>
                <div className="text-gray-500">3</div>
                <div className="pl-6 text-pink-400">void <span className="text-blue-400">setup</span>() {'{'}</div>
                <div className="pl-10 text-white">pinMode(LED_BUILTIN, OUTPUT);</div>
                <div className="pl-6 text-white">{'}'}</div>
                <div className="text-gray-500">4</div>
                <div className="pl-6 text-pink-400">void <span className="text-blue-400">loop</span>() {'{'}</div>
                <div className="pl-10 text-white">digitalWrite(LED_BUILTIN, HIGH);</div>
                <div className="pl-10 text-white">delay(<span className="text-green-400">1000</span>);</div>
                <div className="pl-10 text-white">digitalWrite(LED_BUILTIN, LOW);</div>
                <div className="pl-10 text-white">delay(<span className="text-green-400">1000</span>);</div>
                <div className="pl-6 text-white">{'}'}</div>
                
                {/* Cursor Animation */}
                <motion.div 
                  className="mt-1 ml-10 h-5 w-2 bg-[#39ff14]"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
            </div>

            {/* Preview Panel Mockup */}
            <div className="relative flex-1 border-l border-white/5 bg-black/50 p-6 flex flex-col items-center justify-center">
               <div className="relative h-64 w-64 rounded bg-[#004d40] opacity-80 shadow-inner border border-white/5 flex items-center justify-center translate-z-10 transform-gpu">
                  <span className="text-xs text-white/30 font-mono tracking-widest uppercase">Arduino Uno</span>
                  {/* Blinking LED Effect */}
                  <motion.div
                    className="absolute top-10 right-10 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
