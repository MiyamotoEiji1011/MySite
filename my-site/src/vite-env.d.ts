/// <reference types="vite/client" />

// Viteの import.meta.glob で 'as: raw' を使う際の型定義
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 他の環境変数があればここに追加
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Buffer型定義
interface Window {
  Buffer: typeof import('buffer').Buffer;
}
