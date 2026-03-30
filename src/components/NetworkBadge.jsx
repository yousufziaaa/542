/**
 * NetworkBadge — real brand mark for each network.
 * muted=true dims the logo for de-emphasized (peek) cards.
 */
export default function NetworkBadge({ network, muted = false }) {
  const op = muted ? 0.42 : 0.92;

  /* ── Visa wordmark ── */
  if (network === 'VISA') {
    const c = `rgba(255,255,255,${op})`;
    return (
      <svg width="34" height="11" viewBox="0 0 34 11" fill="none">
        {/* V — filled polygon */}
        <path d="M0 0.5H2.5L5 8L7.5 0.5H10L6.4 10.5H3.6Z" fill={c} />
        {/* I — filled rect */}
        <rect x="11.5" y="0.5" width="2.4" height="10" rx="1" fill={c} />
        {/* S — stroked open path */}
        <path
          d="M15.5 2.6 Q15.5 0.5 18 0.5 L21.5 0.5 Q24 0.5 24 2.6 L24 3.9
             Q24 5.6 21.5 5.6 L19 5.6 Q16.5 5.6 16.5 7.6 L16.5 8.6
             Q16.5 10.5 19 10.5 L22.5 10.5 Q24.5 10.5 24.5 8.6"
          stroke={c} strokeWidth="2.1" strokeLinecap="round" fill="none"
        />
        {/* A — two strokes + crossbar */}
        <path d="M26.5 10.5L29.5 0.5L32.5 10.5"
          stroke={c} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="27.5" y1="7" x2="31.5" y2="7"
          stroke={c} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    );
  }

  /* ── Mastercard overlapping circles ── */
  if (network === 'MC') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', width: '26px', height: '16px', position: 'relative' }}>
        <div style={{
          position: 'absolute', left: 0,
          width: '16px', height: '16px', borderRadius: '50%',
          background: `rgba(235,0,27,${op})`,
        }} />
        <div style={{
          position: 'absolute', left: '10px',
          width: '16px', height: '16px', borderRadius: '50%',
          background: `rgba(247,158,27,${op})`,
        }} />
      </div>
    );
  }

  /* ── Amex — bordered badge ── */
  return (
    <div style={{
      border: `1px solid rgba(255,255,255,${op * 0.75})`,
      borderRadius: '2px',
      padding: '1px 4px',
      display: 'inline-block',
    }}>
      <span style={{
        display: 'block',
        fontSize: '7px', fontWeight: 900,
        color: `rgba(255,255,255,${op})`,
        letterSpacing: '0.18em',
        lineHeight: 1.2,
        fontFamily: 'inherit',
      }}>
        AMEX
      </span>
    </div>
  );
}
