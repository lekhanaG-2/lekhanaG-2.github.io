'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  Blocks,
  BriefcaseBusiness,
  Check,
  Code2,
  Database,
  Download,
  ExternalLink,
  GraduationCap,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  ServerCog,
  Sparkles,
} from 'lucide-react';
import { ProjectCore } from '@/components/project-core';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const github = 'https://github.com/lekhanaG-2';
const linkedin = 'https://www.linkedin.com/in/lekhana-g-970697340';

const featuredProjects = [
  {
    id: 'project-stackaudit',
    number: '01',
    year: '2026',
    category: 'Featured SaaS build',
    title: 'StackAudit',
    problem:
      'Software teams need a clearer way to understand avoidable AI and infrastructure spending.',
    contribution:
      'Built an audit experience that combines deterministic findings, shareable reports and concise AI-assisted summaries.',
    features: [
      'Deterministic audit engine',
      'Public audit reports',
      'AI-generated summaries',
      'Automated testing and CI',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'OpenAI'],
    architecture: 'Interface → Audit logic → Supabase → AI summary',
    codeUrl: 'https://github.com/lekhanaG-2/stackaudit',
    liveUrl: 'https://stackaudit-three.vercel.app/',
    media: 'stackaudit',
  },
  {
    id: 'project-task-tracker',
    number: '02',
    year: '2026',
    category: 'Full-stack application',
    title: 'Task Tracker',
    problem:
      'Everyday work becomes hard to manage when tasks cannot be searched, prioritised and tracked in one place.',
    contribution:
      'Implemented a responsive MERN workflow for creating, updating, filtering and organising tasks.',
    features: [
      'Task CRUD operations',
      'Search and filters',
      'Status tracking',
      'Priority and due-date views',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    architecture: 'React interface → REST API → Express → MongoDB',
    codeUrl: 'https://github.com/lekhanaG-2/task-tracker-mern',
    liveUrl: null,
    media: 'task',
  },
  {
    id: 'project-finance-dashboard',
    number: '03',
    year: '2026',
    category: 'Data visualisation',
    title: 'Finance Dashboard',
    problem:
      'Financial activity is easier to understand when transactions, categories and trends share one clear interface.',
    contribution:
      'Created a responsive dashboard with transaction workflows, charts, insights and role-aware views.',
    features: [
      'Financial insight views',
      'Transaction workflows',
      'Interactive charts',
      'Theme and role controls',
    ],
    stack: ['React.js', 'Recharts', 'Tailwind CSS', 'Vite'],
    architecture: 'React interface → Finance context → Recharts → Local data',
    codeUrl: 'https://github.com/lekhanaG-2/finance-db',
    liveUrl: null,
    media: 'finance',
  },
  {
    id: 'project-farmer-marketplace',
    number: '04',
    year: '2026',
    category: 'Academic full-stack build',
    title: 'Farmer Marketplace',
    problem:
      'Farmers and consumers need a direct digital path for discovering products and managing orders.',
    contribution:
      'Built product, account and order-management workflows for a responsive two-sided marketplace.',
    features: [
      'User authentication',
      'Product management',
      'Order management',
      'Responsive experience',
    ],
    stack: ['React.js', 'Node.js', 'MySQL', 'MongoDB'],
    architecture: 'React interface → Node.js services → MySQL / MongoDB',
    codeUrl:
      'https://github.com/lekhanaG-2/e-commerce-application-for-farmer-and-consumer',
    liveUrl:
      'https://lekhanag-2.github.io/e-commerce-application-for-farmer-and-consumer/',
    media: 'market',
  },
];

const secondaryProjects = [
  {
    number: '05',
    title: 'Neon Jackpot',
    description:
      'A Unity slot machine with deterministic game logic, responsive reel animation, tests and a playable WebGL build.',
    stack: ['Unity', 'C#', 'WebGL'],
    codeUrl: 'https://github.com/lekhanaG-2/neon-jackpot-unity-slot-game',
    liveUrl: 'https://lekhanag-2.github.io/neon-jackpot-unity-slot-game/',
    accent: 'violet',
  },
  {
    number: '06',
    title: 'Students Table',
    description:
      'A responsive student-records application with CRUD operations, search, validation, local persistence and Excel export.',
    stack: ['React.js', 'JavaScript', 'CSS3', 'XLSX'],
    codeUrl: 'https://github.com/lekhanaG-2/students-table',
    liveUrl: 'https://lekhanag-2.github.io/students-table/',
    accent: 'blue',
  },
  {
    number: '07',
    title: 'SkillBoost',
    description:
      'A responsive learning-platform landing page with course previews, mobile navigation and accessible interactions.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    codeUrl: 'https://github.com/lekhanaG-2/skillboost-landing-page',
    liveUrl: 'https://lekhanag-2.github.io/skillboost-landing-page/',
    accent: 'cyan',
  },
];

const skillGroups = [
  {
    number: '01',
    name: 'Frontend',
    icon: Code2,
    description:
      'Responsive, accessible interfaces with clear component structure.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Next.js'],
  },
  {
    number: '02',
    name: 'Backend',
    icon: ServerCog,
    description:
      'Application logic, APIs and server-rendered Java experiences.',
    technologies: ['Node.js', 'Express.js', 'Java', 'JSP', 'Servlets'],
  },
  {
    number: '03',
    name: 'Data & tools',
    icon: Database,
    description:
      'Relational and document data with practical development workflows.',
    technologies: ['SQL', 'MySQL', 'MongoDB', 'Supabase', 'GitHub'],
  },
  {
    number: '04',
    name: 'Project exposure',
    icon: Blocks,
    description: 'Technologies used across current public and academic builds.',
    technologies: ['TypeScript', 'C#', 'Unity', 'GitHub Actions'],
  },
];

