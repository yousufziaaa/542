export default function StatusBar({ dark = false }) {
  const c = dark ? 'rgba(255,255,255,0.88)' : '#1C1C1E';
  return (
    <div style={{
      height: '40px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px', paddingTop: '8px',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: c }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <rect x="0"  y="6.5" width="2.5" height="4.5" rx="0.6" />
          <rect x="4.5" y="4"  width="2.5" height="7"   rx="0.6" />
          <rect x="9"  y="1.8" width="2.5" height="9.2" rx="0.6" />
          <rect x="13.5" y="0" width="2.5" height="11"  rx="0.6" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <circle cx="7.5" cy="9.5" r="1.4" fill={c} />
          <path d="M4 6.8A4.6 4.6 0 0 1 7.5 5.5a4.6 4.6 0 0 1 3.5 1.3"
            stroke={c} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M1.5 4A8.8 8.8 0 0 1 7.5 1.8a8.8 8.8 0 0 1 6 2.2"
            stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
          <rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke={c} strokeOpacity="0.38" />
          <rect x="2"   y="2"   width="15" height="7"  rx="1.5" fill={c} />
          <path d="M22 3.5v4a1.8 1.8 0 0 0 0-4z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
