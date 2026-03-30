# CardSmart

A React mobile UI prototype for CardSmart — an app that helps users maximize credit card rewards by recommending the best card to use at any merchant via NFC scan.

## What it is

This is a **pixel-perfect mobile UI mockup** rendered in a browser inside a simulated iPhone 15 Pro frame (393×852px). It is not a production app — there is no backend, no real NFC, and no real auth. It exists to demonstrate the full user flow and visual design.

## User flow

The app has two modes:

**Tab navigation** (persistent):
- **Home** — greeting, savings summary, recent activity, and the "Scan Merchant" CTA
- **Wallet** — view all saved cards
- **Settings** — app settings

**Scan flow** (5-step, tracked with progress dots):
1. **Card Selection** — pick which cards you carry
2. **Priority** — set your reward preference (points, cashback, travel, etc.)
3. **NFC Scan** — hold phone to terminal (simulated)
4. **Wallet** — confirm the recommended card
5. **Reward** — see points/cashback earned

## Stack

| Tool | Version |
|---|---|
| React | 19 |
| Vite | 8 |
| Tailwind CSS | 3 |
| ESLint | 9 |

No routing library — screen state is managed with a single `useState` in `App.jsx`.

## Project structure

```
src/
  App.jsx              # Root: PhoneFrame shell + screen router
  screens/
    HomeScreen.jsx
    WalletTabScreen.jsx
    SettingsTabScreen.jsx
    CardSelectionScreen.jsx
    PriorityScreen.jsx
    NFCScreen.jsx
    WalletScreen.jsx
    RewardScreen.jsx
  components/
    BottomTabBar.jsx
    CardTile.jsx
    MiniCard.jsx
    NetworkBadge.jsx
    StatusBar.jsx
  data/
    cards.js           # Static card definitions (10 Canadian credit cards)
```

## Supported cards

10 Canadian credit cards are defined in `src/data/cards.js`:
Amex Cobalt, Amex Gold, Aeroplan Visa, Scotia Gold Amex, BMO Cashback MC, CIBC Dividend Visa, Tangerine MC, PC Optimum MC, Rogers WE MC, TD Aeroplan Visa.

## Getting started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`. The app renders centered in the browser — resize your window if the phone frame is cut off.

## Other commands

```bash
npm run build    # Production build → dist/
npm run preview  # Serve the production build locally
npm run lint     # ESLint
```
