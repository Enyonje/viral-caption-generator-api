# Viral Caption Generator API

![CI](https://github.com/<Enyonje>/viral-caption-generator-api/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/evanjom/viral-caption-generator-api/branch/main/graph/badge.svg)](https://codecov.io/gh/evanjom/viral-caption-generator-api)



A backend service for generating viral captions for TikTok, Instagram Reels, and YouTube Shorts.  
Built with **Node.js**, **Express**, and **TypeScript**, with optional **OpenAI integration** for live AI captions.

---

## Features
- Health check endpoints (`/health`, `/v1/health`)
- Caption generation endpoint (`/v1/captions/generate`)
- OpenAI-powered captions (requires API key)
- Automatic fallback to mock captions when quota is exceeded or API key is missing
- Transparent responses with `source` field (`openai` or `mock`)

---

## Getting Started

### 1. Clone and install
```bash
git clone https://github.com/your-username/viral-caption-generator-api.git
cd viral-caption-generator-api
npm install