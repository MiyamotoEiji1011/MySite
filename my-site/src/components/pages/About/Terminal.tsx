import { useState, useEffect } from 'react';
import './Terminal.css';

type TerminalLine = {
  type: 'command' | 'output' | 'success' | 'info';
  text: string;
  delay?: number;
};

const terminalContent: TerminalLine[] = [
  { type: 'command', text: '$ whoami', delay: 500 },
  { type: 'output', text: 'Miyamoto Eiji (宮本 映児)', delay: 100 },
  { type: 'info', text: 'Engineer | Robotics & Web Developer', delay: 100 },
  { type: 'command', text: '$', delay: 300 },
  { type: 'command', text: '$ cat interests.txt', delay: 500 },
  { type: 'output', text: '🤖 ロボット開発', delay: 100 },
  { type: 'output', text: '💻 Webアプリケーション開発', delay: 100 },
  { type: 'output', text: '📚 NPO活動・STEM教育', delay: 100 },
  { type: 'output', text: '⚡ IoT・組み込みシステム', delay: 100 },
  { type: 'command', text: '', delay: 500 },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines >= terminalContent.length) return;

    const currentLine = terminalContent[visibleLines];
    const timer = setTimeout(() => {
      setVisibleLines(prev => prev + 1);
    }, currentLine.delay || 0);

    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <section className="terminal">
      <div className="terminal__frame">
        <div className="terminal__editor">
          <div className="terminal__header">
            <div className="terminal__buttons">
              <span className="terminal__button terminal__button--red"></span>
              <span className="terminal__button terminal__button--yellow"></span>
              <span className="terminal__button terminal__button--green"></span>
            </div>
            <div className="terminal__title">terminal — bash — 80×24</div>
            <div className="terminal__spacer"></div>
          </div>
          <div className="terminal__body">
            {terminalContent.slice(0, visibleLines).map((line, index) => (
              <div key={index} className={`terminal__line terminal__line--${line.type}`}>
                {line.type === 'command' && line.text && (
                  <>
                    <span className="terminal__prompt">➜</span>
                    <span className="terminal__path">~</span>
                    {line.text}
                  </>
                )}
                {line.type === 'command' && !line.text && (
                  <>
                    <span className="terminal__prompt">➜</span>
                    <span className="terminal__path">~</span>
                    <span className="terminal__cursor">█</span>
                  </>
                )}
                {line.type === 'output' && line.text}
                {line.type === 'success' && line.text}
                {line.type === 'info' && line.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
