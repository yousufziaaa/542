import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function CardVisual({ card }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '1.586', borderRadius: '20px',
      background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
      position: 'relative', overflow: 'hidden',
      boxShadow: `0 24px 60px ${card.grad[1]}50, 0 4px 16px rgba(0,0,0,0.4)`,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.28) 0%, transparent 60%)' }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', animation: 'shimmer 3.2s ease-in-out 1s infinite' }} />
      <p style={{ position: 'absolute', top: '16px', left: '20px', margin: 0, fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.bank}</p>
      <div style={{ position: 'absolute', top: '44px', left: '20px', width: '32px', height: '24px', borderRadius: '5px', background: `linear-gradient(135deg, ${card.chip}, ${card.chip}BB)`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ position: 'absolute', top: '48px', left: '60px', opacity: 0.5 }}>
        {[10, 7, 4].map((r, i) => (
          <div key={i} style={{ position: 'absolute', top: 0, left: `${i * 5}px`, width: `${r}px`, height: `${r * 1.4}px`, border: '1.3px solid rgba(255,255,255,0.75)', borderRadius: `0 ${r}px ${r}px 0`, borderLeft: 'none' }} />
        ))}
      </div>
      <p style={{ position: 'absolute', bottom: '18px', left: '20px', margin: 0, fontSize: '20px', fontWeight: '700', color: 'rgba(255,255,255,0.96)', letterSpacing: '-0.3px' }}>{card.name}</p>
      <div style={{ position: 'absolute', bottom: '16px', right: '16px' }}>
        <NetworkBadge network={card.network} />
      </div>
    </div>
  );
}

function RateRow({ rate, isTop }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px' }}>
      <div style={{
        width: '36px', height: '36px', borderRadius: '10px',
        background: isTop ? 'rgba(77,166,255,0.15)' : 'rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px', flexShrink: 0,
      }}>
        {rate.emoji}
      </div>
      <p style={{ flex: 1, margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.65)', fontWeight: '400' }}>
        {rate.label}
      </p>
      <span style={{
        fontSize: '15px', fontWeight: '700',
        color: isTop ? '#4DA6FF' : '#FFFFFF',
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
  const typeLabel = card.type === 'cashback' ? 'Cash Back' : card.type === 'miles' ? 'Miles' : 'Points';
  const typeColor = card.type === 'cashback' ? '#34D058' : card.type === 'miles' ? '#FF9F0A' : '#4DA6FF';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 24px 0', flexShrink: 0 }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer', padding: 0, minHeight: '44px',
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 32px' }}>

        {/* Card visual with ambient glow */}
        <div className="anim-fade-up" style={{ position: 'relative' }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', inset: '-30px', borderRadius: '40px',
            background: `radial-gradient(ellipse, ${card.grad[1]}30 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />
          <CardVisual card={card} />
        </div>

        {/* Header info */}
        <div className="anim-fade-up" style={{ marginTop: '22px', animationDelay: '60ms' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: '#FFFFFF', letterSpacing: '-0.5px', flex: 1 }}>
              {card.name}
            </h1>
            <div style={{ background: `${typeColor}18`, borderRadius: '100px', padding: '4px 11px', marginTop: '3px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: '600', color: typeColor }}>{typeLabel}</span>
            </div>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>{card.bank}</p>
          {card.tagline && (
            <p style={{ margin: '8px 0 0', fontSize: '15px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{card.tagline}"
            </p>
          )}
        </div>

        {/* Annual fee */}
        <div className="anim-fade-up" style={{ marginTop: '16px', animationDelay: '100ms' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: '#141414', borderRadius: '100px',
            padding: '7px 14px', border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
              {card.annualFee === 0
                ? <strong style={{ color: '#34D058' }}>No annual fee</strong>
                : <><strong style={{ color: '#FFFFFF' }}>${card.annualFee.toFixed(0)}/yr</strong>{' '}annual fee</>
              }
            </span>
          </div>
        </div>

        {/* Earning rates */}
        {card.rates && (
          <div className="anim-fade-up" style={{ marginTop: '24px', animationDelay: '140ms' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px 2px' }}>
              Earning Rates
            </p>
            <div style={{ background: '#141414', borderRadius: '18px', border: '1px solid rgba(255,255,255,0.07)', overflow: 'hidden' }}>
              {card.rates.map((rate, i) => (
                <div key={i} style={{ borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
                  <RateRow rate={rate} isTop={rate === topRate} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perks */}
        {card.perks && (
          <div className="anim-fade-up" style={{ marginTop: '24px', animationDelay: '180ms' }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px 2px' }}>
              Card Perks
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {card.perks.map((perk, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#141414', borderRadius: '100px',
                  padding: '8px 14px', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" fill="rgba(52,208,88,0.15)"/>
                    <path d="M4.5 7l2 2 3-3" stroke="#34D058" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: '500' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
