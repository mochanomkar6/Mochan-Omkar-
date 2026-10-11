import { useState, useRef, useEffect, useCallback } from 'react';
import './index.css';

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  filterCategory: string;
  tags: string[];
  description: string;
  highlights: string[];
  mono: string;
  accentColor: string;
  accentBg: string;
  link: string;
  github: string;
}

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  badge: string;
  description: string;
  points: string[];
  technologies: string[];
}

interface Award {
  title: string;
  event: string;
  date: string;
  description: string;
  tag: string;
  highlight?: boolean;
}

const EXPERIENCES: Experience[] = [
  {
    id: 'mp-it-solution',
    role: 'WordPress Developer',
    company: 'MP IT Solution',
    period: 'Nov 2023 – Jun 2025',
    badge: 'Professional Experience',
    description:
      'Delivered optimized, responsive client web solutions, implementing modern frontend workflows and integrating custom functionality across multiple production websites.',
    points: [
      'Developed, customized, and tested production-ready WordPress websites and themes using modern frontend workflows.',
      'Integrated third-party APIs and custom plugins to expand website functionality, collaborating closely with team members during development sprints.',
      'Improved application responsiveness, site speed, and cross-device user experience across multiple client projects.',
    ],
    technologies: ['WordPress', 'PHP', 'JavaScript', 'Custom Plugins', 'REST APIs', 'Theme Development', 'Performance Optimization'],
  },
  {
    id: 'codealpha',
    role: 'Full Stack Development Intern',
    company: 'CodeAlpha',
    period: 'Dec 2025 – Jan 2026',
    badge: 'Ministry of MSME Supported',
    description:
      'Engineered responsive web modules and backend data pipelines, with credentials recognized and supported by the Ministry of MSME, Government of India.',
    points: [
      'Developed end-to-end web modules connecting responsive frontend interfaces with backend data pipelines.',
      'Structured RESTful endpoints and optimized application state-management workflows.',
      'Completed the internship with verified credentials supported by the Ministry of MSME, Government of India.',
    ],
    technologies: ['Full Stack', 'RESTful Endpoints', 'Python', 'JavaScript', 'Data Pipelines', 'State Management'],
  },
];

