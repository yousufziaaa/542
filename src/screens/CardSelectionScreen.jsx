import { useState, useCallback } from 'react';
import { CARDS } from '../data/cards';
import StatusBar from '../components/StatusBar';
import CardTile from '../components/CardTile';

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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F2F7' }}>
      <StatusBar />

      {/* Header */}
      <div style={{ padding: '8px 18px 6px' }} className="anim-fade-up">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
          <div style={{
            width: '26px', height: '26px', borderRadius: '7px',
            background: 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,122,255,0.32)',
          }}>
            <svg width="13" height="11" viewBox="0 0 13 11" fill="none">
              <rect x="0.75" y="2.5" width="11.5" height="8" rx="1.6" stroke="white" strokeWidth="1.3" />
              <path d="M0.75 5.5h11.5" stroke="white" strokeWidth="1.3" />
              <rect x="2.5" y="7.2" width="3.5" height="1.2" rx="0.6" fill="white" />
            </svg>
          </div>
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#8E8E93', letterSpacing: '0.07em' }}>
            CARDSMART
          </span>
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1C1C1E', lineHeight: '1.2', margin: 0 }}>
          Add Your Cards
        </h1>
        <p style={{ fontSize: '13px', color: '#8E8E93', marginTop: '4px', lineHeight: '1.4' }}>
          Select all the credit &amp; debit cards in your wallet
        </p>
      </div>

      {/* Count row */}
      <div style={{
        padding: '4px 18px 10px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontSize: '11px', color: '#AEAEB2' }}>{CARDS.length} cards available</span>
        <div style={{
          padding: '3px 10px', borderRadius: '20px',
          background: selected.size > 0 ? '#007AFF' : '#E5E5EA',
          transition: 'background 0.3s ease',
        }}>
          <span style={{
            fontSize: '11px', fontWeight: '600',
            color: selected.size > 0 ? 'white' : '#8E8E93',
            transition: 'color 0.3s ease',
          }}>
            {selected.size} selected
          </span>
        </div>
      </div>

      {/* Card grid */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '0 12px 8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {CARDS.map((card, i) => (
            <CardTile
              key={card.id}
              card={card}
              selected={selected.has(card.id)}
              onToggle={toggle}
              delay={i * 32}
            />
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '10px 16px 28px',
        background: 'rgba(242,242,247,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '0.5px solid rgba(60,60,67,0.1)',
      }}>
        <p style={{
          fontSize: '11px', color: '#8E8E93', textAlign: 'center',
          marginBottom: '8px', minHeight: '16px',
          opacity: canContinue ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}>
          {remaining > 0 ? `Select ${remaining} more card${remaining > 1 ? 's' : ''} to continue` : ''}
        </p>
        <button
          onClick={canContinue ? () => onContinue(selected) : undefined}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            border: 'none', fontFamily: 'inherit', fontSize: '15px', fontWeight: '600',
            cursor: canContinue ? 'pointer' : 'default',
            transition: 'all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
            background: canContinue
              ? 'linear-gradient(135deg, #007AFF 0%, #0060CC 100%)'
              : '#C7C7CC',
            color: 'white',
            boxShadow: canContinue ? '0 4px 18px rgba(0,122,255,0.38)' : 'none',
          }}
        >
          {canContinue ? `Continue with ${selected.size} cards` : 'Continue'}
        </button>
      </div>
    </div>
  );
}
