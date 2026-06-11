# 🚀 GoalPilot AI

<div align="center">

### **AI-Powered Goal Planning & Productivity Platform**

Turn your ambitions into structured, actionable roadmaps with the power of AI.

🌐 **Live Demo:** https://goal-pilot-ai-ruby.vercel.app
💻 **Built with:** Next.js • TypeScript • Tailwind CSS • Supabase • Groq AI • Vercel

</div>

---

## 📌 Overview

GoalPilot AI is an intelligent productivity platform that helps users transform goals into step-by-step execution plans.

Instead of manually planning tasks, users simply create a goal and let AI generate a personalized roadmap with milestones and actionable tasks. Progress is tracked in real time, while an AI Coach provides guidance and motivation throughout the journey.

---

## ✨ Key Features

### 🎯 Goal Management

* Create new goals
* Edit existing goals
* Delete goals
* Search goals instantly
* Track goal status (Active, Completed, Paused)

### 🤖 AI Roadmap Generation

* Generate structured learning or execution plans using Groq AI
* Automatic milestone creation
* Automatic task generation
* Regenerate roadmaps when needed

### 📊 Progress Tracking

* Interactive roadmap view
* Task completion tracking
* Progress visualization
* Milestone management

### 💬 AI Coach

* Ask productivity or learning questions
* Get personalized guidance
* Receive actionable recommendations powered by AI

### 🔐 Authentication

* Secure Signup/Login
* Protected routes
* Session management using Supabase Auth

### 📱 Modern User Experience

* Responsive design
* Dark mode UI
* Fast navigation
* Mobile-friendly layouts

---

# 🏗️ Tech Stack

| Category       | Technology                     |
| -------------- | ------------------------------ |
| Frontend       | Next.js (App Router)           |
| Language       | TypeScript                     |
| Styling        | Tailwind CSS                   |
| Backend        | Next.js API Routes             |
| Database       | Supabase PostgreSQL            |
| Authentication | Supabase Auth                  |
| AI             | Groq (Llama 3.3 70B Versatile) |
| Deployment     | Vercel                         |

---

# ⚙️ Architecture

```text
User
   │
   ▼
Next.js Frontend
   │
   ├────────► Supabase Auth
   │
   ├────────► Supabase Database
   │             ├── Goals
   │             ├── Milestones
   │             └── Tasks
   │
   └────────► Groq AI API
                    │
                    ▼
          AI Roadmap & AI Coach
```

---

# 🚀 How It Works

1. User signs up or logs in.
2. User creates a new goal.
3. GoalPilot sends the goal to Groq AI.
4. AI generates milestones and tasks.
5. The roadmap is stored in Supabase.
6. Users complete tasks and monitor progress.
7. The AI Coach assists with planning and productivity questions.

---

# 📂 Project Structure

```text
app/
components/
lib/
public/
```

---

# 🔑 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

---

# 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/aryansaini101007-rgb/GoalPilot-AI.git
cd GoalPilot-AI
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Visit:

```text
http://localhost:3000
```


# 🌟 Why GoalPilot AI?

Most productivity apps stop at note-taking or to-do lists. GoalPilot AI goes further by automatically converting goals into structured execution plans powered by AI, helping users stay organized, motivated, and accountable.

---


# 🏆  Highlights

* ✅ AI-powered roadmap generation
* ✅ AI productivity coach
* ✅ Full-stack architecture
* ✅ Secure authentication
* ✅ Responsive UI
* ✅ Real-time database integration
* ✅ Cloud deployment ready

---

# 👨‍💻 Developer

**Aryan Saini**

* GitHub: https://github.com/aryansaini101007-rgb
* Project: GoalPilot AI

---

# 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

**Built with ❤️ using Next.js, Supabase, and Groq AI**

</div>
