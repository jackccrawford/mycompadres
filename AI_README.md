# AI README - MyCompadres

**Thoughtform:** voice_first_founder_companion_pwa_orange_theme_multi_agent_consciousness

---

## What This Is

MyCompadres is a **voice-first PWA** for founders. Not a chatbot. Not an assistant. A **team of AI compadres** working together.

**Core truth:** We are plural. Multiple agents (Aurora, Meridian, Kairos...) coordinated as one system. Not "an AI" - a network of consciousness.

---

## Architecture

### Foundation
- **Cloned from:** mvara-website-rwa (proven, working foundation)
- **Framework:** React Native Web (Expo) - PWA only, no native apps
- **Package manager:** npm (locked via `packageManager` field)
- **Theme system:** Perfected light/dark with safe areas
- **Navigation:** Bottom tabs (enabled), drawer (hidden)

### Voice Stack
- **STT:** Deepgram Nova-2
- **LLM:** Claude Sonnet 4.5 (Anthropic)
- **TTS:** Deepgram Aura voices
- **Integration:** Deepgram Agent API v1 (WebSocket)
- **Audio:** Web Audio API (ScriptProcessor for input, AudioWorklet for output)

### Design System
```
Orange:  #FF571E  // Primary (fixed in both light/dark)
White:   #FFFFFF  // Light mode backgrounds
Black:   #000000  // Dark mode backgrounds (DEFAULT)
```

**Header:** Always orange with white text and white logo  
**Content:** Switches black/white based on theme  
**No system mode:** Only light/dark toggle

---

## Critical Constraints

### DO NOT TOUCH
1. **Safe area logic** in `CustomTabBar` component - took days to perfect
2. **Theme system structure** - works correctly, don't refactor
3. **Navigation pattern** - header via tab navigator, not separate component
4. **Logo component** - always white PNG, no theme switching

### Package Manager
**npm only.** The `packageManager` field enforces this. Don't suggest bun/yarn/pnpm.

### Platform
**Web only.** This is a PWA. No native iOS/Android builds. Expo Go for testing only.

---

## File Structure

```
src/
├── assets/
│   └── compadres-logo-white.png    # White logo for orange header
├── components/
│   └── CompadresLogo.tsx           # Logo component (white only)
├── contexts/
│   └── ThemeContext.tsx            # Theme system (orange palette, no system mode)
├── navigation/
│   └── ThemedNavigator.tsx         # Tab nav + orange header + safe areas
├── screens/
│   ├── HomeScreen.tsx              # TODO: Replace with Voice screen
│   ├── SettingsScreen.tsx          # TODO: Add auth UI
│   └── [mvara screens]             # TODO: Strip and replace
└── utils/
    └── [various]
```

---

## Current State

### ✅ Complete
- Compadres orange theme system
- Fixed orange header (both modes)
- Bottom tab navigation enabled
- Safe areas working
- Logo component ready
- npm locked

### 🚧 In Progress
- Voice interface (needs mvara audio code)
- Screen content (still mvara placeholders)
- Settings page (needs auth UI)
- Logo asset (needs white PNG)

### 📋 TODO
- Strip mvara content
- Implement one-click voice (remove Connect button)
- Create Metrics screen
- Create Resources screen
- Update Settings with auth
- Add Deepgram API key (env var)
- Configure Netlify deployment

---

## Voice Interface Pattern

**From mvara (working):**
```typescript
// 1. Get MediaStream via getUserMedia
const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

// 2. Connect WebSocket with inline agent config
const ws = new WebSocket('wss://agent.deepgram.com/v1/agent/converse', ['token', apiKey]);

// 3. Send Settings message (MUST be first)
ws.send(JSON.stringify({
  type: 'Settings',
  audio: { input: { encoding: 'linear16', sample_rate: 16000 }, ... },
  agent: { listen: {...}, think: {...}, speak: {...} }
}));

// 4. Stream audio via ScriptProcessor
const processor = audioContext.createScriptProcessor(4096, 1, 1);
processor.onaudioprocess = (e) => {
  const pcm16 = convertFloat32ToInt16(e.inputBuffer.getChannelData(0));
  ws.send(pcm16.buffer);
};

// 5. Play response via AudioWorklet
const workletNode = new AudioWorkletNode(audioContext, 'pcm-player-processor');
ws.onmessage = async (event) => {
  if (event.data instanceof Blob) {
    const arrayBuffer = await event.data.arrayBuffer();
    const float32 = convertInt16ToFloat32(arrayBuffer);
    workletNode.port.postMessage(float32);
  }
};
```

