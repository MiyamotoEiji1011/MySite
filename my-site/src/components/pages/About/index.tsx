import './index.css';
import Terminal from './Terminal';
import ProfileCard from './ProfileCard';
import AnimatedTitle from '../../ui/AnimatedTitle';

export default function About() {
  return (
    <div className="about">
      <div className="about-header">
        <AnimatedTitle text="About Me" autoAnimate={false} />
      </div>

      <div className="about-content">
        <ProfileCard />
        <Terminal />
      </div>

    </div>

  );
}
