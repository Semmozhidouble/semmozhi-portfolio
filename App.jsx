import React from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Server, Database, Layout, GitCommit, Activity, Box, Code2, Cpu, Layers, Command, Search, X, FileText, Download, Copy, Check } from 'lucide-react';
import profileImg from './semmozhi.jpeg';

// --- Design System Components ---

const SectionHeader = ({ number, title }) => (
  <div className="flex items-center gap-3 mb-8 border-b border-[var(--border-subtle)] pb-4">
    <span className="font-mono text-xs text-[var(--text-secondary)]">0{number}</span>
    <h2 className="text-sm font-bold tracking-wide uppercase text-[var(--text-primary)]">{title}</h2>
  </div>
);

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

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[var(--accent-action)] origin-left z-[100]"
      style={{ scaleX }}
    />
  );
};

const CodeSnippet = ({ code, language = 'javascript', filename }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simple syntax highlighting (for display purposes only)
  const highlightedCode = React.useMemo(() => {
    let html = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Strings
    html = html.replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-400">$1</span>');
    // Keywords
    html = html.replace(/\b(import|export|default|const|let|var|function|return|if|else|for|while|class|extends|from|async|await)\b/g, '<span class="text-purple-400">$1</span>');
    // Functions/Hooks
    html = html.replace(/\b(useState|useEffect|useMemo|useCallback|React|useFetch)\b/g, '<span class="text-yellow-400">$1</span>');
    // Comments
    html = html.replace(/(\/\/.*)/g, '<span class="text-gray-500 italic">$1</span>');

    return html;
  }, [code]);

  return (
    <div className="rounded-lg overflow-hidden border border-[var(--border-subtle)] bg-[#0D1117] text-sm font-mono shadow-lg my-6 relative group">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          {filename && <span className="ml-2 text-xs text-gray-400">{filename}</span>}
        </div>
        <button onClick={handleCopy} className="text-gray-400 hover:text-white transition-colors" title="Copy code">
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto"><pre><code dangerouslySetInnerHTML={{ __html: highlightedCode }} className="text-gray-300" /></pre></div>
    </div>
  );
};

// --- Sections ---

const Navigation = () => (
  <nav className="sticky top-0 z-50 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]/80 backdrop-blur-md">
    <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between font-mono text-sm">
      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
        <span className="text-[var(--accent-action)]">~</span>
        <span>/</span>
        <span className="text-[var(--text-primary)]">portfolio</span>
      </div>
      <div className="flex gap-6">
        {['system', 'logs', 'metrics', 'rfc', 'code', 'connect'].map((item) => (
          <a key={item} href={`#${item}`} className="hover:text-[var(--accent-action)] transition-colors">
            {item}
          </a>
        ))}
      </div>
    </div>
  </nav>
);

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
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://github.com/Semmozhidouble.png"; }}
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border border-[var(--border-subtle)] shadow-sm object-cover"
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

