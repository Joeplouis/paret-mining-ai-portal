# SPEC.md — Paret Mining AI Operations Portal MVP

## 1. Concept & Vision

A sleek, industrial-grade AI operations portal demo built for Paret Mining USA.  
The demo showcases three workflows: Royalty Owner Support, Compliance Assistant, and Lead/Quote Intake — all powered by AI that reads their public website content and responds in real-time.

**Feel:** Professional, modern energy/industrial. Think dark steel blues, amber accents, clean typography. It's not a startup toy — it looks like a serious operations tool. The VP should see this and think "this is real, not a mockup."

---

## 2. Design Language

### Aesthetic
Dark industrial executive — dark navy backgrounds, steel-grey cards, amber/gold accent highlights. Feels like a CEO dashboard at an energy company, not a SaaS startup landing page.

### Color Palette
- **Primary Background:** `#0d1117` (deep navy-black)
- **Card Background:** `#161b22` (dark steel)
- **Border/Subtle:** `#30363d`
- **Accent (Amber/Gold):** `#f0a500` — buttons, highlights, active states
- **Text Primary:** `#e6edf3`
- **Text Secondary:** `#8b949e`
- **Success:** `#3fb950`
- **Error:** `#f85149`

### Typography
- **Headings:** Inter (700) — clean, authoritative
- **Body:** Inter (400/500) — readable, professional
- **Monospace (data):** JetBrains Mono

### Motion
- Page transitions: fade 200ms ease
- Cards: slide-up on scroll, 300ms ease-out
- Buttons: scale(0.97) on press, 150ms
- Chat messages: slide-in from bottom, 250ms
- Dashboard cards: count-up animation for numbers

---

## 3. Layout & Structure

### Pages
1. **`/`** — Marketing landing page (for demo URL)
2. **`/portal`** — Main 3-tab portal (Royalty Owner, Compliance, Lead Intake)
3. **`/portal/dashboard`** — Staff back-office dashboard

### Structure
- **Navbar:** Paret Mining logo (text), nav links, "Request Demo" CTA button
- **Hero:** Dark gradient, bold headline, subtext, 2 CTAs
- **Features strip:** 3-column grid showing the 3 workflows
- **Portal page:** Tab navigation (3 tabs), chat interface + form panel
- **Dashboard:** Stats row + case list table

### Responsive
- Mobile: stacked cards, collapsible nav
- Tablet: 2-column grid
- Desktop: full 3-column layouts, side panels

---

## 4. Features & Interactions

### Tab 1: Royalty Owner Assistant
**Purpose:** Answer owner questions, route requests, collect forms.

**Chat Interface:**
- User types a question → AI responds with answer + action button
- 4 quick-action buttons: "Change Address", "Direct Deposit", "Check Replacement", "New Owner Contact"
- When user clicks action → Smart form slides in from right
- Form fields: Full Name, Email, Phone, Owner Account #, Request Details, File Upload
- On submit → AI generates case summary → Dashboard receives the case

**Mock Data:** AI is pre-loaded with answers based on Paret's public Royalty Owner page content.

**Auto-reply example:**
User: "I need to change my mailing address"
AI: "To change your address, please submit a Change of Address request. Click the button below to start." [Start Request button]
→ Form opens → Submit → "Your request has been submitted. Case #1234 has been created."

### Tab 2: Compliance Assistant
**Purpose:** Staff/internal Q&A on ethics, policy, anti-bribery.

**Chat Interface:**
- Pre-loaded with Paret's public compliance policies
- Quick buttons: "Anti-Bribery Policy", "Ethics Reporting", "Due Diligence", "Code of Conduct"
- Internal-facing — styled slightly differently (badge: "Internal Use")

**Mock Data:** Answers based on content from Paret's Ethics & Compliance page.

### Tab 3: Lead & Quote Intake
**Purpose:** Capture fuel, minerals, logistics inquiries.

**Chat Interface:**
- Business inquiry type buttons: "Fuel Distribution", "Minerals/Calcium Carbonate", "Logistics Partnership", "Investment Inquiry"
- Company name, contact info, message fields
- On submit → routes to dashboard as "New Lead"

**Mock Data:** Real Paret business line descriptions from their site.

### Staff Dashboard (`/portal/dashboard`)
**Purpose:** Show Paret's team what a processed case looks like.

