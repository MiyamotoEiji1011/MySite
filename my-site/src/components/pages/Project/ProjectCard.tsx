import { Link } from 'react-router-dom';
import type { ProjectData } from '../../../data/projects';
import './ProjectCard.css';

interface EngineerProjectCardProps {
  project: ProjectData;
  articleCount?: number;
  colorIndex?: number; // 0-4のカラーインデックス
}

/**
 * プロジェクトカード
 * カラフルなカードデザインで各プロジェクトを表示
 */
export default function EngineerProjectCard({
  project,
  articleCount = 0,
  colorIndex = 0
}: EngineerProjectCardProps) {
  // カラーバリエーションのクラスを取得（1-5）
  const colorClass = `engineer-card--color-${(colorIndex % 5) + 1}`;

  return (
    <Link to={`/project/${project.slug}`} className={`engineer-card ${colorClass}`}>
      <div className="content">
        {/* プロジェクトアイコン */}
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 9V5H4V9H20ZM20 11H4V19H20V11ZM3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM5 12H8V17H5V12ZM5 6H7V8H5V6ZM9 6H11V8H9V6Z"
          />
        </svg>

        {/* プロジェクトタイトル */}
        <h3 className="engineer-card__title">
          {project.title}
        </h3>

        {/* プロジェクト説明 */}
        <p className="engineer-card__description">
          {project.description}
        </p>

        {/* タグセクション */}
        <div className="engineer-card__tags">
          <span className="tag-badge">{project.tagKey}</span>
        </div>

        {/* メタ情報 */}
        <div className="engineer-card__meta">
          <div className="meta-item">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM14 17H7V15H14V17ZM17 13H7V11H17V13ZM17 9H7V7H17V9Z"/>
            </svg>
            <span className="meta-label">Articles:</span>
            <span className="meta-value">{articleCount} {articleCount === 1 ? 'post' : 'posts'}</span>
          </div>
        </div>

        {/* リンク */}
        <span className="engineer-card__link">
          View Project →
        </span>
      </div>
    </Link>
  );
}
