import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import AnimatedTitle from './components/ui/AnimatedTitle';
import FrontText from "./components/pages/Home/FrontText";
import YouTubeSection from "./components/pages/Home/YouTubeSection";
import XSection from "./components/pages/Home/XSection";
import Footer from "./components/layout/Footer";
import CodeBackground from "./components/layout/CodeBackground";
import About from "./components/pages/About";
import Project from "./components/pages/Project";
import ProjectDetail from "./components/pages/Project/ProjectDetail";
import Activity from "./components/pages/Activity";
import ActivityDetail from "./components/pages/Activity/ActivityDetail";
import Contact from "./components/pages/Contact";

function Home() {
  // YouTube動画データ
  const youtubeVideos = [
    {
      id: "G64fORB40Qg",
      title: "ロボット製作の様子",
      description: "実際のロボット製作工程を詳しく解説。設計から組み立てまでの全プロセスをご覧いただけます。",
    },
    {
      id: "nmeQBvvMU4Y",
      title: "Webアプリ開発チュートリアル",
      description: "React + TypeScriptを使った最新のWebアプリ開発手法を紹介します。",
    },
    {
      id: "0pSmB0jh3EY",
      title: "VR制御システムの紹介",
      description: "VR技術を活用したロボット遠隔操作システムのデモンストレーションです。",
    },
    {
      id: "8VK4-32czzs",
      title: "最新プロジェクトの解説",
      description: "現在進行中のプロジェクトについて、技術的な詳細を交えて解説します。",
    },
    {
      id: "dQw4w9WgXcQ",
      title: "IoTデバイスの実装",
      description: "Arduino とRaspberry Piを使ったIoTシステムの構築方法を紹介します。",
    },
    {
      id: "jNQXAC9IVRw",
      title: "STEM教育ワークショップ",
      description: "子供たちと一緒に学ぶロボット工学とプログラミングの基礎。",
    },
  ];

  return (
    <>
      <div className="about-header">
        <AnimatedTitle text="Miyamoto Eiji" autoAnimate={false} />
      </div>

      <FrontText
        text={`Hello, world!\nI'm Eiji.\nI build robots and web apps.`}
        buttonLabel="About"
        buttonHref="/about"
      />

      <div className="sections-container">
        <YouTubeSection
          videos={youtubeVideos}
          channelUrl="https://www.youtube.com/@MiyamotoEiji112"
          channelName="@EIJI_1011"
        />

        <XSection username="EIJI_1011" profileUrl="https://x.com/EIJI_1011" />
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <CodeBackground />
        <Header />


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Project />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/activity/:slug" element={<ActivityDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
