import { useEffect, useRef } from 'react';
import './background-gears.css';

// Fixed irregular composition: stable across renders, with distinct machining styles.
const gears = [
  { left: '-6%', top: '9%', size: 285, teeth: 20, depth: 12, spokes: 5, type: 'spokes', weight: 1.8, tilt: 28, lean: -18, angle: 12 },
  { left: '22%', top: '-12%', size: 156, teeth: 12, depth: 19, spokes: 6, type: 'holes', weight: 2.6, tilt: 48, lean: 22, angle: 41 },
  { left: '42%', top: '49%', size: 224, teeth: 28, depth: 8, spokes: 8, type: 'rings', weight: 1, tilt: 15, lean: -32, angle: 7 },
  { left: '66%', top: '-17%', size: 320, teeth: 18, depth: 16, spokes: 4, type: 'spokes', weight: 2.2, tilt: 52, lean: 12, angle: 26 },
  { left: '88%', top: '35%', size: 186, teeth: 14, depth: 17, spokes: 5, type: 'holes', weight: 1.4, tilt: 34, lean: -25, angle: 52 },
  { left: '12%', top: '81%', size: 132, teeth: 10, depth: 20, spokes: 3, type: 'spokes', weight: 3, tilt: 12, lean: 35, angle: 19 },
  { left: '72%', top: '82%', size: 246, teeth: 32, depth: 7, spokes: 8, type: 'rings', weight: 1.3, tilt: 43, lean: -12, angle: 35 },
  { left: '52%', top: '8%', size: 96, teeth: 12, depth: 13, spokes: 4, type: 'holes', weight: 2, tilt: 20, lean: 30, angle: 64 },
  { left: '5%', top: '61%', size: 108, teeth: 16, depth: 10, spokes: 5, type: 'rings', weight: 1.5, tilt: 38, lean: 17, angle: 8 },
  { left: '31%', top: '27%', size: 125, teeth: 14, depth: 15, spokes: 4, type: 'holes', weight: 2.1, tilt: 55, lean: -28, angle: 37 },
  { left: '46%', top: '-8%', size: 142, teeth: 22, depth: 9, spokes: 7, type: 'spokes', weight: 1.2, tilt: 24, lean: 42, angle: 16 },
  { left: '61%', top: '44%', size: 114, teeth: 12, depth: 18, spokes: 3, type: 'spokes', weight: 2.5, tilt: 46, lean: -16, angle: 58 },
  { left: '81%', top: '14%', size: 86, teeth: 10, depth: 16, spokes: 4, type: 'holes', weight: 2.2, tilt: 18, lean: 26, angle: 23 },
  { left: '29%', top: '76%', size: 164, teeth: 24, depth: 8, spokes: 6, type: 'rings', weight: 1.1, tilt: 40, lean: -35, angle: 47 },
  { left: '58%', top: '87%', size: 98, teeth: 12, depth: 14, spokes: 5, type: 'holes', weight: 1.7, tilt: 30, lean: 14, angle: 72 },
  { left: '94%', top: '76%', size: 150, teeth: 18, depth: 12, spokes: 6, type: 'spokes', weight: 1.8, tilt: 50, lean: -22, angle: 31 },
];

function outline({ teeth, depth }) {
  return Array.from({ length: teeth * 4 }, (_, i) => {
    const angle = i * Math.PI * 2 / (teeth * 4);
    const radius = i % 4 === 0 || i % 4 === 3 ? 97 - depth : 97;
    return `${i ? 'L' : 'M'}${100 + Math.cos(angle) * radius},${100 + Math.sin(angle) * radius}`;
  }).join(' ') + 'Z';
}

export default function BackgroundGears() {
  const root = useRef(null);
  const rotors = useRef([]);
  useEffect(() => {
    const section = root.current.closest('.why');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false, frame = 0, target = 0, current = 0, lastTime = 0;
    let lastY = window.scrollY, pointer = null;
    const draw = time => {
      frame = 0;
      const dt = Math.min((time - (lastTime || time - 16)) / 1000, .05);
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-dt * 7));
      rotors.current.forEach((rotor, i) => rotor?.setAttribute('transform', `rotate(${gears[i].angle + current * (i % 2 ? -1 : 1) * 200 / gears[i].size} 100 100)`));
      if (Math.abs(target - current) > .02 && visible && !media.matches) frame = requestAnimationFrame(draw);
      else lastTime = 0;
    };
    const wake = () => { if (visible && !media.matches && !frame) frame = requestAnimationFrame(draw); };
    const scroll = () => {
      const delta = window.scrollY - lastY;
      lastY = window.scrollY;
      if (!visible || media.matches) return;
      target += Math.max(-150, Math.min(150, delta)) * .18;
      wake();
    };
    const move = event => {
      if (event.pointerType === 'touch' || media.matches) return;
      if (pointer) target += Math.min(60, Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y)) * .12;
      pointer = { x: event.clientX, y: event.clientY };
      wake();
    };
    const leave = () => { pointer = null; };
    const reset = () => { cancelAnimationFrame(frame); frame = 0; lastTime = 0; target = current; pointer = null; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; lastY = window.scrollY; if (!visible) reset(); }, { threshold: 0 });
    observer.observe(section);
    window.addEventListener('scroll', scroll, { passive: true });
    section.addEventListener('pointermove', move, { passive: true });
    section.addEventListener('pointerleave', leave);
    media.addEventListener('change', reset);
    return () => { reset(); observer.disconnect(); window.removeEventListener('scroll', scroll); section.removeEventListener('pointermove', move); section.removeEventListener('pointerleave', leave); media.removeEventListener('change', reset); };
  }, []);
  return <div ref={root} className="background-gears" aria-hidden="true">
    {gears.map((gear, i) => <div className="background-gear-perspective" key={i} style={{ left: gear.left, top: gear.top, '--gear-size': `${gear.size}px`, '--gear-tilt': `${gear.tilt}deg`, '--gear-lean': `${gear.lean}deg` }}>
      <svg viewBox="0 0 200 200" focusable="false" style={{ strokeWidth: gear.weight }}>
        <g ref={el => { rotors.current[i] = el; }} transform={`rotate(${gear.angle} 100 100)`}>
          <path d={outline(gear)}/><circle cx="100" cy="100" r="65"/><circle cx="100" cy="100" r={gear.type === 'rings' ? 38 : 23}/>
          {gear.type === 'rings' ? <><circle cx="100" cy="100" r="54" strokeDasharray="2 5"/><circle cx="100" cy="100" r="16"/></> : Array.from({ length: gear.spokes }, (_, n) => <g key={n} transform={`rotate(${n * 360 / gear.spokes} 100 100)`}>{gear.type === 'holes' ? <circle cx="100" cy="55" r="10"/> : <path d="M96 36L96 76M104 36L104 76"/>}</g>)}
        </g>
      </svg>
    </div>)}
  </div>;
}
