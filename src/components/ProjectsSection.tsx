//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion } from 'framer-motion';
import { AnimatedCard, cn } from './Common';
import { ExternalLink, Terminal, Shield, Cpu, PawPrint, Folder, Box } from 'lucide-react';

const STATIC_PROJECTS = [
  {
    id: 'axiomos',
    name: "AxiomOS",
    description: "A custom 64-bit operating system built from scratch using Zig. Targets UEFI/Secure Boot with a focus on modern Intel hardware and high-performance kernel architecture.",
    html_url: "https://github.com/Veridian-Zenith/AxiomOS",
    topics: ["system", "zig", "osdev", "kernel"],
    language: "Zig",
    icon: Cpu
  },
  {
    id: 'voix',
    name: "Voix",
    description: "A secure privilege management tool (sudo/doas alternative) featuring PAM authentication, and a focus on minimal attack surface.",
    html_url: "https://github.com/Veridian-Zenith/Voix",
    topics: ["system", "security", "c++", "linux"],
    language: "C++",
    icon: Shield
  },
  {
    id: 'meshiji',
    name: "Meshiji",
    description: "A modern, cross-platform file explorer built with Flutter. Provides a clean, intuitive interface for managing files across Linux, Windows, and macOS.",
    html_url: "https://github.com/Veridian-Zenith/meshiji",
    topics: ["app", "flutter", "dart", "ui"],
    language: "Dart",
    icon: Folder
  },
  {
    id: 'peguni',
    name: "Peguni Draem'la",
    description: "A text-based virtual pet simulator featuring a unique constructed language (Vaesktöng). A companion in the terminal, built for the void.",
    html_url: "https://github.com/Veridian-Zenith/peguni_draem-la",
    topics: ["game", "lua", "conlang"],
    language: "Lua",
    icon: PawPrint
  },
  {
    id: 'misc',
    name: "Misc",
    description: "A repository of experimental artifacts and system utilities, including ZigSysMon—a lightweight /proc monitor—alongside benchmarks and FFI experiments.",
    html_url: "https://github.com/Veridian-Zenith/Misc",
    topics: ["collection", "zigsysmon", "benchmarks", "tools"],
    language: "Zig/Multi",
    icon: Box
  }
];

const topicColors: Record<string, string> = {
  web: 'border-amber-500/50 text-amber-500',
  app: 'border-red-500/50 text-red-500',
  game: 'border-gold-500/50 text-gold-500',
  system: 'border-purple-500/50 text-purple-500',
  collection: 'border-blue-500/50 text-blue-500',
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl sm:text-6xl font-bold text-center mb-16 text-amber-500 drop-shadow-[0_0_10px_rgba(255,179,71,0.5)]"
      >
        Arcane Artifacts
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STATIC_PROJECTS.map((repo, index) => (
          <AnimatedCard
            key={repo.id}
            delay={index * 0.1}
            glowColor={index % 3 === 0 ? 'amber' : index % 3 === 1 ? 'red' : 'gold'}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/5 rounded-lg text-amber-500">
                    <repo.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-100">{repo.name}</h3>
                </div>
              </div>
              <p className="text-gray-400 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
                {repo.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {repo.topics.map(topic => (
                  <span
                    key={topic}
                    className={cn(
                      "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border bg-black/40 font-bold",
                      topicColors[topic] || 'border-gray-500/50 text-gray-400'
                    )}
                  >
                    {topic}
                  </span>
                ))}
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-gold-500/50 text-gold-500 bg-black/40 font-bold">
                  {repo.language}
                </span>
              </div>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-amber-500 hover:text-red-500 transition-colors mt-auto font-semibold text-sm"
              >
                Inspect Rune
                <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </AnimatedCard>
        ))}

        {/* Placeholder for future growth */}
        <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white/5 opacity-50">
          <Terminal size={32} className="text-gray-500 mb-4" />
          <p className="text-gray-400 italic">More artifacts currently being forged in the void...</p>
        </div>
      </div>
    </section>
  );
};
