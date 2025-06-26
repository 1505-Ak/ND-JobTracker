# Neurodivergent-Friendly Job Tracker

A kindness-first web app to help neurodivergent job-seekers plan, track and celebrate their job-search journey.

## ✨ Core features

• Accessible UI – high-contrast & dyslexia-friendly modes
• Application list with priority colours and inline status editing
• Calendar view for deadlines and interview dates
• Remote job-search modal powered by Remotive, JSearch and LinkedIn APIs  
  – keyword/company/location search  
  – extra client-side filters (country, company, min. years experience)  
  – one-click "Track ➕" creates a "To Apply" record

## 🚀 Quick-start

```bash
# 1. Install deps
npm i        # or pnpm i / yarn

# 2. Add RapidAPI key (optional but recommended for JSearch/LinkedIn)
cp .env.example .env   # then paste your key

# 3. Run dev server
npm run dev            # http://localhost:5173
```

## 🔧 Scripts

| Command          | Purpose                        |
|------------------|--------------------------------|
| `npm run dev`    | Vite dev server (HMR)          |
| `npm run build`  | Production build               |
| `npm run preview`| Preview built site             |
| `npm run lint`   | ESLint                         |
| `npm run format` | Prettier                       |

## 🛠️ Tech stack

React + TypeScript • Vite • Tailwind CSS • Lucide Icons

## 📝 License
MIT
