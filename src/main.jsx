import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Ship, Anvil, ArrowUpRight, ArrowRight, ArrowDown, Menu, X, Zap, Cpu, Network, Check, Plus, Minus, Layers3, Settings2, Activity, Gauge, Radio, ShieldCheck, Cable, Factory, Package, Wheat, Droplets, Phone, Mail, MapPin, Globe, Crosshair, Workflow, ChartNoAxesCombined, PanelsTopLeft } from 'lucide-react';
import './styles.css';
import './motion.css';
import './header-hero.css';
import { brandLogo, brandLogoLight, technologies } from './brands';
import { usePageMotion } from './usePageMotion';
import Clients from './Clients';
import ServiceCircuits from './ServiceCircuits';
import BackgroundGears from './BackgroundGears';
import GearMethodology from './GearMethodology';
import { projects } from './projects';
import ProjectCarousel from './ProjectCarousel';
import './projects.css';

const navLinks = [['Nosotros', 'nosotros'], ['Servicios', 'servicios'], ['Experiencia', 'experiencia'], ['Tecnologías', 'tecnologias'], ['Sectores', 'sectores']];


// Source: Perfil Corporativo Ingeniax S.A.S., pages 3–4.
const profileServices = [
  'Automatización y control industrial', 'Programación de PLC, HMI y SCADA',
  'Modernización tecnológica (Retrofit)', 'Aplicaciones IIoT',
  'Monitoreo en tiempo real', 'Integración OT / IT',
  'Tableros eléctricos de potencia y control', 'Puesta en marcha y soporte postventa',
];

