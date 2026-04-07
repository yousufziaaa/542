import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const TRANSACTIONS = [
  { id: 1, merchant: 'Starbucks',   emoji: '☕', category: 'Dining',    card: 'Amex Cobalt', rate: '5×', saved: 1.02, amount: 8.50,   date: 'Today',     cardGrad: ['#0E2A6E','#1B5FCC'] },
  { id: 2, merchant: 'Loblaws',     emoji: '🛒', category: 'Groceries', card: 'Amex Cobalt', rate: '5×', saved: 4.72, amount: 59.00,  date: 'Yesterday', cardGrad: ['#0E2A6E','#1B5FCC'] },
  { id: 3, merchant: 'Netflix',     emoji: '📺', category: 'Streaming', card: 'Amex Cobalt', rate: '3×', saved: 1.08, amount: 17.99,  date: 'Mon',       cardGrad: ['#0E2A6E','#1B5FCC'] },
  { id: 4, merchant: 'Amazon',      emoji: '📦', category: 'Shopping',  card: 'Amex Gold',   rate: '2×', saved: 2.67, amount: 89.00,  date: 'Sun',       cardGrad: ['#7A4E00','#C98B10'] },
  { id: 5, merchant: 'Air Canada',  emoji: '✈️', category: 'Travel',   card: 'Amex Cobalt', rate: '2×', saved: 2.72, amount: 136.00, date: 'Fri',       cardGrad: ['#0E2A6E','#1B5FCC'] },
  { id: 6, merchant: 'Tim Hortons', emoji: '🍩', category: 'Dining',    card: 'Amex Cobalt', rate: '5×', saved: 0.19, amount: 3.80,   date: 'Thu',       cardGrad: ['#0E2A6E','#1B5FCC'] },
];

const TOTAL_SAVED   = 12.40;
const TOTAL_TXN     = TRANSACTIONS.length;
const AVG_RATE      = '3.8×';
const BEST_CARD     = 'Amex Cobalt';

const MONTHLY = [
  { month: 'Jan', saved: 6.80  },
  { month: 'Feb', saved: 9.20  },
  { month: 'Mar', saved: 12.40 },
];
const maxSaved = Math.max(...MONTHLY.map(m => m.saved));

function MiniBarChart() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '48px' }}>
      {MONTHLY.map((m) => {
        const pct = m.saved / maxSaved;
        const isLatest = m.month === 'Mar';
        return (
          <div key={m.month} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 }}>
            <div style={{
              width: '100%', borderRadius: '4px 4px 3px 3px',
              height: `${Math.round(pct * 40)}px`,
              background: isLatest
                ? 'linear-gradient(180deg, #34D058 0%, rgba(52,208,88,0.4) 100%)'
                : 'rgba(255,255,255,0.08)',
              position: 'relative', overflow: 'hidden',
            }}>
              {isLatest && (
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)', animation: 'shimmer 2.4s ease-in-out infinite' }} />
              )}
            </div>
            <span style={{ fontSize: '9px', color: isLatest ? '#34D058' : 'rgba(255,255,255,0.25)', fontWeight: isLatest ? '700' : '400', letterSpacing: '0.04em' }}>{m.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function TransactionRow({ txn }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px',
      padding: '13px 0',
      borderBottom: '0.5px solid rgba(255,255,255,0.05)',
    }}>
      {/* Merchant icon */}
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
        background: '#1E1E1E', border: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '18px',
      }}>
        {txn.emoji}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF' }}>{txn.merchant}</span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: '#34D058' }}>+${txn.saved.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
          <div style={{
            width: '14px', height: '9px', borderRadius: '2px', flexShrink: 0,
            background: `linear-gradient(135deg, ${txn.cardGrad[0]}, ${txn.cardGrad[1]})`,
          }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {txn.card} · <span style={{ color: '#4DA6FF', fontWeight: '600' }}>{txn.rate}</span> {txn.category}
          </span>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)', marginLeft: 'auto', flexShrink: 0 }}>{txn.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function SavingsScreen({ onTabChange, activeTab }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Ambient green glow */}
      <div style={{
        position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)',
        width: '320px', height: '320px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(52,208,88,0.10) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Scrollable content */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ marginTop: '16px', marginBottom: '28px' }}>
          <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 10px' }}>
            This Month
          </p>
          <h1 style={{ fontSize: '48px', fontWeight: '800', color: '#34D058', margin: '0 0 4px', letterSpacing: '-2px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            $12.40
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            saved vs. always using your worst card
          </p>
        </div>

        {/* Quick stats row */}
        <div className="anim-fade-up" style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[
            { label: 'Transactions', value: TOTAL_TXN,  unit: '' },
            { label: 'Avg. rate',    value: AVG_RATE,   unit: '' },
            { label: 'Top card',     value: 'Cobalt',   unit: '' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1, background: '#141414', borderRadius: '14px',
              padding: '12px 10px', border: '1px solid rgba(255,255,255,0.07)',
              textAlign: 'center',
            }}>
              <p style={{ fontSize: '18px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 3px', letterSpacing: '-0.5px' }}>{stat.value}</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Monthly trend */}
        <div className="anim-fade-up" style={{ background: '#141414', borderRadius: '18px', padding: '16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.07)', animationDelay: '60ms' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Monthly Trend
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <svg width="12" height="10" viewBox="0 0 14 12" fill="none">
                <path d="M1 10L5 6l3 3 5-7" stroke="#34D058" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#34D058' }}>+35%</span>
            </div>
          </div>
          <MiniBarChart />
        </div>

        {/* Transactions */}
        <div className="anim-fade-up" style={{ animationDelay: '100ms' }}>
          <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Recent Transactions
          </p>

          <div style={{ background: '#141414', borderRadius: '18px', padding: '0 14px', border: '1px solid rgba(255,255,255,0.07)' }}>
            {TRANSACTIONS.map((txn, i) => (
              <div key={txn.id} style={{ borderBottom: i < TRANSACTIONS.length - 1 ? '0.5px solid rgba(255,255,255,0.05)' : 'none' }}>
                <TransactionRow txn={txn} />
              </div>
            ))}
          </div>
        </div>

        {/* Tip strip */}
        <div className="anim-fade-up" style={{
          marginTop: '12px', marginBottom: '8px', animationDelay: '140ms',
          background: 'rgba(52,208,88,0.06)', borderRadius: '14px',
          padding: '12px 14px', border: '1px solid rgba(52,208,88,0.15)',
          display: 'flex', alignItems: 'flex-start', gap: '10px',
        }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>💡</span>
          <p style={{ margin: 0, fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.5 }}>
            You've used your <span style={{ color: '#FFFFFF', fontWeight: '600' }}>best card 100%</span> of the time this month. Keep it up!
          </p>
        </div>

      </div>

      {/* Bottom tab bar */}
      <div style={{ background: '#080808', borderTop: '0.5px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <BottomTabBar active={activeTab} onChange={onTabChange} />
      </div>
    </div>
  );
}
