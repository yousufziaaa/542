import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ onScan, onTabChange, activeTab, selectedCards, onSavingsTap }) {
  const activeCount = selectedCards && selectedCards.size > 0 ? selectedCards.size : 3;
  const topCard = selectedCards && selectedCards.size > 0
    ? CARDS.find(c => selectedCards.has(c.id))
    : CARDS[0];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#080808', fontFamily: FF,
    }}>
      <StatusBar dark />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px', position: 'relative' }}>

        {/* Ambient glow */}
        <div style={{
          position: 'absolute', top: '-40px', left: '50%', transform: 'translateX(-50%)',
          width: '280px', height: '280px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(77,166,255,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '16px', marginBottom: '32px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #4DA6FF 0%, #6B5CE7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="15" height="13" viewBox="0 0 19 17" fill="none">
              <rect x="1" y="3.5" width="17" height="11" rx="2.5" stroke="white" strokeWidth="1.6"/>
              <path d="M1 7.5h17" stroke="white" strokeWidth="1.6"/>
              <rect x="3.5" y="10" width="4" height="1.8" rx="0.9" fill="white"/>
            </svg>
          </div>
          <span style={{ fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            CardSmart
          </span>
        </div>

        {/* Greeting */}
        <div style={{ marginBottom: '8px' }} className="anim-fade-up">
          <h1 style={{
            fontSize: '38px', fontWeight: '800', color: '#FFFFFF',
            margin: '0 0 6px', letterSpacing: '-1px', lineHeight: 1.08,
          }}>
            {getGreeting()}
          </h1>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
            {activeCount} {activeCount === 1 ? 'card' : 'cards'} working for you
          </p>
        </div>

        {/* Savings chip — tappable */}
        <button
          onClick={onSavingsTap}
          className="btn-press anim-fade-up"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            border: '1px solid rgba(52,208,88,0.35)',
            background: 'rgba(52,208,88,0.08)',
            borderRadius: '100px', padding: '6px 14px 6px 12px', marginBottom: '36px',
            marginTop: '16px', cursor: 'pointer',
            WebkitTapHighlightColor: 'transparent',
            fontFamily: FF,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M22 7l-8.5 8.5-5-5L2 17" stroke="#34D058" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: '13px', fontWeight: '600', color: '#34D058', fontVariantNumeric: 'tabular-nums' }}>
            ~$12.40 saved this month
          </span>
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.5 }}>
            <path d="M6 3l5 5-5 5" stroke="#34D058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Recent Activity */}
        <div className="anim-fade-up">
          <p style={{
            fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)',
            letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 12px',
          }}>
            Recent Activity
          </p>

          <div style={{
            background: '#141414', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px',
                background: 'linear-gradient(145deg, #00704A 0%, #00A862 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M17 8h1a4 4 0 010 8h-1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 2v3M10 2v3M14 2v3" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '15px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>Starbucks</p>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '3px 0 0' }}>
                  {topCard ? topCard.name : 'Amex Cobalt'} · 5× points
                </p>
              </div>
              <div style={{
                background: 'rgba(77,166,255,0.15)', borderRadius: '9px', padding: '5px 10px',
              }}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: '#4DA6FF' }}>5×</span>
              </div>
            </div>

            <div style={{
              marginTop: '14px', paddingTop: '14px',
              borderTop: '0.5px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)' }}>Today at 9:41 AM</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#34D058' }}/>
                <span style={{ fontSize: '12px', color: '#34D058', fontWeight: '500' }}>Best card used</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart tip */}
        {topCard && (
          <div className="anim-fade-up" style={{
            marginTop: '12px', animationDelay: '80ms',
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', padding: '12px 14px',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <div style={{
              width: '34px', height: '22px', borderRadius: '6px', flexShrink: 0,
              background: `linear-gradient(135deg, ${topCard.grad[0]}, ${topCard.grad[1]})`,
            }} />
            <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>
              <span style={{ color: '#FFFFFF', fontWeight: '500' }}>{topCard.name}</span>
              {topCard.rates && topCard.rates[0] && (
                <> earns {topCard.rates[0].rate} on {topCard.rates[0].label.toLowerCase()}</>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <div style={{ background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ padding: '16px 24px 10px' }}>
          <button
            onClick={onScan}
            className="btn-press"
            style={{
              width: '100%', height: '58px',
              background: 'rgba(255,255,255,0.92)',
              border: 'none', borderRadius: '100px',
              color: '#080808', fontSize: '16px', fontWeight: '700',
              cursor: 'pointer', letterSpacing: '-0.2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              fontFamily: FF,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5a7 7 0 017-7 7 7 0 017 7" stroke="#080808" strokeWidth="2.2" strokeLinecap="round"/>
              <path d="M8 12.5a4 4 0 014-4 4 4 0 014 4" stroke="#080808" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="12" cy="12.5" r="1.8" fill="#080808"/>
            </svg>
            Scan Merchant
          </button>
        </div>
        <BottomTabBar active={activeTab} onChange={onTabChange} />
      </div>
    </div>
  );
}
