import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Zap, Cpu, Network, Check, Plus, Minus, Layers3, Settings2, Activity, Gauge, Radio, ShieldCheck, Cable, Factory, Package, Wheat, Droplets, Phone, Mail, MapPin, Globe, Crosshair, Workflow, ChartNoAxesCombined, PanelsTopLeft } from 'lucide-react';
import './styles.css';
import './motion.css';
import { brandLogo, brandLogoLight, technologies } from './brands';
import { usePageMotion } from './usePageMotion';
import Clients from './Clients';

const navLinks = [['Clientes', 'clientes'], ['Nosotros', 'nosotros'], ['Servicios', 'servicios'], ['Proyectos', 'proyectos'], ['Tecnologías', 'tecnologias']];

function Brand({ light = false }) {
  const [source, setSource] = useState(light ? brandLogoLight : brandLogo);
  const [loaded, setLoaded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#inicio" aria-label="INGENIAX, inicio">
    {!unavailable && <img className={`brand-image ${loaded ? 'is-loaded' : ''} ${light && source === brandLogo ? 'brand-image-on-white' : ''}`} src={source} alt="INGENIAX" width="2115" height="744" onLoad={() => setLoaded(true)} onError={() => { if (light && source !== brandLogo) setSource(brandLogo); else setUnavailable(true); }}/>}
    {!loaded && <span className="brand-word">INGENIAX<small>INGENIERÍA EVOLUTIVA</small></span>}
  </a>;
}

function TechnologyBrands() {
  return <div className="brand-ecosystem">{technologies.map(technology => <div className="technology-brand" key={technology.name}>
    <div className="technology-logo-slot"><img className={technology.className} src={technology.logo} alt={technology.name} width="240" height="72" loading="lazy" decoding="async"/></div>
    <small>{technology.description}</small>
  </div>)}</div>;
}

function SectionLabel({ children, light = false }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div>;
}

const projects = [
  { id: '01', category: 'Automatización', label: 'AUTOMATIZACIÓN & CONTROL', title: 'Precisión en cada mezcla.', name: 'Sistema de dosificación y mezcla', description: 'Control de recetas, dosificación y variables de proceso desde una interfaz unificada.', tags: ['PLC Siemens', 'HMI', 'TIA Portal'], type: 'process', color: 'cyan', icon: Workflow, detail: 'Un concepto de automatización para coordinar la dosificación de materias primas y las etapas de mezcla. La interfaz permite consultar el estado de los tanques, ajustar recetas y visualizar las variables críticas del proceso.', scope: ['Control secuencial de dosificación y mezcla', 'Gestión de recetas y parámetros de operación', 'Visualización de niveles, alarmas y estados'] },
  { id: '02', category: 'IIoT', label: 'INTELIGENCIA INDUSTRIAL', title: 'Tu planta, en perspectiva.', name: 'Dashboard de producción y OEE', description: 'Indicadores claros para entender el rendimiento y encontrar oportunidades de mejora.', tags: ['IIoT', 'OEE', 'Data Analytics'], type: 'dashboard', color: 'purple', icon: ChartNoAxesCombined, detail: 'Una propuesta de plataforma para transformar los datos de producción en información accionable. Reúne disponibilidad, rendimiento y calidad en una vista diseñada para los equipos de operación y gestión.', scope: ['Adquisición y contextualización de datos', 'Visualización de KPI y tendencias de producción', 'Análisis de disponibilidad, rendimiento y calidad'] },
  { id: '03', category: 'Automatización', label: 'SUPERVISIÓN DE PROCESOS', title: 'Control que evoluciona.', name: 'Modernización de sistema SCADA', description: 'Una nueva experiencia de supervisión para procesos más conectados y confiables.', tags: ['SCADA', 'Schneider', 'Modbus TCP'], type: 'scada', color: 'blue', icon: PanelsTopLeft, detail: 'Un concepto de modernización que organiza la información de proceso en pantallas claras y consistentes. Integra tendencias, estados de equipos y gestión de alarmas para facilitar la supervisión de planta.', scope: ['Diseño de pantallas de supervisión', 'Integración de equipos y redes industriales', 'Históricos, tendencias y gestión de alarmas'] },
  { id: '04', category: 'IIoT', label: 'TRAZABILIDAD INDUSTRIAL', title: 'Cada dato cuenta.', name: 'Plataforma de trazabilidad', description: 'Conexión entre materias primas, lotes y producción a lo largo del proceso.', tags: ['IIoT', 'SQL', 'Adquisición de datos'], type: 'trace', color: 'cyan', icon: Network, detail: 'Una aplicación conceptual para seguir el recorrido de los materiales desde su recepción hasta el producto terminado. Unifica registros de lote, etapas de proceso y consultas de información.', scope: ['Registro de materias primas y lotes', 'Seguimiento de etapas de producción', 'Consulta de datos e historial de proceso'] },
  { id: '05', category: 'Eléctrica', label: 'INGENIERÍA ELÉCTRICA', title: 'La energía bajo control.', name: 'Integración de tableros eléctricos', description: 'Distribución, protección y monitoreo eléctrico integrados a la operación.', tags: ['Baja tensión', 'VFD', 'Tableros'], type: 'electrical', color: 'blue', icon: Zap, detail: 'Un concepto de integración de tableros de potencia y control, con selección de protecciones, variadores e instrumentación según las necesidades del proceso industrial.', scope: ['Diseño de tableros de potencia y control', 'Integración de variadores de frecuencia', 'Cableado, pruebas y puesta en marcha'] },
  { id: '06', category: 'Automatización', label: 'PRODUCCIÓN CONECTADA', title: 'Una línea. Todo conectado.', name: 'Control de línea de producción', description: 'Equipos sincronizados y una operación centralizada desde el HMI.', tags: ['Rockwell', 'PLC', 'EtherNet/IP'], type: 'line', color: 'purple', icon: Settings2, detail: 'Una propuesta para coordinar estaciones de trabajo, transportadores y equipos de una línea de producción. Centraliza los estados operativos y simplifica la interacción con el proceso.', scope: ['Secuencias e interbloqueos de equipos', 'Interfaz de operación centralizada', 'Diagnóstico y monitoreo de la línea'] },
];

function MiniChart({ alternate = false }) {
  const gradientId = useId();
  return <svg className="mini-chart" viewBox="0 0 300 75" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={alternate ? '#a58bff' : '#44d5cb'} stopOpacity=".28"/><stop offset="100%" stopColor="#44d5cb" stopOpacity="0"/></linearGradient></defs><path d="M0 65 15 54 30 58 45 39 60 44 75 35 90 40 105 21 120 30 135 24 150 31 165 16 180 23 195 12 210 24 225 14 240 17 255 7 270 15 285 4 300 10V75H0Z" fill={`url(#${gradientId})`}/><path d="m0 65 15-11 15 4 15-19 15 5 15-9 15 5 15-19 15 9 15-6 15 7 15-15 15 7 15-11 15 12 15-10 15 3 15-10 15 8 15-11 15 6" fill="none" stroke={alternate ? '#a58bff' : '#44d5cb'} strokeWidth="2"/></svg>;
}

function InterfaceScreen({ type = 'process', large = false }) {
  const isData = ['dashboard', 'trace'].includes(type);
  return <div className={`interface-screen ${large ? 'screen-large' : ''}`} aria-label={`Visualización ilustrativa de ${isData ? 'dashboard industrial' : 'sistema de control'}`}>
    <div className="screen-top"><span><span className="screen-logo">IX</span> {isData ? 'INSIGHT' : 'PROCESS'}<b> / {type === 'process' ? 'MIXING CONTROL' : type === 'scada' ? 'PLANT OVERVIEW' : type === 'trace' ? 'TRACEABILITY' : type === 'electrical' ? 'POWER CONTROL' : type === 'line' ? 'LINE CONTROL' : 'PRODUCTION ANALYTICS'}</b></span><span className="screen-status"><i/> DEMO</span></div>
    <div className="screen-body"><aside className="screen-sidebar"><PanelsTopLeft/><Activity/><Layers3/><Settings2/><span>IX</span></aside><div className="screen-content"><div className="screen-heading"><span>{isData ? 'Resumen de producción' : type === 'electrical' ? 'Distribución eléctrica' : 'Vista general del proceso'}<small>PLANTA 01 / VISTA EN TIEMPO REAL</small></span><span className="screen-date">12:45:08 <i/></span></div>
      {isData ? <><div className="screen-metrics"><div><small>OEE GLOBAL</small><strong>87.6<em>%</em></strong><span>↗ 4.2% vs. anterior</span></div><div><small>PRODUCCIÓN</small><strong>2,480</strong><span>unidades / turno</span></div><div><small>DISPONIBILIDAD</small><strong>96.2<em>%</em></strong><span>Dentro del objetivo</span></div></div><div className="data-bottom"><div className="chart-panel"><span>{type === 'trace' ? 'Seguimiento de lotes' : 'Rendimiento del turno'}<small>HOY</small></span><MiniChart alternate/><div className="chart-times"><span>06:00</span><span>10:00</span><span>14:00</span><span>18:00</span></div></div><div className="ring-panel"><div className="oee-ring"><strong>87.6<small>OEE</small></strong></div><span>Eficiencia global</span></div></div></> : <><div className="process-diagram"><svg className="process-pipes" viewBox="0 0 360 130" preserveAspectRatio="none" aria-hidden="true"><path d="M58 40v67h245V40M179 62v45M58 76h121"/><path className="pipe-active" d="M58 40v67h245V40M179 62v45"/><circle cx="179" cy="107" r="5"/><circle cx="303" cy="77" r="5"/></svg>{[0, 1, 2].map((n) => <div className={`tank tank-${n}`} key={n}><small>{type === 'electrical' ? `TABLERO 0${n + 1}` : type === 'line' ? `ESTACIÓN 0${n + 1}` : ['TANQUE A', 'REACTOR M-01', 'TANQUE B'][n]}</small><div className={`tank-vessel ${type === 'electrical' ? 'electric-vessel' : ''}`}>{type === 'electrical' ? <Zap/> : <><div className="tank-fluid" style={{ height: `${[65, 44, 78][n]}%` }}/><div className="tank-stem"/></>}<strong>{type === 'electrical' ? ['220', '440', '220'][n] + ' V' : ['65', '44', '78'][n] + '%'}</strong></div><span><i/>{n === 1 ? 'EN OPERACIÓN' : 'DISPONIBLE'}</span></div>)}</div><div className="process-values"><span><small>{type === 'electrical' ? 'POTENCIA' : 'TEMPERATURA'}</small><b>{type === 'electrical' ? '124 kW' : '42.5 °C'}</b></span><span><small>{type === 'electrical' ? 'FRECUENCIA' : 'PRESIÓN'}</small><b>{type === 'electrical' ? '60 Hz' : '2.4 bar'}</b></span><span><small>ESTADO</small><b className="value-green">Sistema estable</b></span><Activity/></div></>}
      <div className="screen-bottom"><span><i/> Conexión estable <b>•</b> Datos ilustrativos</span><span>INGENIAX SYSTEMS</span></div>
    </div></div>
  </div>;
}

function ProjectCard({ project, onSelect }) {
  const Icon = project.icon;
  const frameRef = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);
  function resetTilt(event) {
    cancelAnimationFrame(frameRef.current);
    event.currentTarget.style.setProperty('--rx', '0deg');
    event.currentTarget.style.setProperty('--ry', '0deg');
  }
  function tilt(event) {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce), (hover: none)').matches) return;
    const card = event.currentTarget;
    const { clientX, clientY } = event;
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - .5;
      const y = (clientY - rect.top) / rect.height - .5;
      card.style.setProperty('--rx', `${-y * 4}deg`);
      card.style.setProperty('--ry', `${x * 4}deg`);
    });
  }
  return <button className={`project-card card-${project.color}`} data-project={project.id} onClick={() => onSelect(project)} onPointerMove={tilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt} onBlur={resetTilt}>
    <div className="project-visual"><div className="project-card-top"><span><Icon size={12}/>{project.label}</span><span>IX — {project.id}</span></div><div className="project-screen-wrap"><InterfaceScreen type={project.type}/></div><div className="project-visual-caption"><span>ENGINEERED TO EVOLVE</span><span>✧</span></div></div>
    <div className="project-info"><span className="project-category">{project.name}</span><h3>{project.title}<ArrowUpRight size={22}/></h3><p>{project.description}</p><div className="project-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div>
  </button>;
}

