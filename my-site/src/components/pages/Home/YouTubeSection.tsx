import './YouTubeSection.css';

export type VideoData = {
  id: string;
};

type YouTubeSectionProps = {
  videos: VideoData[];
  channelUrl: string;
  channelName: string;
};

export default function YouTubeSection({ videos, channelUrl, channelName }: YouTubeSectionProps) {
  // 最初の3つだけを表示するように制限
  const displayVideos = videos.slice(0, 6);

  return (
    <section className="minimal-video-section">
      <div className="minimal-video-section__container">
        <div className="minimal-video-section__content">
          <a
            href={channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="minimal-video-section__profile-link"
          >
            <svg className="minimal-video-section__icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>{channelName}</span>
          </a>

          <div className="minimal-video-grid">
            {displayVideos.map((video) => (
              <div key={video.id} className="minimal-video-card">
                <div className="video-aspect-box">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`video-${video.id}`}
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}