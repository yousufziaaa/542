import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function getGreetingSub(count) {
  if (count === 0) return 'Add cards to start earning';
  if (count === 1) return '1 card ready to earn';
  return `${count} cards working for you`;
}

export default function HomeScreen({ onScan, onTabChange, activeTab, selectedCards }) {
  const activeCount = selectedCards && selectedCards.size > 0 ? selectedCards.size : 3;
  const topCard = selectedCards && selectedCards.size > 0
    ? CARDS.find(c => selectedCards.has(c.id))
    : CARDS[0];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '18px', marginBottom: '26px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, boxShadow: '0 3px 10px rgba(0,122,255,0.35)',
          }}>
            <svg width="19" height="17" viewBox="0 0 19 17" fill="none">
              <rect x="1" y="3.5" width="17" height="11" rx="2.5" stroke="white" strokeWidth="1.6"/>
              <path d="M1 7.5h17" stroke="white" strokeWidth="1.6"/>
              <rect x="3.5" y="10" width="4" height="1.8" rx="0.9" fill="white"/>
              <rect x="3.5" y="12.4" width="2.6" height="1.4" rx="0.7" fill="white" fillOpacity="0.55"/>
            </svg>
          </div>
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1C1C1E', letterSpacing: '-0.4px' }}>
            CardSmart
          </span>
        </div>

        {/* Greeting */}
        <div style={{ marginBottom: '18px' }} className="anim-fade-up">
          <h1 style={{ fontSize: '30px', fontWeight: '800', color: '#1C1C1E', margin: '0 0 5px', letterSpacing: '-0.6px', lineHeight: 1.15, textWrap: 'balance' }}>
            {getGreeting()}
          </h1>
          <p style={{ fontSize: '15px', color: '#8E8E93', margin: 0, fontWeight: '400' }}>
            {getGreetingSub(activeCount)}
          </p>
        </div>

        {/* Savings chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          background: 'rgba(52,199,89,0.12)',
          border: '1px solid rgba(52,199,89,0.2)',
          borderRadius: '22px', padding: '7px 14px', marginBottom: '28px',
        }} className="anim-fade-up">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 7l-8.5 8.5-5-5L2 17" stroke="#248A3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M16 7h6v6" stroke="#248A3D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#248A3D', fontVariantNumeric: 'tabular-nums' }}>
            ~$12.40 saved this month
          </span>
        </div>

        {/* Recent Activity */}
        <div className="anim-fade-up">
          <p style={{
            fontSize: '11px', fontWeight: '700', color: '#8E8E93',
            letterSpacing: '0.09em', textTransform: 'uppercase', margin: '0 0 10px 2px',
          }}>
            Recent Activity
          </p>

          <div style={{ background: 'white', borderRadius: '18px', padding: '16px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
            {/* Transaction row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(145deg, #00704A 0%, #00A862 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, boxShadow: '0 3px 10px rgba(0,112,74,0.3)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17 8h1a4 4 0 010 8h-1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v3M10 2v3M14 2v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>Starbucks</p>
                <p style={{ fontSize: '13px', color: '#8E8E93', margin: '2px 0 0' }}>
                  {topCard ? topCard.name : 'Amex Cobalt'} · 5× points
                </p>
              </div>

              <div style={{ background: 'rgba(0,122,255,0.1)', borderRadius: '9px', padding: '5px 10px', flexShrink: 0 }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#007AFF' }}>5×</span>
              </div>
            </div>

            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '0.5px solid #F2F2F7',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '12px', color: '#C7C7CC' }}>Today at 9:41 AM</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34C759' }}/>
                <span style={{ fontSize: '12px', color: '#34C759', fontWeight: '500' }}>Best card used</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart tip */}
        {topCard && (
          <div className="anim-fade-up" style={{
            marginTop: '14px',
            background: `linear-gradient(135deg, ${topCard.grad[0]}18, ${topCard.grad[1]}22)`,
            border: `1px solid ${topCard.grad[1]}30`,
            borderRadius: '14px', padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: '10px',
            animationDelay: '80ms',
          }}>
            <div style={{
              width: '32px', height: '20px', borderRadius: '5px', flexShrink: 0,
              background: `linear-gradient(135deg, ${topCard.grad[0]}, ${topCard.grad[1]})`,
              boxShadow: `0 2px 6px ${topCard.grad[1]}44`,
            }} />
            <p style={{ margin: 0, fontSize: '12px', color: '#3C3C43', lineHeight: 1.4 }}>
              <strong style={{ color: '#1C1C1E' }}>{topCard.name}</strong>
              {topCard.rates && topCard.rates[0] && (
                <> earns {topCard.rates[0].rate} on {topCard.rates[0].label.toLowerCase()}</>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA + Tab bar */}
      <div style={{ background: 'white', borderTop: '0.5px solid rgba(0,0,0,0.08)', flexShrink: 0 }}>
        <div style={{ padding: '16px 20px 10px' }}>
          <button
            onClick={onScan}
            className="btn-press"
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
