import { useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, Search, Database, Target, ChartNoAxesCombined, ScanSearch, Route, PencilRuler, Cpu, ShieldCheck, Activity, SlidersHorizontal, RefreshCw } from 'lucide-react';
import './gear-methodology.css';

const stages = [
  { letter: 'G', name: 'Gather', meaning: 'Recopilar', color: '#163756', light: '#486e91', x: 132, y: 174, radius: 111, teeth: 24, direction: 1,
    subtitle: 'COMPRENDER EL PRESENTE. CONSTRUIR EL FUTURO.', description: 'Comenzamos escuchando. Trabajamos junto a tu equipo para comprender los retos, los objetivos y el entorno de tu operación, y establecer una base sólida para el proyecto.',
    items: [[Search, 'DESCUBRIR', 'Comprender tus objetivos y desafíos.'], [Database, 'RECOPILAR', 'Recopilar datos e información clave de tu operación.'], [Target, 'DEFINIR', 'Acordar los resultados que más importan.']] },
  { letter: 'E', name: 'Evaluate', meaning: 'Evaluar', color: '#2563eb', light: '#78afff', x: 315, y: 174, radius: 81, teeth: 18, direction: -1,
    subtitle: 'CONVERTIR LOS DATOS EN DECISIONES.', description: 'Analizamos la información recopilada para identificar oportunidades de mejora, evaluar los retos técnicos y desarrollar estrategias de ingeniería eficientes, adaptadas a tu operación.',
    items: [[ChartNoAxesCombined, 'ANALIZAR', 'Examinar los datos operativos y el desempeño del sistema.'], [ScanSearch, 'IDENTIFICAR', 'Detectar ineficiencias y oportunidades de mejora.'], [Route, 'PLANIFICAR', 'Definir el enfoque técnico más adecuado.']] },
  { letter: 'A', name: 'Automate', meaning: 'Automatizar', color: '#697b90', light: '#d5e1ed', x: 315, y: 303, radius: 57, teeth: 12, direction: 1,
    subtitle: 'DISEÑAR OPERACIONES MÁS INTELIGENTES.', description: 'Convertimos las estrategias de ingeniería en soluciones de automatización mediante el desarrollo de sistemas de control, la integración industrial y el monitoreo inteligente de procesos.',
    items: [[PencilRuler, 'DISEÑAR', 'Desarrollar arquitecturas de automatización a la medida.'], [Cpu, 'IMPLEMENTAR', 'Integrar PLC, HMI, SCADA y sistemas de comunicación industrial.'], [ShieldCheck, 'VALIDAR', 'Probar y verificar el funcionamiento confiable del sistema.']] },
  { letter: 'R', name: 'Refine', meaning: 'Perfeccionar', color: '#098d9e', light: '#76e2e9', x: 196, y: 357, radius: 81, teeth: 18, direction: -1,
    subtitle: 'MEJORAR HOY. EVOLUCIONAR MAÑANA.', description: 'Nuestro compromiso continúa después de la implementación. Monitoreamos el desempeño, optimizamos los procesos y acompañamos la mejora continua para lograr resultados confiables y sostenibles.',
    items: [[Activity, 'MONITOREAR', 'Dar seguimiento al desempeño y a los indicadores clave.'], [SlidersHorizontal, 'OPTIMIZAR', 'Perfeccionar los procesos y mejorar la eficiencia.'], [RefreshCw, 'SOSTENER', 'Acompañar la mejora continua y la confiabilidad a largo plazo.']] },
];

function gearPath(radius, teeth) {
  return Array.from({ length: teeth * 4 }, (_, i) => {
    const angle = i / (teeth * 4) * Math.PI * 2;
    const r = radius - (i % 4 === 0 || i % 4 === 3 ? 9 : 0);
    return `${i ? 'L' : 'M'}${(Math.cos(angle) * r).toFixed(2)},${(Math.sin(angle) * r).toFixed(2)}`;
  }).join(' ') + 'Z';
}

