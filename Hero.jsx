import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import profileImg from './semmozhi.jpeg';

const StatusBadge = ({ status }) => {
  const colors = {
    active: 'bg-emerald-500',
    building: 'bg-amber-500',
    offline: 'bg-gray-500'
  };
  
  return (
    <div className="flex items-center gap-2 px-2 py-1 rounded-full bg-opacity-10 bg-gray-100 border border-[var(--border-subtle)]">
      <span className={`w-1.5 h-1.5 rounded-full ${colors[status] || colors.offline} animate-pulse`} />
      <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{status}</span>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="system" className="pt-24 pb-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-6"
            >
              <div className="relative inline-block mb-6 group cursor-pointer">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={profileImg}
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border border-[var(--border-subtle)] shadow-sm"
                />
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-[var(--bg-card)] rounded-full flex items-center justify-center border border-[var(--border-subtle)] z-10">
                   <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-[-5px]">
                  <div className="bg-[var(--bg-card)] border border-[var(--border-subtle)] px-3 py-1.5 rounded-full shadow-xl whitespace-nowrap flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] font-mono font-bold text-[var(--text-primary)]">HIRE ME</span>
                  </div>
                </div>
              </div>
              <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
                SEMMOZHIYAN
              </h1>
              <p className="font-mono text-[var(--text-secondary)]">JAVA_DEVELOPER :: DEVOPS_ENGINEER</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm mb-8"
            >
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-4 border-b border-[var(--border-subtle)] pb-2">
                <Terminal size={14} />
                <span>bio.txt</span>
              </div>
              <p className="leading-relaxed text-[var(--text-primary)]">
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <span className="text-[var(--accent-action)]">&gt;</span> Aspiring DevOps Engineer & Java Developer.<br/>
                </motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                  <span className="text-[var(--accent-action)]">&gt;</span> Stack: Java, Python, AWS, Jenkins, Kubernetes, Linux, Docker.<br/>
                </motion.span>
                <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>
                  <span className="text-[var(--accent-action)]">&gt;</span> Focused on automation and scalable infrastructure.
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-4 bg-[var(--accent-action)] ml-1 align-middle" />
                </motion.span>
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="flex flex-wrap gap-4"
            >
              <a href="https://github.com/Semmozhidouble" className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                <Github size={16} />
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/" className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                <Linkedin size={16} />
                LinkedIn
              </a>
              <a href="mailto:semmozhiyan40@gmail.com" className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                <Mail size={16} />
                Email
              </a>
            </motion.div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="p-4 border border-[var(--border-subtle)] rounded bg-white/50 dark:bg-[#0D1117]/50 backdrop-blur-md shadow-sm"
            >
              <h3 className="font-mono text-xs text-[var(--text-secondary)] mb-3 uppercase">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Availability</span>
                  <StatusBadge status="active" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Region</span>
                  <span className="font-mono text-xs">US-EAST-1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Uptime</span>
                  <span className="font-mono text-xs">5 YEARS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;