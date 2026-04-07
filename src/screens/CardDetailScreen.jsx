import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function CardVisual({ card }) {
  return (
    <div style={{
      width: '100%', aspectRatio: '1.586', borderRadius: '20px',
      background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
      position: 'relative', overflow: 'hidden',
      boxShadow: `0 20px 50px ${card.grad[1]}40, 0 4px 16px rgba(0,0,0,0.4)`,
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

function RateRow({ rate, isTop, last }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', fontWeight: '400' }}>
          {rate.label}
        </span>
        <span style={{
          fontSize: '14px', fontWeight: '600',
          color: isTop ? 'rgba(77,166,255,0.9)' : 'rgba(255,255,255,0.7)',
          letterSpacing: '-0.2px', fontVariantNumeric: 'tabular-nums',
        }}>
          {rate.rate}
        </span>
      </div>
      {!last && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
    </div>
  );
}

export default function CardDetailScreen({ card, onBack }) {
  if (!card) return null;

  const topRate = card.rates ? [...card.rates].sort((a, b) => b.value - a.value)[0] : null;
  const typeLabel = card.type === 'cashback' ? 'Cash Back' : card.type === 'miles' ? 'Miles' : 'Points';
  const typeColor = card.type === 'cashback' ? 'rgba(52,208,88,0.85)' : card.type === 'miles' ? 'rgba(255,159,10,0.85)' : 'rgba(77,166,255,0.85)';

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

        {/* Card visual */}
        <div className="anim-fade-up">
          <CardVisual card={card} />
        </div>

        {/* Header info */}
        <div className="anim-fade-up" style={{ marginTop: '20px', animationDelay: '60ms' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '600', color: '#FFFFFF', letterSpacing: '-0.4px', flex: 1 }}>
              {card.name}
            </h1>
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '100px', padding: '4px 10px', marginTop: '2px', flexShrink: 0 }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: typeColor }}>{typeLabel}</span>
            </div>
          </div>
          <p style={{ margin: '0 0 6px', fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>{card.bank}</p>
          {card.tagline && (
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontStyle: 'italic', lineHeight: 1.5 }}>
              "{card.tagline}"
            </p>
          )}
        </div>

        {/* Annual fee */}
        <div className="anim-fade-up" style={{ marginTop: '14px', animationDelay: '100ms' }}>
          <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>
            {card.annualFee === 0
              ? <span style={{ color: 'rgba(52,208,88,0.8)' }}>No annual fee</span>
              : <><span style={{ color: 'rgba(255,255,255,0.65)' }}>${card.annualFee.toFixed(0)}/yr</span>{' '}annual fee</>
            }
          </span>
        </div>

        {/* Earning rates */}
        {card.rates && (
          <div className="anim-fade-up" style={{ marginTop: '24px', animationDelay: '140ms' }}>
            <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>
              Earning Rates
            </p>
            <div>
              {card.rates.map((rate, i) => (
                <RateRow key={i} rate={rate} isTop={rate === topRate} last={i === card.rates.length - 1} />
              ))}
            </div>
          </div>
        )}

        {/* Perks */}
        {card.perks && (
          <div className="anim-fade-up" style={{ marginTop: '24px', animationDelay: '180ms' }}>
            <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 10px' }}>
              Card Perks
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {card.perks.map((perk, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.05)', borderRadius: '100px',
                  padding: '6px 12px', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{perk}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
