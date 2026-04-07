import { CARDS } from '../data/cards';
import StatusBar from '../components/StatusBar';
import NetworkBadge from '../components/NetworkBadge';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export default function ConfirmationScreen({ selectedIds, onBack }) {
  const cards = CARDS.filter(c => selectedIds.has(c.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Back button */}
      <div style={{ padding: '4px 24px 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Hero */}
      <div className="anim-fade-up" style={{ padding: '28px 24px 22px', textAlign: 'center' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '18px',
          background: 'rgba(52,208,88,0.12)',
          border: '1px solid rgba(52,208,88,0.2)',
          margin: '0 auto 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg className="anim-pop-in" width="24" height="18" viewBox="0 0 30 22" fill="none">
            <path d="M2 11L10 19L28 3" stroke="rgba(52,208,88,0.9)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#FFFFFF', margin: 0, letterSpacing: '-0.4px' }}>
          You're all set
        </h1>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', marginTop: '6px' }}>
          {cards.length} card{cards.length > 1 ? 's' : ''} added to your profile
        </p>
      </div>

      {/* Scrollable content */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>

        {/* Cards summary */}
        <div className="anim-fade-up" style={{ animationDelay: '80ms' }}>
          <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            Your Cards
          </p>
          {cards.map((card, i) => (
            <div key={card.id} style={{ position: 'relative' }}>
              <div
                className="anim-slide-in"
                style={{
                  display: 'flex', alignItems: 'center',
                  padding: '12px 0', gap: '12px',
                  animationDelay: `${110 + i * 50}ms`,
                }}
              >
                <div style={{
                  width: '44px', height: '28px', borderRadius: '6px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 55%)' }} />
                  <div style={{ position: 'absolute', bottom: '4px', right: '5px' }}>
                    <NetworkBadge network={card.network} />
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {card.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '1px' }}>{card.bank}</p>
                </div>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7l3.5 3.5 5.5-7" stroke="rgba(52,208,88,0.7)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {i < cards.length - 1 && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
            </div>
          ))}
        </div>

        {/* Teaser */}
        <div
          className="anim-fade-up"
          style={{
            marginTop: '24px', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '12px',
            animationDelay: '200ms',
          }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0,
            background: 'rgba(77,166,255,0.1)',
            border: '1px solid rgba(77,166,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L13.8 8.2H20.5L14.9 12.1L17.2 18.5L11 14.8L4.8 18.5L7.1 12.1L1.5 8.2H8.2L11 2Z"
                fill="rgba(77,166,255,0.8)"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Smart recommendations
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px' }}>
              AI-powered card matching — coming soon
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '14px 24px 36px',
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
      }}>
        <button style={{
          width: '100%', padding: '16px', borderRadius: '100px',
          border: 'none', fontFamily: FF, fontSize: '15px', fontWeight: '700',
          cursor: 'pointer',
          background: 'rgba(255,255,255,0.92)',
          color: '#080808',
        }}>
          Start Using CardSmart
        </button>
      </div>
    </div>
  );
}
