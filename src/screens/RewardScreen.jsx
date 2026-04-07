import { useState } from 'react';
import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const STACK = [
  { id: 'amex-cobalt', name: 'Amex Cobalt',     bank: 'American Express', network: 'AMEX', grad: ['#0E2A6E','#1B5FCC'], chip: '#F0C84A', reward: '5×', rewardLabel: 'pts · Dining' },
  { id: 'amex-gold',   name: 'Amex Gold',        bank: 'American Express', network: 'AMEX', grad: ['#7A4E00','#C98B10'], chip: '#FAE3A0', reward: '2×', rewardLabel: 'pts · Everything' },
  { id: 'td-aeroplan', name: 'TD Aeroplan Visa', bank: 'TD Bank',          network: 'VISA', grad: ['#00532A','#008644'], chip: '#F5D98A', reward: '1×', rewardLabel: 'mile · Travel' },
];

function TopCard({ card }) {
  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      {/* Recommended badge — no emoji */}
      <div style={{
        position: 'absolute', top: '-13px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '100px', padding: '4px 12px',
        whiteSpace: 'nowrap', zIndex: 10,
        animation: 'badgePop 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.1s both',
      }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.65)' }}>Recommended</span>
      </div>

      <div style={{
        width: '100%', aspectRatio: '1.586', borderRadius: '14px',
        background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 20px 50px ${card.grad[1]}40, 0 4px 16px rgba(0,0,0,0.5)`,
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.24) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', animation: 'shimmer 3.4s ease-in-out 0.8s infinite' }} />
        <p style={{ position: 'absolute', top: '14px', left: '16px', margin: 0, fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.bank}</p>
        <div style={{ position: 'absolute', top: '38px', left: '16px', width: '28px', height: '21px', borderRadius: '4px', background: `linear-gradient(135deg, ${card.chip}, ${card.chip}BB)`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
        </div>
        <p style={{ position: 'absolute', bottom: '16px', left: '16px', margin: 0, fontSize: '17px', fontWeight: '700', color: 'rgba(255,255,255,0.96)', letterSpacing: '-0.2px' }}>{card.name}</p>
        <div style={{ position: 'absolute', bottom: '14px', right: '14px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
          <NetworkBadge network={card.network} />
          <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '6px', padding: '2px 8px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'white' }}>{card.reward} <span style={{ fontWeight: '500', opacity: 0.75 }}>{card.rewardLabel}</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeekCard({ card, index }) {
  const scales    = [0.976, 0.953];
  const opacities = [0.66, 0.42];
  return (
    <div className="anim-fade-up" style={{
      animationDelay: `${160 + index * 65}ms`,
      height: '48px', borderRadius: '12px 12px 0 0',
      background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
      position: 'relative', overflow: 'hidden',
      opacity: opacities[index] ?? 0.42,
      transform: `scaleX(${scales[index] ?? 0.95})`,
      transformOrigin: 'top center', marginTop: '-2px',
      filter: 'saturate(0.6)', boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.name}</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', padding: '1px 6px' }}>{card.reward} {card.rewardLabel}</span>
        </div>
        <NetworkBadge network={card.network} muted />
      </div>
    </div>
  );
}

export default function RewardScreen({ onBack, onDone }) {
  const [whyOpen, setWhyOpen] = useState(false);
  const top  = STACK[0];
  const rest = STACK.slice(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 24px 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer', padding: 0,
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.2px' }}>Reward Details</span>
      </div>

      {/* Merchant pill */}
      <div className="anim-fade-up" style={{ padding: '10px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: 'rgba(255,255,255,0.05)', borderRadius: '100px', padding: '6px 14px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.6)' }}>Groceries</span>
          <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>$25 purchase</span>
        </div>
      </div>

      {/* Scrollable */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 24px 8px' }}>
        <TopCard card={top} />

        {/* Reward info */}
        <div className="anim-fade-up" style={{ marginTop: '14px', animationDelay: '80ms' }}>
          <div style={{ padding: '14px 0 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ margin: 0, fontSize: '11px', fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Groceries</p>
              <p style={{ margin: '3px 0 0', fontSize: '18px', fontWeight: '700', color: '#FFFFFF', letterSpacing: '-0.3px' }}>5% Cashback</p>
            </div>
            <span style={{ fontSize: '22px', fontWeight: '700', color: 'rgba(77,166,255,0.85)', letterSpacing: '-0.5px' }}>5×</span>
          </div>

          <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)' }} />

          <div style={{ padding: '12px 0 14px' }}>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', color: 'rgba(255,255,255,0.7)' }}>~$1.25 back on a $25 purchase</p>
            <p style={{ margin: '3px 0 0', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Credited to your statement monthly</p>
          </div>
        </div>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', marginBottom: '12px' }} />

        {/* Why this card? */}
        <div className="anim-fade-up" style={{ animationDelay: '140ms' }}>
          <button
            onClick={() => setWhyOpen(o => !o)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '4px 0 10px', cursor: 'pointer', fontFamily: FF, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'rgba(77,166,255,0.8)' }}>Why this card?</span>
            <svg width="11" height="7" viewBox="0 0 12 8" fill="none"
              style={{ transition: 'transform 0.25s ease', transform: whyOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ maxHeight: whyOpen ? '120px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            <p style={{ margin: '0 0 14px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
              <span style={{ color: '#FFFFFF' }}>Amex Cobalt</span> earns{' '}
              <span style={{ color: 'rgba(77,166,255,0.85)' }}>5×</span> points at grocery stores —
              that's <span style={{ color: '#FFFFFF' }}>2.5× better</span> than Amex Gold (2×)
              and <span style={{ color: '#FFFFFF' }}>5× better</span> than TD Aeroplan (1×).
            </p>
          </div>
        </div>

        {/* Peek cards */}
        <div style={{ marginTop: '8px' }}>
          {rest.map((card, i) => <PeekCard key={card.id} card={card} index={i} />)}
          <div style={{ height: '12px', borderRadius: '0 0 12px 12px', background: 'linear-gradient(135deg, #00532A, #008644)', opacity: 0.18, filter: 'saturate(0.5)', transform: 'scaleX(0.948)', transformOrigin: 'top center' }} />
        </div>

        <div style={{ height: '8px' }} />
      </div>

      {/* Done CTA */}
      <div style={{ padding: '10px 24px 28px', background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(255,255,255,0.2)', margin: '0 0 10px' }}>
          Tap Done to simulate a new transaction
        </p>
        <button
          onClick={onDone}
          className="btn-press"
          style={{
            width: '100%', padding: '16px', borderRadius: '100px',
            border: 'none', fontFamily: FF, fontSize: '15px', fontWeight: '700',
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.92)',
            color: '#080808',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
