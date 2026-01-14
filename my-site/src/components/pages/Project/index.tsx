import { useMemo } from 'react';
import { getProjectsWithArticleCount } from '../../../lib/projects';
import EngineerProjectCard from './ProjectCard';
import AnimatedTitle from '../../ui/AnimatedTitle';
import './index.css';

export default function ProjectPage() {
  // 全プロジェクトと記事数を取得
  const projectsWithCount = useMemo(() => getProjectsWithArticleCount(), []);

  return (
    <div className="project-container">
      <div className="project-content">
        <div className="project-header">
          <AnimatedTitle text="project" autoAnimate={false} />
        </div>

        {/* コンソール風の説明 */}
        <div className="project-intro">
          <div className="intro-line">
            <span className="intro-prompt">$</span>
            <span className="intro-command">ls</span>
            <span className="intro-flag">-l</span>
            <span className="intro-path">~/projects</span>
          </div>
          <div className="intro-output">
            Found {projectsWithCount.length} {projectsWithCount.length === 1 ? 'project' : 'projects'}
          </div>
        </div>

        {/* プロジェクトカード一覧 */}
        <div className="project-grid-engineer">
          {projectsWithCount.length === 0 ? (
            <p className="no-results">
              <span className="material-icons">folder_off</span>
              No projects found.
            </p>
          ) : (
            projectsWithCount.map((project) => (
              <EngineerProjectCard
                key={project.id}
                project={project}
                articleCount={project.articleCount}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
