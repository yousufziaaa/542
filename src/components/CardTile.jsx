import MiniCard from './MiniCard';

export default function CardTile({ card, selected, onToggle, delay }) {
  return (
    <button
      onClick={() => onToggle(card.id)}
      className="anim-fade-up"
      style={{
        animationDelay: `${delay}ms`,
        border: 'none', background: 'none', padding: 0,
        cursor: 'pointer', width: '100%', textAlign: 'left',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <div style={{
        background: selected ? 'rgba(255,255,255,0.06)' : '#141414',
        borderRadius: '14px',
        padding: '10px 10px 12px',
        position: 'relative',
        transition: 'all 0.2s ease',
        border: selected
          ? '1.5px solid rgba(255,255,255,0.7)'
          : '1px solid rgba(255,255,255,0.08)',
        transform: selected ? 'translateY(-1px)' : 'translateY(0)',
      }}>
        {/* Selection circle */}
        <div style={{
          position: 'absolute', top: '8px', right: '8px',
          width: '18px', height: '18px', borderRadius: '50%',
          backgroundColor: selected ? '#FFFFFF' : 'transparent',
          border: selected ? 'none' : '1.5px solid rgba(255,255,255,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.18s cubic-bezier(0.34,1.56,0.64,1)',
          zIndex: 2,
        }}>
          {selected && (
            <svg className="anim-pop-in" width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.2L3.5 5.8L8 1" stroke="#080808"
                strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        <MiniCard card={card} selected={selected} />

        <div style={{ marginTop: '8px', paddingLeft: '1px' }}>
          <p style={{
            fontSize: '11px', fontWeight: '600',
            color: '#FFFFFF', lineHeight: '1.3', margin: 0,
          }}>{card.name}</p>
          <p style={{
            fontSize: '10px', color: 'rgba(255,255,255,0.4)',
            fontWeight: '400', marginTop: '1px',
          }}>{card.bank}</p>
        </div>
      </div>
    </button>
  );
}
