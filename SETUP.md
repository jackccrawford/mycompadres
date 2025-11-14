# MyCompadres Setup Guide

## Prerequisites

Before running, you need:

### 1. Logo Asset (REQUIRED)
Create or copy the Compadres white logo to:
```
src/assets/compadres-logo-white.png
```

**Specs:**
- White logo (for orange header)
- Transparent background
- Recommended size: 400x120px or similar aspect ratio
- Format: PNG

**Temporary workaround** (if you don't have the logo yet):
```bash
# Use mvara logo as placeholder
cp src/assets/mvara-logo-white.png src/assets/compadres-logo-white.png
```

### 2. Install Dependencies
```bash
cd ~/Dev/mycompadres
bun install
```

## Running Locally

### Web (Recommended for Development)
```bash
bun start
# Opens in browser at http://localhost:8081
```

### iOS (Expo Go)
```bash
bun start
# Scan QR code with Expo Go app
```

### Android (Expo Go)
```bash
bun start
# Scan QR code with Expo Go app
```

## What Works Now

✅ **Theme system** - Orange header, light/dark content toggle  
✅ **Navigation** - Bottom tabs enabled  
✅ **Safe areas** - Proper iOS/Android handling  
✅ **Logo component** - Ready for white PNG  

## What Needs Work

🚧 **Voice interface** - Copy from mvara SalesIntelligenceScreen  
🚧 **Screen content** - Still has mvara placeholder screens  
🚧 **Settings page** - Needs auth UI  
🚧 **Deepgram config** - Update API key and prompts  

## Development Workflow

1. **Run locally**: `bun start`
2. **Open in browser**: http://localhost:8081
3. **Test theme toggle**: Top right icon
4. **Check tabs**: Bottom navigation should be visible
5. **Verify orange header**: Should be `#FF571E` in both modes

## Troubleshooting

### "Cannot find module 'compadres-logo-white.png'"
→ Add the logo file to `src/assets/` or use mvara logo as placeholder

### "Port 8081 already in use"
→ Kill existing Metro bundler: `lsof -ti:8081 | xargs kill`

### Theme not applying
→ Clear AsyncStorage: In browser DevTools → Application → Clear storage

### Safe area issues
→ Don't modify CustomTabBar component - it's working correctly

## Next Steps

1. Add logo asset
2. Run `bun install`
3. Run `bun start`
4. Verify orange header and bottom tabs
5. Begin screen migration (see MIGRATION_STATUS.md)

---

**Ready to build, compadre?**
