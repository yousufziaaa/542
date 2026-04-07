const TABS = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 12L12 4l9 8" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'wallet-tab',
    label: 'Wallet',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="14" rx="3" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2"/>
        <path d="M2 10h20" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2"/>
        <circle cx="17" cy="15" r="1.5" fill={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'}/>
        <path d="M6 4h12" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'savings-tab',
    label: 'Savings',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 17L9 11l4 4 8-10" stroke={active ? '#34D058' : 'rgba(255,255,255,0.32)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 7h4v4" stroke={active ? '#34D058' : 'rgba(255,255,255,0.32)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'settings-tab',
    label: 'Settings',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="3" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2"/>
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.32)'} strokeWidth="2"/>
      </svg>
    ),
  },
];

export default function BottomTabBar({ active, onChange }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      background: '#080808',
      borderTop: '0.5px solid rgba(255,255,255,0.08)',
      padding: '10px 0 22px',
    }}>
      {TABS.map(tab => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 10px', minWidth: '60px',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {tab.icon(isActive)}
            <span style={{
              fontSize: '10px',
              fontWeight: isActive ? '600' : '400',
              color: tab.id === 'savings-tab' && isActive ? '#34D058' : isActive ? '#FFFFFF' : 'rgba(255,255,255,0.32)',
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
              letterSpacing: '0.02em',
            }}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
