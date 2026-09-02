# ClassmatePlus — "Your AI can't do everything. Hire a student."

A campus-only skill exchange board. No money changes hands — students trade
skills directly (Excel help for Photoshop help, guitar lessons for essay
editing, etc.).

This is **Milestone 1: interactive static frontend**. There is no backend or
database yet — all data lives in `js/data.js` as sample arrays, standing in
for what a real API will return later.

## What's done

- **Home** (`index.html`) — hero with tagline, "How It Works" teaser,
  featured skills/students pulled from sample data.
- **How It Works** (`pages/how-it-works.html`) — full 4-step explanation and
  ground rules.
- **Browse Skills** (`pages/browse-skills.html`) — corkboard grid of skill
  cards, live search + category filter, "Request Swap" opens a modal.
- **Browse Students** (`pages/browse-students.html`) — searchable grid of
  student cards (offered/wanted skills shown up front).
- **Student Profile** (`pages/student-profile.html?id=s1`) — reads a student
  id from the URL, shows bio + skill lists, "Request Swap" modal.
- **Login/Register** (`pages/login-register.html`) — toggle between forms,
  full inline validation (required fields, email format, 8-char password
  minimum), redirects to Dashboard on success.
- **Dashboard** (`pages/dashboard.html`) — one page, four tabs, so we're not
  maintaining five near-identical layouts:
  - **My Skills** — add/remove skills you offer or want.
  - **Potential Matches** — live client-side matching: a student shows up
    here only if there's overlap *both directions* (they want something you
    offer, and you want something they offer).
  - **Swap Requests** — pending requests, sent and received, with
    accept/decline/cancel actions.
  - **My Swaps** — accepted and completed trades.
- Shared navbar + footer injected by `js/nav.js` on every page (one place to
  edit nav links, not copy-pasted per page).
- Responsive down to mobile (hamburger nav, single-column grids).
- Toast notifications for actions (swap requests, add/remove skill,
  accept/decline) instead of `alert()`.



## How to run it

No build step — it's plain HTML/CSS/JS.

1. Open `index.html` directly in a browser, **or**
2. Serve the folder locally for cleaner relative paths:
   ```
   cd classmateplus
   python3 -m http.server 8000
   ```
   then visit `http://localhost:8000`.

## Folder structure

```
/index.html
/pages/
  how-it-works.html
  browse-skills.html
  browse-students.html
  student-profile.html
  login-register.html
  dashboard.html
/css/style.css
/js/
  data.js       — sample data (Skill, Student, CURRENT_USER, SWAP_REQUESTS)
  nav.js        — shared navbar/footer + toast helper
  browse.js     — search/filter for Browse Skills & Browse Students
  profile.js    — Student Profile rendering + swap modal
  auth.js       — Login/Register validation
  dashboard.js  — tabs, matching logic, request/swap state
/assets/         — (empty for now — icons/images go here)
```
