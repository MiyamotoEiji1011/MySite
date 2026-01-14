import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { getActivityBySlug } from '../../../lib/activities';
import { incrementViewCount } from '../../../lib/viewCount';
import './ActivityDetail.css';

export default function ActivityDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [viewCount, setViewCount] = useState<number | null>(null);

  // slugから記事を取得
  const activity = slug ? getActivityBySlug(slug) : null;

  // 閲覧数をインクリメント
  useEffect(() => {
    if (slug && activity) {
      incrementViewCount(slug)
        .then(setViewCount)
        .catch((error) => {
          console.error('Failed to update view count:', error);
        });
    }
  }, [slug, activity]);

  // slugが存在しない場合は404扱い
  if (!slug) {
    return <Navigate to="/activity" replace />;
  }

  // 記事が見つからない場合は一覧へリダイレクト
  if (!activity) {
    return (
      <div className="activity-detail-container">
        <div className="activity-detail-content">
          <h1>記事が見つかりません</h1>
          <p>指定された記事は存在しないか、削除された可能性があります。</p>
          <Link to="/activity" className="back-link">
            ← 記事一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // YouTubeのURLからビデオIDを抽出
  const extractYouTubeId = (url: string): string | null => {
    // youtube.com/watch?v=VIDEO_ID 形式
    const watchMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/);
    if (watchMatch) return watchMatch[1];

    // youtu.be/VIDEO_ID 形式
    const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (shortMatch) return shortMatch[1];

    // youtube.com/embed/VIDEO_ID 形式
    const embedMatch = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
    if (embedMatch) return embedMatch[1];

    return null;
  };

  // ReactMarkdownのカスタムコンポーネント：画像の相対パスを解決、YouTubeを埋め込み
  const markdownComponents: Components = {
    img: ({ node, src, alt, ...props }) => {
      // 相対パス（./で始まる）の場合、記事フォルダ内の画像から解決
      if (src && src.startsWith('./')) {
        const fileName = src.replace('./', '');
        const resolvedSrc = activity.images[fileName];

        if (resolvedSrc) {
          return (
            <img
              src={resolvedSrc}
              alt={alt || ''}
              style={{ maxWidth: '100%', height: 'auto' }}
              {...props}
            />
          );
        }

        // 画像が見つからない場合は警告を出力
        console.warn(`Image not found: ${fileName} in article ${activity.slug}`);
      }

      // 絶対パスや外部URLはそのまま使用（幅も調整）
      return (
        <img
          src={src}
          alt={alt || ''}
          style={{ maxWidth: '100%', height: 'auto' }}
          {...props}
        />
      );
    },
    a: ({ node, href, children, ...props }) => {
      // YouTubeのURLかチェック
      if (href && (href.includes('youtube.com') || href.includes('youtu.be'))) {
        const videoId = extractYouTubeId(href);

        if (videoId) {
          return (
            <div
              style={{
                position: 'relative',
                paddingBottom: '56.25%', // 16:9 アスペクト比
                height: 0,
                overflow: 'hidden',
                maxWidth: '100%',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          );
        }
      }

      // 通常のリンクはそのまま表示
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
          {children}
        </a>
      );
    },
  };

  return (
    <div className="activity-detail-container">
      <div className="activity-detail-content">
        {/* 戻るリンク */}
        <Link to="/activity" className="back-link">
          ← 記事一覧に戻る
        </Link>

        {/* 記事ヘッダー */}
        <header className="article-header">
          <h1>{activity.title}</h1>
          <div className="article-meta">
            <time className="article-date">{activity.date}</time>
            {viewCount !== null && (
              <span className="article-views">{viewCount} views</span>
            )}
            <div className="article-tags">
              {activity.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>

        {/* Markdown本文 */}
        <article className="article-body">
          <ReactMarkdown components={markdownComponents}>
            {activity.content}
          </ReactMarkdown>
        </article>

        {/* フッター：戻るリンク */}
        <footer className="article-footer">
          <Link to="/activity" className="back-link">
            ← 記事一覧に戻る
          </Link>
        </footer>
      </div>
    </div>
  );
}
