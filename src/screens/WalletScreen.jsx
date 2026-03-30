import { useState } from 'react';
import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';

const STACK = [
  { id: 'amex-cobalt',  name: 'Amex Cobalt',     bank: 'American Express', network: 'AMEX', grad: ['#0E2A6E','#1B5FCC'], chip: '#F0C84A', reward: '5×',  rewardLabel: 'pts · Dining',      recommended: true  },
  { id: 'amex-gold',    name: 'Amex Gold',        bank: 'American Express', network: 'AMEX', grad: ['#7A4E00','#C98B10'], chip: '#FAE3A0', reward: '2×',  rewardLabel: 'pts · Everything',  recommended: false },
  { id: 'td-aeroplan',  name: 'TD Aeroplan Visa', bank: 'TD Bank',          network: 'VISA', grad: ['#00532A','#008644'], chip: '#F5D98A', reward: '1×',  rewardLabel: 'mile · Travel',     recommended: false },
  { id: 'bmo-cashback', name: 'BMO Cashback MC',  bank: 'BMO',              network: 'MC',   grad: ['#00205B','#0044AB'], chip: '#F5D98A', reward: '1%',  rewardLabel: 'cash · Groceries',  recommended: false },
];

function RecommendedCard({ card }) {
  return (
    <div style={{ position: 'relative', marginTop: '24px' }}>
      <div style={{
        position: 'absolute', top: '-15px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, #C9960C, #F5C842)',
        borderRadius: '16px', padding: '4px 12px 4px 9px',
        display: 'flex', alignItems: 'center', gap: '4px',
        whiteSpace: 'nowrap', zIndex: 10,
        boxShadow: '0 3px 12px rgba(197,150,12,0.42)',
        animation: 'badgePop 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.18s both',
      }}>
        <span style={{ fontSize: '11px', lineHeight: 1 }}>⭐</span>
        <span style={{ fontSize: '11px', fontWeight: '700', color: '#5C3800', letterSpacing: '0.02em' }}>Recommended</span>
      </div>

      <div style={{
        width: '100%', aspectRatio: '1.586', borderRadius: '14px',
        background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 12px 32px rgba(14,42,110,0.48), 0 2px 6px rgba(0,0,0,0.18)',
        animation: 'cardDrop 0.44s cubic-bezier(0.22,1,0.36,1) 0.06s both',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.26) 0%, transparent 55%)' }} />
        <div style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)', animation: 'shimmer 3.2s ease-in-out 1.2s infinite' }} />
        <p style={{ position: 'absolute', top: '14px', left: '16px', margin: 0, fontSize: '13px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.bank}</p>
        <div style={{ position: 'absolute', top: '38px', left: '16px', width: '28px', height: '21px', borderRadius: '4px', background: `linear-gradient(135deg, ${card.chip}, ${card.chip}BB)`, boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
        </div>
        <div style={{ position: 'absolute', top: '42px', left: '52px', opacity: 0.55 }}>
          {[10, 7, 4].map((r, i) => (
            <div key={i} style={{ position: 'absolute', top: 0, left: `${i * 5}px`, width: `${r}px`, height: `${r * 1.4}px`, border: '1.3px solid rgba(255,255,255,0.75)', borderRadius: `0 ${r}px ${r}px 0`, borderLeft: 'none' }} />
          ))}
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
  const scales    = [0.975, 0.952, 0.930];
  const opacities = [0.70,  0.48,  0.32];
  return (
    <div className="anim-fade-up" style={{
      animationDelay: `${180 + index * 70}ms`,
      height: '50px', borderRadius: '12px 12px 0 0',
      background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
      position: 'relative', overflow: 'hidden',
      opacity: opacities[index] ?? 0.32,
      transform: `scaleX(${scales[index] ?? 0.93})`,
      transformOrigin: 'top center', marginTop: '-2px',
      filter: 'saturate(0.6)', boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
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

function ConfirmModal({ card, onConfirm, onCancel }) {
  return (
    <>
      {/* Scrim */}
      <div
        onClick={onCancel}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.38)', zIndex: 30,
        }}
      />

      {/* Bottom sheet */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: 'white', borderRadius: '22px 22px 0 0',
        animation: 'sheetSlideUp 0.46s cubic-bezier(0.32,0.72,0,1) forwards',
        boxShadow: '0 -6px 40px rgba(0,0,0,0.32)', zIndex: 40,
      }}>
        {/* Handle */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '4px' }}>
          <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: '#D1D1D6' }} />
        </div>

        <div style={{ padding: '12px 20px 36px' }}>
          {/* Header */}
          <p style={{
            fontSize: '18px', fontWeight: '700', color: '#1C1C1E',
            margin: '0 0 20px', textAlign: 'center', letterSpacing: '-0.3px',
          }}>
            Confirm Payment
          </p>

          {/* Card thumbnail row */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            background: '#F2F2F7', borderRadius: '16px',
            padding: '14px 16px', marginBottom: '22px',
          }}>
            {/* Mini card */}
            <div style={{
              width: '76px', height: '48px', borderRadius: '9px', flexShrink: 0,
              background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
              boxShadow: '0 5px 16px rgba(14,42,110,0.38)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 55%)' }} />
              {/* Chip */}
              <div style={{
                position: 'absolute', top: '8px', left: '8px',
                width: '14px', height: '11px', borderRadius: '2px',
                background: `linear-gradient(135deg, ${card.chip}, ${card.chip}99)`,
              }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
              </div>
              {/* Network badge */}
              <div style={{ position: 'absolute', bottom: '5px', right: '7px' }}>
                <NetworkBadge network={card.network} />
              </div>
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#1C1C1E', margin: 0 }}>
                {card.name}
              </p>
              <p style={{ fontSize: '13px', color: '#8E8E93', margin: '3px 0 0' }}>
                Dining &amp; Food · 5× points
              </p>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={onConfirm}
            style={{
              width: '100%', padding: '15px', borderRadius: '14px',
              border: 'none', fontFamily: 'inherit',
              background: 'linear-gradient(135deg, #34C759 0%, #248A3D 100%)',
              color: 'white', fontSize: '16px', fontWeight: '600',
              cursor: 'pointer', marginBottom: '10px',
              boxShadow: '0 4px 18px rgba(52,199,89,0.36)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Confirm Payment
          </button>

          {/* Secondary */}
          <button
            onClick={onCancel}
            style={{
              width: '100%', padding: '15px', borderRadius: '14px',
              border: 'none', fontFamily: 'inherit',
              background: '#F2F2F7',
              color: '#3C3C43', fontSize: '16px', fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            Choose a Different Card
          </button>
        </div>
      </div>
    </>
  );
}

export default function WalletScreen({ onContinue, onBack }) {
  const [top] = STACK;
  const rest  = STACK.slice(1);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F2F7', position: 'relative' }}>
      <StatusBar />

      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 16px 0', position: 'relative' }}>
        <button onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#007AFF', fontSize: '15px', cursor: 'pointer', padding: '6px 0', fontFamily: 'inherit' }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '15px', fontWeight: '600', color: '#1C1C1E' }}>Wallet</span>
      </div>

      <div className="anim-fade-up" style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'white', borderRadius: '16px', padding: '5px 12px', boxShadow: '0 1px 6px rgba(0,0,0,0.07)' }}>
          <span style={{ fontSize: '12px' }}>☕</span>
          <span style={{ fontSize: '12px', fontWeight: '500', color: '#3C3C43' }}>Dining &amp; Food</span>
          <div style={{ width: '1px', height: '10px', background: '#D1D1D6' }} />
          <span style={{ fontSize: '12px', color: '#8E8E93' }}>4 cards</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '6px 16px 0', overflowY: 'hidden' }}>
        <RecommendedCard card={top} />
        <div style={{ marginTop: '8px' }}>
          {rest.map((card, i) => <PeekCard key={card.id} card={card} index={i} />)}
          <div style={{ height: '14px', background: 'linear-gradient(135deg, #00205B, #0044AB)', borderRadius: '0 0 12px 12px', opacity: 0.2, filter: 'saturate(0.5)', transform: 'scaleX(0.91)', transformOrigin: 'top center' }} />
        </div>

        <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', animationDelay: '420ms' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="#C7C7CC" strokeWidth="1.1" />
            <path d="M6 5v3.5M6 4h.01" stroke="#C7C7CC" strokeWidth="1.1" strokeLinecap="round" />
          </svg>
          <span style={{ fontSize: '11px', color: '#AEAEB2' }}>Sorted automatically based on merchant category</span>
        </div>
      </div>

      <div style={{ padding: '10px 16px 28px', background: 'rgba(242,242,247,0.96)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderTop: '0.5px solid rgba(60,60,67,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px', marginBottom: '10px' }}>
          <div style={{ width: '28px', height: '18px', borderRadius: '3px', background: `linear-gradient(135deg, ${top.grad[0]}, ${top.grad[1]})`, boxShadow: '0 1px 4px rgba(14,42,110,0.3)', flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: '#8E8E93' }}>
            <strong style={{ color: '#1C1C1E' }}>{top.name}</strong> · {top.reward} {top.rewardLabel}
          </span>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            fontFamily: 'inherit', fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            background: 'linear-gradient(135deg, #007AFF 0%, #0060CC 100%)',
            color: 'white', boxShadow: '0 4px 18px rgba(0,122,255,0.38)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}
        >
          Pay with {top.name}
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 5l4 4-4 4" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {showConfirm && (
        <ConfirmModal
          card={top}
          onConfirm={onContinue}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
