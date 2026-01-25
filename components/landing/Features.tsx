"use client";

import React, { useRef, useState,MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Cpu, Globe, Zap, Layers, Share2, ShieldCheck } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const features = [
  {
    title: "Instant Simulation",
    description: "Run firmware directly in the browser with our WASM-based AVR simulator.",
    icon: <Zap className="h-6 w-6 text-[#39ff14]" />,
  },
  {
    title: "Visual PCB Design",
    description: "Inspect component placement and routing with the integrated KiCanvas viewer.",
    icon: <Cpu className="h-6 w-6 text-purple-400" />,
  },
  {
    title: "Collaborative",
    description: "Share your hardware designs with a simple link. No toolchain installation required.",
    icon: <Share2 className="h-6 w-6 text-blue-400" />,
  },
  {
    title: "Modern Editor",
    description: "Full-featured Monaco editor with C++ intellisense and syntax highlighting.",
    icon: <Layers className="h-6 w-6 text-pink-400" />,
  },
  {
    title: "Cloud Native",
    description: "Access your projects from any device. All your libraries, synced automatically. ",
    icon: <Globe className="h-6 w-6 text-orange-400" />,
  },
  {
    title: "Secure Sandbox",
    description: "Test dangerous code safely in our sandboxed virtualization environment.",
    icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
  },
  {
    title: "AI Assistant",
    description: "Built-in AI Copilot that understands electronics design and firmware implementation.",
    icon: <Zap className="h-6 w-6 text-yellow-400" />,
  }
];

function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "group relative border border-white/10 bg-white/5 overflow-hidden rounded-xl",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(57, 255, 20, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export function Features() {
  return (
    <section className="relative z-10 py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Everything you need <br />
            <span className="text-gray-500">to build hardware software.</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <SpotlightCard key={feature.title} className="p-8">
              <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-white/5 p-3 ring-1 ring-white/10">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
