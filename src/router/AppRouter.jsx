import { Route, Routes } from 'react-router-dom'

import { AnalysisHistory } from '../features/analysis-history/pages/AnalysisHistory'
import { ContractAnalysis } from '../features/contract-analysis/pages/ContractAnalysis'
import { ListLawyer } from '../features/list-lawyer/pages/ListLawyer'
import { ListSite } from '../features/list-site/pages/ListSite'
import { MyPage } from '../features/mypage/pages/MyPage'

import { ROUTES } from './routes.constant'

const routes = [
  { path: ROUTES.HOME, element: <div>home</div> },
  { path: ROUTES.CONTRACT_ANALYSIS, element: <ContractAnalysis /> },
  { path: ROUTES.MYPAGE, element: <MyPage /> },
  { path: ROUTES.LIST_SITE, element: <ListSite /> },
  { path: ROUTES.LIST_LAWYER, element: <ListLawyer /> },
  { path: ROUTES.ANALYSIS_HISTORY, element: <AnalysisHistory /> },
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
