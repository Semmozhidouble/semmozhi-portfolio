import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUpRight, Terminal, Server, Database, Layout, GitCommit, Activity, Box, Code2, Cpu, Layers, Command, Search, X } from 'lucide-react';

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
        {['system', 'logs', 'rfc', 'writing', 'connect'].map((item) => (
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
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
                SEMMOZHIYAN
              </h1>
              <p className="font-mono text-[var(--text-secondary)]">FULL_STACK_ENGINEER :: SYSTEM_ARCHITECT</p>
            </motion.div>

            <div className="p-6 bg-[var(--bg-card)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm mb-8">
              <div className="flex items-center gap-2 text-[var(--text-secondary)] mb-4 border-b border-[var(--border-subtle)] pb-2">
                <Terminal size={14} />
                <span>bio.txt</span>
              </div>
              <p className="leading-relaxed text-[var(--text-primary)]">
                <span className="text-[var(--accent-action)]">&gt;</span> Principal Engineer specializing in distributed systems and frontend infrastructure.<br/>
                <span className="text-[var(--accent-action)]">&gt;</span> Focused on scalable intelligence and minimal interfaces.<br/>
                <span className="text-[var(--accent-action)]">&gt;</span> Currently architecting high-performance tools.
              </p>
            </div>

            <div className="flex gap-4">
              <a href="https://github.com/semmozhi-ctrl" className="flex items-center gap-2 px-4 py-2 bg-[var(--text-primary)] text-[var(--bg-primary)] rounded text-sm font-medium hover:opacity-90 transition-opacity">
                <Github size={16} />
                GitHub
              </a>
              <a href="mailto:semmozhiyan40@gmail.com" className="flex items-center gap-2 px-4 py-2 border border-[var(--border-subtle)] text-[var(--text-primary)] rounded text-sm font-medium hover:bg-[var(--border-subtle)] transition-colors">
                <Mail size={16} />
                Email
              </a>
            </div>
          </div>

          <div className="md:col-span-4 space-y-4">
            <div className="p-4 border border-[var(--border-subtle)] rounded bg-[var(--bg-card)]">
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
            </div>
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
    { version: 'v3.0.0', date: '2024', title: 'Senior Engineer', desc: 'Leading frontend infrastructure and design systems.' },
    { version: 'v2.1.0', date: '2023', title: 'Full Stack Dev', desc: 'Scaled microservices to handle 10k+ concurrent users.' },
    { version: 'v1.0.0', date: '2021', title: 'Initial Commit', desc: 'Started journey in systems programming and web dev.' },
  ];

  return (
    <section id="logs" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="1" title="Changelog" />
        <div className="relative border-l border-[var(--border-subtle)] ml-3 space-y-12">
          {logs.map((log, i) => (
            <div key={i} className="relative pl-8">
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-[var(--bg-primary)] border border-[var(--text-secondary)]" />
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-1">
                <span className="font-mono text-xs text-[var(--accent-action)]">{log.version}</span>
                <h3 className="font-bold text-[var(--text-primary)]">{log.title}</h3>
                <span className="font-mono text-xs text-[var(--text-secondary)]">[{log.date}]</span>
              </div>
              <p className="text-[var(--text-secondary)] max-w-xl">{log.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StackLayer = ({ title, items }) => (
  <div className="mb-8">
    <h3 className="font-mono text-xs text-[var(--text-secondary)] mb-4 uppercase tracking-wider">{title}</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item, i) => (
        <div key={i} className="p-4 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-action)] transition-colors group">
          <div className="flex items-center gap-2 mb-2">
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
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

const ProjectCard = ({ id, title, stack, diff }) => (
  <motion.div 
    whileHover={{ y: -2 }}
    className="block p-6 border border-[var(--border-subtle)] bg-[var(--bg-card)] hover:border-[var(--accent-action)] transition-all cursor-pointer group"
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
  </motion.div>
);

const Projects = () => {
  const projects = [
    {
      id: 'RFC-001',
      title: 'Hospital Management System',
      stack: ['Python', 'Tkinter', 'SQLite'],
      diff: { latency: '-40%', throughput: '1k ops/s' }
    },
    {
      id: 'RFC-002',
      title: 'AirPreQ Prediction Engine',
      stack: ['Python', 'Flask', 'ML'],
      diff: { latency: '-150ms', throughput: 'Real-time' }
    }
  ];

  return (
    <section id="rfc" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="3" title="Architecture Reviews (RFCs)" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: 'Understanding React Server Components',
      date: '2024-03-10',
      readTime: '5 min',
      tags: ['React', 'Architecture'],
      link: '#'
    },
    {
      title: 'System Design: Scaling WebSockets',
      date: '2024-02-15',
      readTime: '8 min',
      tags: ['System Design', 'Node.js'],
      link: '#'
    },
    {
      title: 'Effective Monorepo Strategies',
      date: '2024-01-20',
      readTime: '6 min',
      tags: ['DevOps', 'Tooling'],
      link: '#'
    }
  ];

  return (
    <section id="writing" className="py-20 border-b border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeader number="4" title="Technical Writing" />
        <div className="space-y-1">
          {posts.map((post, i) => (
            <a 
              key={i} 
              href={post.link}
              className="group flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 -mx-4 rounded hover:bg-[var(--bg-card)] border border-transparent hover:border-[var(--border-subtle)] transition-all"
            >
              <div className="flex flex-col gap-1">
                <h3 className="font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-action)] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 text-xs font-mono text-[var(--text-secondary)]">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-3 sm:mt-0">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-1.5 py-0.5 bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <ArrowUpRight size={14} className="text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="connect" className="py-20">
    <div className="max-w-5xl mx-auto px-6">
      <SectionHeader number="5" title="Open Ticket" />
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
    { id: 'writing', label: 'Technical Writing', href: '#writing', icon: <Code2 size={14} /> },
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
                  href={action.href}
                  onClick={onClose}
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

const App = () => {
  const [isCmdOpen, setIsCmdOpen] = React.useState(false);

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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-[var(--accent-action)] selection:text-white">
      <Navigation />
      <main>
        <Hero />
        <TechMarquee />
        <Changelog />
        <Skills />
        <Projects />
        <Blog />
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

      <CommandPalette isOpen={isCmdOpen} onClose={() => setIsCmdOpen(false)} />
    </div>
  );
};

export default App;
