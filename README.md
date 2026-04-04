# Alyasar Jabbarli | Software Engineer & Data Engineer

A high-performance, interactive personal portfolio bridging the gap between Data Science and modern Frontend Architecture. Built to handle complex WebGL graphics and D3 physics engines while maintaining perfect 60fps animations and robust SEO.

![Next.js](https://img.shields.io/badge/Next.js_16.2-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white)
![Sanity](https://img.shields.io/badge/Sanity_CMS-F03E2F?style=for-the-badge&logo=sanity&logoColor=white)

## ✨ Core Architecture & Features

This project abandons standard template layouts in favor of a heavily engineered, custom interface:

- **Decoupled Data Layer:** Powered by an embedded **Sanity Studio** CMS. Projects, experience, and education timelines are statically generated via React Server Components (RSCs) for zero layout shift and instantaneous load times.
- **WebGL Data Network:** The hero section utilizes `Three.js` and `@react-three/fiber` to render an interactive, 1,500-node 3D particle sphere that rotates and recalculates in real-time.
- **Physics-Driven Ecosystem:** The skills section replaces static lists with a **D3.js** force-directed graph. Nodes repel, connect via invisible springs, and can be dragged organically while respecting collision bounding boxes. Optimized via direct DOM mutation to bypass React state lag.
- **Linear-Style Interactions:** Bento grid cards utilize custom `mousemove` event listeners mapped to CSS variables to create dynamic, glassmorphic spotlight effects that track the cursor.
- **Cinematic Typography:** Custom `<MaskedText />` components leverage Framer Motion to slide text out of invisible clipping boundaries, complete with automated dual-tone styling.

## 🛠️ Tech Stack

* **Framework:** Next.js 16.2 (App Router, Turbopack)
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4 (Custom CSS Variable Architecture)
* **Animations:** Framer Motion
* **3D/Graphics:** React Three Fiber, Three.js
* **Physics:** D3.js (Force, Drag, Selection)
* **CMS:** Sanity.io (Embedded at `/studio`)
* **Icons:** Lucide React & Custom SVGs

## 🚀 Local Development

Follow these steps to run the portfolio and the embedded CMS locally.

### 1. Clone the repository
```bash
git clone [https://github.com/yourusername/alyasar-portfolio.git](https://github.com/yourusername/alyasar-portfolio.git)
cd alyasar-portfolio
````

### 2\. Install dependencies

```bash
npm install
```

### 3\. Setup Environment Variables

Create a `.env.local` file in the root directory and add your Sanity project details:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
```

*(You can find your Project ID at [manage.sanity.io](https://manage.sanity.io))*

### 4\. Start the Development Server

```bash
npm run dev
```

The frontend will be available at [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 📝 Managing Content (Sanity CMS)

This portfolio relies on an embedded Headless CMS so you never have to touch the source code to update your resume.

1.  Navigate to [http://localhost:3000/studio](https://www.google.com/search?q=http://localhost:3000/studio).
2.  Log in using your authorized provider (Google/GitHub).
3.  Add, edit, or delete documents under the **Experience**, **Project**, and **Education** tabs.
4.  Hit **Publish**. The frontend uses dynamic GROQ queries to instantly fetch and render the new data.

## 🎨 Design System

The UI relies on a dark-mode-first color palette defined in `globals.css`:

  - `--color-obsidian`: Deep background `#0A0A0A`
  - `--color-snow`: Primary text `#FFFFFF`
  - `--color-electric-cyan`: Primary accent `#00F0FF`

## 📄 License

Designed and developed by Alyasar Jabbarli. All rights reserved.