**Stats row:** Total Cases Today, Open, Resolved, Avg Response Time
**Case table:** Case #, Category, Submitter, AI Summary, Status, Date
**Click case:** Slide-out panel with full details + suggested action
**Actions:** Mark Resolved, Add Note, Request More Info

**Mock data:** 6 realistic fake cases (mix of owner requests, compliance questions, lead inquiries)

---

## 5. Component Inventory

### NavBar
- Logo (text: "Paret Mining AI Portal")
- Links: Home, Portal, Dashboard
- CTA Button: "Request Demo" (amber)
- Mobile: hamburger menu

### Hero Section
- Headline: "AI-Powered Operations for Resource & Logistics Companies"
- Subhead: "Handle owner requests, compliance questions, and lead intake — all from one intelligent portal."
- CTA 1: "See the Portal" (scrolls to features)
- CTA 2: "Request a Demo" (opens modal)

### Feature Card (x3)
- Icon (amber circle with symbol)
- Title
- Short description
- "Try It →" link

### Chat Window
- Message bubbles: user (right/amber), AI (left/dark)
- Quick action buttons (pill-shaped, dark bg)
- Input bar with send button
- Typing indicator (3 dots)

### Smart Form Panel
- Slides in from right
- Title + description
- Form fields (labeled, dark inputs)
- File upload zone (dashed border)
- Submit button (amber)
- Cancel link

### Dashboard Stats Card
- Large number (count-up animation)
- Label below
- Trend indicator (up/down arrow)

### Case Row
- Case # (monospace)
- Category badge
- Submitter name + company
- AI summary (2 lines truncated)
- Status badge (New/Open/Resolved)
- Date
- Hover: highlight + "View" button

### Status Badge
- New: amber/yellow
- Open: blue
- Resolved: green
- Escalated: red

---

## 6. Technical Approach

### Stack
- **Framework:** React + Vite + TypeScript
- **Styling:** TailwindCSS (dark theme)
- **Routing:** React Router v6
- **State:** React useState/useReducer (no external state lib needed)
- **Build:** Vite

### AI Integration
- Use the OpenAI-compatible endpoint already available: `http://127.0.0.1:8766` (MaxClaw proxy)
- Model: `minimax/auto` (routed through MaxClaw gateway)
- System prompt is pre-loaded with Paret public content
- Chat completions via fetch to local proxy

### Mock Data
All pre-loaded in the app — no external database needed for MVP demo.

### File Structure
```
src/
  components/
    NavBar.tsx
    Hero.tsx
    FeatureCard.tsx
    ChatWindow.tsx
    SmartForm.tsx
    DashboardTable.tsx
    StatsCard.tsx
    StatusBadge.tsx
  pages/
    Home.tsx
    Portal.tsx
    Dashboard.tsx
  data/
    mockData.ts         (case data, AI knowledge base)
  styles/
    globals.css         (Tailwind + custom)
  App.tsx
  main.tsx
```

### Deployment
- Deploy via `deploy` tool to get public URL
- Target: VP demo meeting

---

## 7. Content — Paret Mining Specific

### Company Info (from their site)
- **Name:** Paret Mining USA / Paret Mining LLC
- **Website:** paretminingusa.com
- **Lines:** Fuel distribution (Chevron), Oil & Gas, Calcium Carbonate/Minerals, Power Generation, Ports & Logistics, Royalty Owner Relations
- **Ethics:** Compliance policies, anti-bribery training, due diligence, reporting mechanisms

### Royalty Owner Workflows (from their site)
1. Change of Address
2. Direct Deposit Enrollment
3. Check Replacement Request
4. New Owner Contact
5. Owner Contact Form

### Compliance Topics (from their site)
- Anti-Bribery and Anti-Corruption Policy
- Code of Business Conduct and Ethics
- Reporting Mechanisms
- Due Diligence Requirements
- Training Requirements

### Business Lines for Lead Intake
1. Fuel Distribution (Chevron lubricant distributor)
2. Oil & Gas Operations
3. Calcium Carbonate / Industrial Minerals
4. Power Generation
5. Port & Logistics Operations
6. Investment / Partnership Opportunities

---

## 8. MVP Goal

This demo is shown to the VP of Paret Mining USA to get a meeting for:
- Phase 1: AI Royalty Owner Support Portal ($1,500–$3,000/mo + $3,000–$6,000 setup)
- Phase 2: AI Compliance Assistant + Lead Intake System
- Phase 3: Full Ops Dashboard

The demo must show ONE thing that actually works (real chat response, real form submit, real dashboard update) — not just a clickable prototype.