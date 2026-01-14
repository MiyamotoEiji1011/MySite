import { useEffect } from 'react';
import './XSection.css';

type XSectionProps = {
  username: string;
  profileUrl: string;
};

export default function XSection({ username, profileUrl }: XSectionProps) {
  useEffect(() => {
    // 1. スクリプトの重複読み込みを防ぐためのID
    const scriptId = 'elfsight-platform-script';
    
    // 2. すでにスクリプトが存在するか確認
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      // ユーザー提供の新しいURLを使用
      script.src = "https://elfsightcdn.com/platform.js"; 
      script.id = scriptId;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="x-section">
      <div className="x-section__container">
        <div className="x-section__content">
          <a
            href={profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="x-section__profile-link"
          >
            <svg className="x-section__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>@{username}</span>
          </a>

          <div className="x-section__widget">
            {/* 修正：最新の正しいウィジェットIDを反映 */}
            <div 
              className="elfsight-app-a3a38186-5b28-43d1-b8ae-4ad2b6562c42" 
              data-elfsight-app-lazy
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}