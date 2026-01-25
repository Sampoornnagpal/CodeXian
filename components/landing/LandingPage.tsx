"use client";

import React, { useRef, useState, MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue, Variants } from "framer-motion";
// ... imports

function Hero() {
  const router = useRouter();
  const [isWaitlistLoading, setIsWaitlistLoading] = useState(false);
  const [joinedWaitlist, setJoinedWaitlist] = useState(false);
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const handleJoinWaitlist = async () => {
    setIsWaitlistLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Add to Firestore
      await addDoc(collection(db, "waitlist"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        joinedAt: serverTimestamp(),
      });

      setJoinedWaitlist(true);
    } catch (error: any) {
      console.error("Waitlist Error:", error);
      alert("Failed to join waitlist: " + error.message);
    } finally {
      setIsWaitlistLoading(false);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center pt-32 pb-20 text-center z-10">
      <Badge />
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mb-6"
      >
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl leading-[1.1]">
          <motion.span variants={child} className="block">Hardware at the</motion.span>
          <motion.span variants={child} className="block text-gray-500">Speed of Code.</motion.span>
        </h1>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl text-lg text-gray-400 md:text-xl mb-10 leading-relaxed font-light"
      >
        The first browser-based IDE for PCB design. <br />
        Powered by AI. Built for engineering teams.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
      >
        <button 
          onClick={() => router.push('/editor')}
          className="h-12 px-8 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          Launch Demo
          <ArrowRight className="w-4 h-4" />
        </button>
        
        {joinedWaitlist ? (
           <button 
             className="h-12 px-8 rounded-full border border-green-500/50 bg-green-500/10 text-green-400 font-medium cursor-default backdrop-blur-sm flex items-center justify-center gap-2"
           >
             <CheckCircle className="w-4 h-4" />
             You're on the list!
           </button>
        ) : (
           <button 
             onClick={handleJoinWaitlist}
             disabled={isWaitlistLoading}
             className="h-12 px-8 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
           >
             {isWaitlistLoading ? (
               <>
                 <Loader2 className="w-4 h-4 animate-spin" />
                 Connecting...
               </>
             ) : "Join Waitlist"}
           </button>
        )}
      </motion.div>
    </section>
  );
}

function BentoCard({ 
  children, 
  className = "", 
  title, 
  description, 
  icon: Icon 
}: { 
  children?: React.ReactNode;
  className?: string;
  title: string;
  description: string;
  icon?: React.ElementType;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0A0A0A] p-6 sm:p-8 flex flex-col ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.1),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="mb-auto relative z-10">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white">
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-gray-400">{description}</p>
      </div>
      
      <div className="relative mt-8 min-h-[140px] w-full overflow-hidden rounded-xl border border-white/5 bg-white/5 z-10">
        {children}
      </div>
    </motion.div>
  );
}

function FeatureGrid() {
  return (
    <section className="container mx-auto px-4 pb-24 z-10 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[minmax(300px,auto)]">
        
        {/* Card 1: Browser Native (Span 2) */}
        <BentoCard 
          title="Browser Native" 
          description="No installs. Design PCBs on any device with full performance." 
          icon={Grid}
          className="md:col-span-2"
        >
          {/* Mock UI */}
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
             <div className="w-[90%] h-[90%] rounded-t-lg border border-white/10 bg-[#0F0F0F] p-2 shadow-2xl overflow-hidden relative top-4">
                <div className="flex gap-2 mb-2 border-b border-white/5 pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                  <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
                <div className="grid grid-cols-6 gap-[1px] h-full opacity-20">
                    {[...Array(24)].map((_,i) => (
                      <div key={i} className="bg-white/10 h-10 w-full" />
                    ))}
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-gray-600 font-mono">
                  Running in Chrome v121...
                </div>
             </div>
          </div>
        </BentoCard>

        {/* Card 2: AI Routing */}
        <BentoCard 
          title="AI Routing" 
          description="Generative traces. Zero conflicts. Route entire boards in seconds." 
          icon={Zap}
        >
          <div className="absolute inset-0 bg-neutral-900/50 flex items-center justify-center">
             <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 fill-none stroke-[2]">
                   <path d="M10,10 Q50,50 90,10" className="animate-[pulse_3s_ease-in-out_infinite]" />
                   <path d="M10,50 Q50,50 90,50" className="animate-[pulse_3s_ease-in-out_infinite_delay-100]" />
                   <path d="M10,90 Q50,50 90,90" className="animate-[pulse_3s_ease-in-out_infinite_delay-200]" />
                </svg>
             </div>
          </div>
        </BentoCard>

        {/* Card 3: Collaboration */}
        <BentoCard 
          title="Collaboration" 
          description="Multiplayer editing like Figma. Comment, review, and approve in real-time." 
          icon={Share2}
        >
           <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex -space-x-3">
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-xs text-white">AK</div>
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-zinc-700 flex items-center justify-center text-xs text-white">JS</div>
                 <div className="w-10 h-10 rounded-full border-2 border-black bg-white text-black flex items-center justify-center text-xs font-bold">+4</div>
              </div>
           </div>
        </BentoCard>

        {/* Card 4: Instant Mfg (Span 2) */}
        <BentoCard 
          title="Instant Manufacturing" 
          description="One-click export to Gerber, BOM, and Pick-and-Place files." 
          icon={Layers}
          className="md:col-span-2 md:col-start-2 lg:col-span-2"
        >
           <div className="absolute inset-0 flex items-center justify-around px-8 bg-zinc-950/50">
              <div className="h-16 w-24 rounded border border-white/10 bg-zinc-900 flex items-center justify-center text-xs text-gray-500 font-mono">GERBER</div>
              <ArrowRight className="text-white/20" />
              <div className="h-16 w-24 rounded border border-white/10 bg-zinc-900 flex items-center justify-center text-xs text-gray-500 font-mono">BOM</div>
              <ArrowRight className="text-white/20" />
              <div className="h-16 w-24 rounded border border-white/10 bg-white text-black flex items-center justify-center text-xs font-bold font-mono">SHIP</div>
           </div>
        </BentoCard>

        {/* Card 5: Sandbox (Filler) */}
        <BentoCard 
           title="Secure Sandbox"
           description="WASM-based virtualization."
           icon={Terminal}
           className="hidden lg:flex"
        >
           <div className="p-4 font-mono text-[10px] text-green-400/80 leading-tight">
              &gt; initializing sandbox...<br/>
              &gt; loading avr-gcc...<br/>
              &gt; verified safe.<br/>
              <span className="animate-pulse">_</span>
           </div>
        </BentoCard>
      </div>
    </section>
  );
}

export function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-x-hidden">
      {/* Subtle Grid Background */}
      <div className="fixed inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="fixed inset-0 z-0 bg-black [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_0%,#000_100%)]"></div>

      <Hero />
      <FeatureGrid />
      
      <footer className="py-12 text-center text-sm text-gray-600 relative z-10 border-t border-white/5">
        <p>© 2026 Codexian Inc. Engineering the future.</p>
      </footer>
    </main>
  );
}
