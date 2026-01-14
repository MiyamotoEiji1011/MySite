// Project定義データ
// Activityの記事と紐づけるためのプロジェクト情報を管理

export interface ProjectData {
  id: string;
  title: string;
  tagKey: string;  // Activity記事のtagsと照合するキー
  description: string;
  slug: string;    // URL用
}

/**
 * プロジェクト一覧
 * ここに追加したProjectのみが一覧に表示される
 */
export const projects: ProjectData[] = [
  {
    id: 'myweb-project',
    title: 'MyWebサイト',
    tagKey: 'myweb',
    description: '人生二度目のWebサイト制作。React環境構築からデプロイまでを初実装。',
    slug: 'myweb-project',
  },
  {
    id: 'ibis_d1-project',
    title: 'IBIS-D1',
    tagKey: 'ibis_d1',
    description: 'コミュニケーションロボットIBIS-D1の開発。事務対応から接客対応まで幅広く対応し、webアプリケーションとの連携でデータの共有を自動で行うロボットサービス。',
    slug: 'ibis_d1-project',
  },
  {
    id: 'helios-project',
    title: 'Helios-VR',
    tagKey: 'helios',
    description: 'VR操作ロボットHelios-VRの開発。VR空間での操作性を追求し、遠隔地からのリアルタイム操作を可能にするロボットシステム。SkyWayを使用した通信技術を採用。',
    slug: 'helios-project',
  },
];
