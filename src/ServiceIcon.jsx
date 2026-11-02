import './service-icons.css';

export default function ServiceIcon({ type }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    {type === 'service-control' && <>
      {[11, 16, 21].map(position => <g key={position}>
        <path className="chip-pin chip-pin-top" d={`M${position} 8V4`} />
        <path className="chip-pin chip-pin-bottom" d={`M${position} 24v4`} />
        <path className="chip-pin chip-pin-left" d={`M8 ${position}H4`} />
        <path className="chip-pin chip-pin-right" d={`M24 ${position}h4`} />
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
      <path d="M4 17v11h25M10 23v-4M16 23v-7M22 23V13M28 23V9" />
      <path className="data-trend" pathLength="1" d="M5 14l7-7 6 3L28 3" />
      <path className="data-arrow" d="M23 3h5v5" />
    </>}
  </svg>;
}
