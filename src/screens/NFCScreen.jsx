import { useState, useEffect, useRef } from 'react';
import NetworkBadge from '../components/NetworkBadge';

const CARD = {
  name: 'Amex Cobalt',
  bank: 'American Express',
  grad: ['#0E2A6E', '#1B5FCC'],
  chip: '#F0C84A',
  reward: '5×',
  category: 'Dining & Food',
  network: 'AMEX',
};

function DarkStatusBar() {
  const c = 'rgba(255,255,255,0.88)';
  return (
    <div style={{
      height: '40px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px', paddingTop: '8px',
    }}>
      <span style={{ fontSize: '13px', fontWeight: '600', color: c }}>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <svg width="16" height="11" viewBox="0 0 16 11" fill={c}>
          <rect x="0"    y="6.5" width="2.5" height="4.5" rx="0.6" />
          <rect x="4.5"  y="4"   width="2.5" height="7"   rx="0.6" />
          <rect x="9"    y="1.8" width="2.5" height="9.2" rx="0.6" />
          <rect x="13.5" y="0"   width="2.5" height="11"  rx="0.6" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <circle cx="7.5" cy="9.5" r="1.4" fill={c} />
          <path d="M4 6.8A4.6 4.6 0 0 1 7.5 5.5a4.6 4.6 0 0 1 3.5 1.3"
            stroke={c} strokeWidth="1.3" strokeLinecap="round" />
          <path d="M1.5 4A8.8 8.8 0 0 1 7.5 1.8a8.8 8.8 0 0 1 6 2.2"
            stroke={c} strokeWidth="1.3" strokeLinecap="round" opacity="0.45" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
          <rect x="0.5" y="0.5" width="20" height="10" rx="3" stroke={c} strokeOpacity="0.5" />
          <rect x="2" y="2" width="15" height="7" rx="1.5" fill={c} />
          <path d="M22 3.5v4a1.8 1.8 0 0 0 0-4z" fill={c} fillOpacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function NFCRings() {
  return (
    <div style={{
      position: 'relative', width: '190px', height: '190px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{
        position: 'absolute', width: '190px', height: '190px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(56,182,255,0.12) 0%, transparent 70%)',
        animation: 'glowPulse 2.4s ease-in-out infinite',
      }} />
      {[0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute', width: '88px', height: '88px', borderRadius: '50%',
          border: '1.5px solid rgba(56,182,255,0.5)',
          animation: `nfcRing 2.2s cubic-bezier(0.2,0.6,0.4,1) ${i * 0.52}s infinite`,
        }} />
      ))}
      <div style={{
        width: '76px', height: '76px', borderRadius: '50%',
        background: 'radial-gradient(circle at 38% 38%, rgba(56,182,255,0.2), rgba(14,42,110,0.5))',
        border: '1.5px solid rgba(56,182,255,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
        boxShadow: '0 0 28px rgba(56,182,255,0.18), inset 0 1px 1px rgba(255,255,255,0.1)',
      }}>
        <svg width="36" height="32" viewBox="0 0 40 36" fill="none">
          <rect x="4" y="9" width="18" height="18" rx="2.5"
            stroke="rgba(255,255,255,0.9)" strokeWidth="1.6" fill="none" />
          <rect x="8" y="14" width="6" height="5" rx="1" fill="rgba(240,200,74,0.85)" />
          <path d="M27 14a8 8 0 0 1 0 8" stroke="rgba(56,182,255,0.95)" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 10.5a13.5 13.5 0 0 1 0 15" stroke="rgba(56,182,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          <path d="M35 7a19 19 0 0 1 0 22" stroke="rgba(56,182,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

function SheetCard() {
  return (
    <div style={{
      width: '80px', height: '50px', borderRadius: '8px', flexShrink: 0,
      background: `linear-gradient(135deg, ${CARD.grad[0]}, ${CARD.grad[1]})`,
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 5px 16px rgba(14,42,110,0.4)',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 55%)',
      }} />
      <div style={{
        position: 'absolute', top: '8px', left: '8px',
        width: '14px', height: '11px', borderRadius: '2px',
        background: `linear-gradient(135deg, ${CARD.chip}, ${CARD.chip}99)`,
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
      </div>
      <div style={{ position: 'absolute', bottom: '6px', right: '7px' }}>
        <NetworkBadge network={CARD.network} />
      </div>
    </div>
  );
}

export default function NFCScreen({ onContinue }) {
  const [phase, setPhase] = useState('scanning');
  const timers = useRef([]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'), 1500);
    const t2 = setTimeout(() => setPhase('found'),  1850);
    timers.current = [t1, t2];
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const triggerError = () => {
    timers.current.forEach(clearTimeout);
    setPhase('error');
  };

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: 'linear-gradient(170deg, #0C1A3A 0%, #07101F 55%, #040C18 100%)',
      position: 'relative', overflow: 'hidden',
    }}>
      {[[18,12],[72,8],[88,28],[35,22],[60,18],[25,35]].map(([x,y], i) => (
        <div key={i} style={{
          position: 'absolute', left: `${x}%`, top: `${y}%`,
          width: '2px', height: '2px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)', pointerEvents: 'none',
        }} />
      ))}

      <DarkStatusBar />

      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 24px 80px',
        transition: 'opacity 0.4s ease',
        opacity: phase === 'found' ? 0.12 : 1,
      }}>
        <NFCRings />
        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <p style={{
            fontSize: '19px', fontWeight: '600', margin: 0,
            color: phase === 'scanning' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.45)',
            transition: 'color 0.4s ease', letterSpacing: '-0.2px',
          }}>
            {phase === 'scanning' ? 'Detecting merchant\u2026' : 'Merchant found'}
          </p>
          <p style={{
            fontSize: '13px', color: 'rgba(255,255,255,0.35)',
            marginTop: '6px', transition: 'opacity 0.3s ease',
            opacity: phase === 'scanning' ? 1 : 0,
          }}>
            Hold your phone near the terminal
          </p>
        </div>
        {phase === 'scanning' && (
          <>
            <div style={{ display: 'flex', gap: '6px', marginTop: '22px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: 'rgba(56,182,255,0.7)',
                  animation: `dotBounce 1.3s ease-in-out ${i * 0.18}s infinite`,
                }} />
              ))}
            </div>
            <button
              onClick={triggerError}
              style={{
                marginTop: '28px', background: 'none', border: 'none',
                color: 'rgba(255,255,255,0.28)', fontSize: '13px',
                cursor: 'pointer', fontFamily: 'inherit', padding: '4px 8px',
                letterSpacing: '0.01em',
              }}
            >
              Can&apos;t detect?
            </button>
          </>
        )}
      </div>

      {phase === 'flash' && (
        <div style={{
          position: 'absolute', inset: 0, backgroundColor: 'white',
          animation: 'flashPulse 0.35s ease-out forwards',
          zIndex: 60, pointerEvents: 'none',
        }} />
      )}

      {phase === 'error' && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: '#141414', borderRadius: '28px 28px 0 0',
            animation: 'sheetSlideUp 0.46s cubic-bezier(0.32,0.72,0,1) forwards',
            boxShadow: '0 -6px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none',
            zIndex: 40,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '4px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
            </div>

            <div style={{ padding: '20px 24px 40px', textAlign: 'center' }}>
              <div style={{
                width: '68px', height: '68px', borderRadius: '50%',
                background: 'rgba(255,149,0,0.1)',
                border: '1px solid rgba(255,149,0,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 18px',
              }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    fill="rgba(255,149,0,0.15)" stroke="#FF9500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 9v4" stroke="#FF9500" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="17" r="0.8" fill="#FF9500" stroke="#FF9500" strokeWidth="0.5"/>
                </svg>
              </div>

              <h2 style={{
                fontSize: '20px', fontWeight: '800', color: '#FFFFFF',
                margin: '0 0 8px', letterSpacing: '-0.4px',
              }}>
                Merchant Not Detected
              </h2>
              <p style={{
                fontSize: '14px', color: 'rgba(255,255,255,0.4)',
                margin: '0 0 28px', lineHeight: 1.55,
              }}>
                We couldn&apos;t identify this merchant automatically
              </p>

              <button
                onClick={onContinue}
                style={{
                  width: '100%', padding: '16px', borderRadius: '100px',
                  border: 'none', fontFamily: 'inherit',
                  background: 'rgba(255,255,255,0.92)',
                  color: '#080808', fontSize: '16px', fontWeight: '700',
                  cursor: 'pointer', marginBottom: '10px',
                }}
              >
                Enter Merchant Manually
              </button>

              <button
                onClick={onContinue}
                style={{
                  background: 'none', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'inherit',
                  color: 'rgba(255,255,255,0.45)', fontSize: '15px', fontWeight: '500',
                  cursor: 'pointer', padding: '14px 8px',
                  width: '100%', borderRadius: '100px',
                }}
              >
                Skip and choose a card
              </button>
            </div>
          </div>
        </>
      )}

      {phase === 'found' && (
        <>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 30 }} />
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            background: '#141414', borderRadius: '28px 28px 0 0',
            animation: 'sheetSlideUp 0.46s cubic-bezier(0.32,0.72,0,1) forwards',
            boxShadow: '0 -6px 40px rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none',
            zIndex: 40,
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '12px', paddingBottom: '2px' }}>
              <div style={{ width: '32px', height: '4px', borderRadius: '2px', background: 'rgba(255,255,255,0.15)' }} />
            </div>
            <div style={{ padding: '14px 20px 32px', animation: 'sheetContentFade 0.36s ease 0.1s both' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '14px' }}>
                <div style={{
                  width: '7px', height: '7px', borderRadius: '50%', background: '#34D058',
                  boxShadow: '0 0 0 3px rgba(52,208,88,0.18)',
                  animation: 'glowPulse 1.8s ease-in-out infinite',
                }} />
                <span style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Best Card for This Merchant
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <div style={{ animation: 'successBadge 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.15s both' }}>
                  <SheetCard />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF', margin: 0, lineHeight: 1.15, letterSpacing: '-0.4px' }}>
                    {CARD.name}
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>{CARD.bank}</p>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '7px',
                    background: 'linear-gradient(135deg, #0E2A6E, #1B5FCC)',
                    borderRadius: '100px', padding: '4px 10px',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: 'white' }}>{CARD.reward}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', fontWeight: '500' }}>{CARD.category}</span>
                  </div>
                </div>
              </div>

              <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.06)', marginBottom: '14px' }} />

              <div style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: '14px',
                padding: '12px 14px', display: 'flex', alignItems: 'center',
                gap: '10px', marginBottom: '18px',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <div style={{
                  width: '30px', height: '30px', borderRadius: '8px', flexShrink: 0,
                  background: 'rgba(52,208,88,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 13V3M3 8l5-5 5 5" stroke="#34D058" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, lineHeight: 1.45 }}>
                  Earns <strong style={{ color: '#FFFFFF' }}>5×</strong> points here —{' '}
                  <strong style={{ color: '#FFFFFF' }}>5× better</strong> than your next best card
                </p>
              </div>

              <button
                onClick={onContinue}
                className="btn-press"
                style={{
                  width: '100%', padding: '16px', borderRadius: '100px',
                  border: 'none', fontFamily: 'inherit',
                  fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                  background: 'rgba(255,255,255,0.92)',
                  color: '#080808',
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
