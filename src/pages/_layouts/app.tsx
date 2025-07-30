import { Outlet } from 'react-router-dom'
import { Logo } from '@/components/logo'
import { ModeToggle } from '@/components/mode-toggle'

export function AppLayout() {
  return (
    <div className="min-h-screen w-screen font-sans">
      <header className="border-accent-foreground bg-card py-6 text-card-foreground shadow-sm">
        <nav className="mx-auto flex max-w-4xl items-center justify-between">
          <Logo />

          <ModeToggle />
        </nav>
      </header>

      <main className="mx-auto max-w-4xl px-2 py-4">
        <Outlet />
      </main>
    </div>
  )
}
