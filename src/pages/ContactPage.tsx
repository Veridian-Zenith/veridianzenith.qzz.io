//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion } from 'framer-motion';
import { Github, Mail, User, MessageSquare, ExternalLink } from 'lucide-react';
import { AnimatedCard } from '../components/Common';

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
      icon: Github,
      label: "GitHub",
      value: "daedaevibin",
      href: "https://github.com/daedaevibin",
      color: "gold"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-8 max-w-4xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl sm:text-7xl font-bold text-amber-500 mb-6 drop-shadow-[0_0_15px_rgba(255,179,71,0.4)]">
          Summon Us
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto text-lg italic">
          "The runes are cast, the signals sent. Reach through the void."
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {contactInfo.map((info, index) => (
          <AnimatedCard 
            key={index} 
            delay={index * 0.1}
            glowColor={info.color as 'amber' | 'red' | 'gold'}
            className="flex flex-col items-center text-center p-8 group"
          >
            <div className="p-4 bg-white/5 rounded-2xl mb-4 text-amber-500 group-hover:scale-110 transition-transform duration-300">
              <info.icon size={32} />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">{info.label}</span>
            <h3 className="text-lg font-bold text-gray-100 mb-1">{info.value}</h3>
            {info.sub && <p className="text-sm text-gray-500">{info.sub}</p>}
            
            {info.href && (
              <a 
                href={info.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-bold text-amber-500/50 hover:text-amber-500 transition-colors uppercase tracking-widest flex items-center gap-1"
              >
                Connect <ExternalLink size={10} />
              </a>
            )}
          </AnimatedCard>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="relative group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-red-500 to-gold-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative bg-black border border-white/10 p-8 sm:p-12 rounded-3xl flex flex-col items-center text-center">
          <MessageSquare size={48} className="text-amber-500 mb-6" />
          <h2 className="text-3xl font-bold mb-4">Join the Zenith</h2>
          <p className="text-gray-400 mb-8 max-w-md">
            Enter our digital hall to discuss projects, contribute to the forge, or simply exist in the void with us.
          </p>
          <a 
            href="https://discord.gg/Vprc6XRkRg"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-10 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-full transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] hover:scale-105"
          >
            Veridian Zenith Discord
          </a>
        </div>
      </motion.div>
    </div>
  );
};
