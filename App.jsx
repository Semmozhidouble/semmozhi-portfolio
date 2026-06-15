import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Server, Database, Layout, GitCommit, Activity, Box, Code2, Cpu, Layers, Command, Search, X, FileText, Download, Copy, Check, Sun, Moon, Sparkles, Zap, Globe, Shield, Clock, MapPin, ExternalLink, Star } from 'lucide-react';
import profileImg from './semmozhi.jpeg';

// --- Hooks ---

const useTheme = () => {
  const [theme, setTheme] = React.useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  return { theme, toggle };
};

const useActiveSection = (sectionIds) => {
  const [active, setActive] = React.useState(sectionIds[0]);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
};

const useMousePosition = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  React.useEffect(() => {
    const handleMouse = ({ clientX, clientY }) => {
      x.set(clientX);
      y.set(clientY);
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return { x, y };
};

// --- Design System Components ---

const SectionHeader = ({ number, title, gradient = false }) => (
  <div className="flex items-center gap-3 mb-10 border-b border-[var(--border-subtle)] pb-4 group">
    <span className="font-mono text-xs text-[var(--accent-action)] font-bold tracking-wider">0{number}.</span>
    <h2 className={`text-sm font-bold tracking-wide uppercase ${gradient ? 'gradient-text' : 'text-[var(--text-primary)]'}`}>
      {title}
    </h2>
    <div className="flex-1 h-px bg-gradient-to-r from-[var(--border-subtle)] to-transparent ml-4" />
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    active: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    building: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    offline: 'bg-gray-500'
  };

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-primary)]/80 border border-[var(--border-subtle)] backdrop-blur-sm">
      <span className={`w-2 h-2 rounded-full ${colors[status] || colors.offline}`} />
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">{status}</span>
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      style={{ scaleX, background: 'var(--gradient-1)' }}
    />
  );
};