function Gear({ stage, index, active, id, bodyRef, select, engage, disengage }) {
  const { x, y, radius, teeth, color, light, letter, name } = stage;
  return <g transform={`translate(${x} ${y})`} role="button" tabIndex={0} aria-label={`${letter} — ${name}`} aria-pressed={active} aria-controls={`${id}-panel`}
    className={`gear-control ${active ? 'is-active' : ''}`} style={{ '--gear-accent': light }}
    onPointerEnter={e => { if (e.pointerType !== 'touch') { select(index); engage('hover'); } }}
    onFocus={e => { select(index); if (e.currentTarget.matches(':focus-visible')) engage('focus'); }} onBlur={() => disengage('focus')}
    onClick={() => { select(index); engage('tap'); }}
    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(index); engage('tap'); } }}>
    <defs><linearGradient id={`${id}-metal-${index}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={light}/><stop offset=".45" stopColor={color}/><stop offset="1" stopColor={color}/></linearGradient></defs>
    <circle className="gear-halo" r={radius + 4} fill="none" stroke={light} strokeWidth="2"/>
    <g ref={bodyRef} className="gear-body">
      <path d={gearPath(radius, teeth)} fill={`url(#${id}-metal-${index})`} stroke={light} strokeWidth="1.5"/>
      <circle r={radius - 18} fill="none" stroke="white" strokeOpacity=".3"/>
      <circle r={radius - 23} fill="none" stroke="#071c34" strokeOpacity=".3" strokeWidth="3"/>
      <circle r={radius - 30} fill="none" stroke="white" strokeOpacity=".3" strokeDasharray="1 7"/>
      {[0, 90, 180, 270].map(a => <circle key={a} cx={Math.cos(a * Math.PI / 180) * (radius - 15)} cy={Math.sin(a * Math.PI / 180) * (radius - 15)} r="2" fill="#d8ebfa"/>)}
    </g>
    <circle r={radius * .52} fill={color} stroke={light} strokeOpacity=".7"/>
    <text className="gear-letter" x="0" y="0" fontSize={radius * .57}>{letter}</text>
  </g>;
}

export default function GearMethodology() {
  const [active, setActive] = useState(0);
  const id = useId().replace(/:/g, '');
  const bodies = useRef([]);
  const inputs = useRef({ hover: false, focus: false, until: 0 });
  const wake = useRef(() => {});
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, previous = 0, speed = 0, angle = 0;
    const tick = time => {
      frame = 0;
      const dt = Math.min((time - (previous || time)) / 1000, .05);
      previous = time;
      const running = inputs.current.hover || inputs.current.focus || time < inputs.current.until;
      speed += ((running ? 16 : 0) - speed) * (1 - Math.exp(-dt * (running ? 3 : 2.5)));
      angle += speed * dt;
      bodies.current.forEach((body, i) => body?.setAttribute('transform', `rotate(${angle * stages[i].direction * 24 / stages[i].teeth + (i % 2 ? 180 / stages[i].teeth : 0)})`));
      if (!media.matches && (running || speed > .02)) frame = requestAnimationFrame(tick);
      else { previous = 0; speed = 0; }
    };
    wake.current = () => { if (!frame && !media.matches) frame = requestAnimationFrame(tick); };
    const changed = () => { cancelAnimationFrame(frame); frame = 0; previous = 0; speed = 0; if (!media.matches) wake.current(); };
    media.addEventListener('change', changed);
    return () => { cancelAnimationFrame(frame); media.removeEventListener('change', changed); wake.current = () => {}; };
  }, []);
  const engage = type => { if (type === 'tap') inputs.current.until = performance.now() + 1800; else inputs.current[type] = true; wake.current(); };
  const disengage = type => { inputs.current[type] = false; };
  const stage = stages[active];
  return <section className="gear-methodology section-pad" id="metodologia" aria-labelledby={`${id}-title`} lang="es">
    <div className="container gear-layout">
      <div className="gear-intro"><div className="eyebrow"><span/>NUESTRA METODOLOGÍA</div><h2 id={`${id}-title`}>Metodología<br/><span>GEAR</span></h2><p>Un enfoque estructurado y práctico para la automatización industrial. Desde comprender tus desafíos hasta lograr resultados sostenibles.</p><div className="gear-guide">CUATRO ETAPAS. UN PROCESO CONECTADO.</div></div>
      <div className="gear-mechanism" onPointerLeave={() => disengage('hover')}>
        <svg viewBox="0 0 430 470" aria-label="Mecanismo interactivo de la metodología GEAR" className="gear-svg">
          <g fill="none" stroke="#9db7d5" strokeWidth="1" aria-hidden="true"><circle cx="215" cy="235" r="210" strokeDasharray="2 9"/><path d="M45 69 Q140 -4 244 40 M239 35 l7 6 -9 2 M375 375 Q329 436 257 449 M262 442 l-7 8 11 1"/></g>
          {stages.map((s, i) => <Gear key={s.letter} stage={s} index={i} active={active === i} id={id} bodyRef={el => { bodies.current[i] = el; }} select={setActive} engage={engage} disengage={disengage}/>) }
        </svg><p className="gear-hint">Selecciona un engranaje para explorar cada etapa</p>
      </div>
      <div className="gear-panel" id={`${id}-panel`}>
        <div className="gear-panel-top"><span>ETAPA {active + 1} DE 4</span><span>GEAR / {stage.letter}</span></div>
        <div className="gear-progress" aria-hidden="true">{stages.map((s, i) => <span key={s.letter} className={active === i ? 'selected' : ''}/>)}</div>
        <div key={active} className="gear-panel-content" aria-live="polite" aria-atomic="true"><h3>{stage.name}<span>.</span></h3><p className="gear-meaning">({stage.meaning})</p><p className="gear-subtitle">{stage.subtitle}</p><p className="gear-description">{stage.description}</p><ul>{stage.items.map(([Icon, title, text]) => <li key={title}><Icon size={20}/><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul></div>
        <a className="button button-primary" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={18}/></a>
      </div>
    </div>
  </section>;
}
