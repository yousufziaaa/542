import NetworkBadge from './NetworkBadge';

export default function MiniCard({ card, selected }) {
  return (
    <div style={{
      width: '100%',
      aspectRatio: '1.586',
      borderRadius: '8px',
      background: `linear-gradient(135deg, ${card.grad[0]} 0%, ${card.grad[1]} 100%)`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'transform 0.2s ease',
      transform: selected ? 'scale(0.97)' : 'scale(1)',
      boxShadow: '0 3px 10px rgba(0,0,0,0.28)',
    }}>
      {/* Glass sheen */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(145deg, rgba(255,255,255,0.22) 0%, transparent 50%)',
      }} />

      {/* EMV chip */}
      <div style={{
        position: 'absolute', top: '20%', left: '11%',
        width: '18px', height: '14px', borderRadius: '3px',
        background: `linear-gradient(135deg, ${card.chip} 0%, ${card.chip}99 100%)`,
        boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.18)',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateY(-50%)' }} />
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', background: 'rgba(0,0,0,0.2)', transform: 'translateX(-50%)' }} />
      </div>

      {/* Contactless ripples */}
      <div style={{ position: 'absolute', bottom: '24%', right: '13%', opacity: 0.5 }}>
        {[9, 6, 3].map((r, i) => (
          <div key={i} style={{
            position: 'absolute', bottom: 0, right: 0,
            width: `${r}px`, height: `${r * 1.4}px`,
            border: '1px solid rgba(255,255,255,0.82)',
            borderRadius: `0 ${r}px ${r}px 0`,
            borderLeft: 'none',
            marginRight: `${i * 4}px`,
          }} />
        ))}
      </div>

      {/* Network badge */}
      <div style={{ position: 'absolute', bottom: '10%', right: '9%' }}>
        <NetworkBadge network={card.network} />
      </div>
    </div>
  );
}
