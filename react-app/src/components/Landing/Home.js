import React from "react";
import QuickSelectBar from "./QuickSelectBar";
import TrendingProjectsPreview from "./TrendingProjectsPreview";
import RecentProjectsPreview from "./RecentProjectsPreview";

const Home = () => {
  return (
    <>
      <QuickSelectBar />
      <TrendingProjectsPreview />
      <RecentProjectsPreview />
    </>
  );
};

export default Home;
