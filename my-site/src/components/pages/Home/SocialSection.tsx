import './SocialSection.css';

type YouTubeVideo = {
  id: string;
  title: string;
  thumbnail?: string;
};

type Props = {
  youtubeChannelId?: string;
  youtubeChannelName?: string;
  youtubeVideos?: YouTubeVideo[];
  twitterUsername?: string;
  twitterUrl?: string;
};

export default function SocialSection({
  youtubeChannelId,
  youtubeChannelName = "My Channel",
  youtubeVideos = [],
  twitterUsername = "username",
  twitterUrl = "https://twitter.com/username",
}: Props) {
  return (
    <section className="social">
      <div className="social__container">
        
        {/* YouTube Section */}
        <div className="social__block">
          <div className="social__header">
            <svg className="social__icon social__icon--youtube" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <h2 className="social__title">YouTube</h2>
          </div>

          {youtubeChannelId && (
            <a
              href={`https://www.youtube.com/channel/${youtubeChannelId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="social__chip social__chip--youtube"
            >
              <svg className="social__chipIcon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span className="social__chipText">@{youtubeChannelName}</span>
            </a>
          )}

          {youtubeVideos.length > 0 && (
            <div className="social__videos">
              {youtubeVideos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-card-thumbnail">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.title} />
                    ) : (
                      <div className="video-card-thumbnail-placeholder">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="video-card-button"
                  >
                    Watch
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* X (Twitter) Section */}
        <div className="social__block">
          <div className="social__header">
            <svg className="social__icon social__icon--x" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <h2 className="social__title">X (Twitter)</h2>
          </div>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social__chip social__chip--x"
          >
            <svg className="social__chipIcon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="social__chipText">@{twitterUsername}</span>
          </a>

          <div className="social__twitterEmbed">
            <div className="elfsight-app-a3a38186-5b28-43d1-b8ae-4ad2b6562c42" data-elfsight-app-lazy></div>
          </div>
        </div>
      </div>
    </section>
  );
}