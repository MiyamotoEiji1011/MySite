import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { Buffer } from 'buffer';

// gray-matterがBufferを使用するため、グローバルに設定
window.Buffer = Buffer;

// Reactアプリを #root に描画するだけのファイル
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
