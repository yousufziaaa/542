import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function SettingsRow({ icon, label, value, tint = '#4DA6FF' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px' }}>
      <div style={{
        width: '34px', height: '34px', borderRadius: '10px',
        background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: '15px', color: '#FFFFFF', fontWeight: '400' }}>
        {label}
      </span>
      {value && (
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)' }}>{value}</span>
      )}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default function SettingsTabScreen({ onTabChange, activeTab }) {
  const s = 'white';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>
        <div style={{ marginTop: '16px', marginBottom: '28px' }}>
          <h1 style={{ fontSize: '38px', fontWeight: '800', color: '#FFFFFF', margin: 0, letterSpacing: '-1px' }}>
            Settings
          </h1>
        </div>

        <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 2px 10px' }}>
          Preferences
        </p>
        <div style={{ background: '#141414', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden', marginBottom: '24px' }}>
          <SettingsRow
            tint="#4DA6FF"
            label="Default Priority"
            value="Points"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={s} strokeWidth="2" strokeLinejoin="round"/></svg>}
          />
          <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
            <SettingsRow
              tint="#6B5CE7"
              label="Notifications"
              value="On"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
          </div>
          <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
            <SettingsRow
              tint="#FF9F0A"
              label="Currency"
              value="CAD"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={s} strokeWidth="2"/><path d="M12 7v10M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 12 12 12s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5" stroke={s} strokeWidth="1.8" strokeLinecap="round"/></svg>}
            />
          </div>
        </div>

        <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 2px 10px' }}>
          Account
        </p>
        <div style={{ background: '#141414', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <SettingsRow
            tint="#34D058"
            label="Linked Cards"
            value="10"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="3" stroke={s} strokeWidth="2"/><path d="M2 10h20" stroke={s} strokeWidth="2"/></svg>}
          />
          <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
            <SettingsRow
              tint="#FF453A"
              label="Privacy & Data"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
          </div>
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