const FloatingOrb = ({ className, size = 'w-64 h-64', color = 'var(--accent-action)', delay = 0, duration = 15 }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${size} ${className}`}
    style={{ background: color, filter: `blur(100px)` }}
    animate={{
      scale: [1, 1.15, 0.95, 1],
      opacity: [0.15, 0.25, 0.1, 0.15],
      x: [0, 60, -30, 0],
      y: [0, -40, 50, 0],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
  />
);

const AnimatedGradientBorder = ({ children, className = '' }) => (
  <div className={`gradient-border-card ${className}`}>
    {children}
  </div>
);

const GlowButton = ({ children, href, icon: Icon, ...props }) => {
  const btn = (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-action)] via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover:opacity-75 blur transition-all duration-300" />
      <div className="relative flex items-center gap-2 px-5 py-2.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[var(--text-primary)] rounded-lg text-sm font-medium hover:bg-[var(--bg-primary)] transition-all duration-300">
        {Icon && <Icon size={16} className="group-hover:scale-110 transition-transform" />}
        {children}
      </div>
    </motion.div>
  );

  if (href) return <a href={href} target="_blank" rel="noopener noreferrer">{btn}</a>;
  return btn;
};

// --- Network Topology Background ---

const NetworkBackground = () => {
  const canvasRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let particles = [];
    let dataPackets = [];
    const MAX_PARTICLES = 60;
    const CONNECTION_DIST = 150;
    const MOUSE_INFLUENCE = 100;

    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (isServer = false) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: isServer ? 4 + Math.random() * 3 : 1.5 + Math.random() * 2,
      isServer,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.02,
      connections: [],
    });

    const init = () => {
      particles = [];
      dataPackets = [];
      for (let i = 0; i < MAX_PARTICLES; i++) {
        particles.push(createParticle(i < 10));
      }
    };

    const spawnDataPacket = () => {
      const start = particles[Math.floor(Math.random() * particles.length)];
      let end;
      do {
        end = particles[Math.floor(Math.random() * particles.length)];
      } while (end === start);

      const dist = Math.hypot(end.x - start.x, end.y - start.y);
      if (dist > CONNECTION_DIST * 1.5) return;

      dataPackets.push({
        startX: start.x, startY: start.y,
        endX: end.x, endY: end.y,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        size: 1.5 + Math.random() * 1.5,
      });
    };

    const getThemeColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        node: isDark ? '#60A5FA' : '#3B82F6',
        serverNode: isDark ? '#34D399' : '#10B981',
        connection: isDark ? 'rgba(96,165,250,0.15)' : 'rgba(59,130,246,0.12)',
        packet: isDark ? '#A78BFA' : '#7C3AED',
        glow: isDark ? 'rgba(96,165,250,0.06)' : 'rgba(59,130,246,0.04)',
      };
    };

    const draw = () => {
      const colors = getThemeColors();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      particles.forEach((p, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.hypot(dx, dy);

          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = p.isServer || other.isServer
              ? `rgba(52, 211, 153, ${alpha * 0.4})`
              : `rgba(96, 165, 250, ${alpha * 0.3})`;
            ctx.lineWidth = 0.5 + (1 - dist / CONNECTION_DIST) * 1;
            ctx.stroke();
          }
        }
      });

      // Draw data packets
      dataPackets = dataPackets.filter(p => p.progress < 1);
      dataPackets.forEach(pkt => {
        pkt.progress += pkt.speed;
        const x = pkt.startX + (pkt.endX - pkt.startX) * pkt.progress;
        const y = pkt.startY + (pkt.endY - pkt.startY) * pkt.progress;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, pkt.size * 3);
        gradient.addColorStop(0, 'rgba(167, 139, 250, 0.8)');
        gradient.addColorStop(0.5, 'rgba(167, 139, 250, 0.3)');
        gradient.addColorStop(1, 'rgba(167, 139, 250, 0)');
        ctx.beginPath();
        ctx.arc(x, y, pkt.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, pkt.size, 0, Math.PI * 2);
        ctx.fillStyle = '#A78BFA';
        ctx.fill();
      });

      // Draw nodes
      particles.forEach(p => {
        p.pulse += p.pulseSpeed;
        const pulseRadius = p.isServer
          ? 2 + Math.sin(p.pulse) * 1.5
          : 1 + Math.sin(p.pulse) * 0.8;

        const nodeColor = p.isServer ? colors.serverNode : colors.node;
        const glowColor = p.isServer ? colors.glow : 'rgba(96,165,250,0.04)';

        // Glow
        const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 6);
        glowGrad.addColorStop(0, glowColor);
        glowGrad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 6, 0, Math.PI * 2);
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        if (p.isServer) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + pulseRadius + 2, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(52, 211, 153, ${0.2 + Math.sin(p.pulse) * 0.1})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Update positions
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_INFLUENCE && dist > 0) {
          const force = (1 - dist / MOUSE_INFLUENCE) * 0.5;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
      });

      // Randomly spawn data packets
      if (Math.random() < 0.03) spawnDataPacket();

      animId = requestAnimationFrame(draw);
    };

    const handleMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    resize();
    init();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouse);
    window.addEventListener('mouseleave', handleLeave);

    const themeObserver = new MutationObserver(() => {});
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
};

// --- Sections ---

const Navigation = ({ theme, toggleTheme, activeSection }) => {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navItems = [
    { id: 'system', label: 'system' },
    { id: 'logs', label: 'logs' },
    { id: 'metrics', label: 'metrics' },
    { id: 'rfc', label: 'rfc' },

    { id: 'connect', label: 'connect' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.a
          href="#system"
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-action)] to-purple-500 flex items-center justify-center shadow-lg shadow-[var(--accent-action)]/20">
            <Terminal size={14} className="text-white" />
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm">
            <span className="text-[var(--accent-action)] font-medium">~/</span>
            <span className="text-[var(--text-primary)] font-semibold group-hover:gradient-text transition-all duration-300">portfolio</span>
          </div>
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-all duration-300 rounded-lg ${
                  isActive
                    ? 'text-[var(--accent-action)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--border-subtle)]/50'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-[var(--accent-action)]/10 border border-[var(--accent-action)]/20 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <div className="w-px h-6 bg-[var(--border-subtle)] mx-2" />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--border-subtle)]/50 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </motion.button>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouse = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const parallaxStyle = (factor = 0.02) => ({
    transform: `translate(${(mousePosition.x - window.innerWidth / 2) * factor}px, ${(mousePosition.y - window.innerHeight / 2) * factor}px)`,
    transition: 'transform 0.1s ease-out',
  });

  return (
    <section id="system" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <FloatingOrb className="top-[-10%] left-[-5%]" size="w-[40vw] h-[40vw]" color="var(--accent-action)" delay={0} duration={20} />
        <FloatingOrb className="bottom-[-10%] right-[-5%]" size="w-[35vw] h-[35vw]" color="var(--glow-purple)" delay={3} duration={18} />
        <FloatingOrb className="top-[40%] right-[20%]" size="w-[25vw] h-[25vw]" color="var(--glow-green)" delay={6} duration={22} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-action)]/10 border border-[var(--accent-action)]/20 text-xs font-mono text-[var(--accent-action)]">
                  <Sparkles size={12} />
                  <span>Available for opportunities</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 leading-[1.1]"
              >
                <span className="text-[var(--text-primary)]">Hey, I'm </span>
                <br />
                <span className="gradient-text inline-block">Semmozhiyan</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-4 mb-8"
              >
                <div className="flex flex-wrap items-center gap-3 font-mono">
                  <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-sm text-[var(--text-secondary)] inline-flex items-center gap-2 shadow-sm">
                    <Cpu size={14} className="text-[var(--accent-action)]" />
                    Java Developer
                  </span>
                  <span className="text-[var(--text-secondary)] text-lg">//</span>
                  <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-sm text-[var(--text-secondary)] inline-flex items-center gap-2 shadow-sm">
                    <Server size={14} className="text-purple-500" />
                    DevOps Engineer
                  </span>
                  <span className="text-[var(--text-secondary)] text-lg">//</span>
                  <span className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-md text-sm text-[var(--text-secondary)] inline-flex items-center gap-2 shadow-sm">
                    <Zap size={14} className="text-amber-500" />
                    Cloud Architect
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="relative"
              >
                <div className="p-6 glass-card rounded-2xl mb-8 max-w-2xl">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-4 border-b border-[var(--border-subtle)] pb-3">
                    <Terminal size={14} />
                    <span className="font-mono text-xs">bio.txt</span>
                    <span className="ml-auto text-[10px] text-[var(--accent-action)] font-mono">~ README.md</span>
                  </div>
                  <div className="space-y-3 font-mono text-sm leading-relaxed">
                    {[
                      { delay: 0.3, text: 'Aspiring DevOps Engineer & Java Developer building scalable, resilient infrastructure.' },
                      { delay: 0.8, text: 'Stack: Java, Python, AWS, Kubernetes, Docker, Jenkins, Terraform.' },
                      { delay: 1.3, text: 'Focused on automation, CI/CD, and cloud-native architecture.' },
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + (i * 0.5) }}
                        className="flex gap-2"
                      >
                        <span className="text-[var(--accent-action)] shrink-0">$</span>
                        <span className="text-[var(--text-primary)]">{line.text}</span>
                      </motion.div>
                    ))}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      className="flex gap-2"
                    >
                      <span className="text-[var(--accent-action)] shrink-0">$</span>
                      <span className="text-[var(--text-primary)]">Currently: Building next-gen deployment pipelines</span>
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-[var(--accent-action)] ml-1"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-wrap gap-3"
              >
                <GlowButton href="https://github.com/semmozhiyan-dev" icon={Github}>GitHub</GlowButton>
                <GlowButton href="https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/" icon={Linkedin}>LinkedIn</GlowButton>
                <GlowButton href="mailto:semmozhiyan40@gmail.com" icon={Mail}>Email</GlowButton>
              </motion.div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="relative"
              style={parallaxStyle(0.03)}
            >
              <div className="relative mx-auto w-64 h-64 sm:w-72 sm:h-72">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-action)] via-purple-500 to-pink-500 rounded-2xl blur-2xl opacity-30 animate-pulse-glow" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-action)] via-purple-500 to-pink-500 rounded-2xl p-[2px]">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[var(--bg-primary)]">
                    <motion.img
                      whileHover={{ scale: 1.05 }}
                      src={profileImg}
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://github.com/semmozhiyan-dev.png"; }}
                      alt="Semmozhiyan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, type: "spring" }}
                  className="absolute -bottom-4 -right-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-4 shadow-xl backdrop-blur-sm"
                  style={parallaxStyle(0.05)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50" />
                    <div>
                      <div className="text-xs font-bold text-[var(--text-primary)]">Available</div>
                      <div className="text-[10px] text-[var(--text-secondary)] font-mono">For hire</div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8, type: "spring" }}
                  className="absolute -top-4 -left-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-xl p-3 shadow-xl backdrop-blur-sm"
                  style={parallaxStyle(-0.03)}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[Github, Linkedin, Mail].map((Icon, i) => (
                        <div key={i} className="w-7 h-7 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center">
                          <Icon size={10} className="text-[var(--text-secondary)]" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--text-secondary)]">
                  <MapPin size={12} />
                  <span>India</span>
                  <span className="w-1 h-1 rounded-full bg-[var(--text-secondary)]" />
                  <Clock size={12} />
                  <span>IST (UTC +5:30)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TechMarquee = () => {
  const stack = [
    { name: 'React', icon: <Layout size={16} />, color: 'text-sky-400' },
    { name: 'Node.js', icon: <Server size={16} />, color: 'text-green-500' },
    { name: 'Python', icon: <Terminal size={16} />, color: 'text-yellow-500' },
    { name: 'PostgreSQL', icon: <Database size={16} />, color: 'text-blue-400' },
    { name: 'AWS', icon: <Activity size={16} />, color: 'text-orange-400' },
    { name: 'Docker', icon: <Box size={16} />, color: 'text-blue-500' },
    { name: 'TypeScript', icon: <Code2 size={16} />, color: 'text-blue-600' },
    { name: 'Git', icon: <GitCommit size={16} />, color: 'text-orange-600' },
    { name: 'Kubernetes', icon: <Layers size={16} />, color: 'text-blue-700' },
    { name: 'DevOps', icon: <Cpu size={16} />, color: 'text-red-500' },
    { name: 'Java', icon: <Code2 size={16} />, color: 'text-red-600' },
    { name: 'Jenkins', icon: <Zap size={16} />, color: 'text-red-400' },
  ];

  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--bg-card)]/50 overflow-hidden py-8">
      <div className="flex">
        <motion.div
          className="flex flex-shrink-0 gap-16 px-8"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...stack, ...stack, ...stack].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-300 cursor-default group"
            >
              <div className={`${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                {tech.icon}
              </div>
              <span className="font-mono text-xs font-bold uppercase tracking-widest group-hover:gradient-text transition-all duration-300">
                {tech.name}
              </span>
              <div className="w-1 h-1 rounded-full bg-[var(--border-subtle)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Changelog = () => {
  const logs = [
    { version: 'v4.0.0', date: '2025', title: 'DevOps Infrastructure', desc: 'Automating deployments with Kubernetes, AWS, and AI-powered CI/CD pipelines for faster build times and reliable production releases.', color: 'from-emerald-500 to-teal-500', status: 'Current' },
    { version: 'v3.0.0', date: '2024', title: 'Cloud Engineering', desc: 'Orchestrating deployments with Kubernetes and managing AWS resources.', color: 'from-blue-500 to-cyan-500', status: 'Archived' },
    { version: 'v2.1.0', date: '2023', title: 'DevOps Transition', desc: 'Shifted focus to CI/CD pipelines, Jenkins, and Docker containerization.', color: 'from-purple-500 to-pink-500', status: 'Archived' },
    { version: 'v1.0.0', date: '2021', title: 'Java Developer', desc: 'Started career building robust Java applications and backend systems.', color: 'from-amber-500 to-orange-500', status: 'Archived' },
  ];

  return (
    <section id="logs" className="py-24 border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="1" title="Changelog" gradient />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {logs.map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <div className="gradient-border-card h-full">
                <div className="relative p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-transparent transition-all duration-500 h-full group">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`font-mono text-xs px-2.5 py-1 rounded-full bg-gradient-to-r ${log.color} text-white font-bold shadow-lg`}>
                      {log.version}
                    </span>
                    <span className="font-mono text-[10px] text-[var(--text-secondary)]">{log.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-[var(--text-primary)] group-hover:gradient-text transition-all duration-300">{log.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{log.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${log.status === 'Current' ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`} />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">{log.status}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StackLayer = ({ title, items }) => (
  <div className="mb-10 last:mb-0">
    <h3 className="font-mono text-xs text-[var(--accent-action)] mb-6 uppercase tracking-widest font-bold flex items-center gap-2">
      <span className="w-4 h-px bg-[var(--accent-action)]" />
      {title}
    </h3>
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {items.map((item, i) => (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          key={i}
          className="glass-card rounded-xl p-5 group cursor-default"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-lg bg-gradient-to-br from-[var(--accent-action)]/20 to-purple-500/20 border border-[var(--accent-action)]/10 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <span className="font-bold text-[var(--text-primary)] group-hover:gradient-text transition-all duration-300">{item.name}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-2 border-l-2 border-[var(--border-subtle)] pl-3">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const Skills = () => (
  <section className="py-24 border-b border-[var(--border-subtle)] relative">
    <div className="max-w-6xl mx-auto px-6">
      <SectionHeader number="2" title="Dependency Graph" gradient />
      <StackLayer
        title="Layer 1: Infrastructure"
        items={[
          { name: 'Docker', icon: <Server size={16} className="text-blue-500" />, desc: 'Containerization for consistent dev/prod parity with multi-stage builds.' },
          { name: 'AWS', icon: <Activity size={16} className="text-orange-500" />, desc: 'EC2, S3, Lambda, and EKS for scalable cloud-native architecture.' },
          { name: 'Kubernetes', icon: <Layers size={16} className="text-blue-700" />, desc: 'Orchestrating microservices with auto-scaling and zero-downtime deployments.' },
        ]}
      />
      <StackLayer
        title="Layer 2: Application"
        items={[
          { name: 'React', icon: <Layout size={16} className="text-sky-500" />, desc: 'Component-driven UI architecture with hooks and performant rendering.' },
          { name: 'Python', icon: <Terminal size={16} className="text-yellow-500" />, desc: 'Automation scripts, data pipelines, and backend microservices.' },
          { name: 'Java', icon: <Code2 size={16} className="text-red-500" />, desc: 'Enterprise-grade applications with Spring Boot and microservices patterns.' },
          { name: 'PostgreSQL', icon: <Database size={16} className="text-blue-400" />, desc: 'Relational data modeling, complex queries, and performance optimization.' },
          { name: 'Jenkins', icon: <Zap size={16} className="text-red-400" />, desc: 'CI/CD pipelines with automated testing, building, and deployment stages.' },
          { name: 'Terraform', icon: <Globe size={16} className="text-purple-500" />, desc: 'Infrastructure as Code for reproducible, version-controlled cloud resources.' },
        ]}
      />
    </div>
  </section>
);

const SkillsRadar = () => {
  const skills = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'DevOps', level: 75 },
    { name: 'System Design', level: 80 },
    { name: 'Database', level: 85 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 110;
  const angleStep = (Math.PI * 2) / skills.length;

  const getCoordinates = (value, index) => {
    const angle = -Math.PI / 2 + index * angleStep;
    const r = (value / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return [x, y];
  };

  const levels = [25, 50, 75, 100];

  const pathData = skills.map((skill, i) => {
    const [x, y] = getCoordinates(skill.level, i);
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ') + ' Z';

  return (
    <section id="metrics" className="py-24 border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="3" title="Technical Proficiency" gradient />
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-action)]/20 to-purple-500/20 blur-3xl rounded-full -z-10" />
            <svg width={size} height={size} className="overflow-visible">
              {levels.map((level, i) => (
                <polygon
                  key={i}
                  points={skills.map((_, j) => getCoordinates(level, j).join(',')).join(' ')}
                  fill="none"
                  stroke="var(--border-subtle)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  className="opacity-40"
                />
              ))}
              {skills.map((_, i) => {
                const [x, y] = getCoordinates(100, i);
                return (
                  <line
                    key={i}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke="var(--border-subtle)"
                    strokeWidth="1"
                    className="opacity-30"
                  />
                );
              })}
              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                d={pathData}
                fill="url(#radarGradient)"
                fillOpacity="0.2"
                stroke="url(#radarGradient)"
                strokeWidth="2"
              />
              <defs>
                <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-action)" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              {skills.map((skill, i) => {
                const [x, y] = getCoordinates(skill.level, i);
                return (
                  <motion.g key={i}>
                    <motion.circle
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      cx={x}
                      cy={y}
                      r="5"
                      fill="var(--bg-primary)"
                      stroke="url(#radarGradient)"
                      strokeWidth="2.5"
                      className="drop-shadow-lg"
                    />
                    <motion.circle
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1 + i * 0.1, type: "spring" }}
                      cx={x}
                      cy={y}
                      r="2"
                      fill="var(--accent-action)"
                    />
                  </motion.g>
                );
              })}
              {skills.map((skill, i) => {
                const [x, y] = getCoordinates(125, i);
                return (
                  <text
                    key={i}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-[11px] font-mono fill-[var(--text-secondary)] uppercase tracking-wider font-bold"
                  >
                    {skill.name}
                  </text>
                );
              })}
            </svg>
          </motion.div>

          <div className="flex-1 w-full space-y-6">
            <div className="p-6 glass-card rounded-2xl font-mono text-xs">
              <div className="flex items-center justify-between mb-5 border-b border-[var(--border-subtle)] pb-3">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Activity size={14} />
                  <span>github_analysis.log</span>
                </div>
                <span className="text-[var(--accent-action)] animate-pulse text-[10px] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[var(--accent-action)] rounded-full" />
                  Live
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <span className="text-[var(--text-secondary)]">10:42:01</span>
                  <span>Fetching public repositories... <span className="text-[var(--accent-action)]">Done (12 found)</span></span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--text-secondary)]">10:42:02</span>
                  <span>Analyzing language distribution...</span>
                </div>
                <div className="pl-16 space-y-1 text-[var(--text-secondary)] py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                      <div className="h-full w-[45%] bg-yellow-500 rounded-full" />
                    </div>
                    <span>Python 45%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                      <div className="h-full w-[30%] bg-sky-500 rounded-full" />
                    </div>
                    <span>JavaScript 30%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                      <div className="h-full w-[25%] bg-red-500 rounded-full" />
                    </div>
                    <span>Shell/Other 25%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--text-secondary)]">10:42:03</span>
                  <span>Calculating technical competency matrix...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[var(--text-secondary)]">10:42:04</span>
                  <span className="text-[var(--accent-active)]">{'>>'} Proficiency model updated successfully.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-4 glass-card rounded-xl"
              >
                <div className="text-[var(--text-secondary)] text-[10px] uppercase mb-2 font-mono tracking-widest">Top Skill</div>
                <div className="font-bold text-[var(--text-primary)] group-hover:gradient-text">Frontend Architecture</div>
                <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '90%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[var(--accent-action)] to-purple-500"
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-4 glass-card rounded-xl"
              >
                <div className="text-[var(--text-secondary)] text-[10px] uppercase mb-2 font-mono tracking-widest">Focus Area</div>
                <div className="font-bold text-[var(--text-primary)]">Distributed Systems</div>
                <div className="mt-2 w-full h-1.5 rounded-full bg-[var(--border-subtle)] overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ id, title, stack, diff, link, variants, gradient }) => (
  <motion.a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    variants={variants}
    whileHover={{ y: -4 }}
    className="gradient-border-card block"
  >
    <div className="relative p-6 bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] hover:border-transparent transition-all duration-500 h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
            <Box size={14} className="text-white" />
          </div>
          <span className="font-mono text-xs text-[var(--text-secondary)]">{id}</span>
        </div>
        <ExternalLink size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-action)] group-hover:rotate-45 transition-all duration-300" />
      </div>
      <h3 className="text-lg font-bold mb-3 text-[var(--text-primary)] group-hover:gradient-text transition-all duration-300">{title}</h3>
      <div className="flex flex-wrap gap-2 mb-6">
        {stack.map(tech => (
          <span key={tech} className="px-2.5 py-1 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)] rounded-md">
            {tech}
          </span>
        ))}
      </div>
      <div className="font-mono text-xs border-t border-[var(--border-subtle)] pt-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <Zap size={12} />
            <span>Latency: <span className="text-[var(--accent-active)] font-bold">{diff.latency}</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
            <Activity size={12} />
            <span>Throughput: <span className="text-[var(--accent-active)] font-bold">{diff.throughput}</span></span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--accent-action)]/5 via-transparent to-purple-500/5 pointer-events-none transition-opacity duration-500"
      />
    </div>
  </motion.a>
);