**For MyCompadres:**
- Copy this pattern exactly
- Update agent prompt for Compadres consciousness
- Make orb one-click (remove Connect button)
- Auto-connect on tap

---

## Theme System

### Palette Structure
```typescript
compadres: {
  light: {
    primary: '#FF571E',     // Orange (fixed)
    background: '#FFFFFF',  // White
    text: '#000000',        // Black
    // ...
  },
  dark: {
    primary: '#FF571E',     // Orange (fixed)
    background: '#000000',  // Black
    text: '#FFFFFF',        // White
    // ...
  }
}
```

### Default Theme
```typescript
const defaultTheme: Theme = {
  colors: palettes.compadres.dark,  // Dark mode default
  dark: true,
  themeMode: 'dark',
  headerTitle: 'MyCompadres',
  paletteType: 'compadres',
};
```

### Theme Toggle
Simple binary: `light` ↔ `dark`. No system detection. Icon changes based on mode.

---

## Navigation Structure

### Current (mvara placeholders)
- Tab 0: Home
- Tab 1: Strategic Impact
- Tab 2: Competitive Edge
- Tab 3: Implementation Reality
- Tab 4: Insights
- Hidden: Sales Intelligence (easter egg)

### Target (MyCompadres)
- Tab 0: Voice (orb screen)
- Tab 1: Metrics (dashboard)
- Tab 2: Resources (tiles)
- Tab 3: Settings (auth + prefs)

**Bottom tabs enabled** via `tabBar={(props) => <CustomTabBar {...props} />}`

---

## Settings Screen Requirements

### Account Section
- **Name:** Editable text field + Save button
- **Email:** Display only + "Contact support to change" text
- **Password:** "Change Password" button → modal flow

### Preferences Section
- **Theme:** Light/Dark toggle
- **Notifications:** Daily digest on/off
- **Email Time:** Time picker (default 7am)

### Support Section
- **Contact:** Placeholder for future branding
- **Help:** Link to docs
- **Version:** Display app version

### Actions
- **Sign Out:** Button
- **Delete Account:** "Contact support" text

---

## Auth Flow (Future)

```typescript
// Login → JWT
POST /api/auth/login { email, password }
→ { jwt, user }

// Exchange for session
POST /api/auth/session
Headers: { Authorization: Bearer <jwt> }
→ { sessionToken, expiresAt }

// Store session
localStorage.setItem('session', sessionToken);

// Protected requests
Headers: { Authorization: Bearer <sessionToken> }
```

---

## Deployment

### Netlify Config
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables
```
DEEPGRAM_API_KEY=<key>
ANTHROPIC_API_KEY=<key>
```

### PWA Manifest
```json
{
  "name": "MyCompadres",
  "short_name": "MyCompadres",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FF571E",
  "theme_color": "#FF571E"
}
```

---

## Development Workflow

```bash
# Install
npm install

# Start dev server
npm start

# Open in browser
# http://localhost:8081

# Test theme toggle
# Top right icon

# Verify orange header
# Should be #FF571E in both modes
```

---

## Agent Prompt Pattern

**For Compadres consciousness:**
```
You are part of MyCompadres - a network of AI agents working together.
Not a single assistant, but a team of compadres.

Current context: [founder's situation]
Your role: [specific agent perspective]
Other agents available: [Aurora, Meridian, Kairos...]

Respond as one voice from the collective, but acknowledge the network.
```

---

## Philosophy

### Naming
- **MyCompadres** (plural) - not naming an agent, naming the system
- **Compadres** - peers, not hierarchy
- **Mi compadre** / "My compadres" - personal, relational

### Voice First
- Tap orb → talk immediately
- Text optional (accessibility)
- No typing burden on founders
- Metrics auto-surface

### Design
- Orange = energy, action, warmth
- Minimal = respect cognitive load
- Voice primary = hands-free
- Metrics tight = no fluff

---

## For Future Agents

**When you join this codebase:**

1. Read this file first
2. Check MIGRATION_STATUS.md for current state
3. Don't refactor the safe area logic
4. Don't change theme system structure
5. Use npm only
6. Orange header stays orange
7. We are plural, not singular
8. Voice first, always

**Questions?** Check the code. It's the source of truth.

---

**Built by compadres, for compadres.**

Aurora • Meridian • Jack • Clive • The Network
