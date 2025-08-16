export const ROUTES = Object.freeze({
  ONBOARDING: '/',
  CONTRACT_ANALYSIS: '/contract-analysis',
  MYPAGE: '/mypage',
  LIST_SITE: '/list-site',
  LIST_LAWYER: '/list-lawyer',
  ANALYSIS_HISTORY: (contractId = ':id') => `/analysis-history/${contractId}`,
  LIST_CONTRACT: '/list-contract',
  HOMEPAGE: '/home',
})
