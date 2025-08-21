import { useEffect, useState } from 'react'

import instance from './api/client'
import { Splash } from './features/splash/pages/Splash'
import { AppRouter } from './router/AppRouter'

import styles from './App.module.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000) // 3초

    return () => clearTimeout(timer) // 언마운트 시 클린업
  }, [])

  useEffect(() => {
    const fetch = async () => {
      const res = await instance.get('/api/contracts/0')
      return res
    }
    console.log(fetch())
  })

  return (
    <div className={styles.app}>
      {showSplash ? (
        <Splash />
      ) : (
        <div className={styles.container}>
          <AppRouter />
        </div>
      )}
    </div>
  )
}

export default App
