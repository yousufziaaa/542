import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

function SettingsRow({ icon, label, value, tint = '#007AFF' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '13px 16px',
    }}>
      <div style={{
        width: '32px', height: '32px', borderRadius: '9px',
        background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <span style={{ flex: 1, fontSize: '15px', color: '#1C1C1E', fontWeight: '400' }}>
        {label}
      </span>
      {value && (
        <span style={{ fontSize: '14px', color: '#8E8E93' }}>{value}</span>
      )}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="#C7C7CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default function SettingsTabScreen({ onTabChange, activeTab }) {
  const iconStroke = 'white';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        <div style={{ marginTop: '18px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1C1C1E', margin: 0, letterSpacing: '-0.5px' }}>
            Settings
          </h1>
        </div>

        {/* General section */}
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#8E8E93', letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 2px 8px' }}>
          Preferences
        </p>
        <div style={{ background: 'white', borderRadius: '18px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', overflow: 'hidden', marginBottom: '22px' }}>
          <SettingsRow
            tint="#007AFF"
            label="Default Priority"
            value="Points"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke={iconStroke} strokeWidth="2" strokeLinejoin="round"/></svg>}
          />
          <div style={{ borderTop: '0.5px solid #F2F2F7' }}>
            <SettingsRow
              tint="#5856D6"
              label="Notifications"
              value="On"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
          </div>
          <div style={{ borderTop: '0.5px solid #F2F2F7' }}>
            <SettingsRow
              tint="#FF9500"
              label="Currency"
              value="CAD"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={iconStroke} strokeWidth="2"/><path d="M12 7v10M9.5 9.5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5S13.38 12 12 12s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5" stroke={iconStroke} strokeWidth="1.8" strokeLinecap="round"/></svg>}
            />
          </div>
        </div>

        {/* Account section */}
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#8E8E93', letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 2px 8px' }}>
          Account
        </p>
        <div style={{ background: 'white', borderRadius: '18px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          <SettingsRow
            tint="#34C759"
            label="Linked Cards"
            value="10"
            icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="13" rx="3" stroke={iconStroke} strokeWidth="2"/><path d="M2 10h20" stroke={iconStroke} strokeWidth="2"/></svg>}
          />
          <div style={{ borderTop: '0.5px solid #F2F2F7' }}>
            <SettingsRow
              tint="#FF3B30"
              label="Privacy & Data"
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V7l-9-5z" stroke={iconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
          </div>
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
