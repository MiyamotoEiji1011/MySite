import { useEffect, useRef } from 'react';
import './index.css';

const CodeBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // キャンバスサイズを設定
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // コード文字列（プログラミング言語のキーワードや記号）
    const codeChars = 'const let var function => class import export async await return if else for while{}[]()<>=+-*/&|!01';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // 各列の位置を追跡
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    // 描画関数
    const draw = () => {
      // 半透明の背景色で前のフレームを薄く塗りつぶす（トレイル効果）
      ctx.fillStyle = 'rgba(245, 245, 245, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // テキストスタイル - より見やすく濃い色に変更
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      // 各列にコードを描画
      for (let i = 0; i < drops.length; i++) {
        const text = codeChars[Math.floor(Math.random() * codeChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        // ランダムにリセット
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    // アニメーションループ
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="code-background" />;
};

export default CodeBackground;
