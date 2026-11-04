import './service-icons.css';

export default function ServiceIcon({ type }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {type === 'service-control' && <>
      {[11, 16, 21].map((position, index) => <g key={position} style={{ '--pin-delay': `${index * 45}ms` }}>
        <path className="chip-pin" pathLength="6" d={`M${position} 8V4h${index === 1 ? -2 : 2}`} />
        <path className="chip-pin" pathLength="6" d={`M${position} 24v4h${index === 1 ? 2 : -2}`} />
        <path className="chip-pin" pathLength="6" d={`M8 ${position}H4v${index === 1 ? 2 : -2}`} />
        <path className="chip-pin" pathLength="6" d={`M24 ${position}h4v${index === 1 ? -2 : 2}`} />
      </g>)}
      <rect x="8" y="8" width="16" height="16" rx="3" />
      <rect x="12" y="12" width="8" height="8" rx="1" />
    </>}
    {type === 'service-iot' && <>
      <path d="M16 11v6M7 22v-5h18v5" />
      <rect className="iot-bit iot-bit-1" x="12" y="3" width="8" height="8" rx="1.5" />
      <rect className="iot-bit iot-bit-2" x="3" y="22" width="8" height="7" rx="1.5" />
      <rect className="iot-bit iot-bit-3" x="21" y="22" width="8" height="7" rx="1.5" />
    </>}
    {type === 'service-data' && <>
      <path d="M4 19v9h25" />
      <g fill="currentColor" stroke="none">
        <rect x="8" y="21" width="3" height="4" rx=".6" />
        <rect x="14" y="18" width="3" height="7" rx=".6" />
        <rect x="20" y="16" width="3" height="9" rx=".6" />
        <rect x="26" y="13" width="3" height="12" rx=".6" />
      </g>
      <path className="data-trend" pathLength="1" d="M5 15l7-7 6 3L28 4" />
      <path className="data-arrow" d="M23 4h5v5" />
    </>}
  </svg>;
}
