# RAFSAN AIR

A compact, draggable, English-only Aviator-style companion built with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Run

```sh
npm install
npm run dev
```

## Use

- Unlock the floating panel with the case-sensitive access key `big`.
- Drag the header to reposition it. Keyboard users can focus the header and use arrow keys; Shift moves in larger steps.
- Minimize the panel or hide it and reopen it from the bottom-right launcher.
- Run random local flight simulations, choose Normal or Fast, and review your four latest results.
- Open panel preferences to control motion and optional sound.
- Select **Live website** to load the exact supplied HGnice registration URL behind the panel. The preview remains available if the third-party site is unavailable.

## Important

Multipliers are randomly generated demonstration data. This application cannot predict real Aviator outcomes and does not connect to or read game data. Preview stakes and credits are fictitious. The client-side password is a convenience UI lock, not secure account authentication.

## Verify

```sh
npx tsc --noEmit
npm run build
npx playwright install --with-deps chromium
npx playwright test
```

The browser suite covers password validation, background interaction while locked, dragging and viewport bounds, minimizing, hiding and reopening, simulation history, preferences, dialogs, and the background switch on desktop and mobile.

## Main Files

- `src/App.tsx`: workspace, simulation controls, live website frame, and floating panel.
- `src/index.css`: responsive charcoal-and-coral design and flight animations.
- `tests/workspace.spec.ts`: desktop and mobile browser regression tests.