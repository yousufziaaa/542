import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function CardRow({ card, onTap, index }) {
  const topRate = card.rates ? [...card.rates].sort((a, b) => b.value - a.value)[0] : null;
  const typeColor = card.type === 'cashback' ? '#34D058' : card.type === 'miles' ? '#FF9F0A' : '#4DA6FF';

  return (
    <button
      onClick={() => onTap(card)}
      className="anim-fade-up"
      style={{
        animationDelay: `${index * 40}ms`,
        width: '100%', display: 'flex', alignItems: 'center', gap: '14px',
        padding: '14px 16px',
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: FF, textAlign: 'left',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div style={{
        width: '54px', height: '35px', borderRadius: '9px', flexShrink: 0,
        background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 55%)' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', margin: 0 }}>
          {card.name}
        </p>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
          {card.bank}
          {topRate && <span style={{ color: typeColor }}> · {topRate.rate} {topRate.emoji}</span>}
        </p>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>
        <div style={{ marginTop: '16px', marginBottom: '24px' }}>
          <h1 style={{
            fontSize: '38px', fontWeight: '800', color: '#FFFFFF',
            margin: '0 0 4px', letterSpacing: '-1px',
          }}>
            Wallet
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {allCards.length} {allCards.length === 1 ? 'card' : 'cards'} · tap to see details
          </p>
        </div>

        {/* Best earner callout */}
        {topEarner && (
          <div className="anim-fade-up" style={{
            borderRadius: '20px', padding: '18px 20px',
            marginBottom: '20px',
            background: `linear-gradient(135deg, ${topEarner.grad[0]}, ${topEarner.grad[1]})`,
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 60%)' }} />
            <p style={{ margin: '0 0 4px', fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Your best earner
            </p>
            <p style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>
              {topEarner.name}
              <span style={{ fontWeight: '400', opacity: 0.75, fontSize: '15px' }}>
                {' '}· up to {topEarner.rates ? Math.max(...topEarner.rates.map(r => r.value)) : 0}× back
              </span>
            </p>
          </div>
        )}

        {/* Card list */}
        <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px 2px' }}>
          Your Cards
        </p>
        <div style={{
          background: '#141414',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.07)',
          overflow: 'hidden',
        }}>
          {displayCards.map((card, i) => (
            <div key={card.id} style={{ borderTop: i > 0 ? '0.5px solid rgba(255,255,255,0.06)' : 'none' }}>
              <CardRow card={card} onTap={onCardTap} index={i} />
            </div>
          ))}
          {remaining > 0 && (
            <div style={{ padding: '13px 16px', borderTop: '0.5px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
              <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)', fontWeight: '500' }}>
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