function ProjectGrid({ items, onSelect }) {
  const gridRef = useRef(null);
  const positions = useRef(new Map());
  useLayoutEffect(() => {
    const animations = [];
    const next = new Map();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    [...gridRef.current.children].forEach(card => {
      const position = { x: card.offsetLeft, y: card.offsetTop };
      const previous = positions.current.get(card.dataset.project);
      next.set(card.dataset.project, position);
      if (!previous || reduced.matches || !card.animate) return;
      const x = previous.x - position.x;
      const y = previous.y - position.y;
      if (x || y) animations.push(card.animate([
        { translate: `${x}px ${y}px` }, { translate: '0 0' },
      ], { duration: 420, easing: 'cubic-bezier(.22, 1, .36, 1)' }));
    });
    positions.current = next;
    const cancel = () => animations.forEach(animation => animation.cancel());
    reduced.addEventListener('change', cancel);
    return () => { cancel(); reduced.removeEventListener('change', cancel); };
  }, [items]);
  return <div ref={gridRef} className="projects-grid" aria-live="polite">{items.map(project => <ProjectCard key={project.id} project={project} onSelect={onSelect}/>)}</div>;
}

function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closingRef = useRef(false);
  function close() {
    if (closingRef.current) return;
    const dialog = dialogRef.current;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !dialog.animate) {
      onClose();
      return;
    }
    closingRef.current = true;
    dialog.classList.add('is-closing');
    const animation = dialog.animate([
      { opacity: 1, transform: 'translateY(0) scale(1)' },
      { opacity: 0, transform: 'translateY(12px) scale(.985)' },
    ], { duration: 180, easing: 'ease-in', fill: 'forwards' });
    animation.finished.then(onClose).catch(() => {});
  }
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.getAnimations().forEach(animation => animation.cancel());
      dialog.close();
      document.body.style.overflow = previous;
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);
  return <dialog ref={dialogRef} className="project-modal" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={close} aria-label="Cerrar proyecto"><X/></button><div className={`modal-visual card-${project.color}`}><InterfaceScreen type={project.type} large/></div><div className="modal-content"><SectionLabel>Concepto de aplicación / {project.id}</SectionLabel><h2 id="modal-title">{project.name}</h2><p>{project.detail}</p><h3>Alcance propuesto</h3><ul>{project.scope.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><div className="project-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div><p className="concept-note">Visualización ilustrativa. El alcance y las tecnologías se definen según las necesidades de cada proyecto.</p><a className="button button-primary" href="#contacto" onClick={onClose}>Quiero una solución así <ArrowUpRight size={18}/></a></div></dialog>;
}

