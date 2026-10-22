import './service-circuits.css';

const traces = [
  'M0 100 H180 V180 H460 V65 H710',
  'M1400 95 H1190 V210 H990 V310 H1400',
  'M0 390 H110 V620 H330 V800',
  'M1400 470 H1290 V650 H1090 V800',
  'M370 0 V90 H830 V170 H1050',
  'M0 735 H480 V690 H880 V755 H1400',
];

export default function ServiceCircuits() {
  return <div className="service-circuits" aria-hidden="true">
    <svg viewBox="0 0 1400 800" preserveAspectRatio="none" focusable="false">
      {traces.map((d, index) => <g key={d}>
        <path className="service-circuit-line" d={d}/>
        <path className="service-circuit-pulse" d={d} pathLength="100" style={{ '--pulse-delay': `${-index * 2.7}s`, '--pulse-duration': `${16 + index * 2}s` }}/>
      </g>)}
      {[[180, 100], [460, 180], [1190, 210], [990, 310], [110, 620], [1290, 650], [830, 90], [480, 690], [880, 755]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3"/>)}
    </svg>
  </div>;
}
