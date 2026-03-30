import { useState } from 'react';
import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

const STACK = [
  { id: 'amex-cobalt', name: 'Amex Cobalt',     bank: 'American Express', network: 'AMEX', grad: ['#0E2A6E','#1B5FCC'], chip: '#F0C84A', reward: '5×', rewardLabel: 'pts · Dining' },
  { id: 'amex-gold',   name: 'Amex Gold',        bank: 'American Express', network: 'AMEX', grad: ['#7A4E00','#C98B10'], chip: '#FAE3A0', reward: '2×', rewardLabel: 'pts · Everything' },
  { id: 'td-aeroplan', name: 'TD Aeroplan Visa', bank: 'TD Bank',          network: 'VISA', grad: ['#00532A','#008644'], chip: '#F5D98A', reward: '1×', rewardLabel: 'mile · Travel' },
];

function TopCard({ card }) {
  return (
    <div style={{ position: 'relative', marginTop: '20px' }}>
      <div style={{
        position: 'absolute', top: '-14px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #C9960C, #F5C842)',
        borderRadius: '16px', padding: '4px 12px 4px 9px',
        display: 'flex', alignItems: 'center', gap: '4px',
        whiteSpace: 'nowrap', zIndex: 10,
        boxShadow: '0 3px 10px rgba(197,150,12,0.38)',
      }}>
        <span style={{ fontSize: '11px', lineHeight: 1 }}>⭐</span>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#5C3800' }}>Recommended</span>
      </div>

      <div style={{
        width: '100%', aspectRatio: '1.586', borderRadius: '14px',
        background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(14,42,110,0.44), 0 2px 6px rgba(0,0,0,0.16)',
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
          <div style={{ background: 'rgba(255,255,255,0.17)', borderRadius: '8px', padding: '2px 8px', backdropFilter: 'blur(4px)' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: 'white' }}>{card.reward} <span style={{ fontWeight: '500', opacity: 0.8 }}>{card.rewardLabel}</span></span>
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
      filter: 'saturate(0.6)', boxShadow: '0 -2px 8px rgba(0,0,0,0.08)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.11) 0%, transparent 50%)' }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.name}</span>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.18)', borderRadius: '6px', padding: '1px 6px' }}>{card.reward} {card.rewardLabel}</span>
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F2F7' }}>
      <StatusBar />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 16px 0', position: 'relative' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#007AFF', fontSize: '15px', cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit' }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '15px', fontWeight: '600', color: '#1C1C1E' }}>Reward Details</span>
      </div>

      {/* Merchant pill */}
      <div className="anim-fade-up" style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'white', borderRadius: '16px', padding: '5px 12px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '12px' }}>🛒</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#3C3C43' }}>Groceries</span>
          <div style={{ width: '1px', height: '10px', background: '#D1D1D6' }} />
          <span style={{ fontSize: '12px', color: '#8E8E93' }}>$25 purchase</span>
        </div>
      </div>

      {/* Scrollable */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px' }}>
        <TopCard card={top} />

        {/* Reward info panel */}
        <div className="anim-fade-up" style={{ background: 'white', borderRadius: '14px', marginTop: '12px', overflow: 'hidden', boxShadow: '0 1px 10px rgba(0,0,0,0.07)', animationDelay: '80ms' }}>
          <div style={{ padding: '14px 16px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', flexShrink: 0, background: 'linear-gradient(135deg, #34C759, #248A3D)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px rgba(52,199,89,0.28)' }}>
                <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                  <path d="M10 3v14M6 7c0-1.1.9-2 2-2h3.5a2 2 0 0 1 0 4H7a2 2 0 0 0 0 4H12a2 2 0 0 0 2-2" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '10px', fontWeight: '600', color: '#8E8E93', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Groceries</p>
                <p style={{ margin: '1px 0 0', fontSize: '18px', fontWeight: '700', color: '#1C1C1E', letterSpacing: '-0.2px' }}>5% Cashback</p>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #0E2A6E, #1B5FCC)', borderRadius: '10px', padding: '7px 10px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '10px', color: 'rgba(255,255,255,0.7)', fontWeight: '500' }}>You earn</p>
              <p style={{ margin: '1px 0 0', fontSize: '18px', fontWeight: '800', color: 'white', lineHeight: 1 }}>5×</p>
            </div>
          </div>

          <div style={{ height: '0.5px', background: '#E5E5EA', margin: '0 16px' }} />

          <div style={{ padding: '11px 16px 14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0, background: '#F2F2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="6.5" stroke="#8E8E93" strokeWidth="1.2" />
                <path d="M8 5.5v3.5l2 2" stroke="#8E8E93" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#1C1C1E' }}>~$1.25 back on a $25 purchase</p>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#8E8E93' }}>Credited to your statement monthly</p>
            </div>
          </div>
        </div>

        {/* Why this card? */}
        <div className="anim-fade-up" style={{ background: 'white', borderRadius: '14px', marginTop: '8px', boxShadow: '0 1px 10px rgba(0,0,0,0.07)', overflow: 'hidden', animationDelay: '140ms' }}>
          <button
            onClick={() => setWhyOpen(o => !o)}
            style={{ width: '100%', background: 'none', border: 'none', padding: '13px 16px', cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#F2F2F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="13" height="13" viewBox="0 0 15 15" fill="none">
                  <circle cx="7.5" cy="7.5" r="6" stroke="#007AFF" strokeWidth="1.3" />
                  <path d="M7.5 6.5v4M7.5 5h.01" stroke="#007AFF" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#007AFF' }}>Why this card?</span>
            </div>
            <svg width="11" height="7" viewBox="0 0 12 8" fill="none"
              style={{ transition: 'transform 0.25s ease', transform: whyOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }}>
              <path d="M1 1.5L6 6.5L11 1.5" stroke="#C7C7CC" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ maxHeight: whyOpen ? '110px' : '0px', overflow: 'hidden', transition: 'max-height 0.3s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
            <div style={{ borderTop: '0.5px solid #E5E5EA', padding: '12px 16px 14px' }}>
              <p style={{ margin: 0, fontSize: '13px', color: '#3C3C43', lineHeight: 1.55 }}>
                <strong style={{ color: '#1C1C1E' }}>Amex Cobalt</strong> earns{' '}
                <strong style={{ color: '#007AFF' }}>5×</strong> points at grocery stores —
                that's <strong style={{ color: '#1C1C1E' }}>2.5× better</strong> than Amex Gold (2×)
                and <strong style={{ color: '#1C1C1E' }}>5× better</strong> than TD Aeroplan (1×).
              </p>
            </div>
          </div>
        </div>

        {/* Peek cards */}
        <div style={{ marginTop: '12px' }}>
          {rest.map((card, i) => <PeekCard key={card.id} card={card} index={i} />)}
          <div style={{ height: '12px', borderRadius: '0 0 12px 12px', background: 'linear-gradient(135deg, #00532A, #008644)', opacity: 0.18, filter: 'saturate(0.5)', transform: 'scaleX(0.948)', transformOrigin: 'top center' }} />
        </div>

        <div style={{ height: '8px' }} />
      </div>

      {/* Done CTA */}
      <div style={{ padding: '10px 16px 28px', background: 'rgba(242,242,247,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderTop: '0.5px solid rgba(60,60,67,0.1)' }}>
        <p style={{ textAlign: 'center', fontSize: '11px', color: '#AEAEB2', margin: '0 0 8px' }}>
          Tap Done to simulate a new transaction
        </p>
        <button
          onClick={onDone}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            border: 'none', fontFamily: 'inherit', fontSize: '15px', fontWeight: '600',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
            color: 'white', boxShadow: '0 4px 16px rgba(52,199,89,0.34)',
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
