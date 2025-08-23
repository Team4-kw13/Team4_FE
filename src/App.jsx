import { useEffect, useState } from 'react'

import { Splash } from './features/splash/pages/Splash'
import { AppRouter } from './router/AppRouter'

import styles from './App.module.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.app}>
      {showSplash ? (
        <Splash />
      ) : (
        <div className={styles.container}>
          <AppRouter />
        </div>
      )}
      <Splash />
    </div>
  )
}

export default App
