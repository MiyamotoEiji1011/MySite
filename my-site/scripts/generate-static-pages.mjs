/**
 * 静的ページ生成スクリプト
 * ビルド後に各ルート用のHTMLを生成し、SEO対応を行う
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const contentDir = path.join(__dirname, '..', 'content', 'activities');

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
