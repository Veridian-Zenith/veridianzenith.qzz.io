//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2026 Dae Euhwa

import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, ExternalLink, Send, Terminal } from 'lucide-react';
import { AnimatedCard, InteractiveButton } from '../components/Common';

export const ContactPage = () => {
  const contactInfo = [
    {
      icon: User,
      label: "Architect",
      value: "Dae Euhwa",
      sub: "Lead Developer",
      color: "amber"
    },
    {
      icon: Mail,
      label: "Email",
      value: "daedaevibin@naver.com",
      href: "mailto:daedaevibin@naver.com",
      color: "red"
    },
    {
      icon: Terminal,
      label: "The Forge",
      value: "Veridian-Zenith",
      href: "https://github.com/Veridian-Zenith",
      color: "gold"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 max-w-5xl mx-auto min-h-screen relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl sm:text-7xl font-bold text-amber-500 mb-6 drop-shadow-[0_0_20px_rgba(255,179,71,0.4)]">
          Summon The Architect
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg italic leading-relaxed">
          "The runes are cast, the signals sent. Reach through the void and influence the digital forge."
        </p>
      </motion.div>

      {/* Main Action Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative group mb-16"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-gold-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
        <div className="relative bg-[#050505] border border-white/10 p-10 sm:p-16 rounded-3xl flex flex-col items-center text-center shadow-2xl">
          <div className="p-6 bg-white/5 rounded-full mb-8 text-amber-500 shadow-[0_0_30px_rgba(255,179,71,0.1)]">
            <Send size={56} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">Direct Invocation</h2>
          <p className="text-gray-400 mb-10 max-w-md text-lg">
            Whether for collaboration, consultation, or to report a fracture in reality, the Architect awaits.
          </p>
          <InteractiveButton
            variant="red"
            onClick={() => window.location.href = 'mailto:daedaevibin@naver.com'}
            className="w-full sm:w-auto px-12 py-5 text-xl"
          >
            <span className="text-white">Summon</span> <span className="text-red-500 font-black ml-1 group-hover:drop-shadow-[0_0_12px_rgba(239,68,68,1)] transition-all">The Architect</span>
          </InteractiveButton>
        </div>
      </motion.div>

      {/* Grid of Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {contactInfo.map((info, index) => (
          <AnimatedCard
            key={index}
            delay={0.3 + index * 0.1}
            glowColor={info.color as 'amber' | 'red' | 'gold'}
            className="flex flex-col items-center text-center p-10 group bg-black/40 backdrop-blur-sm"
          >
            <div className="p-4 bg-white/5 rounded-2xl mb-6 text-amber-500 group-hover:scale-110 transition-transform duration-500 group-hover:shadow-[0_0_20px_rgba(255,179,71,0.2)]">
              <info.icon size={36} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-3 font-bold">{info.label}</span>
            <h3 className="text-xl font-bold text-gray-100 mb-2">{info.value}</h3>
            {info.sub && <p className="text-sm text-gray-500 font-medium">{info.sub}</p>}

            {info.href && (
              <a
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 text-xs font-bold text-amber-500/50 hover:text-amber-500 transition-all uppercase tracking-widest flex items-center gap-2 group/link"
              >
                Connect <ExternalLink size={12} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            )}
          </AnimatedCard>
        ))}
      </div>

      {/* Community / Discord Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative group overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-[#5865F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-black/40 backdrop-blur-md border border-white/5 p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-4 mb-4">
              <MessageSquare size={40} className="text-[#5865F2]" />
              <h2 className="text-3xl font-bold">Zenith Commons</h2>
            </div>
            <p className="text-gray-400 max-w-md text-lg">
              Step into the collective void. Join our community for real-time discourse and project updates.
            </p>
          </div>
          <a
            href="https://discord.gg/Vprc6XRkRg"
            target="_blank"
            rel="noopener noreferrer"
            className="group/discord w-full md:w-auto px-10 py-5 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black rounded-2xl transition-all flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(88,101,242,0.3)] hover:shadow-[0_0_50px_rgba(88,101,242,0.6)] hover:scale-105 active:scale-95"
          >
            ENTER THE DISCORD
            <ExternalLink size={20} className="group-hover/discord:translate-x-1 group-hover/discord:-translate-y-1 transition-transform" />
          </a>
        </div>
      </motion.div>
    </div>
  );
};

