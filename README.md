# Let me Ask Web

This is the frontend application for the full-stack project [Let me Ask API](https://github.com/lucastenani/let-me-ask-api). It provides the user interface and consumes the backend API.

## 🔗 Backend repository: [Let me Ask API](https://github.com/lucastenani/let-me-ask-api)

## 🛠️ Tech Stack

- **React 19.1** – UI library for building interactive interfaces
- **TypeScript 5.8** – Statically typed JavaScript superset
- **Vite 7.0** – Fast development server and bundler
- **TailwindCSS 4.1** – Utility-first CSS framework
- **React Router DOM 7.7** – Client-side routing
- **TanStack React Query 5.8** – Server state and cache management
- **Radix UI** – Accessible low-level UI primitives
- **shadcn/ui** – Component system built on Radix
- **Lucide React** – Icon library

## 🧱 Project Patterns

- **Component-based Architecture** – Modular, reusable React components
- **File-based Routing** – Page-based navigation using React Router
- **Server State Management** – Data fetching and caching with React Query
- **Composition Pattern** – Composable UI using Radix Slot
- **Path Aliasing** – Use `@/` as alias for `src/` folder

## ⚙️ Project Setup

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/lucastenani/let-me-ask-web.git
cd let-me-ask-web
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will be available at: [http://localhost:5173](http://localhost:5173)

## 📚 Available Scripts

- `npm run dev` – Starts the development server
- `npm run build` – Builds the app for production
- `npm run preview` – Previews the production build

## 🌐 Backend Requirement

The frontend expects the API to be available at `http://localhost:3333`.  
Make sure the backend is properly configured and running before starting the frontend.

## 🛠️ Project Structure

```
src/
├── components/ui/    # Componentes de interface
├── pages/           # Páginas da aplicação
├── lib/             # Utilitários e configurações
└── app.tsx          # Componente raiz
```
