import { useState, useMemo, useEffect } from 'react';
import { getActivities, filterActivities, getAllTags } from '../../../lib/activities';
import ArticleCard from '../../ui/ArticleCard';
import AnimatedTitle from '../../ui/AnimatedTitle';
import './index.css';

const ITEMS_PER_PAGE = 9;

export default function ActivityPage() {
  // 全記事を取得
  const allActivities = useMemo(() => getActivities(), []);

  // 全タグを取得
  const allTags = useMemo(() => getAllTags(), []);

  // 検索状態
  const [searchWord, setSearchWord] = useState('');
  const [searchTag, setSearchTag] = useState('');

  // ページネーション状態
  const [currentPage, setCurrentPage] = useState(1);

  // フィルタリングされた記事一覧
  const filteredActivities = useMemo(() => {
    return filterActivities(allActivities, searchWord, searchTag);
  }, [allActivities, searchWord, searchTag]);

  // 検索条件が変更されたらページを1に戻す
  useEffect(() => {
    setCurrentPage(1);
  }, [searchWord, searchTag]);

  // ページネーション計算
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  // ページ変更ハンドラ
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="activity-container">
      <div className="activity-content">
        <div className="activity-header">
          <AnimatedTitle text="activity" autoAnimate={false} />
        </div>

        {/* 検索UI - コンソール風 */}
        <div className="console-search">
          <div className="console-header">
            <span className="console-title">
              <span className="material-icons">terminal</span>
              search_query
            </span>
            <div className="console-dots">
              <span className="dot"></span>
              <span className="dot"></span>
              <span className="dot"></span>
            </div>
          </div>

          <div className="console-body">
            <div className="search-line">
              <span className="prompt">$</span>
              <span className="command">検索</span>
              <span className="flag">-i</span>
              <div className="input-wrapper">
                <input
                  id="search-word"
                  type="text"
                  placeholder="keyword..."
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  className="console-input"
                />
              </div>
            </div>

            <div className="search-line">
              <span className="prompt">$</span>
              <span className="command">フィルタ</span>
              <span className="flag">--tag</span>
              <div className="select-wrapper">
                <select
                  id="search-tag"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="console-select"
                >
                  <option value="">all</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
                <span className="material-icons select-icon">arrow_drop_down</span>
              </div>
            </div>
          </div>
        </div>

        {/* 検索結果の件数表示 - コンソール風 */}
        <div className="console-output">
          <span className="output-label">
            <span className="material-icons">search</span>
            Results:
          </span>
          <span className="output-value">
            {filteredActivities.length} articles found
            {(searchWord || searchTag) && ` (total: ${allActivities.length})`}
            {totalPages > 1 && ` | Page ${currentPage}/${totalPages}`}
          </span>
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="pagination">

            <div className="pagination-controls">
              <button
                className="pagination-btn pagination-btn--prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <span className="material-icons">chevron_left</span>
                <span className="btn-text">prev</span>
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // 最初、最後、現在のページ周辺のみ表示
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn pagination-btn--next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <span className="btn-text">next</span>
                <span className="material-icons">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* 記事カード一覧 */}
        <div className="activity-grid">
          {filteredActivities.length === 0 ? (
            <p className="no-results">該当する記事が見つかりませんでした。</p>
          ) : (
            currentActivities.map((activity) => (
              <ArticleCard
                key={activity.slug}
                title={activity.title}
                date={activity.date}
                tags={activity.tags}
                excerpt={activity.excerpt}
                href={`/activity/${activity.slug}`}
              />
            ))
          )}
        </div>

        {/* ページネーション */}
        {totalPages > 1 && (
          <div className="pagination">

            <div className="pagination-controls">
              <button
                className="pagination-btn pagination-btn--prev"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <span className="material-icons">chevron_left</span>
                <span className="btn-text">prev</span>
              </button>

              <div className="pagination-pages">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // 最初、最後、現在のページ周辺のみ表示
                  const showPage =
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1);

                  const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                  const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                  if (showEllipsisBefore || showEllipsisAfter) {
                    return (
                      <span key={`ellipsis-${page}`} className="pagination-ellipsis">
                        ...
                      </span>
                    );
                  }

                  if (!showPage) return null;

                  return (
                    <button
                      key={page}
                      className={`pagination-page ${page === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === currentPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn pagination-btn--next"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <span className="btn-text">next</span>
                <span className="material-icons">chevron_right</span>
              </button>
            </div>

            <div className="pagination-info">
              <span className="prompt">$</span>
              <span className="command">navigate</span>
              <span className="flag">--page</span>
              <span className="page-indicator">{currentPage}/{totalPages}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