const PROJECTS: Project[] = [
  {
    id: 'patidar-medical',
    number: '01',
    title: 'Patidar Medical Delivery Platform',
    category: 'Mobile & Backend',
    filterCategory: 'mobile',
    tags: ['Flutter', 'Dart', 'FastAPI', 'Python', 'Quick-Commerce', 'REST APIs'],
    description:
      'A pharmacy quick-commerce mobile application concept featuring comprehensive medicine catalog search, real-time cart calculations, checkout workflows, and an asynchronous FastAPI backend.',
    highlights: [
      'Built an asynchronous FastAPI backend for medicine inventory, cart calculations, order-state transitions, and dispatch operations.',
      'Developed responsive mobile UI components in Flutter for tracking, checkout, and API-driven application workflows.',
      'Engineered medicine catalog search with category filtering and instant availability checks.',
      'Structured end-to-end order lifecycle tracking from cart creation to simulated fulfillment.',
    ],
    mono: 'PM',
    accentColor: '#8a4f1e',
    accentBg: 'rgba(138, 79, 30, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
  {
    id: 'study-pet',
    number: '02',
    title: 'Study Pet Space Coder AI Companion',
    category: 'Python & AI / RAG',
    filterCategory: 'ai',
    tags: ['Python', 'PyQt6', 'LLM', 'RAG', 'psutil', 'Desktop App'],
    description:
      'A desktop productivity and study assistant engineered with Python and PyQt6, featuring state-based mood behavior, system-tray functionality, distraction-blocking heuristics, and a local RAG pipeline.',
    highlights: [
      'Integrated a local Retrieval-Augmented Generation (RAG) pipeline for indexing, retrieving, and synthesizing coding documentation and technical preparation material.',
      'Implemented distraction-blocking functionality using psutil process inspection and integrated Pomodoro focus timers.',
      'Engineered state-based mood behaviors with animated pixel-art character states.',
      'Designed low-overhead desktop overlay and background daemon via system-tray functionality.',
    ],
    mono: 'SP',
    accentColor: '#5c3140',
    accentBg: 'rgba(92, 49, 64, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
  {
    id: 'ai-smart-monitoring',
    number: '03',
    title: 'AI Smart Monitoring & Attendance System',
    category: 'Computer Vision & Deep Learning',
    filterCategory: 'ai',
    tags: ['OpenCV', 'MediaPipe', 'PyTorch', 'Computer Vision', 'Deep Learning'],
    description:
      'A robust computer-vision pipeline for automated facial recognition and student attendance logging, integrating MediaPipe landmark tracking with PyTorch-based deep-learning models under varying lighting conditions.',
    highlights: [
      'Built a computer-vision pipeline for facial recognition and automated student attendance logging.',
      'Integrated MediaPipe facial landmark tracking with PyTorch-based deep-learning models.',
      'Designed and tuned the recognition pipeline to operate consistently under varying ambient lighting conditions.',
      'Automated session verification and attendance record export.',
    ],
    mono: 'AI',
    accentColor: '#1b4332',
    accentBg: 'rgba(27, 67, 50, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
  {
    id: 'todo-rest-api',
    number: '04',
    title: 'Todo REST API',
    category: 'Backend & Microservices',
    filterCategory: 'backend',
    tags: ['Python', 'FastAPI', 'Pydantic', 'REST APIs', 'PostgreSQL'],
    description:
      'A clean, production-ready RESTful Todo API built with FastAPI and Python for creating, retrieving, updating, and deleting tasks with strict schema enforcement and validation.',
    highlights: [
      'Structured API endpoints following REST principles and tested backend functionality thoroughly during development.',
      'Implemented rigorous request and response validation using Pydantic models.',
      'Automated OpenAPI / Swagger interactive documentation with detailed error schemas.',
      'Asynchronous query handling designed for high-concurrency client workloads.',
    ],
    mono: 'TR',
    accentColor: '#2e2a24',
    accentBg: 'rgba(46, 42, 36, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
  {
    id: 'sanjeevani',
    number: '05',
    title: 'Sanjeevani — Innovik 6.0 Hackathon Award',
    category: 'Backend & Agentic AI',
    filterCategory: 'hackathon',
    tags: ['FastAPI', 'WebSockets', 'Esri Maps', 'Agentic AI', 'INNOVIK 6.0'],
    description:
      'Emergency response and disaster management system built under a 48-hour sprint. Awarded 5th Place & "Best Problem Solving Approach" at INNOVIK 6.0 International Hackathon for Agentic AI for Smart Solutions.',
    highlights: [
      '5th Place & "Best Problem Solving Approach" award at INNOVIK 6.0 International Hackathon (Team Sanjeevani).',
      'Sub-second SOS broadcast via real-time WebSockets and live emergency triage dispatch.',
      'Esri GIS mapping integration with vehicle routing and emergency facility discovery.',
      'Rapid prototype architecture delivered under tight competition deadline.',
    ],
    mono: 'SJ',
    accentColor: '#6b2b1c',
    accentBg: 'rgba(107, 43, 28, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
  {
    id: 'udyam-x',
    number: '06',
    title: 'Udyam X-MSME Business Growth Platform',
    category: 'AI & Business Systems',
    filterCategory: 'hackathon',
    tags: ['Python', 'Machine Learning', 'Barcode Scanner', 'MSME', 'FastAPI'],
    description:
      'Hackathon Finalist platform engineered to accelerate MSME commerce, featuring an AI sales-prediction engine and real-time barcode-based inventory management module.',
    highlights: [
      'Hackathon Finalist project developed for national MSME business acceleration.',
      'Integrated AI sales-prediction engine analyzing demand velocity and seasonal sales trends.',
      'Real-time barcode-based inventory intake module with low-latency catalog lookups.',
      'Modular REST architecture linking inventory updates directly with sales forecasting.',
    ],
    mono: 'UX',
    accentColor: '#1e3a5f',
    accentBg: 'rgba(30, 58, 95, 0.08)',
    link: '#',
    github: 'https://github.com/mochanomkar6',
  },
];

const AWARDS: Award[] = [
  {
    title: '5th Place & "Best Problem Solving Approach"',
    event: 'INNOVIK 6.0 International Hackathon',
    date: 'Sept 2026',
    description:
      'Awarded with Team Sanjeevani for "Agentic AI for Smart Solutions", pitching an emergency incident dispatch system with real-time GIS mapping.',
    tag: 'International Hackathon',
    highlight: true,
  },
  {
    title: 'Hackathon Finalist',
    event: 'Udyam X-MSME Business Growth Platform',
    date: '2026',
    description:
      'Finalist in high-impact hackathon for developing an AI sales-prediction engine and barcode-based inventory management platform.',
    tag: 'Finalist Award',
    highlight: true,
  },
  {
    title: 'Outstanding Performance (90%)',
    event: 'Hands-On Python Programming Certification',
    date: 'May 2026',
    description:
      'Recognized for outstanding 90% score by Vikrant AI Nexus Club & CSE Department in comprehensive hands-on Python evaluation.',
    tag: 'Top Performance',
  },
  {
    title: 'Hackathon Competitor',
    event: 'India Ascends & MumbaiHacks',
    date: '2025 – 2026',
    description:
      'Participated in fast-paced collaborative development sprints, engineering functional prototypes under stringent time limits.',
    tag: 'Sprint Competitor',
  },
  {
    title: 'Global Coding Competitor',
    event: 'TCS CodeVita Global Competition',
    date: '2025',
    description:
      'Registered participant and competitor in the renowned TCS CodeVita global competitive programming contest.',
    tag: 'Competitive Coding',
  },
  {
    title: 'National Campaign & Quiz Participant',
    event: 'Nasha Mukt Yuva for Viksit Bharat & Budget Quest',
    date: '2026',
    description:
      'Actively participated in national youth engagement initiatives including the Viksit Bharat campaign and Budget Quest 2026.',
    tag: 'Youth Initiative',
  },
];

const SKILL_CATEGORIES = [
  {
    title: 'Backend & APIs',
    chapter: '01',
    description: 'Scalable services, asynchronous processing, and API design',
    skills: ['FastAPI', 'REST APIs', 'Asynchronous I/O', 'Microservices', 'Pydantic'],
  },
  {
    title: 'AI, LLM & Computer Vision',
    chapter: '02',
    description: 'Intelligent systems, retrieval pipelines, and neural networks',
    skills: ['LLM Applications', 'RAG Pipelines', 'Prompt Engineering', 'PyTorch', 'OpenCV', 'MediaPipe'],
  },
  {
    title: 'Languages & Databases',
    chapter: '03',
    description: 'Core runtime languages and structured datastores',
    skills: ['Python', 'C++', 'Dart', 'JavaScript', 'PostgreSQL', 'SQLite'],
  },
  {
    title: 'Frontend, Mobile & CMS',
    chapter: '04',
    description: 'Cross-platform mobile apps, client web & desktop GUIs',
    skills: ['Flutter', 'React', 'React Native', 'Expo', 'PyQt6', 'WordPress'],
  },
  {
    title: 'Cloud, Systems & Tools',
    chapter: '05',
    description: 'DevOps, infrastructure, security, and game engines',
    skills: ['Git / GitHub', 'Linux', 'AWS Cloud Foundations', 'Networking', 'Cloud Security', 'Unreal Engine 5', 'Unity', 'Blender 3D'],
  },
];

const MARQUEE_ITEMS = [
  'FastAPI',
  'Python',
  'RAG Pipelines',
  'LLM Applications',
  'REST APIs',
  'PyTorch',
  'OpenCV',
  'MediaPipe',
  'Flutter',
  'Dart',
  'PostgreSQL',
  'PyQt6',
  'WordPress',
  'Asynchronous I/O',
  'Microservices',
  'AWS Cloud',
  'Git / Linux',
];

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(16);
  const targetFrameRef = useRef(16);
  const rafIdRef = useRef<number | null>(null);
  const totalFrames = 32;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Responsive window dimensions tracking
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Entrance animation states (sliding in from left on load)
  const [hasEntered, setHasEntered] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  // Scroll tracking states
  const [scrollProgress, setScrollProgress] = useState(0);
  const targetScrollProgressRef = useRef(0);
  const currentScrollProgressRef = useRef(0);

  // Smooth custom cursor state
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  // Draw current frame on canvas with responsive multi-screen adaptive fit
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = framesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Cap DPR at 2 for performance on high-density mobile screens
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    const imgRatio = 1280 / 720;
    const screenRatio = displayWidth / displayHeight;
    let renderW: number, renderH: number, offsetX: number, offsetY: number;

    if (displayWidth >= 1024) {
      // Desktop: Cover-fit 16:9 frame centered
      if (screenRatio > imgRatio) {
        renderW = displayWidth;
        renderH = displayWidth / imgRatio;
        offsetX = 0;
        offsetY = (displayHeight - renderH) / 2;
      } else {
        renderH = displayHeight;
        renderW = displayHeight * imgRatio;
        offsetX = (displayWidth - renderW) / 2;
        offsetY = 0;
      }
    } else if (displayWidth < 768) {
      // Mobile: Proportionally frame the character so full head & body fit within the screen
      const maxAllowedH = displayHeight * 0.72;
      renderW = Math.min(displayWidth * 1.65, maxAllowedH * imgRatio);
      renderH = renderW / imgRatio;
      offsetX = (displayWidth - renderW) / 2;
      offsetY = (displayHeight - renderH) / 2 + displayHeight * 0.04;
    } else {
      // Tablet (768px - 1023px)
      const maxAllowedH = displayHeight * 0.75;
      renderW = Math.min(displayWidth * 1.35, maxAllowedH * imgRatio);
      renderH = renderW / imgRatio;
      offsetX = (displayWidth - renderW) / 2;
      offsetY = (displayHeight - renderH) / 2 + displayHeight * 0.02;
    }

    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
    ctx.restore();
  }, []);

  // Always start at the top on refresh/load
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  // Preload all 32 transparent frames and track window size
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(2, '0')}.webp`;
      img.onload = () => {
        loadedCount++;
        if (i === 16 || loadedCount === totalFrames) {
          drawFrame(16);
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      const frameIdx = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrameRef.current)));
      drawFrame(frameIdx);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawFrame]);

  // Entrance animation trigger (slides in from left on open)
  useEffect(() => {
    const t1 = setTimeout(() => setHasEntered(true), 60);
    const t2 = setTimeout(() => setEntranceDone(true), 1300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Track window scroll
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = window.innerHeight * 0.9;
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      targetScrollProgressRef.current = progress;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animation frame loop for smooth cursor follower, character scrub, and scroll interpolation
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;

      // 1. Smooth cursor follower interpolation (LERP)
      const ring = ringPosRef.current;
      const mouse = mousePosRef.current;
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }

      // 2. Smooth character frame scrub with LERP
      const fDiff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(fDiff) > 0.01) {
        currentFrameRef.current += fDiff * 0.14;
        const frameIdx = Math.max(0, Math.min(totalFrames - 1, Math.round(currentFrameRef.current)));
        drawFrame(frameIdx);
      }

      // 3. Smooth scroll progress LERP
      const sDiff = targetScrollProgressRef.current - currentScrollProgressRef.current;
      if (Math.abs(sDiff) > 0.001) {
        currentScrollProgressRef.current += sDiff * 0.12;
        setScrollProgress(currentScrollProgressRef.current);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Mouse, Touch, & Gyroscope listeners for responsive character interaction
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setCursorVisible(true);
      mousePosRef.current = { x: e.clientX, y: e.clientY };

      const progress = Math.max(0, Math.min(1, e.clientX / window.innerWidth));
      targetFrameRef.current = progress * (totalFrames - 1);

      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input, select, textarea, .interactive-hover')) {
        setCursorHovered(true);
      } else {
        setCursorHovered(false);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && window.scrollY < 200) {
        const touch = e.touches[0];
        const progress = Math.max(0, Math.min(1, touch.clientX / window.innerWidth));
        targetFrameRef.current = progress * (totalFrames - 1);
      }
    };

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && window.scrollY < 260) {
        const clamped = Math.max(-25, Math.min(25, e.gamma));
        const progress = (clamped + 25) / 50;
        targetFrameRef.current = progress * (totalFrames - 1);
      }
    };

    const onMouseEnter = () => setCursorVisible(true);
    const onMouseLeave = () => {
      setCursorVisible(false);
      setCursorHovered(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('mochanomkar5@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  // Filter projects by category
  const filteredProjects =
    selectedFilter === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => {
          const f = selectedFilter.toLowerCase();
          if (f === 'ai & llm / cv') {
            return (
              p.filterCategory === 'ai' ||
              p.category.toLowerCase().includes('ai') ||
              p.category.toLowerCase().includes('vision') ||
              p.tags.some((t) => ['llm', 'rag', 'opencv', 'pytorch', 'deep learning'].includes(t.toLowerCase()))
            );
          }
          if (f === 'python & backend') {
            return (
              p.filterCategory === 'backend' ||
              p.category.toLowerCase().includes('backend') ||
              p.tags.some((t) => ['fastapi', 'rest apis', 'python', 'pydantic'].includes(t.toLowerCase()))
            );
          }
          if (f === 'mobile & flutter') {
            return (
              p.filterCategory === 'mobile' ||
              p.category.toLowerCase().includes('mobile') ||
              p.tags.some((t) => t.toLowerCase().includes('flutter'))
            );
          }
          if (f === 'hackathon wins') {
            return (
              p.filterCategory === 'hackathon' ||
              p.tags.some((t) => t.toLowerCase().includes('hackathon') || t.toLowerCase().includes('innovik'))
            );
          }
          return (
            p.category.toLowerCase().includes(f) ||
            p.tags.some((t) => t.toLowerCase().includes(f))
          );
        });

  const charShiftX = isDesktop ? -scrollProgress * 28 : 0;
  const charShiftY = isDesktop ? 0 : isMobile ? -scrollProgress * 16 : -scrollProgress * 12;
  const canvasOpacity = isDesktop
    ? 1
    : isMobile
      ? Math.max(0, 1 - scrollProgress * 3.5)
      : Math.max(0, 1 - scrollProgress * 3.0);

  const mochanOpacity = !hasEntered
    ? 0
    : !entranceDone
      ? 1
      : Math.max(0, 1 - scrollProgress * 2.8);

  return (
    <div className="relative w-full min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-x-hidden">
      {/* Smooth Interactive Custom Cursor (Desktop only) */}
      {!isMobile && !isTablet && (
        <>
          <div
            ref={cursorDotRef}
            className={`cursor-dot ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            aria-hidden="true"
          />
          <div
            ref={cursorRingRef}
            className={`cursor-ring ${cursorHovered ? 'cursor-hover' : ''} ${cursorVisible ? 'opacity-100' : 'opacity-0'
              } transition-opacity duration-300`}
            aria-hidden="true"
          />
        </>
      )}

      {/* Solid Complete Black Name BEHIND the Character — Continuous Moving Marquee ("MOCHAN OMKAR") */}
      <div
        className="fixed inset-x-0 top-0 pt-[22vh] sm:pt-[24vh] md:pt-[22vh] lg:pt-[20vh] flex pointer-events-none select-none z-[1] overflow-hidden"
        style={{
          transform: `translate3d(${-scrollProgress * 12}vw, 0, 0)`,
          opacity: mochanOpacity,
          willChange: 'transform, opacity',
          transition: !entranceDone ? 'opacity 0.85s ease-out' : 'none',
        }}
        aria-hidden="true"
      >
        <div className="hero-marquee-track flex items-center">
          {/* Track segment 1 */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12 pr-4 sm:pr-8 md:pr-12">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="inline-flex items-center gap-4 sm:gap-8 md:gap-12 text-black font-medium uppercase tracking-[-0.03em] leading-none whitespace-nowrap select-none"
                style={{
                  fontSize: 'clamp(70px, 18vw, 340px)',
                  fontFamily: 'var(--font-heading)',
                  color: '#000000',
                  transform: 'scaleY(1.35)',
                  transformOrigin: 'center center',
                }}
              >
                <span>MOCHAN</span>
                <span className="text-black/20 font-light text-[0.45em] select-none">✳︎</span>
                <span>OMKAR</span>
                <span className="text-black/20 font-light text-[0.45em] select-none">✳︎</span>
              </span>
            ))}
          </div>

          {/* Track segment 2 (duplicate for seamless loop) */}
          <div className="flex items-center gap-4 sm:gap-8 md:gap-12 pr-4 sm:pr-8 md:pr-12">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={`dup-${i}`}
                className="inline-flex items-center gap-4 sm:gap-8 md:gap-12 text-black font-medium uppercase tracking-[-0.03em] leading-none whitespace-nowrap select-none"
                style={{
                  fontSize: 'clamp(70px, 18vw, 340px)',
                  fontFamily: 'var(--font-heading)',
                  color: '#000000',
                  transform: 'scaleY(1.35)',
                  transformOrigin: 'center center',
                }}
              >
                <span>MOCHAN</span>
                <span className="text-black/20 font-light text-[0.45em] select-none">✳︎</span>
                <span>OMKAR</span>
                <span className="text-black/20 font-light text-[0.45em] select-none">✳︎</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Character Canvas: Starts in center; shifts left on desktop scroll or smoothly fades on mobile/tablet */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[2] transition-opacity duration-200"
        style={{
          transform: `translate3d(${charShiftX}vw, ${charShiftY}vh, 0)`,
          opacity: canvasOpacity,
          willChange: 'transform, opacity',
        }}
      />

      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white/85 backdrop-blur-md border-b border-black/5 transition-all">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex justify-between items-center">
          {/* Logo / Name */}
          <a
            href="#top"
            className="flex items-center gap-2 group text-black font-bold tracking-tight text-[22px] sm:text-[25px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <span>mochan</span>
            <span className="text-[#8a4f1e] group-hover:scale-125 transition-transform duration-300">.</span>
          </a>

          {/* Desktop & Tablet Nav Links */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-[14px] xl:text-[15px] font-medium text-black/75">
            <a href="#about" className="hover:text-black transition-colors">
              About
            </a>
            <span className="text-black/20">/</span>
            <a href="#experience" className="hover:text-black transition-colors">
              Experience
            </a>
            <span className="text-black/20">/</span>
            <a href="#projects" className="hover:text-black transition-colors">
              Projects
            </a>
            <span className="text-black/20">/</span>
            <a href="#skills" className="hover:text-black transition-colors">
              Tech Stack
            </a>
            <span className="text-black/20">/</span>
            <a href="#awards" className="hover:text-black transition-colors">
              Awards
            </a>
            <span className="text-black/20">/</span>
            <a href="#contact" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>

          {/* Top Actions: Resume & Contact */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/Mochan_Omkar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 lg:px-4 py-2 rounded-full border border-black/20 text-black text-[13px] font-medium hover:border-black hover:bg-black/5 transition-colors"
              title="Open / Download Mochan Omkar's Resume PDF"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Resume PDF</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 lg:px-5 py-2 rounded-full bg-black text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors shadow-sm"
            >
              <span>Get in touch</span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <div
              className={`w-5 h-[2px] bg-black transition-all duration-300 origin-center ${
                isMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <div
              className={`w-5 h-[2px] bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
            />
            <div
              className={`w-5 h-[2px] bg-black transition-all duration-300 origin-center ${
                isMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`lg:hidden bg-white/95 backdrop-blur-lg border-b border-black/10 px-6 py-6 flex flex-col gap-4 max-h-[calc(100vh-70px)] overflow-y-auto transition-all duration-300 ${
            isMenuOpen ? 'block opacity-100' : 'hidden opacity-0'
          }`}
        >
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            Projects
          </a>
          <a
            href="#skills"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            Tech Stack
          </a>
          <a
            href="#awards"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            Awards &amp; Competitions
          </a>
          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="text-[18px] font-medium text-black hover:text-[#8a4f1e] py-1"
          >
            Contact
          </a>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href="/Mochan_Omkar_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-full border border-black/20 text-black text-[15px] font-medium"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download Resume PDF</span>
            </a>

            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex items-center justify-center w-full px-5 py-3 rounded-full bg-black text-white text-[15px] font-medium"
            >
              Get in touch
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Landing Stage (Clean, centered character, scroll indicator) */}
      <section id="top" className="relative h-screen w-full flex flex-col justify-end items-center pb-8 sm:pb-12 pointer-events-none z-10">
        <div
          className={`flex flex-col items-center gap-2.5 transition-all duration-500 ${
            scrollProgress > 0.15 ? 'opacity-0 translate-y-4' : 'opacity-70 translate-y-0'
          }`}
        >
          <span className="text-[11px] uppercase tracking-widest text-black font-mono">
            Scroll down to explore
          </span>
          <div className="w-[1.5px] h-6 bg-black/40 animate-pulse" />
        </div>
      </section>

      {/* Main Portfolio Content Stream */}
      <main className="relative z-10 w-full pb-24 sm:pb-32">
        <div className="w-full max-w-2xl lg:max-w-2xl xl:max-w-3xl mx-auto lg:ml-[38vw] xl:ml-[40vw] lg:mr-auto px-5 sm:px-8 md:px-10 lg:px-8 xl:px-12 flex flex-col gap-20 sm:gap-28 lg:gap-36">

          {/* ================= 01. ABOUT ME ================= */}
          <section id="about" className="scroll-mt-28 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full border border-black/15 bg-black/[0.02] w-fit">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-[12px] font-mono uppercase tracking-wider text-black/80">
                    Open to Engineering Roles • Available for Work
                  </span>
                </div>
              </div>

              <h2
                className="text-[28px] sm:text-[38px] md:text-[44px] lg:text-[48px] font-bold leading-[1.15] tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Python Backend &amp; AI Developer building <span className="underline decoration-[#8a4f1e]/40 underline-offset-4">intelligent systems</span>.
              </h2>

              <p className="text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed text-black/75">
                Software engineer with hands-on experience in <strong>Python backend development</strong>, <strong>FastAPI</strong>, <strong>REST APIs</strong>, <strong>AI/LLM applications</strong>, <strong>RAG pipelines</strong>, and <strong>computer vision</strong>. Experienced in building practical applications across backend, desktop, mobile, and AI domains.
              </p>

              <p className="text-[14px] sm:text-[15px] leading-relaxed text-black/65">
                Hackathon finalist with a proven track record of shipping asynchronous APIs, database-backed applications, and AI-powered systems. Also experienced in professional web development, having delivered optimized and responsive WordPress client solutions.
              </p>

              {/* Direct Resume CTA */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="/Mochan_Omkar_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-black text-white text-[13px] font-medium hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download Resume (PDF)</span>
                </a>

                <a
                  href="https://github.com/mochanomkar6"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-black/15 text-[13px] font-medium text-black hover:border-black transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.83-.26.83-.57v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span>@mochanomkar6</span>
                </a>

                <a
                  href="https://linkedin.com/in/mochan-omkar"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-black/15 text-[13px] font-medium text-black hover:border-black transition-colors"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            {/* Code Terminal Widget */}
            <div className="rounded-2xl border border-black/15 bg-[#0f0e0d] text-[#f4e7cf] overflow-hidden shadow-xl">
              <div className="px-4 py-3 bg-[#181613] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#e05f52]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f4be4f]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5fc454]" />
                </div>
                <span className="font-mono text-[11px] sm:text-xs text-white/50">mochan_profile.py</span>
                <span className="w-6 sm:w-8" />
              </div>
              <pre className="p-4 sm:p-5 font-mono text-[12px] sm:text-[13px] md:text-[13.5px] leading-relaxed overflow-x-auto">
                <code>
                  <span className="text-purple-400">developer</span> = {'{\n'}
                  {'  '}<span className="text-blue-300">"name"</span>: <span className="text-emerald-400">"Mochan Omkar"</span>,{'\n'}
                  {'  '}<span className="text-blue-300">"role"</span>: <span className="text-amber-300">"Python Backend Developer"</span>,{'\n'}
                  {'  '}<span className="text-blue-300">"core_focus"</span>: [<span className="text-emerald-400">"FastAPI"</span>, <span className="text-emerald-400">"RAG Pipelines"</span>, <span className="text-emerald-400">"LLM Systems"</span>, <span className="text-emerald-400">"Computer Vision"</span>],{'\n'}
                  {'  '}<span className="text-blue-300">"databases"</span>: [<span className="text-amber-200">"PostgreSQL"</span>, <span className="text-amber-200">"SQLite"</span>],{'\n'}
                  {'  '}<span className="text-blue-300">"specialization"</span>: <span className="text-emerald-400">"Asynchronous APIs &amp; Scalable Microservices"</span>,{'\n'}
                  {'  '}<span className="text-blue-300">"hackathon_awards"</span>: <span className="text-amber-300">"5th Place &amp; Best Problem Solving @ INNOVIK 6.0"</span>,{'\n'}
                  {'  '}<span className="text-blue-300">"email"</span>: <span className="text-emerald-400">"mochanomkar5@gmail.com"</span>,{'\n'}
                  {'  '}<span className="text-blue-300">"phone"</span>: <span className="text-emerald-400">"+91 9131115784"</span>{'\n'}
                  {'}'}
                </code>
              </pre>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-1">
              <div className="p-4 sm:p-5 rounded-2xl border border-black/10 bg-black/[0.015] flex flex-col gap-1.5 hover:border-black/30 transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black font-mono">6+</span>
                <span className="font-semibold text-black text-[14px] sm:text-[15px]">Production &amp; AI Projects</span>
                <p className="text-[11px] sm:text-xs text-black/60 leading-normal">
                  FastAPI backends, local RAG pipelines, computer vision attendance, and Flutter commerce.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-black/10 bg-black/[0.015] flex flex-col gap-1.5 hover:border-black/30 transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black font-mono">1.5+ Yrs</span>
                <span className="font-semibold text-black text-[14px] sm:text-[15px]">Work &amp; Internship</span>
                <p className="text-[11px] sm:text-xs text-black/60 leading-normal">
                  WordPress client solutions at MP IT Solution &amp; MSME-supported Full Stack internship.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-black/10 bg-black/[0.015] flex flex-col gap-1.5 hover:border-black/30 transition-colors">
                <span className="text-2xl sm:text-3xl md:text-4xl font-black text-black font-mono">90%</span>
                <span className="font-semibold text-black text-[14px] sm:text-[15px]">Python Performance</span>
                <p className="text-[11px] sm:text-xs text-black/60 leading-normal">
                  Top certified score in hands-on Python by Vikrant AI Nexus Club &amp; CSE Dept.
                </p>
              </div>
            </div>
          </section>

          {/* ================= 02. EXPERIENCE ================= */}
          <section id="experience" className="scroll-mt-28 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-black/10 pb-4 sm:pb-5">
              <div>
                <p className="font-mono text-[11px] sm:text-xs text-black/50 uppercase tracking-widest">
                  02 / 05 — Professional Journey
                </p>
                <h2
                  className="text-[28px] sm:text-[36px] md:text-[42px] font-bold text-black tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Work Experience
                </h2>
              </div>

              <span className="font-mono text-xs text-black/60 self-start sm:self-auto">
                Industry &amp; Client Delivery
              </span>
            </div>

            <div className="flex flex-col gap-6 sm:gap-7">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-7 md:p-8 flex flex-col gap-5 hover:border-black/30 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8a4f1e]/10 text-[#8a4f1e] text-[11px] font-mono font-medium">
                          {exp.badge}
                        </span>
                      </div>
                      <h3
                        className="text-[20px] sm:text-[24px] font-bold text-black mt-1"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {exp.role}
                      </h3>
                      <p className="text-[14px] sm:text-[15px] font-semibold text-black/80">
                        {exp.company}
                      </p>
                    </div>

                    <div className="font-mono text-xs text-black/60 sm:text-right shrink-0 bg-black/[0.03] px-3 py-1.5 rounded-lg border border-black/5 w-fit sm:w-auto">
                      {exp.period}
                    </div>
                  </div>

                  <p className="text-[14px] sm:text-[15px] text-black/75 leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="flex flex-col gap-2.5 pt-1">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-black/80 leading-relaxed">
                        <span className="text-[#8a4f1e] font-bold shrink-0 mt-0.5">✓</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="mono-pill px-2.5 sm:px-3 py-1 rounded-full bg-black/[0.04] text-black/70 border border-black/5 text-[10px] sm:text-[11px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 03. FEATURED PROJECTS ================= */}
          <section id="projects" className="scroll-mt-28 flex flex-col gap-6 sm:gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-black/10 pb-4 sm:pb-5">
              <div>
                <p className="font-mono text-[11px] sm:text-xs text-black/50 uppercase tracking-widest">
                  03 / 05 — Engineering Portfolio
                </p>
                <h2
                  className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-black tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Featured Projects
                </h2>
              </div>

              <a
                href="https://github.com/mochanomkar6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-black hover:text-[#8a4f1e] transition-colors self-start sm:self-auto"
              >
                <span>github.com/mochanomkar6</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['All', 'Python & Backend', 'AI & LLM / CV', 'Mobile & Flutter', 'Hackathon Wins'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-1.5 rounded-full text-xs font-mono transition-all min-h-[38px] flex items-center ${
                    selectedFilter === filter
                      ? 'bg-black text-white shadow-sm'
                      : 'border border-black/15 bg-white text-black/70 hover:border-black/40'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Project Cards List */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="project-card-container group rounded-2xl sm:rounded-3xl border border-black/10 bg-white p-5 sm:p-7 md:p-8 flex flex-col gap-5 sm:gap-6"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center font-mono font-bold text-base sm:text-lg shrink-0"
                        style={{
                          backgroundColor: project.accentBg,
                          color: project.accentColor,
                          border: `1px solid ${project.accentColor}33`,
                        }}
                      >
                        {project.mono}
                      </div>
                      <div>
                        <span className="font-mono text-[10px] sm:text-xs text-black/40 uppercase tracking-widest block">
                          Project {project.number} • {project.category}
                        </span>
                        <h3
                          className="text-[19px] sm:text-[23px] md:text-[25px] font-bold text-black group-hover:text-[#8a4f1e] transition-colors leading-tight"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/15 flex items-center justify-center text-black/70 hover:text-black hover:border-black transition-colors shrink-0"
                      title="View on GitHub"
                      aria-label={`View GitHub repository for ${project.title}`}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </a>
                  </div>

                  {/* Project Description */}
                  <p className="text-[14px] sm:text-[15px] md:text-[16px] leading-relaxed text-black/75">
                    {project.description}
                  </p>

                  {/* Key Highlights from Resume */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-black/[0.02] border border-black/5 flex flex-col gap-2">
                    <span className="text-[11px] sm:text-xs font-mono font-semibold text-black/50 uppercase tracking-wider">
                      Technical Architecture &amp; Key Highlights
                    </span>
                    <ul className="grid grid-cols-1 gap-2">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-black/80">
                          <span className="text-[#8a4f1e] font-bold shrink-0">✓</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tags & Action CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pt-3 border-t border-black/5">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="mono-pill px-2.5 sm:px-3 py-1 rounded-full bg-black/[0.04] text-black/75 border border-black/5 text-[10px] sm:text-[11px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-black group-hover:text-[#8a4f1e] transition-colors self-start sm:self-auto py-1"
                    >
                      <span>Explore on GitHub</span>
                      <span>→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ================= 04. TECH STACK ================= */}
          <section id="skills" className="scroll-mt-28 flex flex-col gap-6 sm:gap-8">
            <div className="border-b border-black/10 pb-4 sm:pb-5">
              <p className="font-mono text-[11px] sm:text-xs text-black/50 uppercase tracking-widest">
                04 / 05 — Technical Competencies
              </p>
              <h2
                className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-black tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Skills &amp; Technologies
              </h2>
            </div>

            {/* Infinite Marquee Track */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-black/10 bg-black/[0.015] py-3 sm:py-4">
              <div className="marquee-track flex gap-3 sm:gap-4 items-center">
                {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-black/10 bg-white font-mono text-[11px] sm:text-xs font-medium text-black whitespace-nowrap shadow-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8a4f1e]" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Category Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {SKILL_CATEGORIES.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6 flex flex-col gap-3.5 sm:gap-4 hover:border-black/30 transition-colors shadow-xs"
                >
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <div>
                      <span className="font-mono text-[10px] text-black/40 block">Chapter {cat.chapter}</span>
                      <h3 className="font-bold text-black text-[16px] sm:text-[17px]">{cat.title}</h3>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#8a4f1e]/40" />
                  </div>

                  <p className="text-[12px] text-black/60 leading-snug">{cat.description}</p>

                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/[0.03] border border-black/5 text-xs text-black/80 font-mono"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#8a4f1e]" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 05. AWARDS & COMPETITIONS ================= */}
          <section id="awards" className="scroll-mt-28 flex flex-col gap-6 sm:gap-8">
            <div className="border-b border-black/10 pb-4 sm:pb-5 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
              <div>
                <p className="font-mono text-[11px] sm:text-xs text-black/50 uppercase tracking-widest">
                  05 / 05 — Recognition &amp; Contests
                </p>
                <h2
                  className="text-[28px] sm:text-[36px] md:text-[44px] font-bold text-black tracking-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Achievements &amp; Awards
                </h2>
              </div>
              <span className="font-mono text-xs text-black/60 self-start sm:self-auto">
                Hackathons &amp; Global Competitions
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {AWARDS.map((award, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl border p-5 sm:p-6 flex flex-col gap-3 transition-all ${
                    award.highlight
                      ? 'border-[#8a4f1e]/30 bg-[#8a4f1e]/[0.03] shadow-xs'
                      : 'border-black/10 bg-white hover:border-black/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                        award.highlight
                          ? 'bg-[#8a4f1e] text-white'
                          : 'bg-black/[0.05] text-black/70'
                      }`}
                    >
                      {award.tag}
                    </span>
                    <span className="font-mono text-xs text-black/50">{award.date}</span>
                  </div>

                  <div>
                    <h3
                      className="text-[17px] sm:text-[18px] font-bold text-black leading-snug"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {award.title}
                    </h3>
                    <p className="text-[13px] font-semibold text-[#8a4f1e] mt-0.5">
                      {award.event}
                    </p>
                  </div>

                  <p className="text-[13px] sm:text-[13.5px] text-black/75 leading-relaxed">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= CONTACT ================= */}
          <section id="contact" className="scroll-mt-28 flex flex-col gap-8 pt-4">
            <div className="relative rounded-2xl sm:rounded-3xl border border-black/15 bg-black p-6 sm:p-10 md:p-12 text-white flex flex-col gap-6 sm:gap-8 shadow-2xl">
              <div>
                <p className="font-mono text-[11px] sm:text-xs text-white/50 uppercase tracking-widest">
                  Let's Connect &amp; Collaborate
                </p>
                <h2
                  className="text-[28px] sm:text-[38px] md:text-[46px] font-bold tracking-tight text-white mt-1"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Let's build something impactful.
                </h2>
                <p className="text-[15px] sm:text-[16px] md:text-[17px] text-white/70 max-w-xl mt-3 leading-relaxed">
                  I'm actively seeking software engineering, Python backend, and AI/LLM roles.
                  Whether you have an opening, an innovative project, or want to discuss architecture, feel free to reach out.
                </p>

                {/* Direct contact and resume links */}
                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs font-mono text-white/75">
                  <a href="tel:+919131115784" className="hover:text-white transition-colors">
                    +91 9131115784
                  </a>
                  <span>•</span>
                  <a href="/Mochan_Omkar_Resume.pdf" target="_blank" rel="noreferrer" className="text-amber-300 underline hover:text-white">
                    Resume PDF (187 KB)
                  </a>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="mailto:mochanomkar5@gmail.com"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3.5 rounded-full bg-white text-black font-semibold text-[13px] sm:text-[14px] hover:bg-neutral-100 transition-colors shadow-sm active:scale-[0.98]"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="truncate">{copiedEmail ? 'Email Copied!' : 'mochanomkar5@gmail.com'}</span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/mochanomkar6"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-[13px] sm:text-[14px] hover:border-white transition-colors"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.12.83-.26.83-.57v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.22.69.83.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/mochan-omkar"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-white/20 text-white font-medium text-[13px] sm:text-[14px] hover:border-white transition-colors"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <footer className="pt-6 sm:pt-8 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs font-mono text-black/50 text-center sm:text-left">
              <p>© 2026 Mochan Omkar • Python Backend Developer &amp; AI Engineer</p>
              <div className="flex items-center gap-6">
                <a href="/Mochan_Omkar_Resume.pdf" target="_blank" rel="noreferrer" className="hover:text-black transition-colors">
                  Resume PDF
                </a>
                <a href="#top" className="hover:text-black transition-colors">
                  Back to Top ↑
                </a>
              </div>
            </footer>
          </section>

        </div>
      </main>
    </div>
  );
}