const navItems = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Journey', id: 'journey' },
];

function ProjectVisual({ media, title }: { media: string; title: string }) {
  if (media === 'stackaudit') {
    return (
      <div className="project-visual project-visual-image">
        <div className="project-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>stackaudit.app</small>
        </div>
        <Image
          src="/project-stackaudit.webp"
          alt="StackAudit application homepage"
          width={1280}
          height={720}
        />
      </div>
    );
  }

  if (media === 'finance') {
    return (
      <div className="project-visual project-visual-image finance-visual">
        <div className="project-browser-bar" aria-hidden="true">
          <span />
          <span />
          <span />
          <small>finance dashboard</small>
        </div>
        <Image
          src="/project-finance.webp"
          alt="Finance Dashboard application interface"
          width={1280}
          height={720}
        />
      </div>
    );
  }

  if (media === 'task') {
    return (
      <figure
        className="project-visual project-poster task-poster"
        aria-label="Task Tracker system overview poster"
      >
        <div className="poster-heading">
          <span>System overview</span>
          <strong>Task Tracker</strong>
        </div>
        <div className="task-board" aria-hidden="true">
          <div>
            <small>TO DO</small>
            <span />
            <span />
          </div>
          <div>
            <small>IN PROGRESS</small>
            <span />
            <span className="short" />
          </div>
          <div>
            <small>DONE</small>
            <span />
            <span />
          </div>
        </div>
        <div className="poster-flow" aria-hidden="true">
          <span>REACT</span>
          <i>→</i>
          <span>EXPRESS</span>
          <i>→</i>
          <span>MONGODB</span>
        </div>
      </figure>
    );
  }

  return (
    <figure
      className="project-visual project-poster market-poster"
      aria-label={`${title} project overview poster`}
    >
      <div className="poster-heading">
        <span>Marketplace workflow</span>
        <strong>Farmer ↔ Consumer</strong>
      </div>
      <div className="market-route" aria-hidden="true">
        <div>
          <span>F</span>
          <small>Farmer</small>
        </div>
        <i>Products</i>
        <div>
          <span>FM</span>
          <small>Platform</small>
        </div>
        <i>Orders</i>
        <div>
          <span>C</span>
          <small>Consumer</small>
        </div>
      </div>
      <div className="market-grid" aria-hidden="true">
        <span>Produce</span>
        <span>Accounts</span>
        <span>Orders</span>
        <span>Responsive UI</span>
      </div>
    </figure>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [activeProject, setActiveProject] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [compactNav, setCompactNav] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompactNav(window.scrollY > 48);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = [
      'home',
      'about',
      'projects',
      'skills',
      'journey',
      'contact',
    ]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-18% 0px -62%', threshold: [0.01, 0.2, 0.45] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const projects = Array.from(
      document.querySelectorAll<HTMLElement>('[data-featured-index]'),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0.44,
        );
        if (visible)
          setActiveProject(
            Number((visible.target as HTMLElement).dataset.featuredIndex),
          );
      },
      { threshold: [0.44, 0.62] },
    );
    const removeListeners = projects.map((project) => {
      const activate = () =>
        setActiveProject(Number(project.dataset.featuredIndex));
      project.addEventListener('pointerenter', activate);
      project.addEventListener('focusin', activate);
      observer.observe(project);
      return () => {
        project.removeEventListener('pointerenter', activate);
        project.removeEventListener('focusin', activate);
      };
    });
    return () => {
      observer.disconnect();
      removeListeners.forEach((removeListener) => removeListener());
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main id="top">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className={`nav-shell${compactNav ? ' is-compact' : ''}`}>
        <header className="site-header">
          <a href="#home" className="wordmark" aria-label="Lekhana G, home">
            <span>LG</span>
            <strong>Lekhana G</strong>
          </a>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? 'is-active' : ''}
              >
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="nav-actions">
            <a
              className="nav-github"
              href={github}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Lekhana's GitHub profile"
            >
              <Code2 size={18} aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a className="nav-contact" href="#contact">
              Contact <ArrowUpRight size={16} aria-hidden="true" />
            </a>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                render={
                  <button
                    className="menu-trigger"
                    type="button"
                    aria-label="Open navigation menu"
                  />
                }
              >
                <Menu size={22} aria-hidden="true" />
              </SheetTrigger>
              <SheetContent className="mobile-sheet" side="right">
                <SheetHeader>
                  <SheetTitle>Explore Lekhana&apos;s portfolio</SheetTitle>
                  <SheetDescription>
                    Navigate to a section or open a profile.
                  </SheetDescription>
                </SheetHeader>
                <nav className="mobile-menu" aria-label="Mobile navigation">
                  {[
                    { label: 'Home', id: 'home' },
                    ...navItems,
                    { label: 'Contact', id: 'contact' },
                  ].map((item, index) => (
                    <a href={`#${item.id}`} key={item.id} onClick={closeMenu}>
                      <span>{String(index).padStart(2, '0')}</span>
                      {item.label}
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                  ))}
                  <a
                    href={github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeMenu}
                  >
                    <Code2 size={18} aria-hidden="true" />
                    GitHub profile
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      </div>

      <div id="main-content">
        <section
          className="hero section-shell"
          id="home"
          aria-labelledby="hero-title"
        >
          <div className="hero-glow hero-glow-one" aria-hidden="true" />
          <div className="hero-glow hero-glow-two" aria-hidden="true" />
          <div className="hero-copy">
            <div className="availability hero-enter-one">
              <span aria-hidden="true" />
              Open to software development opportunities
            </div>
            <p className="eyebrow hero-enter-two">
              FULL-STACK DEVELOPER · WEB DEVELOPER
            </p>
            <h1 id="hero-title" className="hero-enter-three">
              Hi, I&apos;m Lekhana.
              <br />
              <span>I build thoughtful, intelligent web products.</span>
            </h1>
            <p className="hero-intro hero-enter-four">
              MCA student and full-stack developer in Bangalore, focused on
              building responsive applications that are clear, useful and
              dependable.
            </p>
            <div className="hero-actions hero-enter-four">
              <a className="button primary-button" href="#projects">
                View My Work <ArrowDown size={17} aria-hidden="true" />
              </a>
              <a
                className="button secondary-button"
                href="/Lekhana-G-Resume.pdf"
                download
              >
                <Download size={17} aria-hidden="true" />
                Download Résumé
              </a>
              <a
                className="button text-button"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                <Code2 size={17} aria-hidden="true" />
                GitHub Profile
              </a>
            </div>
            <div className="hero-meta hero-enter-four">
              <span>
                <MapPin size={16} aria-hidden="true" />
                Bangalore, India
              </span>
              <a href="mailto:lekhanag561@gmail.com">
                <Mail size={16} aria-hidden="true" />
                lekhanag561@gmail.com
              </a>
            </div>
          </div>
          <div className="hero-core hero-enter-core">
            <ProjectCore
              activeProject={activeProject}
              onProjectChange={setActiveProject}
            />
          </div>
        </section>

        <section className="stats-strip" aria-label="Portfolio statistics">
          <div className="stats-inner section-shell">
            <div>
              <strong>7</strong>
              <span>Public repositories</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Industry internships</span>
            </div>
            <div>
              <strong>8.13</strong>
              <span>MCA CGPA</span>
            </div>
            <p>
              <span aria-hidden="true">↗</span> Genuine work. Clear evidence.
            </p>
          </div>
        </section>

        <section
          className="about-section section-pad"
          id="about"
          aria-labelledby="about-title"
        >
          <div className="section-shell about-layout">
            <div className="portrait-wrap reveal-on-scroll">
              <div className="portrait-frame">
                <Image
                  src="/lekhana-profile.webp"
                  alt="Portrait of Lekhana G"
                  width={1000}
                  height={1000}
                />
              </div>
              <span className="photo-chip chip-react">React</span>
              <span className="photo-chip chip-node">Node.js</span>
              <span className="photo-chip chip-sql">SQL</span>
              <div className="portrait-signature">
                <span>LG</span>
                <p>
                  <strong>Based in Bangalore</strong>
                  <small>Designing with clarity. Building with care.</small>
                </p>
              </div>
            </div>
            <div className="about-copy reveal-on-scroll">
              <div className="section-kicker">
                <span>01</span>ABOUT
              </div>
              <h2 id="about-title">Beyond the interface</h2>
              <p className="about-lead">
                I enjoy turning real problems into{' '}
                <span>simple, user-friendly software.</span>
              </p>
              <div className="about-body">
                <p>
                  With a foundation in software development and web application
                  development, I work across frontend, backend and databases. I
                  enjoy learning new technologies and improving every project
                  through careful problem-solving.
                </p>
                <p>
                  My goal is to grow into a strong software engineer who builds
                  dependable products and contributes across the complete
                  development lifecycle.
                </p>
              </div>
              <div className="about-facts">
                <div>
                  <small>FOCUS</small>
                  <strong>Full-stack web products</strong>
                </div>
                <div>
                  <small>EDUCATION</small>
                  <strong>MCA · 2024–2026</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="projects-section section-pad"
          id="projects"
          aria-labelledby="projects-title"
        >
          <div className="section-shell">
            <div className="section-heading projects-heading">
              <div>
                <div className="section-kicker">
                  <span>02</span>FEATURED PROJECTS
                </div>
                <h2 id="projects-title">
                  Built to solve,
                  <br />
                  designed to be understood.
                </h2>
              </div>
              <div>
                <p>
                  Four detailed builds across SaaS, productivity, finance and
                  commerce—each presented with the real tools and functionality
                  behind it.
                </p>
                <a
                  href={`${github}?tab=repositories`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View all 7 repositories{' '}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="featured-projects">
              {featuredProjects.map((project, index) => (
                <article
                  className="featured-project"
                  id={project.id}
                  key={project.id}
                  data-featured-index={index}
                >
                  <div className="project-copy">
                    <div className="project-meta">
                      <span>{project.number}</span>
                      <p>{project.category}</p>
                      <small>{project.year}</small>
                    </div>
                    <h3>{project.title}</h3>
                    <div className="project-story">
                      <small>THE PROBLEM</small>
                      <p>{project.problem}</p>
                    </div>
                    <div className="project-story">
                      <small>MY CONTRIBUTION</small>
                      <p>{project.contribution}</p>
                    </div>
                    <ul className="feature-list">
                      {project.features.map((feature) => (
                        <li key={feature}>
                          <Check size={15} aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="tech-list"
                      aria-label={`${project.title} technologies`}
                    >
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <p className="architecture">
                      <span>ARCHITECTURE</span>
                      {project.architecture}
                    </p>
                    <div className="project-actions">
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Code2 size={17} aria-hidden="true" />
                        Source
                      </a>
                      {project.liveUrl && (
                        <a
                          className="project-live"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open live demo of ${project.title}`}
                        >
                          Live Demo
                          <ExternalLink size={16} aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                  <ProjectVisual media={project.media} title={project.title} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="skills-section section-pad"
          id="skills"
          aria-labelledby="skills-title"
        >
          <div className="section-shell">
            <div className="section-heading compact-heading">
              <div>
                <div className="section-kicker light-kicker">
                  <span>03</span>TECHNICAL TOOLKIT
                </div>
                <h2 id="skills-title">
                  From interface
                  <br />
                  to database.
                </h2>
              </div>
              <p>
                A practical toolkit for responsive, data-driven
                applications—organised by how each technology contributes to the
                product.
              </p>
            </div>
            <div className="toolkit-grid">
              {skillGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <article className="toolkit-card" key={group.name}>
                    <div className="toolkit-top">
                      <span>{group.number}</span>
                      <Icon size={23} aria-hidden="true" />
                    </div>
                    <h3>{group.name}</h3>
                    <p>{group.description}</p>
                    <div className="toolkit-tags">
                      {group.technologies.map((technology) => (
                        <span key={technology}>{technology}</span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="journey-section section-pad"
          id="journey"
          aria-labelledby="journey-title"
        >
          <div className="section-shell">
            <div className="section-heading journey-heading">
              <div>
                <div className="section-kicker">
                  <span>04</span>EXPERIENCE & EDUCATION
                </div>
                <h2 id="journey-title">Learning by building.</h2>
              </div>
              <p>
                A growing foundation shaped by industry exposure, academic work
                and hands-on development.
              </p>
            </div>
            <div className="journey-grid">
              <div className="journey-column">
                <div className="journey-column-title">
                  <BriefcaseBusiness size={20} aria-hidden="true" />
                  <h3>Experience</h3>
                </div>
                <article className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-date">Industry experience</div>
                  <div className="timeline-copy">
                    <h4>Web Developer Intern</h4>
                    <p>Tech-Tailor Solutions Pvt. Ltd.</p>
                    <small>
                      Rebuilding responsive website experiences end to end—from
                      user interfaces and application logic to database
                      integration.
                    </small>
                    <div className="timeline-tags">
                      <span>Web interfaces</span>
                      <span>Database integration</span>
                    </div>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-date">2026</div>
                  <div className="timeline-copy">
                    <h4>Engineer Intern</h4>
                    <p>Mobilean Technologies Pvt. Ltd.</p>
                    <small>
                      Trained in Oracle Fusion Cloud ERP with exposure to
                      procurement, inventory and business workflows.
                    </small>
                    <div className="timeline-tags">
                      <span>Oracle Fusion Cloud ERP</span>
                    </div>
                  </div>
                </article>
              </div>
              <div className="journey-column education-column">
                <div className="journey-column-title">
                  <GraduationCap size={22} aria-hidden="true" />
                  <h3>Education</h3>
                </div>
                <article className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-date">2024 — 2026</div>
                  <div className="timeline-copy">
                    <h4>Master of Computer Applications</h4>
                    <p>New Horizon College of Engineering, Bengaluru</p>
                    <small>CGPA 8.13</small>
                    <div className="timeline-tags">
                      <span>MCA</span>
                    </div>
                  </div>
                </article>
                <article className="timeline-item">
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-date">2021 — 2024</div>
                  <div className="timeline-copy">
                    <h4>Bachelor of Computer Applications</h4>
                    <p>
                      Smt. Parthamma Shamanuru Shivashankarappa School of
                      Hi-Tech Education, Davangere
                    </p>
                    <small>CGPA 8.14</small>
                    <div className="timeline-tags">
                      <span>BCA</span>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section
          className="more-projects section-pad"
          aria-labelledby="more-projects-title"
        >
          <div className="section-shell">
            <div className="more-projects-heading">
              <div className="section-kicker">
                <span>05</span>MORE PROJECTS
              </div>
              <h2 id="more-projects-title">More public work</h2>
              <p>
                Three focused builds that extend the portfolio across
                interactive, data and landing-page experiences.
              </p>
            </div>
            <div className="secondary-grid">
              {secondaryProjects.map((project) => (
                <article
                  className={`secondary-card accent-${project.accent}`}
                  key={project.number}
                >
                  <div className="secondary-top">
                    <span>{project.number}</span>
                    <Layers3 size={20} aria-hidden="true" />
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tech-list">
                    {project.stack.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  <div className="secondary-actions">
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Code2 size={17} aria-hidden="true" />
                      Source
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${project.title} live demo`}
                    >
                      Live Demo
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section section-pad"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="section-shell contact-card">
            <div className="contact-copy">
              <div className="contact-badge">
                <Sparkles size={16} aria-hidden="true" />
                OPEN TO OPPORTUNITIES
              </div>
              <h2 id="contact-title">
                Let&apos;s build something
                <br />
                <span>useful together.</span>
              </h2>
              <p>
                I&apos;m open to web development and software development
                opportunities.
              </p>
              <a
                className="button contact-button"
                href="mailto:lekhanag561@gmail.com"
              >
                Start a conversation
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-panel">
              <a href="mailto:lekhanag561@gmail.com">
                <span>
                  <Mail size={19} aria-hidden="true" />
                  EMAIL
                </span>
                <strong>lekhanag561@gmail.com</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href={github} target="_blank" rel="noreferrer">
                <span>
                  <Code2 size={19} aria-hidden="true" />
                  GITHUB
                </span>
                <strong>@lekhanaG-2</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                <span>
                  <BriefcaseBusiness size={19} aria-hidden="true" />
                  LINKEDIN
                </span>
                <strong>Lekhana G</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="/Lekhana-G-Resume.pdf" download>
                <span>
                  <Download size={19} aria-hidden="true" />
                  RÉSUMÉ
                </span>
                <strong>Download PDF</strong>
                <ArrowDown size={18} aria-hidden="true" />
              </a>
              <a href="tel:+918088473253">
                <span>
                  <Phone size={19} aria-hidden="true" />
                  PHONE
                </span>
                <strong>+91 80884 73253</strong>
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div className="footer-brand">
            <span>LG</span>
            <p>
              <strong>Lekhana G</strong>
              <small>Designed and developed by Lekhana G.</small>
            </p>
          </div>
          <div className="footer-links">
            <a href={github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="mailto:lekhanag561@gmail.com">Email</a>
          </div>
          <p>© 2026 Lekhana G</p>
          <a className="back-top" href="#top">
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </footer>
    </main>
  );
}
