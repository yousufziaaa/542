import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

function CardRow({ card, onTap, index }) {
  const typeColor = card.type === 'cashback' ? '#34C759' : card.type === 'miles' ? '#FF9500' : '#007AFF';
  const topRate = card.rates ? [...card.rates].sort((a, b) => b.value - a.value)[0] : null;

  return (
    <button
      onClick={() => onTap(card)}
      className="anim-fade-up"
      style={{
        animationDelay: `${index * 40}ms`,
        width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
        padding: '13px 16px',
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', textAlign: 'left',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Card swatch */}
      <div style={{
        width: '54px', height: '35px', borderRadius: '9px', flexShrink: 0,
        background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
        boxShadow: `0 3px 10px ${card.grad[1]}44`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 55%)' }} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>
          {card.name}
        </p>
        <p style={{ fontSize: '12px', color: '#8E8E93', margin: '2px 0 0' }}>
          {card.bank}
          {topRate && (
            <span style={{ color: typeColor, fontWeight: '500' }}> · {topRate.rate} {topRate.emoji}</span>
          )}
        </p>
      </div>

      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="#C7C7CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
}

export default function WalletTabScreen({ onTabChange, activeTab, selectedCards, onCardTap }) {
  const allCards = selectedCards && selectedCards.size > 0
    ? CARDS.filter(c => selectedCards.has(c.id))
    : CARDS;

  const displayCards = allCards.slice(0, 6);
  const remaining = allCards.length - displayCards.length;

  const topEarner = allCards.reduce((best, card) => {
    const max = card.rates ? Math.max(...card.rates.map(r => r.value)) : 0;
    const bestMax = best ? Math.max(...(best.rates || []).map(r => r.value)) : 0;
    return max > bestMax ? card : best;
  }, null);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        <div style={{ marginTop: '18px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1C1C1E', margin: '0 0 4px', letterSpacing: '-0.5px', textWrap: 'balance' }}>
            Wallet
          </h1>
          <p style={{ fontSize: '15px', color: '#8E8E93', margin: 0 }}>
            {allCards.length} {allCards.length === 1 ? 'card' : 'cards'} · tap to see details
          </p>
        </div>

        {/* Best earner callout */}
        {topEarner && (
          <div className="anim-fade-up" style={{
            background: `linear-gradient(135deg, ${topEarner.grad[0]}, ${topEarner.grad[1]})`,
            borderRadius: '16px', padding: '14px 16px',
            marginBottom: '16px', position: 'relative', overflow: 'hidden',
            boxShadow: `0 6px 20px ${topEarner.grad[1]}44`,
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 55%)' }} />
            <p style={{ margin: '0 0 2px', fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
              Your best earner
            </p>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: 'white' }}>
              {topEarner.name}
              <span style={{ fontWeight: '400', opacity: 0.85, fontSize: '14px' }}>
                {' '}· up to {topEarner.rates ? Math.max(...topEarner.rates.map(r => r.value)) : 0}× back
              </span>
            </p>
          </div>
        )}

        {/* Card list */}
        <div style={{ background: 'white', borderRadius: '18px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {displayCards.map((card, i) => (
            <div key={card.id} style={{ borderTop: i > 0 ? '0.5px solid #F2F2F7' : 'none' }}>
              <CardRow card={card} onTap={onCardTap} index={i} />
            </div>
          ))}
          {remaining > 0 && (
            <div style={{ padding: '12px 16px', borderTop: '0.5px solid #F2F2F7', textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: '#007AFF', fontWeight: '500' }}>
                +{remaining} more cards
              </span>
            </div>
          )}
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
