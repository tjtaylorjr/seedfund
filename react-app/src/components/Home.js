import React from 'react';
import QuickSelectBar from "./QuickSelectBar";
import TrendingProjectsPreview from "./TrendingProjectsPreview";
import RecentProjectsPreview from "./RecentProjectsPreview";
import Footer from "./Footer/Footer";

const Home = () => {
  return (
    <>
      <QuickSelectBar />
      <TrendingProjectsPreview />
      <RecentProjectsPreview />
      <Footer />
    </>
  )
}

export default Home;
