/**
 * 静的ページ生成スクリプト
 * ビルド後に各ルート用のHTMLを生成し、SEO対応を行う
 * サイトマップとrobots.txtも自動生成
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const contentDir = path.join(__dirname, '..', 'content', 'activities');

// サイトのベースURL
const SITE_URL = 'https://miyamotoeiji.com';

// 静的ルート一覧
const staticRoutes = [
  '/about',
  '/project',
  '/activity',
  '/contact',
];

// プロジェクト一覧（data/projects.ts から手動で同期）
const projectSlugs = [
  'myweb-project',
  'ibis_d1-project',
  'helios-project',
];

/**
 * content/activities から全記事のslugを取得
 */
function getActivitySlugs() {
  const slugs = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        const indexPath = path.join(dir, item.name, 'index.md');
        if (fs.existsSync(indexPath)) {
          // Markdownファイルからslugを抽出
          const content = fs.readFileSync(indexPath, 'utf-8');
          const slugMatch = content.match(/slug:\s*["']?([^"'\n]+)["']?/);
          if (slugMatch) {
            slugs.push(slugMatch[1]);
          }
        }
        // 再帰的にサブディレクトリを検索
        scanDir(path.join(dir, item.name));
      }
    }
  }

  scanDir(contentDir);
  return slugs;
}

/**
 * 指定ルート用のindex.htmlを生成
 */
function generateHtmlForRoute(route) {
  const sourceHtml = path.join(distDir, 'index.html');
  const targetDir = path.join(distDir, route.slice(1)); // 先頭の / を除去
  const targetHtml = path.join(targetDir, 'index.html');

  // ディレクトリ作成
  fs.mkdirSync(targetDir, { recursive: true });

  // index.htmlをコピー
  fs.copyFileSync(sourceHtml, targetHtml);

  console.log(`Generated: ${route}/index.html`);
}

// メイン処理
console.log('Generating static pages...\n');

// 静的ルートを生成
for (const route of staticRoutes) {
  generateHtmlForRoute(route);
}

// プロジェクト詳細ページを生成
for (const slug of projectSlugs) {
  generateHtmlForRoute(`/project/${slug}`);
}

// Activity詳細ページを生成
const activitySlugs = getActivitySlugs();
console.log(`\nFound ${activitySlugs.length} activity articles`);

for (const slug of activitySlugs) {
  generateHtmlForRoute(`/activity/${slug}`);
}

console.log('\nStatic page generation complete!');
console.log(`Total pages: ${staticRoutes.length + projectSlugs.length + activitySlugs.length + 1} (including root)`);

// ==========================================
// サイトマップ生成
// ==========================================

/**
 * 全ルートを収集
 */
function getAllRoutes() {
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'weekly' },
    ...staticRoutes.map(route => ({
      path: route,
      priority: route === '/activity' ? '0.9' : '0.8',
      changefreq: 'weekly'
    })),
    ...projectSlugs.map(slug => ({
      path: `/project/${slug}`,
      priority: '0.7',
      changefreq: 'monthly'
    })),
    ...activitySlugs.map(slug => ({
      path: `/activity/${slug}`,
      priority: '0.6',
      changefreq: 'monthly'
    }))
  ];
  return routes;
}

/**
 * sitemap.xml を生成
 */
function generateSitemap() {
  const routes = getAllRoutes();
  const today = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf-8');
  console.log('\n✓ Generated: sitemap.xml');
  console.log(`  Total URLs: ${routes.length}`);
}

/**
 * robots.txt を生成
 */
function generateRobotsTxt() {
  const robotsTxt = `# robots.txt for ${SITE_URL}
User-agent: *
Allow: /

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml
`;

  const robotsPath = path.join(distDir, 'robots.txt');
  fs.writeFileSync(robotsPath, robotsTxt, 'utf-8');
  console.log('✓ Generated: robots.txt');
}

// サイトマップとrobots.txtを生成
generateSitemap();
generateRobotsTxt();

console.log('\n🎉 All generation tasks complete!');
