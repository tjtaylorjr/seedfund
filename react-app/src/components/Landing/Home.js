import React from "react";
import QuickSelectBar from "./QuickSelectBar";
import TrendingProjectsPreview from "./TrendingProjectsPreview";
import RecentProjectsPreview from "./RecentProjectsPreview";

const Home = () => {
  return (
    <div className="landing__container">
      <QuickSelectBar />
      <TrendingProjectsPreview />
      <RecentProjectsPreview />
    </div>
  );
};

export default Home;
