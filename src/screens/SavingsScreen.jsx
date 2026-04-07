import StatusBar from '../components/StatusBar';
import BottomTabBar from '../components/BottomTabBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const TRANSACTIONS = [
  { id: 1, merchant: 'Starbucks',   category: 'Dining',    card: 'Amex Cobalt', rate: '5×', saved: 1.02, amount: 8.50,   date: 'Today'     },
  { id: 2, merchant: 'Loblaws',     category: 'Groceries', card: 'Amex Cobalt', rate: '5×', saved: 4.72, amount: 59.00,  date: 'Yesterday' },
  { id: 3, merchant: 'Netflix',     category: 'Streaming', card: 'Amex Cobalt', rate: '3×', saved: 1.08, amount: 17.99,  date: 'Mon'       },
  { id: 4, merchant: 'Amazon',      category: 'Shopping',  card: 'Amex Gold',   rate: '2×', saved: 2.67, amount: 89.00,  date: 'Sun'       },
  { id: 5, merchant: 'Air Canada',  category: 'Travel',    card: 'Amex Cobalt', rate: '2×', saved: 2.72, amount: 136.00, date: 'Fri'       },
  { id: 6, merchant: 'Tim Hortons', category: 'Dining',    card: 'Amex Cobalt', rate: '5×', saved: 0.19, amount: 3.80,   date: 'Thu'       },
];

const TOTAL_TXN = TRANSACTIONS.length;
const AVG_RATE  = '3.8×';

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
              width: '100%', borderRadius: '3px 3px 2px 2px',
              height: `${Math.round(pct * 40)}px`,
              background: isLatest ? 'rgba(52,208,88,0.7)' : 'rgba(255,255,255,0.1)',
            }} />
            <span style={{ fontSize: '9px', color: isLatest ? 'rgba(52,208,88,0.8)' : 'rgba(255,255,255,0.2)', fontWeight: '500', letterSpacing: '0.04em' }}>{m.month}</span>
          </div>
        );
      })}
    </div>
  );
}

function TransactionRow({ txn, last }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
        <div style={{ flex: 1, minWidth: 0, marginRight: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span style={{ fontSize: '14px', fontWeight: '500', color: '#FFFFFF' }}>{txn.merchant}</span>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.2)' }}>{txn.date}</span>
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', marginTop: '2px', display: 'block' }}>
            {txn.card} · {txn.rate} · {txn.category}
          </span>
        </div>
        <span style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(52,208,88,0.85)', flexShrink: 0 }}>
          +${txn.saved.toFixed(2)}
        </span>
      </div>
      {!last && <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />}
    </div>
  );
}

function SectionLabel({ children, style }) {
  return (
    <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '20px 0 6px', ...style }}>
      {children}
    </p>
  );
}

export default function SavingsScreen({ onTabChange, activeTab }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>

        {/* Header */}
        <div style={{ marginTop: '18px', marginBottom: '24px' }}>
          <p style={{ fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            This Month
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: '700', color: '#34D058', margin: '0 0 4px', letterSpacing: '-1px', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            $12.40
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            saved vs. always using your worst card
          </p>
        </div>

        {/* Quick stats */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '20px' }}>
          {[
            { label: 'Transactions', value: TOTAL_TXN },
            { label: 'Avg. rate',    value: AVG_RATE  },
            { label: 'Top card',     value: 'Cobalt'  },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              flex: 1, textAlign: 'center',
              borderRight: i < 2 ? '0.5px solid rgba(255,255,255,0.08)' : 'none',
              padding: '0 8px',
            }}>
              <p style={{ fontSize: '17px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 3px', letterSpacing: '-0.3px' }}>{stat.value}</p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.25)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Monthly trend */}
        <SectionLabel style={{ marginTop: '4px' }}>Monthly Trend</SectionLabel>
        <div style={{ marginBottom: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.22)' }} />
            <span style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(52,208,88,0.6)' }}>+35% vs last month</span>
          </div>
          <MiniBarChart />
        </div>

        {/* Transactions */}
        <SectionLabel>Recent Transactions</SectionLabel>
        <div>
          {TRANSACTIONS.map((txn, i) => (
            <TransactionRow key={txn.id} txn={txn} last={i === TRANSACTIONS.length - 1} />
          ))}
        </div>

      </div>

      <BottomTabBar active={activeTab} onChange={onTabChange} />
    </div>
  );
}
