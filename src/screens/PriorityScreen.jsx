import { useState } from 'react';
import StatusBar from '../components/StatusBar';

const OPTIONS = [
  {
    id: 'cashback',
    label: 'Maximize Cashback',
    subtitle: 'Most money back on every purchase',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 5.5v9M8 7.5c0-.9.7-1.5 1.6-1.5H11a1.5 1.5 0 0 1 0 3H8.5a1.5 1.5 0 0 0 0 3H11a1.5 1.5 0 0 0 1.5-1.5"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#34C759',
    accentBg: '#F0FFF4',
  },
  {
    id: 'travel',
    label: 'Maximize Travel Points',
    subtitle: 'Earn miles and perks for flights & hotels',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2.5 12.5l2-2 3 1.2 4.2-6 1.5.4-2.7 6.5 3-.8 1.2 1.2-4.5 1.5-1.5-1.2-2.3.4L2.5 12.5Z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2.5 15.5h15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#007AFF',
    accentBg: '#F0F7FF',
  },
  {
    id: 'rewards',
    label: 'Maximize Rewards Points',
    subtitle: 'Accumulate points redeemable for anything',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2.5l2 4.5 4.8.4-3.6 3.2 1.2 4.8L10 13l-4.4 2.4 1.2-4.8L3.2 7.4 8 7l2-4.5Z"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accentColor: '#FF9500',
    accentBg: '#FFF8EE',
  },
  {
    id: 'none',
    label: 'No Preference',
    subtitle: 'Show best overall card for each purchase',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accentColor: '#8E8E93',
    accentBg: '#F5F5F5',
  },
];

export default function PriorityScreen({ onBack, onContinue }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#F2F2F7' }}>
      <StatusBar />

      {/* Back */}
      <div style={{ padding: '2px 16px 0' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', color: '#007AFF',
            fontSize: '15px', cursor: 'pointer', padding: '6px 0',
            fontFamily: 'inherit',
          }}
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#007AFF" strokeWidth="1.8"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </button>
      </div>

      {/* Header */}
      <div className="anim-fade-up" style={{ padding: '8px 18px 4px' }}>
        {/* Step bar */}
        <div style={{ display: 'flex', gap: '5px', marginBottom: '14px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              height: '3px', borderRadius: '2px', flex: 1,
              background: s <= 2 ? '#007AFF' : '#D1D1D6',
              opacity: s === 2 ? 1 : s === 1 ? 0.4 : 1,
            }} />
          ))}
        </div>
        <p style={{ fontSize: '11px', fontWeight: '600', color: '#8E8E93', letterSpacing: '0.05em', marginBottom: '6px' }}>
          STEP 2 OF 3
        </p>
        <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#1C1C1E', lineHeight: '1.2', margin: 0 }}>
          What's your priority?
        </h1>
        <p style={{ fontSize: '13px', color: '#8E8E93', marginTop: '4px', lineHeight: '1.4' }}>
          We'll use this to rank your cards at checkout
        </p>
      </div>

      {/* Options */}
      <div className="no-scroll" style={{ flex: 1, overflowY: 'auto', padding: '8px 12px 4px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {OPTIONS.map((opt, i) => {
            const isSel = selected === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setSelected(opt.id)}
                className="anim-fade-up"
                style={{
                  animationDelay: `${i * 45}ms`,
                  border: 'none', background: 'none', padding: 0,
                  cursor: 'pointer', width: '100%', textAlign: 'left',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{
                  background: isSel ? opt.accentBg : 'white',
                  borderRadius: '12px',
                  padding: '14px 14px',
                  display: 'flex', alignItems: 'center', gap: '12px',
                  transition: 'all 0.2s cubic-bezier(0.25,0.46,0.45,0.94)',
                  boxShadow: isSel
                    ? `0 0 0 1.5px ${opt.accentColor}, 0 4px 16px ${opt.accentColor}22`
                    : '0 1px 8px rgba(0,0,0,0.07)',
                  transform: isSel ? 'translateY(-1px)' : 'translateY(0)',
                }}>
                  {/* Icon */}
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
                    background: isSel ? opt.accentColor : '#F2F2F7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    color: isSel ? 'white' : opt.accentColor,
                    boxShadow: isSel ? `0 3px 10px ${opt.accentColor}38` : 'none',
                  }}>
                    {opt.icon}
                  </div>

                  {/* Text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontSize: '14px', fontWeight: '600', color: '#1C1C1E',
                      margin: 0, lineHeight: '1.3',
                    }}>{opt.label}</p>
                    <p style={{
                      fontSize: '12px', color: isSel ? '#3C3C43' : '#8E8E93',
                      marginTop: '2px', lineHeight: '1.3',
                      transition: 'color 0.2s ease',
                    }}>{opt.subtitle}</p>
                  </div>

                  {/* Radio dot */}
                  <div style={{
                    width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                    border: isSel ? 'none' : '1.5px solid #D1D1D6',
                    backgroundColor: isSel ? opt.accentColor : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
                  }}>
                    {isSel && (
                      <div className="anim-pop-in" style={{
                        width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'white',
                      }} />
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
        padding: '10px 16px 28px',
        background: 'rgba(242,242,247,0.96)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderTop: '0.5px solid rgba(60,60,67,0.1)',
      }}>
        <button
          onClick={selected ? () => onContinue(selected) : undefined}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px',
            border: 'none', fontFamily: 'inherit', fontSize: '15px', fontWeight: '600',
            cursor: selected ? 'pointer' : 'default',
            transition: 'all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
            background: selected
              ? 'linear-gradient(135deg, #007AFF 0%, #0060CC 100%)'
              : '#C7C7CC',
            color: 'white',
            boxShadow: selected ? '0 4px 18px rgba(0,122,255,0.38)' : 'none',
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