const services = [
  { number: '01', icon: Zap, title: <>Soluciones Eléctricas<br/>Industriales</>, description: 'La base de una operación segura, eficiente y preparada para crecer.', points: ['Estudios, diagnóstico y diseño eléctrico', 'Tableros y sistemas de baja tensión', 'Redes, cableado y montaje en campo'], extra: 'Integramos distribución eléctrica, protecciones y equipos a la medida de tu proceso, desde la ingeniería hasta las pruebas en sitio.', className: 'service-electric' },
  { number: '02', icon: Cpu, title: <>Automatización<br/>y Control</>, description: 'Procesos precisos. Equipos conectados. El control en tus manos.', points: ['Programación PLC, HMI y SCADA', 'Integración de variadores de frecuencia', 'Modernización de sistemas de control'], extra: 'Diseñamos y ensamblamos tableros de control, migramos tecnologías y ponemos en marcha soluciones que responden a la realidad de tu planta.', className: 'service-control' },
  { number: '03', icon: Network, title: <>Desarrollo de<br/>Plataformas IIoT</>, description: 'Transformamos los datos de tu planta en decisiones inteligentes.', points: ['Captura de datos y trazabilidad industrial', 'Visualización de indicadores KPI y OEE', 'Gestión de materias primas y pruebas'], extra: 'Conectamos la operación con plataformas de información para gestionar datos, seguimiento de materiales y pruebas metodológicas de tus procesos.', className: 'service-iot' },
];

