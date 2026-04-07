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

const RECENT = [
  { merchant: 'Starbucks',  card: 'Amex Cobalt', rate: '5×', time: '9:41 AM',   best: true,  grad: ['#0E2A6E','#1B5FCC'] },
  { merchant: 'Loblaws',    card: 'Amex Cobalt', rate: '5×', time: 'Yesterday', best: true,  grad: ['#0E2A6E','#1B5FCC'] },
  { merchant: 'Netflix',    card: 'Amex Cobalt', rate: '3×', time: 'Mon',       best: false, grad: ['#0E2A6E','#1B5FCC'] },
];

const BEST_FOR = [
  { category: 'Dining',     card: 'Amex Cobalt',     rate: '5×', grad: ['#0E2A6E','#1B5FCC'] },
  { category: 'Groceries',  card: 'Amex Cobalt',     rate: '5×', grad: ['#0E2A6E','#1B5FCC'] },
  { category: 'Travel',     card: 'TD Aeroplan Visa', rate: '2×', grad: ['#00532A','#008644'] },
];

function SectionLabel({ children, action, onAction }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '24px 0 8px' }}>
      <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        {children}
      </p>
      {action && (
        <button onClick={onAction} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: FF }}>
          <span style={{ fontSize: '12px', color: 'rgba(77,166,255,0.7)', fontWeight: '500' }}>{action}</span>
        </button>
      )}
    </div>
  );
}

export default function HomeScreen({ onScan, onTabChange, activeTab, selectedCards, onSavingsTap }) {
  const activeCount = selectedCards && selectedCards.size > 0 ? selectedCards.size : 3;
  const topCard = selectedCards && selectedCards.size > 0
    ? CARDS.find(c => selectedCards.has(c.id))
    : CARDS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>

        {/* Greeting */}
        <div style={{ marginTop: '20px' }} className="anim-fade-up">
          <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 4px', letterSpacing: '-0.7px', lineHeight: 1.1 }}>
            {getGreeting()}
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            {activeCount} {activeCount === 1 ? 'card' : 'cards'} working for you
          </p>
        </div>

        {/* Monthly summary — tappable */}
        <button
          onClick={onSavingsTap}
          className="btn-press anim-fade-up"
          style={{
            width: '100%', background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', fontFamily: FF, textAlign: 'left',
            WebkitTapHighlightColor: 'transparent', marginTop: '20px',
          }}
        >
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '16px', padding: '14px 16px',
            display: 'flex', alignItems: 'center',
          }}>
            {[
              { label: 'Saved',        value: '$12.40', color: '#34D058' },
              { label: 'Transactions', value: '6',      color: '#FFFFFF' },
            ].map((stat, i) => (
              <div key={stat.label} style={{
                flex: 1, textAlign: 'center',
                borderRight: i < 1 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
              }}>
                <p style={{ fontSize: '17px', fontWeight: '600', color: stat.color, margin: '0 0 3px', letterSpacing: '-0.3px', fontVariantNumeric: 'tabular-nums' }}>{stat.value}</p>
                <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.22)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
              </div>
            ))}
            <div style={{ paddingLeft: '12px', flexShrink: 0 }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 2.5l3 3.5-3 3.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </button>

        {/* Recent Activity */}
        <SectionLabel action="See all" onAction={onSavingsTap}>Recent Activity</SectionLabel>
        <div>
          {RECENT.map((tx, i) => (
            <div key={tx.merchant + i} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 0' }}>
                <div style={{
                  width: '40px', height: '26px', borderRadius: '5px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${tx.grad[0]}, ${tx.grad[1]})`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 55%)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF', margin: 0 }}>{tx.merchant}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>
                    {tx.card} · <span style={{ color: 'rgba(77,166,255,0.8)' }}>{tx.rate}</span>
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: 0 }}>{tx.time}</p>
                  {tx.best && (
                    <p style={{ fontSize: '11px', color: 'rgba(52,208,88,0.7)', margin: '2px 0 0', fontWeight: '500' }}>Best card</p>
                  )}
                </div>
              </div>
              {i < RECENT.length - 1 && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)' }} />}
            </div>
          ))}
        </div>

        {/* Best for */}
        <SectionLabel>Best card for</SectionLabel>
        <div>
          {BEST_FOR.map((item, i) => (
            <div key={item.category} style={{ position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 0' }}>
                <div style={{
                  width: '40px', height: '26px', borderRadius: '5px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${item.grad[0]}, ${item.grad[1]})`,
                  position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 55%)' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF', margin: 0 }}>{item.category}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', margin: '2px 0 0' }}>{item.card}</p>
                </div>
                <span style={{ fontSize: '14px', fontWeight: '600', color: 'rgba(77,166,255,0.8)', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>{item.rate}</span>
              </div>
              {i < BEST_FOR.length - 1 && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.05)' }} />}
            </div>
          ))}
        </div>

      </div>

      {/* Bottom CTA */}
      <div style={{ background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div style={{ padding: '16px 24px 10px' }}>
          <button
            onClick={onScan}
            className="btn-press"
            style={{
              width: '100%', height: '54px',
              background: 'rgba(255,255,255,0.92)',
              border: 'none', borderRadius: '100px',
              color: '#080808', fontSize: '15px', fontWeight: '700',
              cursor: 'pointer', letterSpacing: '-0.2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '9px',
              fontFamily: FF,
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
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
