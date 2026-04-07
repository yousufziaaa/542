import { useState, useCallback } from 'react';
import { CARDS } from '../data/cards';
import StatusBar from '../components/StatusBar';
import CardTile from '../components/CardTile';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

export default function CardSelectionScreen({ onContinue }) {
  const [selected, setSelected] = useState(new Set());

  const toggle = useCallback((id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const canContinue = selected.size >= 2;
  const remaining   = Math.max(0, 2 - selected.size);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ padding: '4px 24px 0' }} className="anim-fade-up">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
          <div style={{
            width: '22px', height: '22px', borderRadius: '6px',
            background: 'linear-gradient(135deg, #4DA6FF 0%, #6B5CE7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="11" height="10" viewBox="0 0 13 11" fill="none">
              <rect x="0.75" y="2.5" width="11.5" height="8" rx="1.6" stroke="white" strokeWidth="1.3" />
              <path d="M0.75 5.5h11.5" stroke="white" strokeWidth="1.3" />
            </svg>
          </div>
          <span style={{ fontSize: '10px', fontWeight: '600', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            CardSmart
          </span>
        </div>

        <h1 style={{ fontSize: '26px', fontWeight: '600', color: '#FFFFFF', lineHeight: 1.15, margin: '0 0 8px', letterSpacing: '-0.5px' }}>
          Which cards are in your wallet?
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', margin: '0 0 8px', lineHeight: 1.4 }}>
          Pick at least 2 — we'll rank them for every purchase.
        </p>
      </div>

      {/* Count row */}
      <div style={{ padding: '4px 24px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.04em' }}>
          {CARDS.length} cards available
        </span>
        <div style={{
          padding: '3px 10px', borderRadius: '100px',
          background: selected.size > 0 ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.25s ease',
        }}>
          <span style={{ fontSize: '11px', fontWeight: '600', color: selected.size > 0 ? '#FFFFFF' : 'rgba(255,255,255,0.3)' }}>
            {selected.size} selected
          </span>
        </div>
      </div>

      {/* Card grid */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 16px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {CARDS.map((card, i) => (
            <CardTile
              key={card.id}
              card={card}
              selected={selected.has(card.id)}
              onToggle={toggle}
              delay={i * 28}
            />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '10px 24px 28px',
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
      }}>
        <p style={{
          fontSize: '13px', color: 'rgba(255,255,255,0.35)', textAlign: 'center',
          marginBottom: '10px', minHeight: '18px',
          opacity: canContinue ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}>
          {remaining > 0 ? `Select ${remaining} more card${remaining > 1 ? 's' : ''} to continue` : ''}
        </p>
        <button
          onClick={canContinue ? () => onContinue(selected) : undefined}
          className="btn-press"
          style={{
            width: '100%', padding: '16px', borderRadius: '100px',
            border: 'none', fontFamily: FF, fontSize: '16px', fontWeight: '700',
            cursor: canContinue ? 'pointer' : 'default',
            transition: 'all 0.25s ease',
            background: canContinue ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.12)',
            color: canContinue ? '#080808' : 'rgba(255,255,255,0.3)',
          }}
        >
          {canContinue ? `Continue with ${selected.size} cards` : 'Continue'}
        </button>
      </div>
    </div>
  );
}
