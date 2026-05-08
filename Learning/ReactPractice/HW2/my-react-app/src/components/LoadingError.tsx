import type { ReactNode } from 'react'

interface LoadingErrorProps {
  loading: boolean
  error: Error | null
  children: ReactNode
}

export default function LoadingError({ loading, error, children }: LoadingErrorProps) {
  if (loading) return <div className="panel">Loading...</div>
  if (error) return <div className="panel">Error: {error.message}</div>
  return <>{children}</>
}
