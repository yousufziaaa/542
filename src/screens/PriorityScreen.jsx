import { useState } from 'react';
import StatusBar from '../components/StatusBar';

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif";

const OPTIONS = [
  {
    id: 'cashback',
    label: 'Maximize Cashback',
    subtitle: 'Most money back on every purchase',
    emoji: '💵',
  },
  {
    id: 'travel',
    label: 'Maximize Travel Points',
    subtitle: 'Earn miles and perks for flights & hotels',
    emoji: '✈️',
  },
  {
    id: 'rewards',
    label: 'Maximize Rewards Points',
    subtitle: 'Accumulate points redeemable for anything',
    emoji: '⭐',
  },
  {
    id: 'none',
    label: 'No Preference',
    subtitle: 'Show best overall card for each purchase',
    emoji: '⚖️',
  },
];

export default function PriorityScreen({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#080808', fontFamily: FF }}>
      <StatusBar dark />

      {/* Back */}
      <div style={{ padding: '2px 24px 0' }}>
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
      </div>

      {/* Header */}
      <div className="anim-fade-up" style={{ padding: '20px 24px 8px' }}>
        <p style={{ fontSize: '10px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 14px' }}>
          Step 2 of 2
        </p>
        <h1 style={{
          fontSize: '34px', fontWeight: '800', color: '#FFFFFF',
          lineHeight: 1.1, margin: '0 0 10px', letterSpacing: '-0.8px',
        }}>
          What matters{'\n'}most to you?
        </h1>
        <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.4 }}>
          We'll rank your cards based on this at checkout.
        </p>
      </div>

      {/* Options */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {OPTIONS.map((opt, i) => {
            const isSel = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className="anim-fade-up"
                style={{
                  animationDelay: `${i * 50}ms`,
                  border: 'none', background: 'none', padding: 0,
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{
                  background: isSel ? 'rgba(255,255,255,0.92)' : '#141414',
                  borderRadius: '16px',
                  padding: '16px 18px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  transition: 'all 0.22s cubic-bezier(0.25,0.46,0.45,0.94)',
                  border: isSel ? '1px solid rgba(255,255,255,0.9)' : '1px solid rgba(255,255,255,0.09)',
                }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: isSel ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                  }}>
                    {opt.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '15px', fontWeight: '700',
                      color: isSel ? '#080808' : '#FFFFFF',
                      margin: 0, lineHeight: 1.3,
                      transition: 'color 0.22s ease',
                    }}>{opt.label}</p>
                    <p style={{
                      fontSize: '12px',
                      color: isSel ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.4)',
                      marginTop: '3px', lineHeight: 1.3,
                      transition: 'color 0.22s ease',
                    }}>{opt.subtitle}</p>
                  </div>
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: isSel ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                    background: isSel ? '#080808' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}>
                    {isSel && (
                      <svg className="anim-pop-in" width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 3.8L3.8 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        padding: '12px 24px 28px',
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '0.5px solid rgba(255,255,255,0.07)',
      }}>
        <button
          onClick={selected ? () => onContinue(selected) : undefined}
          className="btn-press"
          style={{
            width: '100%', padding: '16px', borderRadius: '100px',
            border: 'none', fontFamily: FF, fontSize: '16px', fontWeight: '700',
            cursor: selected ? 'pointer' : 'default',
            transition: 'all 0.25s ease',
            background: selected ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.1)',
            color: selected ? '#080808' : 'rgba(255,255,255,0.25)',
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
