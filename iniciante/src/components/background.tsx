import type { ReactNode } from 'react'

interface BackgroundProps {
  children: ReactNode
}

export function Background({ children }: BackgroundProps) {
  return (
    <main className="h-auto min-h-screen bg-[url(./assets/bg.svg)] bg-cover">
      {children}
    </main>
  )
}
