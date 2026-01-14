import { Link } from 'react-router-dom';
import './index.css';

export interface ArticleCardProps {
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
  href: string;
}

/**
 * 記事カードコンポーネント
 * Activity、Projectなど様々な場所で再利用可能
 */
export default function ArticleCard({
  title,
  date,
  tags,
  excerpt,
  href,
}: ArticleCardProps) {
  return (
    <Link to={href} className="article-card">
      <div className="article-card-main-content">
        {date && (
          <div className="article-card-header">
            <span>Article on</span>
            <span>{formatDate(date)}</span>
          </div>
        )}
        <p className="article-card-heading">{title}</p>
        <div className="article-card-categories">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {excerpt && <div className="article-card-excerpt">{excerpt}</div>}
      </div>
    </Link>
  );
}

/**
 * 日付フォーマット: YYYY-MM-DD → DD-Month-YYYY
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch {
    return dateString;
  }
}
