'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ProjectCoreScene = dynamic(() => import('./project-core-scene'), {
  ssr: false,
  loading: () => <StaticCore label="Loading interactive project core" />,
});

const projectNodes = [
  { name: 'StackAudit', id: 'project-stackaudit', className: 'core-node-one' },
  {
    name: 'Task Tracker',
    id: 'project-task-tracker',
    className: 'core-node-two',
  },
  {
    name: 'Finance Dashboard',
    id: 'project-finance-dashboard',
    className: 'core-node-three',
  },
  {
    name: 'Farmer Marketplace',
    id: 'project-farmer-marketplace',
    className: 'core-node-four',
  },
];

function StaticCore({ label = 'Project core' }: { label?: string }) {
  return (
    <figure className="static-core" aria-label={label}>
      <span className="static-core-shell" />
      <span className="static-core-energy" />
      <span className="static-core-orbit static-orbit-one" />
      <span className="static-core-orbit static-orbit-two" />
      <span className="static-core-platform" />
    </figure>
  );
}

export function ProjectCore({
  activeProject,
  onProjectChange,
}: {
  activeProject: number;
  onProjectChange: (index: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);
  const [useFallback, setUseFallback] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    const mobile = window.matchMedia('(max-width: 640px)').matches;
    const lowPower =
      navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 2;
    const canvas = document.createElement('canvas');
    const webgl = Boolean(
      canvas.getContext('webgl2') || canvas.getContext('webgl'),
    );
    const frame = window.requestAnimationFrame(() => {
      setUseFallback(reducedMotion || mobile || lowPower || !webgl);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '80px', threshold: 0.08 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const selectProject = (index: number, id: string) => {
    onProjectChange(index);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div
      className="project-core-wrap"
      ref={containerRef}
      aria-label="Interactive featured-project navigation"
    >
      <div className="core-halo" aria-hidden="true" />
      <div className="core-canvas" aria-hidden="true">
        {useFallback ? (
          <StaticCore label="Animated project core with four featured projects" />
        ) : (
          <ProjectCoreScene activeProject={activeProject} inView={inView} />
        )}
      </div>
      <div className="core-node-list" aria-label="Featured projects">
        {projectNodes.map((project, index) => (
          <button
            className={`core-node ${project.className}${activeProject === index ? ' is-active' : ''}`}
            key={project.name}
            type="button"
            aria-label={`Go to ${project.name} project`}
            aria-pressed={activeProject === index}
            onMouseEnter={() => onProjectChange(index)}
            onFocus={() => onProjectChange(index)}
            onClick={() => selectProject(index, project.id)}
          >
            <span className="core-node-dot" aria-hidden="true" />
            <span className="core-node-label" role="tooltip">
              {project.name}
            </span>
          </button>
        ))}
      </div>
      <p className="core-caption">
        <span aria-hidden="true">●</span> Select a node to explore
      </p>
    </div>
  );
}
