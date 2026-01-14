import { projects, type ProjectData } from '../data/projects';
import { getActivities, type Activity } from './activities';

/**
 * 全プロジェクトを取得
 */
export function getProjects(): ProjectData[] {
  return projects;
}

/**
 * slugから特定のプロジェクトを取得
 */
export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find(project => project.slug === slug);
}

/**
 * 特定のプロジェクトに紐づく記事一覧を取得
 * @param tagKey プロジェクトのtagKey
 * @returns tagKeyが含まれる記事の配列（日付降順）
 */
export function getArticlesByProjectTag(tagKey: string): Activity[] {
  const allActivities = getActivities();

  // tagsにtagKeyが含まれる記事だけをフィルタ
  return allActivities.filter(activity =>
    activity.tags.some(tag => tag.toLowerCase() === tagKey.toLowerCase())
  );
}

/**
 * プロジェクトに紐づく記事数を取得
 */
export function getArticleCountByProjectTag(tagKey: string): number {
  return getArticlesByProjectTag(tagKey).length;
}

/**
 * 全プロジェクトとそれぞれの記事数を取得
 */
export function getProjectsWithArticleCount(): (ProjectData & { articleCount: number })[] {
  return projects.map(project => ({
    ...project,
    articleCount: getArticleCountByProjectTag(project.tagKey),
  }));
}
