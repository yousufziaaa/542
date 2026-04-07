import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

function CardRow({ card, onTap, index, last }) {
  const topRate = card.rates ? [...card.rates].sort((a, b) => b.value - a.value)[0] : null;

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => onTap(card)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '12px',
          padding: '12px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: FF, textAlign: 'left',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <div style={{
          width: '44px', height: '28px', borderRadius: '6px', flexShrink: 0,
          background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 55%)' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF', margin: 0 }}>
            {card.name}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>
            {card.bank}{topRate && <span> · <span style={{ color: 'rgba(77,166,255,0.8)' }}>{topRate.rate}</span></span>}
          </p>
        </div>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4.5 2.5l3 3.5-3 3.5" stroke="rgba(255,255,255,0.18)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {!last && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
    </div>
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
        <div style={{ marginTop: '18px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 4px', letterSpacing: '-0.4px' }}>
            Wallet
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            {allCards.length} {allCards.length === 1 ? 'card' : 'cards'}
            {topEarner && <span> · best earner: <span style={{ color: 'rgba(255,255,255,0.55)' }}>{topEarner.name}</span></span>}
          </p>
        </div>

        {/* Card list */}
        <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>
          Your Cards
        </p>
        <div>
          {displayCards.map((card, i) => (
            <CardRow key={card.id} card={card} onTap={onCardTap} index={i} last={i === displayCards.length - 1 && remaining === 0} />
          ))}
          {remaining > 0 && (
            <div style={{ padding: '12px 0', borderTop: '0.5px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>
                +{remaining} more
              </span>
            </div>
          )}
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
