import { useState } from 'react';
import NetworkBadge from '../components/NetworkBadge';
import StatusBar from '../components/StatusBar';
import { CARDS } from '../data/cards';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const BASE_STACK = [
  { id: 'amex-cobalt',  name: 'Amex Cobalt',     bank: 'American Express', network: 'AMEX', grad: ['#0E2A6E','#1B5FCC'], chip: '#F0C84A', reward: '5×',  rewardLabel: 'pts · Dining' },
  { id: 'amex-gold',    name: 'Amex Gold',        bank: 'American Express', network: 'AMEX', grad: ['#7A4E00','#C98B10'], chip: '#FAE3A0', reward: '2×',  rewardLabel: 'pts · Everything' },
  { id: 'td-aeroplan',  name: 'TD Aeroplan Visa', bank: 'TD Bank',          network: 'VISA', grad: ['#00532A','#008644'], chip: '#F5D98A', reward: '1×',  rewardLabel: 'mile · Travel' },
  { id: 'bmo-cashback', name: 'BMO Cashback',     bank: 'BMO',              network: 'MC',   grad: ['#00205B','#0044AB'], chip: '#F5D98A', reward: '1%',  rewardLabel: 'cash · Groceries' },
];

function buildStack(selectedCards) {
  if (!selectedCards || selectedCards.size === 0) return BASE_STACK;
  const selected = CARDS.filter(c => selectedCards.has(c.id)).map(c => ({
    ...c,
    reward: c.rates ? `${c.rates[0].rate}` : '1×',
    rewardLabel: c.rates ? c.rates[0].label.split(' ')[0] : 'pts',
  }));
  return selected.length >= 2 ? selected : BASE_STACK;
}

