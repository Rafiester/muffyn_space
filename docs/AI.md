# Role
Act as an Expert Full-Stack Developer. I want to build a dynamic, Linktree-alternative single-page web app.

## Tech Stack Requirements
- **Framework:** Next.js (App Router) or Astro (choose the most optimal for a fast, dynamic link-in-bio).
- **Styling:** Tailwind CSS.
- **Data Fetching:** Set up a mock structure for a Headless CMS (like Sanity) or a Spreadsheet API. Create a separate `data.json` or mock API function to simulate fetching the user's profile info, links, and current active theme.

## Core Features to Build
1. **Dynamic Link Rendering:** 
   - Map through an array of link objects (title, url, icon). 
   - Ensure the structure can easily be connected to a real CMS later.
2. **Dynamic Theming System:**
   - Implement a robust theming system using Tailwind CSS variables. 
   - Provide at least two predefined themes out-of-the-box: a "Modern Minimalist" theme and a "90s Retro/Vintage" theme.
   - Include a toggle button on the page that allows the user to dynamically switch between these themes.
3. **UI/UX:**
   - Mobile-first layout, fully responsive.
   - Smooth hover effects and transitions when switching themes.

## Output Instructions
- Provide the complete code structure (components, pages, and styling configs).
- Write clean, modular code.
- Add comments explaining where I need to insert the real CMS fetching logic.