function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;
  return <article className={`service-card ${service.className}`}><div className="service-card-head"><div className="service-icon"><Icon strokeWidth={1.5}/></div><span>{service.number} /</span></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul><div id={`service-${service.number}`} inert={!expanded} aria-hidden={!expanded} className={`service-extra ${expanded ? 'is-expanded' : ''}`}><div><p>{service.extra}</p></div></div><button className="text-link" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`service-${service.number}`}>{expanded ? 'Ver menos' : 'Explorar solución'}<Plus className="service-toggle" size={18}/></button></article>;
}

function ContactForm() {
  const [status, setStatus] = useState('');
  const [draft, setDraft] = useState('');
  function submit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `Consulta de ingeniería — ${form.get('company') || form.get('name')}`;
    const body = `Nombre: ${form.get('name')}\nEmpresa: ${form.get('company') || 'No especificada'}\nCorreo: ${form.get('email')}\nServicio: ${form.get('service')}\n\nProyecto:\n${form.get('message')}`;
    const url = `mailto:info@ingeniax.com.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraft(url);
    setStatus('Tu consulta está preparada. Se abrirá tu aplicación de correo para que revises y envíes el mensaje.');
    window.location.href = url;
  }
  return <form className="contact-form" onSubmit={submit}>
    <h3>Cuéntanos qué tienes en mente.</h3>
    <p>El próximo paso de tu industria empieza aquí.</p>
    <div className="form-row">
      <label>Nombre completo <span>*</span><input required autoComplete="name" name="name" placeholder="Tu nombre" maxLength={120}/></label>
      <label>Empresa<input name="company" autoComplete="organization" placeholder="Nombre de tu empresa" maxLength={150}/></label>
    </div>
    <label>Correo electrónico <span>*</span><input required type="email" name="email" autoComplete="email" placeholder="tu@empresa.com" maxLength={180}/></label>
    <label>¿En qué podemos ayudarte?
      <select name="service" defaultValue="">
        <option value="" disabled>Selecciona un servicio</option>
        <option>Soluciones Eléctricas Industriales</option>
        <option>Automatización y Control</option>
        <option>Desarrollo de Plataformas IIoT</option>
        <option>Consultoría / Proyecto integral</option>
      </select>
    </label>
    <label>Tu proyecto <span>*</span><textarea required name="message" rows={3} placeholder="Cuéntanos sobre tu proceso, tu reto o esa idea que quieres hacer realidad…" maxLength={4000}/></label>
    <button type="submit" className="button button-primary">Conversemos sobre tu proyecto <ArrowUpRight size={18}/></button>
    <p className="form-note"><Mail size={13}/> Prepararemos tu consulta en tu aplicación de correo.</p>
    {status && <div className="form-status" role="status"><Check size={18}/><div>{status}<a href={draft}>Abrir el correo de nuevo <ArrowUpRight size={13}/></a><span>También puedes escribirnos a info@ingeniax.com.co.</span></div></div>}
  </form>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');
  const [showAll, setShowAll] = useState(false);
  const [selected, setSelected] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const menuToggleRef = useRef(null);
  usePageMotion(filter, showAll);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => { if (e.key === 'Escape') { setMenuOpen(false); menuToggleRef.current.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const visibleProjects = useMemo(() => {
    const filtered = projects.filter(p => filter === 'Todos' || p.category === filter);
    return showAll || filter !== 'Todos' ? filtered : filtered.slice(0, 3);
  }, [filter, showAll]);
  return <><a href="#main" className="skip-link">Saltar al contenido</a><header className="site-header"><div className="header-inner"><Brand/><nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} id="main-navigation" aria-label="Navegación principal">{navLinks.map(([name, id]) => <a className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{name}</a>)}<a className="button button-small button-primary" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos de tu proyecto <ArrowUpRight size={16}/></a></nav><button ref={menuToggleRef} className="menu-toggle icon-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div><div className="scroll-progress" aria-hidden="true"/></header>
    <main id="main">
      <section className="hero" id="inicio">
        <img className="hero-image" src="https://images.pexels.com/photos/2569842/pexels-photo-2569842.jpeg?auto=compress&cs=tinysrgb&w=2400&q=85" alt="Equipos, tuberías e instrumentación para el control de procesos en una planta industrial" fetchPriority="high"/>
        <div className="hero-overlay"/><div className="hero-grid"/>
        <div className="container hero-content">
          <div className="hero-copy">
            <SectionLabel light>INGENIERÍA COLOMBIANA. VISIÓN SIN LÍMITES.</SectionLabel>
            <h1>Ingeniería que<br/>impulsa tu<br/><span>industria.</span></h1>
            <p>Conectamos la energía, el control y los datos para transformar tu operación. Soluciones a la medida, diseñadas para evolucionar contigo.</p>
            <div className="hero-actions">
              <a href="#contacto" className="button button-primary">Desarrollemos tu proyecto <ArrowUpRight size={18}/></a>
              <a href="#proyectos" className="button button-outline">Explora nuestras soluciones <ArrowRight size={17}/></a>
            </div>
            <div className="hero-assurance"><span><ShieldCheck size={16}/> Ingeniería con propósito</span><span className="assurance-divider"/><span>De la idea a la puesta en marcha</span></div>
          </div>
          <div className="hero-tech-note"><span className="tech-cross">+</span><div><span className="tech-status"><i/> EL FUTURO SE INTEGRA HOY</span><p>Más conexión.<br/><strong>Más posibilidades.</strong></p><span className="tech-coordinates">ENERGÍA / CONTROL / DATOS</span></div><ArrowUpRight size={25}/></div>
        </div>
        <div className="hero-bottom"><div className="container hero-bottom-inner"><span className="hero-bottom-label">INGENIERÍA EVOLUTIVA</span><div><span>01 <b>Energía</b></span><span>02 <b>Automatización</b></span><span>03 <b>Inteligencia industrial</b></span></div><a href="#nosotros" aria-label="Descubrir INGENIAX"><ArrowDown size={19}/></a></div></div>
      </section>

      <Clients/>

      <section className="about section-pad" id="nosotros"><div className="container about-layout"><div><SectionLabel>SOMOS INGENIAX</SectionLabel><h2>Entendemos tu industria.<br/><span className="muted-heading">Diseñamos su evolución.</span></h2></div><div className="about-copy"><p>Somos una compañía colombiana que convierte los retos de la industria en <strong>soluciones de ingeniería reales.</strong></p><p>Integramos sistemas eléctricos, automatización y plataformas digitales para hacer que cada proceso funcione mejor. Escuchamos, diseñamos e implementamos. Siempre a la medida de tu operación.</p><a href="#servicios" className="text-link">Descubre cómo lo hacemos <ArrowUpRight size={18}/></a></div></div><div className="container about-bottom"><div><span className="small-cross">+</span><span>Una visión integral de la ingeniería</span></div><span>DE LA POTENCIA AL DATO, TODO CONECTADO.</span></div></section>

      <section className="services section-pad" id="servicios"><div className="container"><div className="section-heading"><div><SectionLabel>NUESTRAS SOLUCIONES</SectionLabel><h2>Tres especialidades.<br/>Infinitas posibilidades.</h2></div><p>La experiencia técnica que necesitas,<br/>integrada en un solo aliado.</p></div><div className="services-grid">{services.map(service => <ServiceCard key={service.number} service={service}/>)}</div><div className="services-bottom"><span><Layers3 size={18}/> ¿Tu reto combina varias especialidades?</span><a href="#contacto" className="text-link">Diseñemos una solución integral <ArrowRight size={17}/></a></div></div></section>

      <section className="projects section-pad" id="proyectos"><div className="container"><div className="section-heading"><div><SectionLabel light>INGENIERÍA EN ACCIÓN</SectionLabel><h2>De los retos a<br/><span>las soluciones.</span></h2></div><div className="projects-intro"><p>Una mirada a lo que podemos crear.<br/>Explora aplicaciones que conectan nuestra<br className="desktop-break"/> experiencia con las necesidades de tu industria.</p><span><span className="live-dot"/> CONCEPTOS DE APLICACIÓN</span></div></div><div className="portfolio-toolbar"><div className="project-filters" role="group" aria-label="Filtrar proyectos">{['Todos', 'Automatización', 'IIoT', 'Eléctrica'].map(f => <button className={filter === f ? 'selected' : ''} aria-pressed={filter === f} key={f} onClick={() => { setFilter(f); setShowAll(false); }}>{f}{f === 'Todos' && <span>06</span>}</button>)}</div><span className="portfolio-hint"><Crosshair size={14}/> EXPLORA CADA SOLUCIÓN</span></div><ProjectGrid items={visibleProjects} onSelect={setSelected}/><div className="projects-bottom"><p>Interfaces ilustrativas. Ingeniería con posibilidades reales.</p>{filter === 'Todos' && <button className="button button-dark-outline" onClick={() => setShowAll(!showAll)}>{showAll ? 'Ver proyectos destacados' : 'Explorar todos los conceptos'}{showAll ? <Minus size={16}/> : <Plus size={16}/>}</button>}{filter !== 'Todos' && <span className="filtered-count">{visibleProjects.length} {visibleProjects.length === 1 ? 'concepto' : 'conceptos'} de {filter}</span>}</div></div></section>

      <section className="technologies section-pad" id="tecnologias"><div className="container"><div className="technology-heading"><SectionLabel>UN ECOSISTEMA SIN FRONTERAS</SectionLabel><h2>Tecnología líder.<br/>Ingeniería que la hace posible.</h2><p>Trabajamos con tecnologías reconocidas para integrar<br className="desktop-break"/> soluciones robustas, escalables y alineadas a tu proceso.</p></div><TechnologyBrands/><div className="technology-chips">{[[Cpu, 'PLC'], [PanelsTopLeft, 'HMI / SCADA'], [Network, 'Redes industriales'], [Cable, 'Tableros eléctricos'], [Gauge, 'Variadores / VFD'], [Activity, 'Adquisición de datos'], [Radio, 'Plataformas IIoT']].map(([Icon, text]) => <span key={text}><Icon size={15}/>{text}</span>)}</div><p className="brand-disclaimer">Marcas de referencia tecnológica. Sus nombres pertenecen a sus respectivos titulares.</p></div></section>

      <section className="why section-pad" id="valor"><div className="container why-layout"><div className="why-intro"><SectionLabel>EL DIFERENCIAL INGENIAX</SectionLabel><h2>No solo integramos<br/>tecnología.<br/><span className="muted-heading">Nos involucramos<br/>con tu operación.</span></h2><p>La mejor solución empieza por entender lo que realmente necesitas.</p><a href="#contacto" className="text-link">Conoce a tu próximo aliado <ArrowUpRight size={18}/></a><div className="engineering-stamp"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="27"/><path d="M50 3v20m0 54v20M3 50h20m54 0h20M35 50l10 10 22-23"/></svg><span>INGENIERÍA A LA MEDIDA<small>DISEÑADA PARA TU REALIDAD</small></span></div></div><div className="values-grid">{[[Crosshair, 'A la medida de tu proceso', 'Cada industria es diferente. Tu solución también debe serlo.'], [Workflow, 'Acompañamiento integral', 'Desde el diagnóstico y el diseño hasta la puesta en marcha.'], [Factory, 'Visión de planta', 'Entendemos los equipos, los procesos y los retos de la operación.'], [ShieldCheck, 'Respaldo técnico cercano', 'Comunicación directa y soporte ágil cuando lo necesitas.'], [ChartNoAxesCombined, 'Resultados que importan', 'Foco en la eficiencia, la visibilidad y el control de tu proceso.'], [Layers3, 'Integración de principio a fin', 'Electricidad, automatización y datos trabajando como un solo sistema.']].map(([Icon, title, desc], i) => <div className="value-block" key={title}><div><Icon size={23} strokeWidth={1.5}/><span>0{i + 1}</span></div><h3>{title}</h3><p>{desc}</p></div>)}</div></div></section>

      <section className="industries"><div className="container"><div className="industries-heading"><SectionLabel>DONDE LA INDUSTRIA EVOLUCIONA</SectionLabel><h2>Diferentes sectores. La misma precisión.</h2><p>Soluciones adaptables a los desafíos de cada industria.</p></div><div className="industry-grid">{[[Wheat, 'Alimentos y bebidas'], [Factory, 'Manufactura'], [Package, 'Empaque y embalaje'], [Droplets, 'Agua y servicios'], [Zap, 'Energía e infraestructura']].map(([Icon, text]) => <div key={text}><Icon size={29} strokeWidth={1.4}/><span>{text}</span></div>)}</div></div></section>

      <section className="contact section-pad" id="contacto"><div className="contact-grid-decoration"/><div className="container contact-layout"><div className="contact-copy"><SectionLabel light>CONECTEMOS IDEAS</SectionLabel><h2>Tu próximo reto.<br/><span>Nuestra próxima<br/>solución.</span></h2><p>Hablemos de ese proceso que quieres mejorar,<br className="desktop-break"/> conectar o transformar. Estamos para escucharte.</p><div className="contact-details"><a href="tel:+573243383543"><span className="contact-icon"><Phone size={19}/></span><span><small>LLÁMANOS</small>+57 324 338 3543</span><ArrowUpRight size={17}/></a><a href="mailto:info@ingeniax.com.co"><span className="contact-icon"><Mail size={19}/></span><span><small>ESCRÍBENOS</small>info@ingeniax.com.co</span><ArrowUpRight size={17}/></a><div><span className="contact-icon"><MapPin size={19}/></span><span><small>ENCUÉNTRANOS</small>Cll. 116 No. 42B – 91<em>Colombia</em></span></div><a href="https://www.ingeniax.com.co" target="_blank" rel="noreferrer"><span className="contact-icon"><Globe size={19}/></span><span><small>NUESTRO SITIO WEB</small>www.ingeniax.com.co</span><ArrowUpRight size={17}/></a></div><div className="contact-signoff"><span className="live-dot"/> INGENIERÍA COLOMBIANA, CONECTADA CONTIGO.</div></div><ContactForm/></div></section>
    </main><footer className="footer"><div className="container footer-main"><Brand light/><p>Energía que conecta. Control que transforma.<br/>Ingeniería que evoluciona.</p><a href="#inicio" className="back-top">Volver arriba <ArrowUpRight size={18}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} INGENIAX S.A.S. Todos los derechos reservados.</span><span>Hecho para una industria en evolución.<span className="colombia-flag"><i/><i/><i/></span></span></div></footer>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)}/>}</>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