function Brand({ light = false }) {
  const [source, setSource] = useState(light ? brandLogoLight : brandLogo);
  const [loaded, setLoaded] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  return <a className={`brand ${light ? 'brand-light' : ''}`} href="#inicio" aria-label="INGENIAX, inicio">
    {!unavailable && <img className={`brand-image ${loaded ? 'is-loaded' : ''} ${light && source === brandLogo ? 'brand-image-light' : ''}`} src={source} alt="INGENIAX" width="2115" height="744" onLoad={() => setLoaded(true)} onError={() => { if (light && source !== brandLogo) setSource(brandLogo); else setUnavailable(true); }}/>}
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
    <div className="project-visual"><div className="project-card-top"><span><Icon size={12}/>{project.label}</span><span>IX — {project.id}</span></div><div className="project-screen-wrap"><img className="project-image" src={`${import.meta.env.BASE_URL}images/projects/${project.image}.png`} alt={project.alt} width="1536" height="1024" loading="lazy" decoding="async"/></div><div className="project-visual-caption"><span>IMAGEN ILUSTRATIVA</span><span>✧</span></div></div>
    <div className="project-info"><span className="project-category">{project.sector}</span><h3>{project.title}<ArrowUpRight size={22}/></h3><p className="project-client">{project.client} · {project.location}</p><p>{project.description}</p><div className="project-tags">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div>
  </button>;
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
  return <dialog ref={dialogRef} className="project-modal" onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="modal-title"><button className="modal-close icon-button" onClick={close} aria-label="Cerrar proyecto"><X/></button><div className={`modal-visual card-${project.color}`}><img className="project-image" src={`${import.meta.env.BASE_URL}images/projects/${project.image}.png`} alt={project.alt} width="1536" height="1024"/></div><div className="modal-content"><SectionLabel>Proyecto ejecutado / {project.id}</SectionLabel><h2 id="modal-title">{project.name}</h2><p className="project-client">{project.client} · {project.sector}<br/>{project.location}</p><p>{project.detail}</p><p>{project.context}</p><h3>Alcance ejecutado</h3><ul>{project.scope.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul><h3>Tecnologías integradas</h3><ul>{project.technologies.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul>{project.results.length > 0 && <><h3>Resultados y valor generado</h3><ul>{project.results.map(item => <li key={item}><Check size={16}/>{item}</li>)}</ul></>}<p className="concept-note">Imagen ilustrativa generada con IA para representar el proyecto.</p><a className="button button-primary" href="#contacto" onClick={onClose}>Quiero una solución así <ArrowUpRight size={18}/></a></div></dialog>;
}

const services = [
  { number: '01', icon: Cpu, title: <>Automatización<br/>y Control</>, description: 'Procesos precisos. Equipos conectados. El control en tus manos.', points: ['Programación PLC, HMI y SCADA', 'Integración de variadores de frecuencia', 'Modernización de sistemas de control', 'Diseño eléctrico y tableros de potencia y control'], extra: 'Integramos diseño eléctrico, tableros de potencia y control, protecciones y variadores. Migramos tecnologías y realizamos el montaje, las pruebas y la puesta en marcha a la medida de tu proceso.', className: 'service-control' },
  { number: '02', icon: Network, title: <>Desarrollo de<br/>Plataformas IoT</>, description: 'Transformamos los datos de tu planta en decisiones inteligentes.', points: ['Captura de datos y trazabilidad industrial', 'Visualización de indicadores KPI y OEE', 'Gestión de materias primas y pruebas'], extra: 'Conectamos la operación con plataformas de información para gestionar datos, seguimiento de materiales y pruebas metodológicas de tus procesos.', className: 'service-iot' },
  { number: '03', icon: ChartNoAxesCombined, title: <>Ciencia de<br/>Datos</>, description: 'Convierte la información de tu operación en conocimiento para mejorar cada decisión.', points: ['Análisis de datos e indicadores industriales', 'Modelos predictivos de variables de proceso', 'Identificación de patrones y oportunidades'], extra: 'Analizamos datos históricos y operativos para comprender el comportamiento de tus procesos, anticipar condiciones y orientar acciones de mejora con evidencia.', className: 'service-data' },
];

function ServiceCard({ service }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = service.icon;
  return <article className={`service-card ${service.className}`}><div className="service-card-head"><div className="service-icon"><Icon strokeWidth={1.5}/></div><span>{service.number} /</span></div><h3>{service.title}</h3><p>{service.description}</p><ul>{service.points.map(point => <li key={point}><Check size={15}/>{point}</li>)}</ul><div id={`service-${service.number}`} inert={!expanded} aria-hidden={!expanded} className={`service-extra ${expanded ? 'is-expanded' : ''}`}><div><p>{service.extra}</p></div></div><button className="text-link" onClick={() => setExpanded(!expanded)} aria-expanded={expanded} aria-controls={`service-${service.number}`}>{expanded ? 'Ver menos' : 'Explorar solución'}<Plus className="service-toggle" size={18}/></button></article>;
}

function ContactForm() {
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  async function submit(event) {
    event.preventDefault();
    if (sending) return;
    const element = event.currentTarget;
    const data = Object.fromEntries(new FormData(element));
    setSending(true);
    setStatus('');
    setFailed(false);
    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), signal: AbortSignal.timeout(45000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error('Send failed');
      setStatus('Tu consulta fue enviada. Pronto nos pondremos en contacto contigo.');
      element.reset();
    } catch {
      setFailed(true);
      setStatus('No pudimos confirmar el envío. Tus datos siguen en el formulario; puedes intentarlo más tarde o escribirnos directamente.');
    } finally {
      setSending(false);
    }
  }
  return <form className="contact-form" onSubmit={submit}>
    <h3>Cuéntanos qué tienes en mente.</h3>
    <p>El próximo paso de tu industria empieza aquí.</p>
    <div className="form-row">
      <label>Nombre completo <span>*</span><input required autoComplete="name" name="name" placeholder="Tu nombre" maxLength={120}/></label>
      <label>Empresa<input name="company" autoComplete="organization" placeholder="Nombre de tu empresa" maxLength={150}/></label>
    </div>
    <label>Correo electrónico <span>*</span><input required type="email" name="email" autoComplete="email" placeholder="tu@empresa.com" maxLength={180}/></label>
    <label>Número telefónico (opcional)<input type="tel" name="phone" autoComplete="tel" placeholder="Ej. +57 300 123 4567" maxLength={40}/></label>
    <label>¿En qué podemos ayudarte?
      <select name="service" defaultValue="">
        <option value="" disabled>Selecciona un servicio</option>
        <option>Automatización y Control</option>
        <option>Desarrollo de Plataformas IoT</option>
        <option>Ciencia de datos</option>
        <option>Consultoría / Proyecto integral</option>
      </select>
    </label>
    <label>Tu proyecto <span>*</span><textarea required name="message" rows={3} placeholder="Cuéntanos sobre tu proceso, tu reto o esa idea que quieres hacer realidad…" maxLength={4000}/></label>
    <div hidden aria-hidden="true"><label>Sitio web<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <button type="submit" disabled={sending} aria-busy={sending} className="button button-primary">{sending ? 'Enviando tu consulta…' : 'Conversemos sobre tu proyecto'} <ArrowUpRight size={18}/></button>
    <p className="form-note"><Mail size={13}/> Enviaremos tu consulta directamente a nuestro equipo.</p>
    {status && <div className="form-status" role={failed ? 'alert' : 'status'}>{!failed && <Check size={18}/>}<div>{status}{failed && <a href="mailto:proyectos@ingeniax.com.co">Escribir a proyectos@ingeniax.com.co <ArrowUpRight size={13}/></a>}</div></div>}
  </form>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('Todos');

  const [selected, setSelected] = useState(null);
  const [activeSection, setActiveSection] = useState('');
  const menuToggleRef = useRef(null);
  usePageMotion(filter);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(({ clientes: 'experiencia', proyectos: 'experiencia', metodologia: 'nosotros', valor: 'nosotros' })[entry.target.id] || entry.target.id); }), { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = e => { if (e.key === 'Escape') { setMenuOpen(false); menuToggleRef.current.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  const visibleProjects = useMemo(() => projects.filter(p => filter === 'Todos' || p.categories.includes(filter)), [filter]);
  return <><a href="#main" className="skip-link">Saltar al contenido</a><header className="site-header"><div className="header-inner"><div className="header-identity"><Brand/><p className="header-tagline">Soluciones de ingeniería para industrias eficientes e innovadoras</p></div><nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} id="main-navigation" aria-label="Navegación principal">{navLinks.map(([name, id]) => <a className={activeSection === id ? 'active' : ''} aria-current={activeSection === id ? 'location' : undefined} href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>{name}</a>)}<a className="button button-small button-primary" href="#contacto" onClick={() => setMenuOpen(false)}>Hablemos de tu proyecto <ArrowUpRight size={16}/></a></nav><a className="header-contact button button-small button-primary" href="#contacto">Hablemos de tu proyecto <ArrowUpRight size={16}/></a><button ref={menuToggleRef} className="menu-toggle icon-button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button></div><div className="scroll-progress" aria-hidden="true"/></header>
    <main id="main">
      <section className="hero" id="inicio">
        <img className="hero-image" src={`${import.meta.env.BASE_URL}images/ingeniax-control-industrial.png`} alt="Profesional de INGENIAX supervisando procesos industriales en pantallas de control" fetchPriority="high"/>
        <div className="hero-overlay"/><div className="hero-grid"/>
        <div className="container hero-content">
          <div className="hero-copy">
            <SectionLabel light><div className="hero-specialties">Automatización Industrial <i className="hero-separator" aria-hidden="true"/> IoT <i className="hero-separator" aria-hidden="true"/> Ciencia de datos</div></SectionLabel>
            <h1>Ingeniería que<br/>impulsa tu<br/><span>industria.</span></h1>
            <div className="hero-actions">
              <a href="#contacto" className="button button-primary">Desarrollemos tu proyecto <ArrowUpRight size={18}/></a>
              <a href="#proyectos" className="button button-outline">Explora nuestras soluciones <ArrowRight size={17}/></a>
            </div>
          </div>
        </div>
        <div className="hero-marquee" role="region" aria-label="Servicios de INGENIAX" tabIndex={0}>
          <div className="hero-marquee-track">{[0, 1].map(copy => <div className="hero-marquee-group" key={copy} aria-hidden={copy === 1 ? true : undefined}>{profileServices.map(text => <span key={text}><span className="marquee-separator" aria-hidden="true">✦</span>{text}</span>)}</div>)}</div>
        </div>
      </section>


      <section className="about section-pad" id="nosotros"><div className="container about-layout"><div><SectionLabel>SOMOS INGENIAX</SectionLabel><h2>Entendemos tu industria.<br/><span className="muted-heading">Diseñamos su evolución.</span></h2></div><div className="about-copy"><p>Somos una compañía colombiana que convierte los retos de la industria en <strong>soluciones de ingeniería reales.</strong></p><p>Integramos sistemas eléctricos, automatización y plataformas digitales para hacer que cada proceso funcione mejor. Escuchamos, diseñamos e implementamos. Siempre a la medida de tu operación.</p><a href="#servicios" className="text-link">Descubre cómo lo hacemos <ArrowUpRight size={18}/></a></div></div><div className="container about-bottom"><div><span className="small-cross">+</span><span>Una visión integral de la ingeniería</span></div><span>DE LA POTENCIA AL DATO, TODO CONECTADO.</span></div></section>

      <GearMethodology/>

      <section className="why section-pad" id="valor"><BackgroundGears/><div className="container why-layout"><div className="why-intro"><SectionLabel>EL DIFERENCIAL INGENIAX</SectionLabel><h2>No solo integramos<br/>tecnología.<br/><span className="muted-heading">Nos involucramos<br/>con tu operación.</span></h2><p>La mejor solución empieza por entender lo que realmente necesitas.</p><a href="#contacto" className="text-link">Conoce a tu próximo aliado <ArrowUpRight size={18}/></a><div className="engineering-stamp"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="27"/><path d="M50 3v20m0 54v20M3 50h20m54 0h20M35 50l10 10 22-23"/></svg><span>INGENIERÍA A LA MEDIDA<small>DISEÑADA PARA TU REALIDAD</small></span></div></div><div className="values-grid">{[[Crosshair, 'A la medida de tu proceso', 'Cada industria es diferente. Tu solución también debe serlo.'], [Workflow, 'Acompañamiento integral', 'Desde el diagnóstico y el diseño hasta la puesta en marcha.'], [Factory, 'Visión de planta', 'Entendemos los equipos, los procesos y los retos de la operación.'], [ShieldCheck, 'Respaldo técnico cercano', 'Comunicación directa y soporte ágil cuando lo necesitas.'], [ChartNoAxesCombined, 'Resultados que importan', 'Foco en la eficiencia, la visibilidad y el control de tu proceso.'], [Layers3, 'Integración de principio a fin', 'Electricidad, automatización y datos trabajando como un solo sistema.']].map(([Icon, title, desc], i) => <div className="value-block" key={title}><div><Icon size={23} strokeWidth={1.5}/><span>0{i + 1}</span></div><h3>{title}</h3><p>{desc}</p></div>)}</div></div></section>

      <section className="services section-pad" id="servicios"><ServiceCircuits/><div className="container"><div className="section-heading"><div><SectionLabel>NUESTRAS SOLUCIONES</SectionLabel><h2>Tres especialidades.<br/>Infinitas posibilidades.</h2></div><p>La experiencia técnica que necesitas,<br/>integrada en un solo aliado.</p></div><div className="services-grid">{services.map(service => <ServiceCard key={service.number} service={service}/>)}</div><div className="services-bottom"><span><Layers3 size={18}/> ¿Tu reto combina varias especialidades?</span><a href="#contacto" className="text-link">Diseñemos una solución integral <ArrowRight size={17}/></a></div></div></section>

      <div id="experiencia" role="region" aria-label="Experiencia">
      <Clients/>
      <section className="projects section-pad" id="proyectos"><div className="container"><div className="section-heading"><div><SectionLabel light>INGENIERÍA EN ACCIÓN</SectionLabel><h2>De los retos a<br/><span>las soluciones.</span></h2></div><div className="projects-intro"><p>Proyectos que conectan nuestra experiencia<br/>con los retos de cada industria.<br className="desktop-break"/> Conoce su alcance y las soluciones implementadas.</p><span><span className="live-dot"/> EXPERIENCIA EN PROYECTOS</span></div></div><div className="portfolio-toolbar"><div className="project-filters" role="group" aria-label="Filtrar proyectos">{['Todos', 'Automatización', 'IIoT', 'Eléctrica'].map(f => <button className={filter === f ? 'selected' : ''} aria-pressed={filter === f} key={f} onClick={() => { setFilter(f); }}>{f}{f === 'Todos' && <span>{String(projects.length).padStart(2, '0')}</span>}</button>)}</div><span className="portfolio-hint"><Crosshair size={14}/> EXPLORA CADA SOLUCIÓN</span></div><ProjectCarousel items={visibleProjects} modalOpen={Boolean(selected)} renderCard={project => <ProjectCard key={project.id} project={project} onSelect={setSelected}/>}/><div className="projects-bottom"><p>Proyectos ejecutados. Imágenes ilustrativas generadas con IA.</p></div></div></section>

      </div>

      <section className="technologies section-pad" id="tecnologias"><div className="container"><div className="technology-heading"><SectionLabel>UN ECOSISTEMA SIN FRONTERAS</SectionLabel><h2>Tecnología líder.<br/>Ingeniería que la hace posible.</h2><p>Trabajamos con tecnologías reconocidas para integrar<br className="desktop-break"/> soluciones robustas, escalables y alineadas a tu proceso.</p></div><TechnologyBrands/><div className="technology-chips">{[[Cpu, 'PLC'], [PanelsTopLeft, 'HMI / SCADA'], [Network, 'Redes industriales'], [Cable, 'Tableros eléctricos'], [Gauge, 'Variadores / VFD'], [Activity, 'Adquisición de datos'], [Radio, 'Plataformas IIoT']].map(([Icon, text]) => <span key={text}><Icon size={15}/>{text}</span>)}</div><p className="brand-disclaimer">Marcas de referencia tecnológica. Sus nombres pertenecen a sus respectivos titulares.</p></div></section>



      <section className="industries" id="sectores"><div className="container"><div className="industries-heading"><SectionLabel>DONDE LA INDUSTRIA EVOLUCIONA</SectionLabel><h2>Diferentes sectores. La misma precisión.</h2><p>Soluciones adaptables a los desafíos de cada industria.</p></div><div className="industry-grid">{[[Package, 'Plásticos'], [Factory, 'Manufactura'], [Wheat, 'Alimentos y bebidas'], [Ship, 'Naval'], [Droplets, 'Petroquímico'], [Anvil, 'Metalúrgico']].map(([Icon, text]) => <div key={text}><Icon size={29} strokeWidth={1.4}/><span>{text}</span></div>)}</div></div></section>

      <section className="contact section-pad" id="contacto"><div className="contact-grid-decoration"/><div className="container contact-layout"><div className="contact-copy"><SectionLabel light>CONECTEMOS IDEAS</SectionLabel><h2>Tu próximo reto.<br/><span>Nuestra próxima<br/>solución.</span></h2><p>Hablemos de ese proceso que quieres mejorar,<br className="desktop-break"/> conectar o transformar. Estamos para escucharte.</p><div className="contact-details"><a href="tel:+573243383543"><span className="contact-icon"><Phone size={19}/></span><span><small>LLÁMANOS</small>+57 324 338 3543</span><ArrowUpRight size={17}/></a><a href="mailto:info@ingeniax.com.co"><span className="contact-icon"><Mail size={19}/></span><span><small>ESCRÍBENOS</small>info@ingeniax.com.co</span><ArrowUpRight size={17}/></a><div><span className="contact-icon"><MapPin size={19}/></span><span><small>ENCUÉNTRANOS</small>Cll. 116 No. 42B – 91<em>Colombia</em></span></div><a href="https://www.ingeniax.com.co" target="_blank" rel="noreferrer"><span className="contact-icon"><Globe size={19}/></span><span><small>NUESTRO SITIO WEB</small>www.ingeniax.com.co</span><ArrowUpRight size={17}/></a></div><div className="contact-signoff"><span className="live-dot"/> INGENIERÍA COLOMBIANA, CONECTADA CONTIGO.</div></div><ContactForm/></div></section>
    </main><footer className="footer"><div className="container footer-main"><Brand light/><p>Energía que conecta. Control que transforma.<br/>Ingeniería que evoluciona.</p><a href="#inicio" className="back-top">Volver arriba <ArrowUpRight size={18}/></a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} INGENIAX S.A.S. Todos los derechos reservados.</span><span>Hecho para una industria en evolución.<span className="colombia-flag"><i/><i/><i/></span></span></div></footer><a className="whatsapp-float" href="https://wa.me/573243383543" target="_blank" rel="noopener noreferrer" aria-label="Abrir chat de WhatsApp con INGENIAX (nueva pestaña)" title="Escríbenos por WhatsApp">
      <svg viewBox="0 0 24 24" width="27" height="27" fill="currentColor" aria-hidden="true"><path d="M20.52 3.48A11.91 11.91 0 0 0 12.04 0C5.45 0 .08 5.37.08 11.96c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.63a11.98 11.98 0 0 0 5.84 1.49h.01C18.64 23.86 24 18.49 24 11.9c0-3.19-1.24-6.18-3.48-8.42ZM12.05 21.84a9.92 9.92 0 0 1-5.06-1.38l-.36-.21-3.68.97.98-3.59-.24-.37a9.9 9.9 0 0 1-1.52-5.3c0-5.48 4.46-9.94 9.94-9.94a9.87 9.87 0 0 1 7.03 2.91 9.88 9.88 0 0 1 2.91 7.04c0 5.48-4.46 9.94-10 9.87Zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.49-1.79-1.66-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.52.71.31 1.27.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.77-.73 2.02-1.43.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"/></svg>
    </a>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)}/>}</>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
