# MyCompadres - Netlify Deployment Guide

**Date:** November 14, 2025

---

## Prerequisites

1. **Netlify Account** - Sign up at https://netlify.com
2. **Git Repository** - Code must be in a git repo
3. **GitHub/GitLab** - Push repo to GitHub or GitLab

---

## Deployment Steps

### 1. Push to GitHub

```bash
# Create new repo on GitHub: mycompadres
# Then push:
git remote add origin https://github.com/wearecompadres/mycompadres.git
git branch -M main
git push -u origin main
```

### 2. Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize
4. Select **mycompadres** repository

### 3. Configure Build Settings

Netlify will auto-detect from `netlify.toml`:

```toml
[build]
  command = "npx expo export -p web"
  publish = "dist"
```

**Just click "Deploy site"!**

### 4. Environment Variables (If Needed)

For Deepgram voice integration:

1. Go to **Site settings** → **Environment variables**
2. Add:
   - `DEEPGRAM_API_KEY` = your-api-key-here

---

## What Gets Deployed

- ✅ Voice interface (will work with HTTPS)
- ✅ 6 Pillars framework
- ✅ Entry Assessment
- ✅ All 5 tabs
- ✅ Theme system
- ✅ Compadres branding

---

## After Deployment

### Custom Domain (Optional)

1. Go to **Domain settings**
2. Add custom domain: `app.wearecompadres.com`
3. Configure DNS (Netlify provides instructions)

### Test Voice

Once deployed with HTTPS:
1. Visit your Netlify URL
2. Navigate to Voice tab
3. Tap mic button
4. Grant microphone permissions
5. Voice should work!

---

## Deployment URL

After deployment, you'll get:
- **Netlify URL:** `https://mycompadres.netlify.app`
- **Custom URL:** `https://app.wearecompadres.com` (if configured)

---

## Troubleshooting

### Build Fails

```bash
# Test build locally first:
npx expo export -p web

# Check output in dist/ folder
ls -la dist/
```

### Voice Not Working

- ✅ Check HTTPS (required for microphone)
- ✅ Check browser permissions
- ✅ Check Deepgram API key in env vars
- ✅ Check browser console for errors

### Fonts Not Loading

- ✅ Fonts are loaded via Expo Google Fonts
- ✅ Should work automatically
- ✅ Check network tab if issues

---

## Continuous Deployment

Once connected, every `git push` to main will:
1. Trigger automatic build
2. Deploy to Netlify
3. Update live site

**No manual deployment needed!**

---

## Build Time

- **First build:** ~3-5 minutes
- **Subsequent builds:** ~2-3 minutes
- **Deploy:** ~30 seconds

---

## Monitoring

**Netlify Dashboard shows:**
- Build logs
- Deploy status
- Traffic analytics
- Error tracking

---

## Next Steps After Deployment

1. ✅ Test voice interface
2. ✅ Share URL with Clive
3. ✅ Gather feedback
4. ✅ Iterate on features
5. ✅ Add real Deepgram integration
6. ✅ Connect to Ocean for memory

---

**Ready to deploy!** 🚀
