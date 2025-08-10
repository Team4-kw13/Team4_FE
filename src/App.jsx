import { AppRouter } from './router/AppRouter'

import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <AppRouter />
      </div>
    </div>
  )
}

export default App
