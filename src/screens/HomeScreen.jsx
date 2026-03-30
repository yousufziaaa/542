import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ onScan, onTabChange, activeTab }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>

        {/* Header: Logo + Wordmark */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          marginTop: '18px', marginBottom: '30px',
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 3px 10px rgba(0,122,255,0.35)',
          }}>
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
              <rect x="1" y="3.5" width="17" height="11" rx="2.5" stroke="white" strokeWidth="1.6"/>
              <path d="M1 7.5h17" stroke="white" strokeWidth="1.6"/>
              <rect x="3.5" y="10" width="4" height="1.8" rx="0.9" fill="white"/>
              <rect x="3.5" y="12.4" width="2.6" height="1.4" rx="0.7" fill="white" fillOpacity="0.55"/>
            </svg>
          </div>
          <span style={{
            fontSize: '18px', fontWeight: '700', color: '#1C1C1E',
            letterSpacing: '-0.4px',
          }}>
            CardSmart
          </span>
        </div>

        {/* Greeting */}
        <div style={{ marginBottom: '18px' }} className="anim-fade-up">
          <h1 style={{
            fontSize: '30px', fontWeight: '800', color: '#1C1C1E',
            margin: '0 0 5px', letterSpacing: '-0.6px', lineHeight: 1.15,
          }}>
            {getGreeting()}
          </h1>
          <p style={{ fontSize: '15px', color: '#8E8E93', margin: 0, fontWeight: '400' }}>
            3 cards active
          </p>
        </div>

        {/* Savings chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(52,199,89,0.13)',
          border: '1px solid rgba(52,199,89,0.22)',
          borderRadius: '22px', padding: '7px 14px',
          marginBottom: '28px',
        }} className="anim-fade-up">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 7l-8.5 8.5-5-5L2 17" stroke="#248A3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 7h6v6" stroke="#248A3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#248A3D' }}>
            ~$12.40 saved this month
          </span>
        </div>

        {/* Recent Activity section */}
        <div className="anim-fade-up">
          <p style={{
            fontSize: '11px', fontWeight: '700', color: '#8E8E93',
            letterSpacing: '0.09em', textTransform: 'uppercase',
            margin: '0 0 10px 2px',
          }}>
            Recent Activity
          </p>

          <div style={{
            background: 'white', borderRadius: '18px',
            padding: '16px',
            boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
          }}>
            {/* Starbucks row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {/* Merchant icon */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(145deg, #00704A 0%, #00A862 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 3px 10px rgba(0,112,74,0.3)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17 8h1a4 4 0 010 8h-1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v3M10 2v3M14 2v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>
                  Starbucks
                </p>
                <p style={{ fontSize: '13px', color: '#8E8E93', margin: '2px 0 0' }}>
                  Amex Cobalt · 5x points
                </p>
              </div>

              {/* Multiplier badge */}
              <div style={{
                background: 'rgba(0,122,255,0.1)',
                borderRadius: '9px', padding: '5px 10px', flexShrink: 0,
              }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#007AFF' }}>
                  5×
                </span>
              </div>
            </div>

            {/* Divider + hint row */}
            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '0.5px solid #F2F2F7',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '12px', color: '#C7C7CC' }}>
                Today at 9:41 AM
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '6px', height: '6px', borderRadius: '50%', background: '#34C759',
                }}/>
                <span style={{ fontSize: '12px', color: '#34C759', fontWeight: '500' }}>
                  Best card used
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom: CTA + Tab Bar */}
      <div style={{
        background: 'white',
        borderTop: '0.5px solid rgba(0,0,0,0.08)',
        flexShrink: 0,
      }}>
        {/* Scan Merchant CTA */}
        <div style={{ padding: '16px 20px 10px' }}>
          <button
            onClick={onScan}
            style={{
              width: '100%', height: '58px',
              background: 'linear-gradient(135deg, #007AFF 0%, #0060CC 100%)',
              border: 'none', borderRadius: '17px',
              color: 'white', fontSize: '17px', fontWeight: '600',
              cursor: 'pointer', letterSpacing: '-0.2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              boxShadow: '0 5px 22px rgba(0,122,255,0.42)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5a7 7 0 017-7 7 7 0 017 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 12.5a4 4 0 014-4 4 4 0 014 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="12.5" r="1.8" fill="white"/>
            </svg>
            Scan Merchant
          </button>
        </div>

        <BottomTabBar active={activeTab} onChange={onTabChange} />
      </div>
    </div>
  );
}
