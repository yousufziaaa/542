import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';
import { CARDS } from '../data/cards';

function MiniCardPreview({ card }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '14px 16px',
    }}>
      {/* Card swatch */}
      <div style={{
        width: '52px', height: '34px', borderRadius: '8px',
        background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
      }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>
          {card.name}
        </p>
        <p style={{ fontSize: '12px', color: '#8E8E93', margin: '2px 0 0' }}>
          {card.bank} · {card.network}
        </p>
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3l4 4-4 4" stroke="#C7C7CC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

export default function WalletTabScreen({ onTabChange, activeTab }) {
  const displayCards = CARDS.slice(0, 5);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: '#F2F2F7',
      fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif",
    }}>
      <StatusBar />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 8px' }}>
        <div style={{ marginTop: '18px', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1C1C1E', margin: '0 0 4px', letterSpacing: '-0.5px' }}>
            Wallet
          </h1>
          <p style={{ fontSize: '15px', color: '#8E8E93', margin: 0 }}>
            {CARDS.length} cards linked
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '18px', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
          {displayCards.map((card, i) => (
            <div key={card.id} style={{ borderTop: i > 0 ? '0.5px solid #F2F2F7' : 'none' }}>
              <MiniCardPreview card={card} />
            </div>
          ))}
          {CARDS.length > 5 && (
            <div style={{
              padding: '12px 16px', borderTop: '0.5px solid #F2F2F7',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '14px', color: '#007AFF', fontWeight: '500' }}>
                +{CARDS.length - 5} more cards
              </span>
            </div>
          )}
        </div>
      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
