import { Route, Routes } from 'react-router-dom'

import { ROUTES } from './routes.constant'

const routes = [{ path: ROUTES.HOME, element: <div>home</div> }]

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}
