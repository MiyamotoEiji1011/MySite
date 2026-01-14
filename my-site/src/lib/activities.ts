import matter from 'gray-matter';

// 記事のメタデータ型定義
export interface ActivityMeta {
  title: string;
  date: string;
  tags: string[];
  slug: string;
}

// 記事の全データ型定義（メタ + 本文）
export interface Activity extends ActivityMeta {
  content: string;
  excerpt: string;
  images: Record<string, string>; // 記事フォルダ内の画像マップ（ファイル名 → URL）
}

// IMPORTANT: Viteの import.meta.glob を使用してMarkdownファイルを読み込み
// eager: true → ビルド時に全ファイルを即座に読み込む
// as: 'raw' → ファイル内容を文字列として取得
const activityFiles = import.meta.glob<string>(
  '/content/activities/**/index.md',
  { eager: true, as: 'raw' }
);

// 記事フォルダ内の画像を読み込み
// import: 'default' → Viteが処理した画像URLを取得
const activityImages = import.meta.glob<string>(
  '/content/activities/**/*.{png,jpg,jpeg,gif,svg,webp}',
  { eager: true, import: 'default' }
);

/**
 * 本文から抜粋（excerpt）を生成
 * frontmatterとMarkdown記法を除去し、最初の150文字を取得
 */
function generateExcerpt(content: string): string {
  // frontmatter部分を削除（--- で囲まれた部分）
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---/, '').trim();

  // Markdown記法を削除（見出し、リスト記号など）
  const plainText = withoutFrontmatter
    .replace(/^#+\s+/gm, '') // 見出し記号を削除
    .replace(/^\*\s+/gm, '') // リスト記号を削除
    .replace(/^-\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '') // 番号付きリスト
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // リンクはテキスト部分だけ残す
    .replace(/[*_`]/g, '') // 強調記号を削除
    .trim();

  // 最初の150文字を取得
  return plainText.length > 130
    ? plainText.substring(0, 130) + '...'
    : plainText;
}

/**
 * 全記事を取得し、日付降順でソート
 */
export function getActivities(): Activity[] {
  const activities: Activity[] = [];

  // 各Markdownファイルを処理
  Object.entries(activityFiles).forEach(([filepath, rawContent]) => {
    // gray-matterでfrontmatterと本文を分離
    const { data, content } = matter(rawContent);

    // 型安全のためにメタデータを検証
    const meta = data as ActivityMeta;

    if (!meta.title || !meta.date || !meta.slug) {
      console.warn(`Invalid frontmatter in ${filepath}`);
      return;
    }

    // 記事フォルダのパスを取得（例: /content/activities/2026/2026-01-12/index.md → /content/activities/2026/2026-01-12）
    const articleDir = filepath.replace('/index.md', '');

    // この記事フォルダ内の画像を収集
    const images: Record<string, string> = {};
    Object.entries(activityImages).forEach(([imagePath, imageUrl]) => {
      // 画像が同じフォルダ内にあるかチェック
      if (imagePath.startsWith(articleDir + '/')) {
        // ファイル名を抽出（例: /content/activities/2026/2026-01-12/image.png → image.png）
        const fileName = imagePath.split('/').pop() || '';
        images[fileName] = imageUrl;
      }
    });

    activities.push({
      ...meta,
      tags: meta.tags || [],
      content,
      excerpt: generateExcerpt(rawContent),
      images,
    });
  });

  // 日付降順でソート（新しい記事が先頭）
  return activities.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

/**
 * スラッグから特定の記事を取得
 */
export function getActivityBySlug(slug: string): Activity | undefined {
  const activities = getActivities();
  return activities.find(activity => activity.slug === slug);
}

/**
 * 全記事から使用されているタグ一覧を取得（重複なし）
 */
export function getAllTags(): string[] {
  const activities = getActivities();
  const tagsSet = new Set<string>();

  activities.forEach(activity => {
    activity.tags.forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
}

/**
 * 検索フィルタリング
 * @param activities 記事一覧
 * @param searchWord 検索ワード（title, excerpt, contentを対象）
 * @param searchTag タグ検索（部分一致）
 */
export function filterActivities(
  activities: Activity[],
  searchWord: string,
  searchTag: string
): Activity[] {
  let filtered = activities;

  // ワード検索（大文字小文字を無視）
  if (searchWord.trim()) {
    const lowerSearchWord = searchWord.toLowerCase();
    filtered = filtered.filter(activity => {
      const titleMatch = activity.title.toLowerCase().includes(lowerSearchWord);
      const excerptMatch = activity.excerpt.toLowerCase().includes(lowerSearchWord);
      const contentMatch = activity.content.toLowerCase().includes(lowerSearchWord);
      return titleMatch || excerptMatch || contentMatch;
    });
  }

  // タグ検索（完全一致）
  if (searchTag.trim()) {
    filtered = filtered.filter(activity => {
      return activity.tags.includes(searchTag);
    });
  }

  return filtered;
}
