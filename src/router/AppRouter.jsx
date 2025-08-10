import { Route, Routes } from 'react-router-dom'

import { ContractAnalysis } from '../features/contract-analysis/pages/ContractAnalysis'

import { ROUTES } from './routes.constant'

const routes = [
  { path: ROUTES.HOME, element: <div>home</div> },
  { path: ROUTES.CONTRACT_ANALYSIS, element: <ContractAnalysis /> },
]

export const AppRouter = () => {
  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  )
}
