//! License: Open Software License 3.0 (OSL-3.0)
//! Copyright (c) 2025 Dae Euhwa

import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedCard, cn } from '../components/Common';
import { ExternalLink, Terminal, Shield, Cpu, PawPrint, Folder, Box, ThumbsUp, Package } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const STATIC_PROJECTS = [
  {
    id: 'axiomos',
    name: "AxiomOS",

    description: "projects.axiomos.description",
    html_url: "https://github.com/Veridian-Zenith/AxiomOS",
    topics: ["system", "zig", "osdev", "kernel"],
    language: "Zig",
    icon: Cpu
  },
  {
    id: 'voix',
    name: "Voix",

    description: "projects.voix.description",
    html_url: "https://github.com/Veridian-Zenith/Voix",
    aur_url: "https://aur.archlinux.org/packages/voix",
    topics: ["system", "security", "c++", "linux"],
    language: "C++",
    icon: Shield
  },
  {
    id: 'meshiji',
    name: "Meshiji",

    description: "projects.meshiji.description",
    html_url: "https://github.com/Veridian-Zenith/meshiji",
    aur_url: "https://aur.archlinux.org/packages/meshiji",
    topics: ["app", "flutter", "dart", "ui", "linux"],
    language: "Dart",
    icon: Folder
  },
  {
    id: 'peguni',
    name: "Peguni Draem'la",

    description: "projects.peguni.description",
    html_url: "https://github.com/Veridian-Zenith/peguni_draem-la",
    aur_url: "https://aur.archlinux.org/packages/peguni_draem-la-git",
    topics: ["game", "lua", "conlang"],
    language: "Lua",
    icon: PawPrint
  },
  {
    id: 'misc',
    name: "Misc",

    description: "projects.misc.description",
    html_url: "https://github.com/Veridian-Zenith/Misc",
    topics: ["collection", "zigsysmon", "benchmarks", "tools"],
    language: "Zig/Multi",
    icon: Box
  }
];

const topicColors: Record<string, string> = {
  web: 'border-amber-500/50 text-amber-500 shadow-[0_0_10px_rgba(255,179,71,0.2)]',
  app: 'border-red-500/50 text-red-500 shadow-[0_0_10px_rgba(215,38,56,0.2)]',
  game: 'border-gold-500/50 text-gold-500 shadow-[0_0_10px_rgba(255,215,0,0.2)]',
  system: 'border-purple-500/50 text-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.2)]',
  collection: 'border-blue-500/50 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
};

export const ProjectsPage = () => {
  const { t } = useTranslation();
  const [votedId, setVotedId] = useState<string | null>(null);
  const [showVoteForm, setShowVoteForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [hoveredRuneId, setHoveredRuneId] = useState<string | null>(null);

  const handleVoteClick = (id: string) => {
    setVotedId(id);
    setShowVoteForm(true);
  };

  const submitVote = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Vote submitted for ${votedId} by ${formData.name} (${formData.email})`);
    alert(`Your essence has been recorded. Focus shifted towards ${votedId}.`);
    setShowVoteForm(false);
    setVotedId(null);
  };

  return (
    <div className="pt-32 pb-24 px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] pointer-events-none" />
        <h1 className="text-5xl sm:text-7xl font-bold text-amber-500 mb-6 drop-shadow-[0_0_15px_rgba(255,179,71,0.4)]">

          {t('projects.title')}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">

          {t('projects.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {STATIC_PROJECTS.map((repo, index) => {
          const isRuneHovered = hoveredRuneId === repo.id;
          const cardGlow = isRuneHovered ? (index % 3 === 0 ? 'amber' : index % 3 === 1 ? 'red' : 'gold') : 'amber';
          return (
            <div
              key={repo.id}
              onMouseEnter={() => setHoveredProjectId(repo.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
            >
              <AnimatedCard
                delay={index * 0.05}
                glowColor={cardGlow}
                className={cn(
                  "flex flex-col h-full transition-all duration-500",
                  hoveredProjectId === repo.id && "border-amber-500/50 scale-[1.02] bg-white/[0.02]"
                )}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="p-2 bg-white/5 rounded-lg text-amber-500 shadow-[inset_0_0_10px_rgba(255,179,71,0.1)]"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                    >
                      <repo.icon size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-100 tracking-tight">{repo.name}</h3>
                  </div>
                </div>

                <p className="text-gray-400 mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">

                  {t(repo.description)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {repo.topics.map(topic => (
                    <motion.span
                      key={topic}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className={cn(
                        "text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full border bg-black/40 font-bold transition-all",
                        topicColors[topic] || 'border-gray-500/50 text-gray-400'
                      )}
                    >
                      {topic}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <div className='flex items-center gap-4'>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setHoveredRuneId(repo.id)}
                      onMouseLeave={() => setHoveredRuneId(null)}
                      className="group flex items-center gap-2 text-amber-500 hover:text-red-500 transition-colors font-semibold text-sm"
                    >

                      {t('projects.inspect')} <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                    {repo.aur_url && (
                      <a
                        href={repo.aur_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-cyan-500 hover:text-cyan-400 transition-colors font-semibold text-sm"
                      >
                        <Package size={14} /> <span>AUR</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => handleVoteClick(repo.id)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gold-500 transition-all text-sm group"
                  >
                    <ThumbsUp size={16} className="group-hover:scale-125 transition-transform" />

                    <span>{t('projects.influence')}</span>
                  </button>
                </div>
              </AnimatedCard>
            </div>
          );
        })}

        <div className="border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-white/5 opacity-40 min-h-[250px]">
          <Terminal size={32} className="text-gray-500 mb-4" />

          <p className="text-gray-400 italic">{t('projects.future')}</p>
        </div>
      </div>

      {/* Voting Modal */}
      <AnimatePresence>
        {showVoteForm && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-amber-500/30 p-8 rounded-3xl max-w-md w-full shadow-[0_0_50px_rgba(255,179,71,0.2)]"
            >


              <h2 className="text-2xl font-bold text-amber-500 mb-2">{t('projects.vote.title')}</h2>
              <p className="text-gray-400 mb-6 text-sm">{t('projects.vote.subtitle')} {STATIC_PROJECTS.find(p => p.id === votedId)?.name}.</p>

              <form onSubmit={submitVote} className="space-y-4">
                <div>

                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 ml-1">{t('projects.vote.name')}</label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"

                    placeholder={t('projects.vote.name_placeholder')}
                  />
                </div>
                <div>

                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1 ml-1">{t('projects.vote.email')}</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors"

                    placeholder={t('projects.vote.email_placeholder')}
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowVoteForm(false)}
                    className="flex-1 px-6 py-3 border border-white/10 rounded-xl text-gray-400 hover:bg-white/5 transition-colors"
                  >

                    {t('projects.vote.discard')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold rounded-xl shadow-[0_0_15px_rgba(255,179,71,0.3)] transition-all"
                  >

                    {t('projects.vote.cast')}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

