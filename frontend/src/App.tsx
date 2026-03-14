import './App.css'
import { useEffect, useState } from 'react'
import BowlerTable, { type Bowler } from './BowlerTable'
import Heading from './Heading'

function App() {
  // Store the API data and simple UI status flags.
  const [bowlers, setBowlers] = useState<Bowler[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load the assignment data from the ASP.NET API.
    const loadBowlers = async () => {
      try {
        const response = await fetch('/api/bowlers')
        if (!response.ok) {
          throw new Error(`Failed to load data (${response.status})`)
        }

        const data = (await response.json()) as Bowler[]
        setBowlers(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load bowlers.')
      } finally {
        setIsLoading(false)
      }
    }

    loadBowlers()
  }, [])

  return (
    <main className="app-container">
      <Heading />
      {isLoading && <p>Loading bowlers...</p>}
      {!isLoading && error && <p className="error">{error}</p>}
      {!isLoading && !error && <BowlerTable bowlers={bowlers} />}
    </main>
  )
}

export default App
