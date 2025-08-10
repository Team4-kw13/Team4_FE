import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort'
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports'
import globals from 'globals'

export default defineConfig([
  globalIgnores(['dist']),

  js.configs.recommended,
  react.configs.flat.recommended,
  reactHooks.configs['recommended-latest'],
  reactRefresh.configs.vite,
  eslintConfigPrettier,

  {
    files: ['src/**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },

    plugins: {
      react, // react 관련 규칙
      import: eslintPluginImport, // import 검증 (순환/중복/해결 불가 등)
      'unused-imports': eslintPluginUnusedImports, // 미사용 import 자동 처리
      'simple-import-sort': eslintPluginSimpleImportSort, // import 정렬 전용
      'jsx-a11y': eslintPluginJsxA11y, // 접근성 규칙
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
      'import/extensions': ['.js', '.jsx'],
    },

    rules: {
      // ---------- 미사용: import / 변수 분리 ----------
      // 미사용 import는 플러그인이 제거/리포트
      'unused-imports/no-unused-imports': 'error',
      // 플러그인의 "변수" 경고는 끄고, 기본 no-unused-vars로 변수만 검사
      'unused-imports/no-unused-vars': 'off',
      'no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: true,
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],

      // ---------- React ----------
      // JSX에서 React import 강제하지 않음
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',

      // ---------- import 검증 ----------
      // 모듈 해석 실패 금지 (별칭/경로 문제 즉시 탐지)
      'import/no-unresolved': ['error', { commonjs: true }],
      // 순환 참조 금지
      'import/no-cycle': 'error',
      // 중복 import 금지
      'import/no-duplicates': 'warn',
      // import 뒤에는 한 줄 공백 권장
      'import/newline-after-import': 'warn',
      // default export와 named 충돌 경고 해제
      'import/no-named-as-default': 'off',
      // 확장자 정책 명시: JS/JSX는 확장자 없이 import
      'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never' }],

      // ---------- 정렬: simple-import-sort ----------
      // import/order는 사용하지 않음 (충돌 방지)
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1) react 우선, 그다음 외부 패키지
            ['^react$', '^@?\\w'],
            // 2) 절대 경로 alias (@/)
            ['^@/'],
            // 3) 부모 경로
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            // 4) 현재 디렉토리
            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            // 5) 스타일 파일
            ['^.+\\.s?css$'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
])
