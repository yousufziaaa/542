import { CARDS } from '../data/cards';
import StatusBar from '../components/StatusBar';
import NetworkBadge from '../components/NetworkBadge';

export default function ConfirmationScreen({ selectedIds, onBack }) {
  const cards = CARDS.filter(c => selectedIds.has(c.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F2F7' }}>
      <StatusBar />

      {/* Back button */}
      <div style={{ padding: '4px 20px 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: 'none', border: 'none', color: '#007AFF',
            fontSize: '17px', cursor: 'pointer', padding: '6px 0',
            fontFamily: 'inherit',
          }}
        >
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path d="M8.5 1.5L1.5 8L8.5 14.5"
              stroke="#007AFF" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back
        </button>
      </div>

      {/* Hero */}
      <div className="anim-fade-up" style={{ padding: '28px 24px 22px', textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '22px',
          background: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
          margin: '0 auto 18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 28px rgba(52,199,89,0.38)',
        }}>
          <svg className="anim-pop-in" width="30" height="22" viewBox="0 0 30 22" fill="none">
            <path d="M2 11L10 19L28 3"
              stroke="white" strokeWidth="3"
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1C1C1E', margin: 0 }}>
          You're all set!
        </h1>
        <p style={{ fontSize: '15px', color: '#8E8E93', marginTop: '8px' }}>
          {cards.length} card{cards.length > 1 ? 's' : ''} added to your profile
        </p>
      </div>

      {/* Scrollable content */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 16px' }}>
        {/* Cards summary */}
        <div
          className="anim-fade-up"
          style={{
            background: 'white', borderRadius: '18px', overflow: 'hidden',
            boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
            animationDelay: '80ms',
          }}
        >
          <div style={{ padding: '13px 16px 8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#8E8E93', letterSpacing: '0.05em' }}>
              YOUR CARDS
            </span>
          </div>
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="anim-slide-in"
              style={{
                display: 'flex', alignItems: 'center',
                padding: '11px 16px',
                borderTop: '0.5px solid #E5E5EA',
                gap: '13px',
                animationDelay: `${110 + i * 50}ms`,
              }}
            >
              {/* Mini card chip */}
              <div style={{
                width: '46px', height: '29px', borderRadius: '6px', flexShrink: 0,
                background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 7px rgba(0,0,0,0.18)',
              }}>
                <NetworkBadge network={card.network} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '15px', fontWeight: '500', color: '#1C1C1E', margin: 0,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{card.name}</p>
                <p style={{ fontSize: '12px', color: '#8E8E93', marginTop: '1px' }}>{card.bank}</p>
              </div>

              <div style={{
                width: '22px', height: '22px', borderRadius: '50%',
                backgroundColor: '#34C759', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8"
                    strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Teaser */}
        <div
          className="anim-fade-up"
          style={{
            background: 'white', borderRadius: '18px', padding: '16px',
            marginTop: '12px', marginBottom: '16px',
            boxShadow: '0 2px 14px rgba(0,0,0,0.08)',
            display: 'flex', alignItems: 'center', gap: '14px',
            animationDelay: '200ms',
          }}
        >
          <div style={{
            width: '46px', height: '46px', borderRadius: '13px', flexShrink: 0,
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,122,255,0.3)',
          }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 2L13.8 8.2H20.5L14.9 12.1L17.2 18.5L11 14.8L4.8 18.5L7.1 12.1L1.5 8.2H8.2L11 2Z"
                fill="white"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>
              Smart recommendations
            </p>
            <p style={{ fontSize: '13px', color: '#8E8E93', marginTop: '2px' }}>
              AI-powered card matching — coming soon
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        padding: '14px 20px 36px',
        background: 'rgba(242,242,247,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '0.5px solid rgba(60,60,67,0.12)',
      }}>
        <button style={{
          width: '100%', padding: '17px', borderRadius: '14px',
          border: 'none', fontFamily: 'inherit', fontSize: '17px', fontWeight: '600',
          cursor: 'pointer',
          background: 'linear-gradient(135deg, #007AFF 0%, #0060CC 100%)',
          color: 'white',
          boxShadow: '0 4px 22px rgba(0,122,255,0.45)',
        }}>
          Start Using CardSmart
        </button>
      </div>
    </div>
  );
}
