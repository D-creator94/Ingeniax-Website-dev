import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react';

export default function ProjectCarousel({ items, renderCard, modalOpen }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [range, setRange] = useState({ first: 1, last: 3, overflow: false });

  function move(direction) {
    const track = trackRef.current;
    const step = track.children[1]?.offsetLeft - track.children[0]?.offsetLeft || track.clientWidth;
    const maximum = track.scrollWidth - track.clientWidth;
    const end = track.scrollLeft >= maximum - 2;
    const start = track.scrollLeft <= 2;
    const left = direction > 0 && end ? 0 : direction < 0 && start ? maximum : track.scrollLeft + direction * step;
    track.scrollTo({ left, behavior: reduced ? 'instant' : 'smooth' });
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(preference.matches);
    preference.addEventListener('change', update);
    return () => preference.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const measure = () => {
      const bounds = track.getBoundingClientRect();
      const shown = [...track.children].map((card, index) => ({ index, rect: card.getBoundingClientRect() }))
        .filter(({ rect }) => rect.left >= bounds.left - 2 && rect.right <= bounds.right + 2);
      if (shown.length) setRange({ first: shown[0].index + 1, last: shown.at(-1).index + 1, overflow: track.scrollWidth > track.clientWidth + 2 });
    };
    track.scrollTo({ left: 0, behavior: 'instant' });
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    track.addEventListener('scroll', measure, { passive: true });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    observer.observe(track);
    return () => { resize.disconnect(); observer.disconnect(); track.removeEventListener('scroll', measure); };
  }, [items]);

  useEffect(() => {
    if (paused || hovered || reduced || !visible || modalOpen || !range.overflow) return;
    const timer = setInterval(() => { if (!document.hidden) move(1); }, 6000);
    return () => clearInterval(timer);
  }, [paused, hovered, reduced, visible, modalOpen, range.overflow]);

  return <div className="project-carousel" role="region" aria-roledescription="carrusel" aria-label="Proyectos de ingeniería"
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
    <div ref={trackRef} id="project-track" className="projects-grid project-track" tabIndex={0}
      aria-label="Proyectos. Usa las flechas izquierda y derecha para navegar."
      onFocusCapture={() => setPaused(true)} onPointerDown={() => setPaused(true)} onWheel={() => setPaused(true)}
      onKeyDown={event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault(); setPaused(true); move(event.key === 'ArrowRight' ? 1 : -1);
        }
      }}>{items.map(renderCard)}</div>
    <div className="carousel-controls">
      <span className="carousel-count" aria-live={paused || reduced ? 'polite' : 'off'}>{range.first}–{range.last} de {items.length} proyectos</span>
      <div className="carousel-buttons">
        {!reduced && range.overflow && <button className="carousel-play" onClick={() => setPaused(value => !value)} aria-label={paused ? 'Activar avance automático' : 'Pausar avance automático'}>{paused ? <Play size={15}/> : <Pause size={15}/>}<span>{paused ? 'Reanudar' : 'Pausar'}</span></button>}
        <button aria-label="Proyectos anteriores" aria-controls="project-track" disabled={!range.overflow} onClick={() => { setPaused(true); move(-1); }}><ArrowLeft size={20}/></button>
        <button aria-label="Proyectos siguientes" aria-controls="project-track" disabled={!range.overflow} onClick={() => { setPaused(true); move(1); }}><ArrowRight size={20}/></button>
      </div>
    </div>
  </div>;
}
