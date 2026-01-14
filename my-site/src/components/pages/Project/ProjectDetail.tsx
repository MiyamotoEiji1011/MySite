import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getProjectBySlug, getArticlesByProjectTag } from '../../../lib/projects';
import ArticleCard from '../../ui/ArticleCard';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  // プロジェクト情報を取得
  const project = useMemo(() => {
    if (!slug) return undefined;
    return getProjectBySlug(slug);
  }, [slug]);

  // このプロジェクトに紐づく記事一覧を取得
  const articles = useMemo(() => {
    if (!project) return [];
    return getArticlesByProjectTag(project.tagKey);
  }, [project]);

  // プロジェクトが見つからない場合
  if (!project) {
    return (
      <div className="project-detail-container">
        <div className="project-detail-content">
          <h1>プロジェクトが見つかりません</h1>
          <Link to="/project" className="back-link">
            ← プロジェクト一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="project-detail-container">
      <div className="project-detail-content">
        {/* 戻るリンク */}
        <Link to="/project" className="back-link">
          ← プロジェクト一覧に戻る
        </Link>

        {/* プロジェクト情報 */}
        <div className="project-info">
          <h1>{project.title}</h1>
          <div className="project-tag-key">
            <span className="tag-label">Tag:</span>
            <span className="tag-value">{project.tagKey}</span>
          </div>
          <p className="project-description">{project.description}</p>
        </div>

        {/* 記事一覧 */}
        <div className="project-articles-section">
          <h2>関連記事 ({articles.length}件)</h2>
          <div className="project-articles-grid">
            {articles.length === 0 ? (
              <p className="no-articles">このプロジェクトに関連する記事はまだありません。</p>
            ) : (
              articles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  title={article.title}
                  date={article.date}
                  tags={article.tags}
                  excerpt={article.excerpt}
                  href={`/activity/${article.slug}`}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
