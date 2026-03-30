import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

function CardVisual({ card }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '1.586', borderRadius: '18px',
      background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
      position: 'relative', overflow: 'hidden',
      boxShadow: `0 20px 48px ${card.grad[1]}55, 0 4px 12px rgba(0,0,0,0.2)`,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.28) 0%, transparent 60%)' }} />
      <div style={{
        position: 'absolute', top: 0, bottom: 0, width: '40%',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
        animation: 'shimmer 3.2s ease-in-out 1s infinite',
      }} />
      <p style={{ position: 'absolute', top: '16px', left: '20px', margin: 0, fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>
        {card.bank}
      </p>
      {/* Chip */}
      <div style={{
        position: 'absolute', top: '44px', left: '20px',
        width: '32px', height: '24px', borderRadius: '5px',
        background: `linear-gradient(135deg, ${card.chip}, ${card.chip}BB)`,
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
      </div>
      {/* Contactless */}
      <div style={{ position: 'absolute', top: '48px', left: '60px', opacity: 0.5 }}>
        {[10, 7, 4].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', top: 0, left: `${i * 5}px`,
            width: `${r}px`, height: `${r * 1.4}px`,
            border: '1.3px solid rgba(255,255,255,0.75)',
            borderRadius: `0 ${r}px ${r}px 0`, borderLeft: 'none',
          }} />
        ))}
      </div>
      <p style={{
        position: 'absolute', bottom: '18px', left: '20px', margin: 0,
        fontSize: '20px', fontWeight: '700', color: 'rgba(255,255,255,0.96)',
        letterSpacing: '-0.3px',
      }}>
        {card.name}
      </p>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
        <NetworkBadge network={card.network} />
      </div>
    </div>
  );
}

function RateRow({ rate, isTop }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '11px 16px',
    }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: isTop ? 'rgba(0,122,255,0.1)' : '#F2F2F7',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', flexShrink: 0,
      }}>
        {rate.emoji}
      </div>
      <p style={{ flex: 1, margin: 0, fontSize: '14px', color: '#3C3C43', fontWeight: '400' }}>
        {rate.label}
      </p>
      <span style={{
        fontSize: '15px', fontWeight: '700',
        color: isTop ? '#007AFF' : '#1C1C1E',
        letterSpacing: '-0.2px', fontVariantNumeric: 'tabular-nums',
      }}>
        {rate.rate}
      </span>
    </div>
  );
}

export default function CardDetailScreen({ card, onBack }) {
  if (!card) return null;

  const topRate = card.rates ? [...card.rates].sort((a, b) => b.value - a.value)[0] : null;
  const typeLabel = card.type === 'cashback' ? 'Cash Back' : card.type === 'miles' ? 'Travel Miles' : 'Points';
  const typeColor = card.type === 'cashback' ? '#34C759' : card.type === 'miles' ? '#FF9500' : '#007AFF';

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 16px 0', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', color: '#007AFF',
            fontSize: '15px', cursor: 'pointer', padding: '12px 8px 12px 0', minHeight: '44px', fontFamily: 'inherit',
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Wallet
        </button>
      </div>

      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px 20px 32px' }}>

        {/* Card visual */}
        <div className="anim-fade-up">
          <CardVisual card={card} />
        </div>

        {/* Header info */}
        <div className="anim-fade-up" style={{ marginTop: '18px', animationDelay: '60ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{
              margin: 0, fontSize: '22px', fontWeight: '800',
              color: '#1C1C1E', letterSpacing: '-0.4px', flex: 1, textWrap: 'balance',
            }}>
              {card.name}
            </h1>
            <div style={{
              background: `${typeColor}18`, borderRadius: '10px',
              padding: '4px 10px',
            }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: typeColor }}>
                {typeLabel}
              </span>
            </div>
          </div>
          <p style={{ margin: '0 0 4px', fontSize: '14px', color: '#8E8E93' }}>
            {card.bank}
          </p>
          {card.tagline && (
            <p style={{ margin: '6px 0 0', fontSize: '15px', color: '#3C3C43', fontStyle: 'italic', lineHeight: 1.4 }}>
              "{card.tagline}"
            </p>
          )}
        </div>

        {/* Annual fee pill */}
        <div className="anim-fade-up" style={{ marginTop: '14px', animationDelay: '100ms' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'white', borderRadius: '12px', padding: '7px 12px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="6.5" stroke="#8E8E93" strokeWidth="1.2"/>
              <path d="M8 5v6M6 7h4M6 11h4" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span style={{ fontSize: '13px', color: '#3C3C43' }}>
              {card.annualFee === 0
                ? <strong style={{ color: '#34C759' }}>No annual fee</strong>
                : <><strong style={{ color: '#1C1C1E' }}>${card.annualFee.toFixed(0)}/yr</strong> annual fee</>
              }
            </span>
          </div>
        </div>

        {/* Earning rates */}
        {card.rates && (
          <div className="anim-fade-up" style={{ marginTop: '18px', animationDelay: '140ms' }}>
            <p style={{
              fontSize: '11px', fontWeight: '700', color: '#8E8E93',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              margin: '0 0 8px 2px',
            }}>
              Earning Rates
            </p>
            <div style={{
              background: 'white', borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)', overflow: 'hidden',
            }}>
              {card.rates.map((rate, i) => (
                <div key={i} style={{ borderTop: i > 0 ? '0.5px solid #F2F2F7' : 'none' }}>
                  <RateRow rate={rate} isTop={rate === topRate} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perks */}
        {card.perks && (
          <div className="anim-fade-up" style={{ marginTop: '18px', animationDelay: '180ms' }}>
            <p style={{
              fontSize: '11px', fontWeight: '700', color: '#8E8E93',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              margin: '0 0 8px 2px',
            }}>
              Card Perks
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {card.perks.map((perk, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: 'white', borderRadius: '12px',
                  padding: '8px 12px',
                  boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                }}>
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="#34C759" fillOpacity="0.15"/>
                    <path d="M4.5 7l2 2 3-3" stroke="#34C759" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '13px', color: '#3C3C43', fontWeight: '500' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