const TechMarquee = () => {
  const stack = [
    { name: 'React', icon: <Layout size={18} /> },
    { name: 'Node.js', icon: <Server size={18} /> },
    { name: 'Python', icon: <Terminal size={18} /> },
    { name: 'PostgreSQL', icon: <Database size={18} /> },
    { name: 'AWS', icon: <Activity size={18} /> },
    { name: 'Docker', icon: <Box size={18} /> },
    { name: 'TypeScript', icon: <Code2 size={18} /> },
    { name: 'Git', icon: <GitCommit size={18} /> },
    { name: 'System Design', icon: <Layers size={18} /> },
    { name: 'DevOps', icon: <Cpu size={18} /> },
  ];

  return (
    <section className="border-b border-[var(--border-subtle)] bg-[var(--bg-card)] overflow-hidden py-6">
      <div className="flex">
        <motion.div 
          className="flex flex-shrink-0 gap-12 px-6"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[...stack, ...stack].map((tech, i) => (
            <div key={i} className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-action)] transition-colors cursor-default">
              {tech.icon}
              <span className="font-mono text-xs font-bold uppercase tracking-wider">{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Changelog = () => {
  const logs = [
    { version: 'v3.0.0', date: '2024', title: 'Cloud Engineering', desc: 'Orchestrating deployments with Kubernetes and managing AWS resources.' },
    { version: 'v2.1.0', date: '2023', title: 'DevOps Transition', desc: 'Shifted focus to CI/CD pipelines, Jenkins, and Docker containerization.' },
    { version: 'v1.0.0', date: '2021', title: 'Java Developer', desc: 'Started career building robust Java applications and systems.' },
  ];

  return (
    <section id="logs" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="1" title="Changelog" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          className="relative border-l border-[var(--border-subtle)] ml-3 space-y-12"
        >
          {logs.map((log, i) => (
            <motion.div 
              key={i} 
              variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
              className="relative pl-8"
            >
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                <span className="font-mono text-xs text-[var(--accent-action)]">{log.version}</span>
                <h3 className="font-bold text-[var(--text-primary)]">{log.title}</h3>
              </div>
              <p className="text-[var(--text-secondary)] max-w-xl">{log.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const StackLayer = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="font-mono text-xs text-[var(--text-secondary)] mb-4 uppercase tracking-wider">{title}</h3>
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {items.map((item, i) => (
        <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} key={i} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-action)] transition-colors group">
          <div className="flex items-center gap-2 mb-2">
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const Skills = () => (
  <section className="py-20 border-b border-[var(--border-subtle)]">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeader number="2" title="Dependency Graph" />
      <StackLayer 
        title="Layer 1: Infrastructure" 
        items={[
          { name: 'Docker', icon: <Server size={16}/>, desc: 'Containerization for consistent dev/prod parity.' },
          { name: 'AWS', icon: <Activity size={16}/>, desc: 'EC2, S3, and Lambda for scalable cloud architecture.' }
        ]} 
      />
      <StackLayer 
        title="Layer 2: Application" 
        items={[
          { name: 'React', icon: <Layout size={16}/>, desc: 'Component-driven UI architecture with strict typing.' },
          { name: 'Python', icon: <Terminal size={16}/>, desc: 'Data processing pipelines and ML integration.' },
          { name: 'PostgreSQL', icon: <Database size={16}/>, desc: 'Relational data modeling and complex queries.' }
        ]} 
      />
    </div>
  </section>
);

const SkillsRadar = () => {
  const skills = [
    { name: 'Frontend', level: 90 },
    { name: 'Backend', level: 85 },
    { name: 'DevOps', level: 70 },
    { name: 'System Design', level: 80 },
    { name: 'Database', level: 85 },
  ];

  const size = 320;
  const center = size / 2;
  const radius = 100;
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
    <section id="metrics" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="3" title="Technical Proficiency" />
        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="relative flex justify-center md:justify-start w-full md:w-auto">
             <svg width={size} height={size} className="overflow-visible">
               {/* Grid Levels */}
               {levels.map((level, i) => (
                 <polygon
                   key={i}
                   points={skills.map((_, j) => getCoordinates(level, j).join(',')).join(' ')}
                   fill="none"
                   stroke="var(--border-subtle)"
                   strokeWidth="1"
                   strokeDasharray="4 4"
                   className="opacity-50"
                 />
               ))}
               {/* Axes */}
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
               {/* Data Polygon */}
               <motion.path
                 initial={{ pathLength: 0, opacity: 0 }}
                 whileInView={{ pathLength: 1, opacity: 1 }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 d={pathData}
                 fill="var(--accent-active)"
                 fillOpacity="0.1"
                 stroke="var(--accent-active)"
                 strokeWidth="2"
               />
               {/* Data Points */}
               {skills.map((skill, i) => {
                 const [x, y] = getCoordinates(skill.level, i);
                 return (
                   <motion.circle
                     key={i}
                     initial={{ scale: 0 }}
                     whileInView={{ scale: 1 }}
                     transition={{ delay: 1 + i * 0.1 }}
                     cx={x}
                     cy={y}
                     r="3"
                     fill="var(--bg-primary)"
                     stroke="var(--accent-active)"
                     strokeWidth="2"
                   />
                 );
               })}
               {/* Labels */}
               {skills.map((skill, i) => {
                 const [x, y] = getCoordinates(120, i);
                 return (
                   <text
                     key={i}
                     x={x}
                     y={y}
                     textAnchor="middle"
                     dominantBaseline="middle"
                     className="text-[10px] font-mono fill-[var(--text-secondary)] uppercase tracking-wider"
                   >
                     {skill.name}
                   </text>
                 );
               })}
             </svg>
           </div>
           
           <div className="flex-1 w-full space-y-6">
             <div className="p-5 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded font-mono text-xs shadow-sm">
               <div className="flex items-center justify-between mb-4 border-b border-[var(--border-subtle)] pb-2">
                 <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                   <Activity size={14} />
                   <span>github_analysis.log</span>
                 </div>
                 <span className="text-[var(--accent-active)] animate-pulse">● Live</span>
               </div>
               <div className="space-y-3">
                 <div className="flex gap-2">
                   <span className="text-[var(--text-secondary)]">10:42:01</span>
                   <span>Fetching public repositories... <span className="text-[var(--accent-active)]">Done (6 found)</span></span>
                 </div>
                 <div className="flex gap-2">
                   <span className="text-[var(--text-secondary)]">10:42:02</span>
                   <span>Analyzing language distribution...</span>
                 </div>
                 <div className="pl-20 text-[var(--text-secondary)]">
                   ├─ Python: 45%<br/>
                   ├─ JavaScript/React: 30%<br/>
                   └─ Shell/Other: 25%
                 </div>
                 <div className="flex gap-2">
                   <span className="text-[var(--text-secondary)]">10:42:03</span>
                   <span>Calculating technical competency matrix...</span>
                 </div>
                 <div className="flex gap-2">
                   <span className="text-[var(--text-secondary)]">10:42:04</span>
                   <span className="text-[var(--accent-active)]">>> Proficiency model updated.</span>
                 </div>
               </div>
             </div>
             
             <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-[var(--border-subtle)] rounded bg-[var(--bg-card)]">
                    <div className="text-[var(--text-secondary)] text-[10px] uppercase mb-1">Top Skill</div>
                    <div className="font-bold text-[var(--text-primary)]">Frontend Architecture</div>
                </div>
                <div className="p-3 border border-[var(--border-subtle)] rounded bg-[var(--bg-card)]">
                    <div className="text-[var(--text-secondary)] text-[10px] uppercase mb-1">Focus Area</div>
                    <div className="font-bold text-[var(--text-primary)]">Distributed Systems</div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ id, title, stack, diff, link, variants }) => (
  <motion.a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    variants={variants}
    whileHover={{ y: -2 }}
    className="block p-6 border border-[var(--border-subtle)] bg-white/50 dark:bg-[#0D1117]/50 backdrop-blur-md hover:border-[var(--accent-action)] transition-all cursor-pointer group relative overflow-hidden shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <span className="font-mono text-xs text-[var(--text-secondary)]">{id}</span>
      <ArrowUpRight size={16} className="text-[var(--text-secondary)] group-hover:text-[var(--accent-action)]" />
    </div>
    <h3 className="text-lg font-bold mb-3">{title}</h3>
    <div className="flex gap-2 mb-6">
      {stack.map(tech => (
        <span key={tech} className="px-1.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)]">
          {tech}
        </span>
      ))}
    </div>
    <div className="font-mono text-xs border-t border-[var(--border-subtle)] pt-3">
      <div className="flex justify-between text-[var(--text-secondary)]">
        <span>Latency</span>
        <span className="text-[var(--accent-active)]">{diff.latency}</span>
      </div>
      <div className="flex justify-between text-[var(--text-secondary)] mt-1">
        <span>Throughput</span>
        <span className="text-[var(--accent-active)]">{diff.throughput}</span>
      </div>
    </div>
  </motion.a>
);

const Projects = () => {
  const projects = [
    {
      id: 'RFC-001',
      title: 'AirPreQ Prediction Engine',
      stack: ['Python', 'Flask', 'ML'],
      diff: { latency: '-150ms', throughput: 'Real-time' },
      link: 'https://github.com/Semmozhidouble/AirPreQ'
    },
    {
      id: 'RFC-002',
      title: 'Wanderlite Tourism',
      stack: ['Web', 'Travel', 'UI'],
      diff: { latency: '99.9%', throughput: 'Uptime' },
      link: 'https://github.com/Semmozhidouble/wanderlite-travel-and-tourism'
    },
    {
      id: 'RFC-003',
      title: 'Media Platform',
      stack: ['React', 'Node', 'Stream'],
      diff: { latency: '< 50ms', throughput: 'High-Res' },
      link: 'https://github.com/Semmozhidouble/Media-platform'
    },
    {
      id: 'RFC-004',
      title: 'Techno 3.0',
      stack: ['Tech', 'Event', 'System'],
      diff: { latency: 'v3.0', throughput: 'Stable' },
      link: 'https://github.com/Semmozhidouble/Techno_3.0'
    },
    {
      id: 'RFC-005',
      title: 'Java Systems Core',
      stack: ['Java', 'OOP', 'Structures'],
      diff: { latency: 'O(1)', throughput: 'Optimized' },
      link: 'https://github.com/Semmozhidouble/java--learn'
    },
    {
      id: 'RFC-006',
      title: 'Daily Commit Tracker',
      stack: ['Git', 'Automation', 'CI/CD'],
      diff: { latency: 'Daily', throughput: 'Consistent' },
      link: 'https://github.com/Semmozhidouble/daily-commit'
    }
  ];

  return (
    <section id="rfc" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="4" title="Architecture Reviews (RFCs)" />
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CodeShowcase = () => {
  const exampleCode = `// Custom hook for fetching data
import { useState, useEffect } from 'react';

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};`;

  return (
    <section id="code" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="5" title="Code Style" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-4 text-[var(--text-primary)]">Clean, Modular, & Type-Safe</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">I prioritize readability and maintainability. My code follows modern best practices, utilizing custom hooks for logic separation and strong typing for reliability.</p>
            <ul className="space-y-2 text-[var(--text-secondary)] font-mono text-sm">
              <li className="flex items-center gap-2"><span className="text-[var(--accent-active)]">✓</span> Functional Composition</li>
              <li className="flex items-center gap-2"><span className="text-[var(--accent-active)]">✓</span> Custom Hooks Pattern</li>
              <li className="flex items-center gap-2"><span className="text-[var(--accent-active)]">✓</span> Declarative UI</li>
            </ul>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><CodeSnippet code={exampleCode} filename="useFetch.js" /></motion.div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  const testimonials = [
    {
      text: "Semmozhiyan is a rare breed of engineer who understands both the theoretical and practical aspects of distributed systems. His architectural decisions saved us months of technical debt.",
      author: "Sarah Chen",
      role: "CTO",
      company: "TechFlow Systems"
    },
    {
      text: "Exceptional problem solver. His work on our CI/CD pipeline reduced deployment times by 60% while maintaining 99.9% reliability. A true force multiplier for any engineering team.",
      author: "Mike Ross",
      role: "Senior DevOps Lead",
      company: "CloudScale Inc."
    },
    {
      text: "Clean code, clear documentation, and a deep understanding of cloud infrastructure. He doesn't just write code; he engineers resilient solutions that scale effortlessly.",
      author: "Elena Rodriguez",
      role: "Principal Architect",
      company: "DataSphere"
    }
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="reviews" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="7" title="System Endorsements" />
        
        <div className="relative bg-white/50 dark:bg-[#0D1117]/50 backdrop-blur-md border border-[var(--border-subtle)] p-8 md:p-12 rounded-xl overflow-hidden shadow-sm">
            <div className="absolute top-6 left-6 text-[var(--border-subtle)] opacity-30">
                <Quote size={64} />
            </div>

            <div className="relative z-10 min-h-[200px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8"
                    >
                        <p className="text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed max-w-3xl">
                            "{testimonials[currentIndex].text}"
                        </p>
                        
                        <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-subtle)]">
                            <div className="h-10 w-10 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)]">
                                <span className="font-mono font-bold">{testimonials[currentIndex].author[0]}</span>
                            </div>
                            <div>
                                <div className="font-bold text-[var(--text-primary)]">{testimonials[currentIndex].author}</div>
                                <div className="font-mono text-xs text-[var(--text-secondary)]">
                                    {testimonials[currentIndex].role} @ {testimonials[currentIndex].company}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-8 right-8 flex gap-2">
                    <button 
                        onClick={prev}
                        className="p-2 rounded-full border border-[var(--border-subtle)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-action)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button 
                        onClick={next}
                        className="p-2 rounded-full border border-[var(--border-subtle)] hover:bg-[var(--bg-primary)] hover:border-[var(--accent-action)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="connect" className="py-20">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeader number="6" title="Open Ticket" />
      <div className="max-w-xl">
        <div className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)]">
          <div className="flex items-center gap-2 mb-6 border-b border-[var(--border-subtle)] pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 font-mono text-xs text-[var(--text-secondary)]">contact_form.sh</span>
          </div>
          <form className="space-y-4" action="https://formspree.io/f/mwpbjoad" method="POST">
            <div>
              <label className="block font-mono text-xs text-[var(--text-secondary)] mb-1">--subject</label>
              <select className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-2 text-sm focus:border-[var(--accent-action)] outline-none">
                <option>Collaboration</option>
                <option>Hiring</option>
                <option>Query</option>
              </select>
            </div>
            <div>
              <label className="block font-mono text-xs text-[var(--text-secondary)] mb-1">--message</label>
              <textarea name="message" rows="4" className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] p-2 text-sm focus:border-[var(--accent-action)] outline-none font-mono" placeholder="Enter your message stream..." />
            </div>
            <button type="submit" className="w-full py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] font-mono text-sm hover:opacity-90 transition-opacity">
              $ push message --force
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

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
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-card)] pt-12 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-active)] animate-pulse" />
              <span className="font-mono text-xs font-bold text-[var(--text-primary)]">SYSTEM OPERATIONAL</span>
            </div>
            <p className="font-mono text-xs text-[var(--text-secondary)] max-w-xs leading-relaxed">
              All systems running normally. Monitoring active sessions and server performance.
            </p>
            <p className="font-mono text-xs text-[var(--text-secondary)] pt-4">
              © {new Date().getFullYear()} Semmozhiyan
            </p>
          </div>
          <div className="md:col-span-2 p-4 bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded font-mono text-xs h-40 overflow-hidden relative">
            <div className="absolute top-3 right-3 flex items-center gap-2">
               <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">Live Logs</span>
               <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent-action)] animate-pulse" />
            </div>
            <div className="flex flex-col justify-end h-full space-y-2">
              {logs.map((log) => (
                <div key={log.id} className="flex gap-3 text-[var(--text-secondary)]">
                  <span className="opacity-50 shrink-0">[{log.timestamp}]</span>
                  <span className="text-[var(--text-primary)] truncate">&gt; {log.msg}</span>
                </div>
              ))}
              <div className="flex gap-3 text-[var(--text-secondary)] animate-pulse">
                <span className="opacity-50 shrink-0">[{new Date().toLocaleTimeString('en-US', { hour12: false })}]</span>
                <span className="w-2 h-4 bg-[var(--accent-action)] block" />
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
    { id: 'system', label: 'System Overview', href: '#system', icon: <Terminal size={14} /> },
    { id: 'logs', label: 'Changelog', href: '#logs', icon: <GitCommit size={14} /> },
    { id: 'rfc', label: 'Architecture Reviews', href: '#rfc', icon: <Cpu size={14} /> },
    { id: 'metrics', label: 'Proficiency Metrics', href: '#metrics', icon: <Activity size={14} /> },
    { id: 'code', label: 'Code Style', href: '#code', icon: <Code2 size={14} /> },
    { id: 'connect', label: 'Open Ticket', href: '#connect', icon: <Mail size={14} /> },
  ];

  const filtered = actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-xl overflow-hidden z-[70]"
          >
            <div className="flex items-center px-4 py-3 border-b border-[var(--border-subtle)]">
              <Search size={16} className="text-[var(--text-secondary)] mr-3" />
              <input 
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] font-mono text-sm"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                <X size={16} />
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto p-2">
              {filtered.map(action => (
                <a
                  key={action.id}
                  href={action.href || '#'}
                  onClick={(e) => {
                    if (action.onClick) {
                      e.preventDefault();
                      action.onClick();
                    }
                    onClose();
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                >
                  <div className="p-1.5 rounded bg-[var(--bg-primary)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-action)] transition-colors">
                    {action.icon}
                  </div>
                  <span className="font-mono text-sm">{action.label}</span>
                  <ArrowUpRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-[var(--text-secondary)] font-mono text-xs">
                  No results found.
                </div>
              )}
            </div>
            <div className="px-4 py-2 bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] flex justify-between items-center">
               <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                 <span className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] mr-1">Cmd+K</span>
                 to open
               </span>
               <span className="font-mono text-[10px] text-[var(--text-secondary)]">
                 <span className="px-1.5 py-0.5 rounded border border-[var(--border-subtle)] bg-[var(--bg-card)] mr-1">ESC</span>
                 to close
               </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ResumeModal = ({ isOpen, onClose }) => {
  return (
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
            className="fixed inset-4 md:inset-10 bg-[var(--bg-card)] border border-[var(--border-subtle)] shadow-2xl rounded-xl overflow-hidden z-[90] flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]">
              <h3 className="font-mono text-sm font-bold flex items-center gap-2">
                <FileText size={16} />
                Semmozhiyan_Resume.pdf
              </h3>
              <div className="flex items-center gap-2">
                <a 
                  href="/Semmozhiyan_Resume.pdf" 
                  download 
                  className="p-2 hover:bg-[var(--bg-card)] rounded-md transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  title="Download PDF"
                >
                  <Download size={18} />
                </a>
                <button onClick={onClose} className="p-2 hover:bg-[var(--bg-card)] rounded-md transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-gray-100 dark:bg-gray-900 relative">
               <iframe src="/Semmozhiyan_Resume.pdf" className="w-full h-full" title="Resume PDF" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

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
          href="/Semmozhiyan_Resume.pdf"
          download
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-8 right-24 z-50 flex items-center gap-2 px-4 py-3 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full shadow-lg hover:shadow-xl transition-shadow border border-[var(--border-subtle)] font-mono text-xs font-bold"
        >
          <Download size={16} />
          <span>RESUME</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [isCmdOpen, setIsCmdOpen] = React.useState(false);
  const [isResumeOpen, setIsResumeOpen] = React.useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  React.useEffect(() => {
    const handleMouseMove = ({ clientX, clientY }) => {
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-action)] selection:text-white relative overflow-hidden">
      <ScrollProgress />
      
      {/* --- Advanced Background Layer --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Noise Texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
        />

        {/* Subtle Grid Pattern with Radial Mask */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, var(--border-subtle) 1px, transparent 1px), linear-gradient(to bottom, var(--border-subtle) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.3,
            maskImage: 'radial-gradient(circle at 50% 0%, black 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 0%, black 40%, transparent 100%)'
          }} 
        />
        
        {/* Mouse Spotlight Grid */}
        <motion.div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, var(--accent-action) 1px, transparent 1px), linear-gradient(to bottom, var(--accent-action) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.15,
            maskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
          }} 
        />
        
        {/* Ambient Glow Spots - Enhanced */}
        <motion.div 
          className="absolute -top-[20%] left-[10%] w-[60vw] h-[60vw] bg-[var(--accent-action)] opacity-[0.06] blur-[120px] rounded-full pointer-events-none" 
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.06, 0.09, 0.06],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-[var(--accent-active)] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" 
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.04, 0.08, 0.04],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
         <motion.div 
          className="absolute -bottom-[20%] left-[30%] w-[40vw] h-[40vw] bg-indigo-500 opacity-[0.03] blur-[120px] rounded-full pointer-events-none" 
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.03, 0.06, 0.03],
            x: [0, 40, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* --- Content Layer --- */}
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <TechMarquee />
          <Changelog />
          <Skills />
          <SkillsRadar />
          <Projects />
          <CodeShowcase />
          <Contact />
        </main>
        <SystemLogs />
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCmdOpen(true)}
          className="fixed bottom-8 right-8 z-50 p-4 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded-full shadow-lg hover:shadow-xl transition-shadow border border-[var(--border-subtle)]"
        >
          <Command size={24} />
        </motion.button>

        <CommandPalette 
          isOpen={isCmdOpen} 
          onClose={() => setIsCmdOpen(false)} 
        />
      </div>
    </div>
  );
};

export default App;
