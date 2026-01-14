import { useEffect, useRef, useState } from 'react';
import './index.css';

type AnimatedTitleProps = {
  text: string;
  className?: string;
  autoAnimate?: boolean;
  animationInterval?: number; // ミリ秒単位
};

export default function AnimatedTitle({
  text,
  className = '',
  autoAnimate = true,
  animationInterval = 0,
}: AnimatedTitleProps) {
  const [isActive, setIsActive] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 初期アニメーション
    const initialTimer = setTimeout(() => {
      setIsActive(true);
    }, 100);

    // 自動アニメーション（オプション）
    let intervalTimer: ReturnType<typeof setInterval> | null = null;
    if (autoAnimate && animationInterval > 0) {
      intervalTimer = setInterval(() => {
        setIsActive(prev => !prev);
      }, animationInterval);
    }

    return () => {
      clearTimeout(initialTimer);
      if (intervalTimer) clearInterval(intervalTimer);
    };
  }, [autoAnimate, animationInterval]);

  // テキストを文字とスペースに分割
  const renderText = () => {
    let charIndex = 0;
    const chars = text.split('').map((char, index) => {
      if (char === ' ') {
        return <span key={index} className="animated-title__whitespace">&nbsp;</span>;
      }
      const currentIndex = charIndex;
      charIndex++;
      return (
        <span key={index} className="animated-title__char" style={{ '--char-index': currentIndex } as React.CSSProperties}>
          <span className="animated-title__char-text">{char}</span>
        </span>
      );
    });
    return chars;
  };

  return (
    <div className={`animated-title ${className}`.trim()}>
      <div className="animated-title__headline">
        {/* アクセシビリティ用の非表示テキスト */}
        <div className="animated-title__visually-hidden">{text}</div>

        {/* アニメーション表示用テキスト */}
        <div
          ref={textRef}
          className={`animated-title__text ${isActive ? 'is-active' : ''}`}
          aria-hidden="true"
        >
          {renderText()}
        </div>
      </div>
    </div>
  );
}
