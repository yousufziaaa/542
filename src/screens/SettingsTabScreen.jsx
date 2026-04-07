import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function SettingsRow({ label, value, last }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
        <span style={{ fontSize: '14px', color: '#FFFFFF', fontWeight: '400' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {value && <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{value}</span>}
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2.5l3 3.5-3 3.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {!last && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '20px 0 6px' }}>
      {children}
    </p>
  );
}

export default function SettingsTabScreen({ onTabChange, activeTab }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#FFFFFF', margin: '18px 0 4px', letterSpacing: '-0.4px' }}>
          Settings
        </h1>

        <SectionLabel>Preferences</SectionLabel>
        <div>
          <SettingsRow label="Default Priority" value="Points" />
          <SettingsRow label="Notifications" value="On" />
          <SettingsRow label="Currency" value="CAD" last />
        </div>

        <SectionLabel>Account</SectionLabel>
        <div>
          <SettingsRow label="Linked Cards" value="10" />
          <SettingsRow label="Privacy & Data" last />
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
