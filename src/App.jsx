import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import WalletTabScreen from './screens/WalletTabScreen';
import SettingsTabScreen from './screens/SettingsTabScreen';
import CardSelectionScreen from './screens/CardSelectionScreen';
import PriorityScreen from './screens/PriorityScreen';
import NFCScreen from './screens/NFCScreen';
import WalletScreen from './screens/WalletScreen';
import RewardScreen from './screens/RewardScreen';
import CardDetailScreen from './screens/CardDetailScreen';

const TAB_SCREENS = new Set(['home', 'wallet-tab', 'settings-tab']);
const STEP_MAP = { selection: 1, priority: 2, nfc: 3, wallet: 4, reward: 5 };

function StepDots({ step, dark }) {
  const inactive = dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.15)';
  const active   = dark ? 'rgba(255,255,255,0.92)' : '#007AFF';
  return (
    <div style={{
      position: 'absolute', bottom: '8px', left: 0, right: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: '5px', zIndex: 100, pointerEvents: 'none',
    }}>
      {[1,2,3,4,5].map(i => (
        <div key={i} style={{
          height: '5px',
          width: i === step ? '16px' : '5px',
          borderRadius: '3px',
          background: i === step ? active : inactive,
          transition: 'width 0.3s ease, background 0.3s ease',
        }}/>
      ))}
    </div>
  );
}

function PhoneFrame({ children, screen }) {
  const isTab = TAB_SCREENS.has(screen);
  const dark = screen === 'nfc';
  const step = STEP_MAP[screen];

  return (
    <div style={{
      width: '393px',
      height: '852px',
      borderRadius: '55px',
      background: '#1C1C1E',
      padding: '10px',
      boxShadow: `
        0 50px 130px rgba(0,0,0,0.8),
        0 0 0 1px rgba(255,255,255,0.08),
        inset 0 0 0 1px rgba(255,255,255,0.06)
      `,
      position: 'relative',
      flexShrink: 0,
    }}>
      {/* Silent / volume buttons (left) */}
      {[110, 158, 234].map((top) => (
        <div key={top} style={{
          position: 'absolute', left: '-3px', top: `${top}px`,
          width: '4px', height: top === 110 ? '32px' : '64px',
          borderRadius: '2px 0 0 2px', background: '#3A3A3C',
        }} />
      ))}
      {/* Power button (right) */}
      <div style={{
        position: 'absolute', right: '-3px', top: '178px',
        width: '4px', height: '88px',
        borderRadius: '0 2px 2px 0', background: '#3A3A3C',
      }} />

      {/* Screen bezel */}
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '45px',
        overflow: 'hidden',
        background: '#F2F2F7',
        position: 'relative',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: '13px', left: '50%',
          transform: 'translateX(-50%)',
          width: '126px', height: '36px',
          background: '#1C1C1E', borderRadius: '20px', zIndex: 200,
        }} />

        <div className="no-scroll" style={{ height: '100%', overflowY: 'auto', overflowX: 'hidden' }}>
          {children}
        </div>

        {!isTab && step && <StepDots step={step} dark={dark} />}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('selection');
  const [selectedCards, setSelectedCards] = useState(new Set());
  const [priority, setPriority] = useState(null);
  const [detailCard, setDetailCard] = useState(null);
  const [prevTab, setPrevTab] = useState('wallet-tab');

  function handleTabChange(tab) {
    setScreen(tab);
  }

  function handleCardTap(card) {
    setDetailCard(card);
    setPrevTab(screen);
    setScreen('card-detail');
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '24px' }}>
      <PhoneFrame screen={screen}>

        {/* ── Tab screens ── */}
        {screen === 'home' && (
          <HomeScreen
            activeTab="home"
            onTabChange={handleTabChange}
            onScan={() => setScreen('nfc')}
            selectedCards={selectedCards}
          />
        )}
        {screen === 'wallet-tab' && (
          <WalletTabScreen
            activeTab="wallet-tab"
            onTabChange={handleTabChange}
            selectedCards={selectedCards}
            onCardTap={handleCardTap}
          />
        )}
        {screen === 'settings-tab' && (
          <SettingsTabScreen
            activeTab="settings-tab"
            onTabChange={handleTabChange}
          />
        )}

        {/* ── Card detail ── */}
        {screen === 'card-detail' && (
          <CardDetailScreen
            card={detailCard}
            onBack={() => setScreen(prevTab)}
          />
        )}

        {/* ── Scan flow screens ── */}
        {screen === 'selection' && (
          <CardSelectionScreen
            onContinue={(sel) => {
              setSelectedCards(sel);
              setScreen('priority');
            }}
          />
        )}
        {screen === 'priority' && (
          <PriorityScreen
            onBack={() => setScreen('selection')}
            onContinue={(p) => {
              setPriority(p);
              setScreen('home');
            }}
          />
        )}
        {screen === 'nfc' && (
          <NFCScreen onContinue={() => setScreen('wallet')} />
        )}
        {screen === 'wallet' && (
          <WalletScreen
            onContinue={() => setScreen('reward')}
            onBack={() => setScreen('nfc')}
            selectedCards={selectedCards}
          />
        )}
        {screen === 'reward' && (
          <RewardScreen
            onDone={() => setScreen('home')}
            onBack={() => setScreen('wallet')}
          />
        )}

      </PhoneFrame>
    </div>
  );
}
