import './ProfileCard.css';

export default function ProfileCard() {
  return (
    <div className="card">
      <div className="card__img">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%">
          <rect fill="#ffffff" width="540" height="450"></rect>
          <defs>
            <linearGradient id="a" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="100%" gradientTransform="rotate(222,648,379)">
              <stop offset="0" stopColor="#ffffff"></stop>
              <stop offset="1" stopColor="#00dfc1ff"></stop>
            </linearGradient>
            <pattern patternUnits="userSpaceOnUse" id="b" width="300" height="250" x="0" y="0" viewBox="0 0 1080 900">
              <g fillOpacity="0.5">
                <polygon fill="#444" points="90 150 0 300 180 300"></polygon>
                <polygon points="90 150 180 0 0 0"></polygon>
                <polygon fill="#AAA" points="270 150 360 0 180 0"></polygon>
                <polygon fill="#DDD" points="450 150 360 300 540 300"></polygon>
                <polygon fill="#999" points="450 150 540 0 360 0"></polygon>
                <polygon points="630 150 540 300 720 300"></polygon>
                <polygon fill="#DDD" points="630 150 720 0 540 0"></polygon>
                <polygon fill="#444" points="810 150 720 300 900 300"></polygon>
                <polygon fill="#FFF" points="810 150 900 0 720 0"></polygon>
                <polygon fill="#DDD" points="990 150 900 300 1080 300"></polygon>
                <polygon fill="#444" points="990 150 1080 0 900 0"></polygon>
                <polygon fill="#DDD" points="90 450 0 600 180 600"></polygon>
                <polygon points="90 450 180 300 0 300"></polygon>
                <polygon fill="#666" points="270 450 180 600 360 600"></polygon>
                <polygon fill="#AAA" points="270 450 360 300 180 300"></polygon>
                <polygon fill="#DDD" points="450 450 360 600 540 600"></polygon>
                <polygon fill="#999" points="450 450 540 300 360 300"></polygon>
                <polygon fill="#999" points="630 450 540 600 720 600"></polygon>
                <polygon fill="#FFF" points="630 450 720 300 540 300"></polygon>
                <polygon points="810 450 720 600 900 600"></polygon>
                <polygon fill="#DDD" points="810 450 900 300 720 300"></polygon>
                <polygon fill="#AAA" points="990 450 900 600 1080 600"></polygon>
                <polygon fill="#444" points="990 450 1080 300 900 300"></polygon>
                <polygon fill="#222" points="90 750 0 900 180 900"></polygon>
                <polygon points="270 750 180 900 360 900"></polygon>
                <polygon fill="#DDD" points="270 750 360 600 180 600"></polygon>
                <polygon points="450 750 540 600 360 600"></polygon>
                <polygon points="630 750 540 900 720 900"></polygon>
                <polygon fill="#444" points="630 750 720 600 540 600"></polygon>
                <polygon fill="#AAA" points="810 750 720 900 900 900"></polygon>
                <polygon fill="#666" points="810 750 900 600 720 600"></polygon>
                <polygon fill="#999" points="990 750 900 900 1080 900"></polygon>
                <polygon fill="#999" points="180 0 90 150 270 150"></polygon>
                <polygon fill="#444" points="360 0 270 150 450 150"></polygon>
                <polygon fill="#FFF" points="540 0 450 150 630 150"></polygon>
                <polygon points="900 0 810 150 990 150"></polygon>
                <polygon fill="#222" points="0 300 -90 450 90 450"></polygon>
                <polygon fill="#FFF" points="0 300 90 150 -90 150"></polygon>
                <polygon fill="#FFF" points="180 300 90 450 270 450"></polygon>
                <polygon fill="#666" points="180 300 270 150 90 150"></polygon>
                <polygon fill="#222" points="360 300 270 450 450 450"></polygon>
                <polygon fill="#FFF" points="360 300 450 150 270 150"></polygon>
                <polygon fill="#444" points="540 300 450 450 630 450"></polygon>
                <polygon fill="#222" points="540 300 630 150 450 150"></polygon>
                <polygon fill="#AAA" points="720 300 630 450 810 450"></polygon>
                <polygon fill="#666" points="720 300 810 150 630 150"></polygon>
                <polygon fill="#FFF" points="900 300 810 450 990 450"></polygon>
                <polygon fill="#999" points="900 300 990 150 810 150"></polygon>
                <polygon points="0 600 -90 750 90 750"></polygon>
                <polygon fill="#666" points="0 600 90 450 -90 450"></polygon>
                <polygon fill="#AAA" points="180 600 90 750 270 750"></polygon>
                <polygon fill="#444" points="180 600 270 450 90 450"></polygon>
                <polygon fill="#444" points="360 600 270 750 450 750"></polygon>
                <polygon fill="#999" points="360 600 450 450 270 450"></polygon>
                <polygon fill="#666" points="540 600 630 450 450 450"></polygon>
                <polygon fill="#222" points="720 600 630 750 810 750"></polygon>
                <polygon fill="#FFF" points="900 600 810 750 990 750"></polygon>
                <polygon fill="#222" points="900 600 990 450 810 450"></polygon>
                <polygon fill="#DDD" points="0 900 90 750 -90 750"></polygon>
                <polygon fill="#444" points="180 900 270 750 90 750"></polygon>
                <polygon fill="#FFF" points="360 900 450 750 270 750"></polygon>
                <polygon fill="#AAA" points="540 900 630 750 450 750"></polygon>
                <polygon fill="#FFF" points="720 900 810 750 630 750"></polygon>
                <polygon fill="#222" points="900 900 990 750 810 750"></polygon>
                <polygon fill="#222" points="1080 300 990 450 1170 450"></polygon>
                <polygon fill="#FFF" points="1080 300 1170 150 990 150"></polygon>
                <polygon points="1080 600 990 750 1170 750"></polygon>
                <polygon fill="#666" points="1080 600 1170 450 990 450"></polygon>
                <polygon fill="#DDD" points="1080 900 1170 750 990 750"></polygon>
              </g>
            </pattern>
          </defs>
          <rect x="0" y="0" fill="url(#a)" width="100%" height="100%"></rect>
          <rect x="0" y="0" fill="url(#b)" width="100%" height="100%"></rect>
        </svg>
      </div>
      <div className="card__avatar">
        <img 
          src="/images/profile/profile_image.png" 
          alt="プロフィール画像" 
          style={{
            width: '128px',
            height: '128px',
            borderRadius: '50%', // これで正円になります
            objectFit: 'cover',   // 画像が歪まないように調整
            border: '4px solid #000000ff' // 元のSVGにあった外枠の色
          }} 
        />
      </div>
      <div className="card__title">Miyamoto Eiji</div>
      <div className="card__subtitle">Robot & Iot & Web Development</div>
      <div className="card__wrapper">
        <a href="https://www.youtube.com/@MiyamotoEiji112" target="_blank" rel="noopener noreferrer" className="card__btn card__btn-youtube">
          <svg className="card__btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          YouTube
        </a>
        <a href="https://x.com/EIJI_1011" target="_blank" rel="noopener noreferrer" className="card__btn card__btn-x">
          <svg className="card__btn-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </a>
      </div>
    </div>
  );
}
