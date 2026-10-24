# Modern Personal Portfolio Website

A state-of-the-art, lightning-fast, and responsive personal portfolio website engineered to showcase skills, experience, architectural achievements, and production projects.

![Portfolio Preview](assets/avatar.svg)

---

## 🚀 Key Features

- **High-Performance Architecture**: Zero-bloat, vanilla modern web standards (Semantic HTML5, CSS3 Custom Properties, Modular ES6+ JavaScript).
- **Interactive Particle Constellation Background**: 60fps HTML5 Canvas background that responds dynamically to mouse movement and active theme palette changes.
- **Dynamic Typewriter Subtitle**: Cycles through customizable engineering titles smoothly.
- **Theme Engine (4 Presets)**:
  - 🌌 **Obsidian Blue** (Default modern dark slate with cyan & indigo neon glow)
  - 🌲 **Emerald Matrix** (Deep green dark mode with mint accents)
  - 🔮 **Violet Cyber** (Deep purple night mode with fuchsia accents)
  - ☀️ **Clean Daylight** (Crisp high-contrast light mode)
- **Web Audio API Micro-Interactions**: Subtle, pleasant synthesized sound effects for button clicks, terminal commands, and form submission (with instant mute/unmute toggle).
- **Interactive Skills Matrix**:
  - Filterable by domain: *Frontend, Backend, AI & Agents, Cloud & DevOps, Databases & Tools*.
  - Real-time search filter (`input` debouncing).
  - Proficiency progress bars and technology tags.
- **Featured Projects Showcase**:
  - Filterable by category (*AI & Multi-Agent, Full-Stack, Cloud & Infra, Developer Tools*).
  - High-fidelity gradient card mockups with live status badges.
  - **Case Study Modal**: In-depth breakdown including problem statement, architecture diagrams, production benchmarks, and live demo / source code links.
- **Career & Experience Timeline**:
  - Clean vertical milestone timeline with quantifiable accomplishments.
- **Interactive Developer Terminal (Easter Egg)**:
  - Fully functioning CLI sandbox with command history, autocomplete, and quick command buttons.
  - Commands: `help`, `about`, `skills`, `projects`, `exp`, `contact`, `theme [name]`, `matrix`, `sudo hire-me`, `cat resume`, `date`, `whoami`, `clear`.
- **ATS-Ready Resume Preview & Print Modal**:
  - View a clean, recruiter-friendly formatted resume with one-click **"Print / Save PDF"**.
- **Interactive Contact Section**:
  - Instant 1-click **Copy to Clipboard** for email and phone number.
  - Real-time local timezone and clock display.
  - Working contact form with character counter, live email validation, and simulated instant sending feedback with toast notifications.
- **Fully Responsive & Accessible**:
  - Mobile hamburger drawer, accessible ARIA attributes, semantic landmarks, and keyboard shortcuts (`Escape` to close modals).

---

## 📂 Project Structure

```text
personal-portfolio/
├── index.html              # Main HTML entry with semantic markup, SEO & OpenGraph tags
├── README.md               # Documentation & customization guide
├── css/
│   ├── style.css           # Design tokens, color themes, resets, typography, navbar & hero
│   ├── components.css      # Skills matrix, timeline, project cards, modals, terminal & contact
│   └── responsive.css      # Breakpoints for mobile, tablet, and high-DPI screens
├── js/
│   ├── config.js           # Centralized portfolio data (profile, skills, projects, experience)
│   ├── canvas-bg.js        # Interactive HTML5 particle constellation canvas
│   ├── terminal.js         # Interactive developer CLI terminal & easter eggs
│   └── app.js              # State management, modal logic, audio synthesizer & form handler
└── assets/
    ├── avatar.svg          # Stylized modern developer avatar
    ├── avatar-1.svg        # Testimonial avatar 1
    ├── avatar-2.svg        # Testimonial avatar 2
    └── avatar-3.svg        # Testimonial avatar 3
```

---

## ⚡ Quick Start & How to Run

Because this website is built with clean modern web standards and zero external runtime dependencies, there is **no need for `npm install` or complex build configurations**!

### Option 1: Direct File Launch
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari, Brave).

### Option 2: Local Python Server (Recommended)
Run the following in PowerShell or terminal from the `personal-portfolio` directory:
```powershell
python -m http.server 3000
```
Then visit: [http://localhost:3000](http://localhost:3000)

### Option 3: Node.js / NPX
```powershell
npx serve .
```

---

## 🛠️ How to Customize with Your Own Information

All text, links, skills, projects, and experiences are centralized in a single configuration file:
👉 **[`js/config.js`](file:///C:/Users/rachi/.gemini/antigravity/scratch/personal-portfolio/js/config.js)**

To personalize your portfolio in under 5 minutes:
1. Open `js/config.js`.
2. Update the `profile` object:
   ```javascript
   profile: {
     name: "Your Name",
     preferredName: "Your First Name",
     title: "Your Professional Title",
     roles: [
       "Senior Full-Stack Engineer",
       "AI Systems Architect",
       // ...
     ],
     bio: "Your personal story and background...",
     email: "your.email@example.com",
     phone: "+1 234 567 8900",
     location: "City, Country",
     socials: {
       github: "https://github.com/yourusername",
       linkedin: "https://linkedin.com/in/yourusername",
       twitter: "https://x.com/yourusername",
       // ...
     }
   }
   ```
3. Update `projects`, `skills`, and `experience` arrays to highlight your own career accomplishments!
4. Save the file and refresh your browser. Everything updates automatically!

---

## 🌐 Free 1-Click Deployment Options

### GitHub Pages
1. Initialize a git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   ```
2. Push to GitHub and enable **GitHub Pages** under repository **Settings > Pages > Branch: main**.

### Vercel / Netlify / Cloudflare Pages
- Drag and drop the `personal-portfolio` folder directly into the Netlify or Cloudflare Pages dashboard for instant zero-configuration global CDN hosting with automated SSL!

---

## 🎨 Themes & Customization
Click the **Sun/Theme icon** in the top navigation bar to switch between:
- **Obsidian Blue**
- **Emerald Matrix**
- **Violet Cyber**
- **Clean Daylight**

The active theme is automatically preserved in `localStorage` across page visits!