function RecommendedCard({ card }) {
  return (
    <div style={{ position: 'relative', marginTop: '24px' }}>
      <div style={{
        position: 'absolute', top: '-13px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '100px', padding: '4px 12px',
        whiteSpace: 'nowrap', zIndex: 10,
        animation: 'badgePop 0.42s cubic-bezier(0.34,1.56,0.64,1) 0.18s both',
      }}>
        <span style={{ fontSize: '11px', fontWeight: '600', color: 'rgba(255,255,255,0.65)' }}>Best for this merchant</span>
      </div>

      <div style={{
        width: '100%', aspectRatio: '1.586', borderRadius: '14px',
        background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 24px 60px ${card.grad[1]}50, 0 4px 16px rgba(0,0,0,0.5)`,
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

function PeekCard({ card, index, onTap }) {
  const scales    = [0.975, 0.952, 0.930];
  const opacities = [0.70,  0.48,  0.32];
  return (
    <button
      onClick={() => onTap(index)}
      style={{
        display: 'block', width: '100%', border: 'none', padding: 0,
        cursor: 'pointer', background: 'none',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div className="anim-fade-up" style={{
        animationDelay: `${180 + index * 70}ms`,
        height: '50px', borderRadius: '12px 12px 0 0',
        background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
        position: 'relative', overflow: 'hidden',
        opacity: opacities[index] ?? 0.32,
        transform: `scaleX(${scales[index] ?? 0.93})`,
        transformOrigin: 'top center', marginTop: '-2px',
        filter: 'saturate(0.6)', boxShadow: '0 -2px 8px rgba(0,0,0,0.2)',
        transition: 'opacity 0.15s ease',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '0 14px', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.85)' }}>{card.name}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', background: 'rgba(0,0,0,0.25)', borderRadius: '6px', padding: '1px 6px' }}>{card.reward} {card.rewardLabel}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)' }}>tap to use</span>
            <NetworkBadge network={card.network} muted />
          </div>
        </div>
      </div>
    </button>
  );
}

function ConfirmModal({ card, onConfirm, onCancel }) {
  return (
    <>
      <div onClick={onCancel} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        background: '#141414', borderRadius: '28px 28px 0 0',
        animation: 'sheetSlideUp 0.46s cubic-bezier(0.32,0.72,0,1) forwards',
        boxShadow: '0 -6px 40px rgba(0,0,0,0.6)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderBottom: 'none',
        zIndex: 40,
        fontFamily: FF,
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
          <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
        </div>
        <div style={{ padding: '14px 20px 36px' }}>
          <p style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', margin: '0 0 18px', textAlign: 'center', letterSpacing: '-0.3px' }}>
            Confirm Payment
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', padding: '14px 16px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{
              width: '76px', height: '48px', borderRadius: '9px', flexShrink: 0,
              background: `linear-gradient(135deg, ${card.grad[0]}, ${card.grad[1]})`,
              boxShadow: `0 5px 16px ${card.grad[1]}40`,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 55%)' }} />
              <div style={{ position: 'absolute', top: '8px', left: '8px', width: '14px', height: '11px', borderRadius: '2px', background: `linear-gradient(135deg, ${card.chip}, ${card.chip}99)` }}>
                <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
              </div>
              <div style={{ position: 'absolute', bottom: '5px', right: '7px' }}>
                <NetworkBadge network={card.network} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', margin: 0 }}>{card.name}</p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', margin: '3px 0 0' }}>
                {card.reward} {card.rewardLabel}
              </p>
            </div>
          </div>
          <button
            onClick={onConfirm}
            className="btn-press"
            style={{
              width: '100%', padding: '16px', borderRadius: '100px', border: 'none', fontFamily: FF,
              background: 'rgba(255,255,255,0.92)',
              color: '#080808', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginBottom: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="#080808" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Confirm Payment
          </button>
          <button
            onClick={onCancel}
            className="btn-press"
            style={{ width: '100%', padding: '16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', fontFamily: FF, background: 'transparent', color: 'rgba(255,255,255,0.55)', fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}
          >
            Choose a Different Card
          </button>
        </div>
      </div>
    </>
  );
}

export default function WalletScreen({ onContinue, onBack, selectedCards }) {
  const stack = buildStack(selectedCards);
  const [topIndex, setTopIndex] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);

  const orderedStack = [
    stack[topIndex],
    ...stack.filter((_, i) => i !== topIndex),
  ].filter(Boolean);

  const top  = orderedStack[0];
  const rest = orderedStack.slice(1);

  function handlePeekTap(peekIndex) {
    const card = rest[peekIndex];
    const absIndex = stack.findIndex(c => c.id === card.id);
    setTopIndex(absIndex);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', position: 'relative', fontFamily: FF }}>
      <StatusBar dark />

      {/* Nav */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '4px 24px 0', position: 'relative' }}>
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
            <path d="M7 1L1 7L7 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: '14px', fontWeight: '600', color: 'rgba(255,255,255,0.8)', letterSpacing: '-0.2px' }}>Choose Card</span>
      </div>

      {/* Merchant pill */}
      <div className="anim-fade-up" style={{ padding: '10px 24px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#141414', borderRadius: '100px', padding: '6px 14px',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <span style={{ fontSize: '12px', fontWeight: '500', color: 'rgba(255,255,255,0.6)' }}>Dining &amp; Food</span>
          <div style={{ width: '1px', height: '10px', background: 'rgba(255,255,255,0.12)' }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>{stack.length} cards</span>
        </div>
      </div>

      <div style={{ flex: 1, padding: '6px 24px 0', overflowY: 'hidden' }}>
        <RecommendedCard card={top} />
        <div style={{ marginTop: '8px' }}>
          {rest.map((card, i) => (
            <PeekCard key={card.id} card={card} index={i} onTap={handlePeekTap} />
          ))}
          {rest.length > 0 && (
            <div style={{
              height: '14px',
              background: `linear-gradient(135deg, ${rest[rest.length - 1]?.grad[0] ?? '#999'}, ${rest[rest.length - 1]?.grad[1] ?? '#ccc'})`,
              borderRadius: '0 0 12px 12px', opacity: 0.2, filter: 'saturate(0.5)',
              transform: 'scaleX(0.91)', transformOrigin: 'top center',
            }} />
          )}
        </div>

        <div className="anim-fade-up" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginTop: '12px', animationDelay: '420ms' }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1"/>
            <path d="M6 5v3.5M6 4h.01" stroke="rgba(255,255,255,0.2)" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)' }}>Tap any card below to use it instead</span>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ padding: '10px 24px 28px', background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderTop: '0.5px solid rgba(255,255,255,0.07)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '10px' }}>
          <div style={{ width: '28px', height: '18px', borderRadius: '4px', background: `linear-gradient(135deg, ${top.grad[0]}, ${top.grad[1]})`, flexShrink: 0 }} />
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            <strong style={{ color: '#FFFFFF' }}>{top.name}</strong> · {top.reward} {top.rewardLabel}
          </span>
        </div>
        <button
          onClick={() => setShowConfirm(true)}
          className="btn-press"
          style={{
            width: '100%', padding: '16px', borderRadius: '100px', border: 'none',
            fontFamily: FF, fontSize: '16px', fontWeight: '700', cursor: 'pointer',
            background: 'rgba(255,255,255,0.92)',
            color: '#080808',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
          }}
        >
          Pay with {top.name}
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M3 9h12M10 5l4 4-4 4" stroke="#080808" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
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