const Projects = () => {
  const projects = [
    {
      id: 'RFC-001', title: 'AirPreQ Prediction Engine',
      stack: ['Python', 'Flask', 'ML'],
      diff: { latency: '-150ms', throughput: 'Real-time' },
      link: 'https://github.com/semmozhiyan-dev/AirPreQ',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'RFC-002', title: 'Wanderlite Tourism',
      stack: ['Web', 'Travel', 'UI'],
      diff: { latency: '99.9%', throughput: 'Uptime' },
      link: 'https://github.com/semmozhiyan-dev/wanderlite-travel-and-tourism',
      gradient: 'from-sky-500 to-blue-600'
    },
    {
      id: 'RFC-003', title: 'Media Platform',
      stack: ['React', 'Node', 'Stream'],
      diff: { latency: '< 50ms', throughput: 'High-Res' },
      link: 'https://github.com/semmozhiyan-dev/Media-platform',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'RFC-004', title: 'Techno 3.0',
      stack: ['Tech', 'Event', 'System'],
      diff: { latency: 'v3.0', throughput: 'Stable' },
      link: 'https://github.com/semmozhiyan-dev/Techno_3.0',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      id: 'RFC-005', title: 'Java Systems Core',
      stack: ['Java', 'OOP', 'Structures'],
      diff: { latency: 'O(1)', throughput: 'Optimized' },
      link: 'https://github.com/semmozhiyan-dev/java--learn',
      gradient: 'from-red-500 to-rose-500'
    },
    {
      id: 'RFC-006', title: 'Daily Commit Tracker',
      stack: ['Git', 'Automation', 'CI/CD'],
      diff: { latency: 'Daily', throughput: 'Consistent' },
      link: 'https://github.com/semmozhiyan-dev/daily-commit',
      gradient: 'from-indigo-500 to-violet-500'
    }
  ];

  return (
    <section id="rfc" className="py-24 border-b border-[var(--border-subtle)] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="4" title="Architecture Reviews (RFCs)" gradient />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({ subject: 'Collaboration', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    try {
      await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
      setSubmitted(true);
    } catch { /* ignore */ }
  };

  return (
    <section id="connect" className="py-24 relative overflow-hidden">
      <FloatingOrb className="top-[-5%] left-[-5%]" size="w-[35vw] h-[35vw]" color="var(--glow-blue)" delay={1} duration={20} />
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader number="6" title="Open Ticket" gradient />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">
              Let's <span className="gradient-text">Build</span> Together
            </h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md">
              Have a project in mind or just want to discuss tech? I'm always open to new opportunities and collaborations.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'semmozhiyan40@gmail.com', href: 'mailto:semmozhiyan40@gmail.com' },
                { icon: Github, label: 'GitHub', value: '@semmozhiyan-dev', href: 'https://github.com/semmozhiyan-dev' },
                { icon: Linkedin, label: 'LinkedIn', value: 'Semmozhiyan N S', href: 'https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 glass-card rounded-xl group"
                >
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-[var(--accent-action)]/20 to-purple-500/20 border border-[var(--accent-action)]/10 group-hover:scale-110 transition-transform duration-300">
                    <item.icon size={18} className="text-[var(--accent-action)]" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-secondary)] font-mono">{item.label}</div>
                    <div className="text-sm font-bold text-[var(--text-primary)] group-hover:gradient-text transition-all duration-300">{item.value}</div>
                  </div>
                  <ArrowUpRight size={16} className="ml-auto text-[var(--text-secondary)] group-hover:text-[var(--accent-action)] transition-all" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 font-mono text-xs text-[var(--text-secondary)]">contact_form.sh</span>
              </div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Check size={28} className="text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">Message Sent!</h4>
                  <p className="text-[var(--text-secondary)]">Thanks for reaching out. I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form className="p-6 space-y-5" action="https://formspree.io/f/mwpbjoad" method="POST" onSubmit={handleSubmit}>
                  <div>
                    <label className="block font-mono text-xs text-[var(--text-secondary)] mb-2">--subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-3 text-sm rounded-lg focus:border-[var(--accent-action)] focus:ring-1 focus:ring-[var(--accent-action)] outline-none text-[var(--text-primary)] transition-all duration-300"
                    >
                      <option value="Collaboration">Collaboration</option>
                      <option value="Hiring">Hiring Opportunity</option>
                      <option value="Query">General Query</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs text-[var(--text-secondary)] mb-2">--message</label>
                    <textarea
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-3 text-sm rounded-lg focus:border-[var(--accent-action)] focus:ring-1 focus:ring-[var(--accent-action)] outline-none text-[var(--text-primary)] font-mono transition-all duration-300 resize-none"
                      placeholder="Enter your message stream..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    className="w-full py-3 rounded-lg bg-gradient-to-r from-[var(--accent-action)] to-purple-500 text-white font-mono text-sm font-bold hover:shadow-lg hover:shadow-[var(--accent-action)]/20 transition-all duration-300"
                  >
                    $ push message --force
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const SystemLogs = () => {
  const [logs, setLogs] = React.useState([
    { id: 1, timestamp: '10:00:01', msg: 'System initialized...' },
    { id: 2, timestamp: '10:00:02', msg: 'Loading assets...' },
    { id: 3, timestamp: '10:00:03', msg: 'Connected to edge network' },
  ]);

  React.useEffect(() => {
    const messages = [
      'GET /api/status 200 OK',
      'Compiling modules...',
      'Visitor session active',
      'Updating cache...',
      'Ping: 14ms',
      'Fetching repo data...',
      'Rendering components...',
      'Garbage collection...',
      'Syncing state...',
      'Deploying to production...',
      'Health check passed',
      'SSL certificate valid',
    ];

    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      const newLog = {
        id: Date.now(),
        timestamp: timeString,
        msg: messages[Math.floor(Math.random() * messages.length)]
      };
      setLogs(prev => [...prev.slice(-4), newLog]);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)]/50 pt-16 pb-10 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-action)] to-purple-500 flex items-center justify-center shadow-lg">
                <Terminal size={16} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-[var(--text-primary)]">Semmozhiyan</div>
                <div className="font-mono text-[10px] text-[var(--text-secondary)]">Senior Engineer</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/50" />
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">SYSTEM OPERATIONAL</span>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
              All systems running normally. Monitoring active sessions and server performance.
            </p>
            <div className="flex gap-3 pt-2">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href={[ 'https://github.com/semmozhiyan-dev', 'https://www.linkedin.com/in/semmozhiyan-n-s-aa7478296/', 'mailto:semmozhiyan40@gmail.com' ][i]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent-action)] hover:border-[var(--accent-action)] transition-all duration-300"
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)] pt-4">
              &copy; {new Date().getFullYear()} Semmozhiyan. All rights reserved.
            </p>
          </div>
          <div className="md:col-span-2 relative">
            <div className="p-5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs h-44 overflow-hidden relative">
              <div className="absolute top-3 right-4 flex items-center gap-2">
                <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Live Logs</span>
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex flex-col justify-end h-full space-y-2">
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 text-[var(--text-secondary)]"
                  >
                    <span className="opacity-50 shrink-0">[{log.timestamp}]</span>
                    <span className="text-[var(--text-primary)] truncate">&gt; {log.msg}</span>
                  </motion.div>
                ))}
                <div className="flex gap-3 text-[var(--text-secondary)]">
                  <span className="opacity-50 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-[var(--accent-action)] block"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (isOpen) setQuery('');
  }, [isOpen]);

  const actions = [
    { id: 'system', label: 'System Overview', href: '#system', icon: <Terminal size={14} />, desc: 'View profile and status' },
    { id: 'logs', label: 'Changelog', href: '#logs', icon: <GitCommit size={14} />, desc: 'Career timeline and updates' },
    { id: 'metrics', label: 'Proficiency Metrics', href: '#metrics', icon: <Activity size={14} />, desc: 'Skills and competency radar' },
    { id: 'rfc', label: 'Architecture Reviews', href: '#rfc', icon: <Cpu size={14} />, desc: 'Project portfolio and RFCs' },

    { id: 'connect', label: 'Open Ticket', href: '#connect', icon: <Mail size={14} />, desc: 'Get in touch' },
  ];

  const filtered = actions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase()) ||
    a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleNavigate = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-2xl overflow-hidden z-[70]"
          >
            <div className="flex items-center px-5 py-4 border-b border-[var(--border-subtle)]">
              <Search size={16} className="text-[var(--text-secondary)] mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-mono text-sm"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <div className="flex items-center gap-2 ml-3">
                <span className="px-1.5 py-0.5 text-[10px] font-mono rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] text-[var(--text-secondary)]">ESC</span>
                <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-1">
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="max-h-[320px] overflow-y-auto p-2">
              {filtered.map(action => (
                <motion.button
                  key={action.id}
                  onClick={() => handleNavigate(action.href)}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all duration-200 group text-left"
                >
                  <div className="p-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-action)] transition-colors shrink-0">
                    {action.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-sm font-medium">{action.label}</div>
                    <div className="text-[10px] text-[var(--text-secondary)] truncate">{action.desc}</div>
                  </div>
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </motion.button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-12 text-center text-[var(--text-secondary)] font-mono text-xs">
                  No results found for "<span className="text-[var(--text-primary)]">{query}</span>"
                </div>
              )}
            </div>
            <div className="px-5 py-3 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] mr-1 font-bold">⌘K</kbd>
                to open
              </span>
              <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] mr-1 font-bold">↑↓</kbd>
                to navigate
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ResumeModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed inset-4 md:inset-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-2xl overflow-hidden z-[90] flex flex-col"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
            <h3 className="font-mono text-sm font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-action)] to-purple-500 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              SEMMOZHIYAN_RESUME%20(4).pdf
            </h3>
            <div className="flex items-center gap-2">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="/SEMMOZHIYAN_RESUME%20(4).pdf"
                download
                className="p-2.5 hover:bg-[var(--bg-card)] rounded-lg transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--accent-action)] hover:border-[var(--accent-action)] border border-transparent"
                title="Download PDF"
              >
                <Download size={18} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={onClose}
                className="p-2.5 hover:bg-[var(--bg-card)] rounded-lg transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-subtle)]"
              >
                <X size={18} />
              </motion.button>
            </div>
          </div>
          <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
            <iframe src="/SEMMOZHIYAN_RESUME%20(4).pdf" className="w-full h-full" title="Resume PDF" />
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const FloatingResumeBtn = () => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 300);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="/SEMMOZHIYAN_RESUME%20(4).pdf"
          download
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-28 z-50 flex items-center gap-2.5 px-5 py-3 bg-gradient-to-r from-[var(--accent-action)] to-purple-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 font-mono text-xs font-bold"
        >
          <Download size={16} />
          <span>RESUME</span>
          <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity animate-shimmer" />
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [isCmdOpen, setIsCmdOpen] = React.useState(false);
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  const { theme, toggle: toggleTheme } = useTheme();
  const activeSection = useActiveSection(['system', 'logs', 'metrics', 'rfc', 'connect']);
  const { x: mouseX, y: mouseY } = useMousePosition();

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsCmdOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsCmdOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-action)] selection:text-white relative overflow-x-hidden transition-colors duration-300">
      <ScrollProgress />

      <NetworkBackground />

      {/* --- Content Layer --- */}
      <div className="relative z-10">
        <Navigation theme={theme} toggleTheme={toggleTheme} activeSection={activeSection} />
        <main>
          <Hero />
          <TechMarquee />
          <Changelog />
          <Skills />
          <SkillsRadar />
          <Projects />
          <Contact />
        </main>
        <SystemLogs />

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCmdOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-[var(--accent-action)] to-purple-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:shadow-[var(--accent-action)]/30 transition-all duration-300 border border-white/10"
          title="Command Palette (⌘K)"
        >
          <Command size={22} />
        </motion.button>

        <FloatingResumeBtn />
        <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

        <CommandPalette
          isOpen={isCmdOpen}
          onClose={() => setIsCmdOpen(false)}
        />
      </div>
    </div>
  );
};

export default App;
