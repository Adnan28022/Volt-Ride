import { useState } from "react";
import FindBikesHero from "../component/FindBikesHero";
import StationLocator from "../component/StationLocator";
import OurFleet from "../component/OurFleet";
import HowItWorks from "../component/HowItWorks";
import FAQ from "../component/FAQ";
import AppDownload from "../component/AppDownload";

const FindBikes = () => {
  // Shared state to link Hero search with Station List
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-white">
      <FindBikesHero setSearchQuery={setSearchQuery} />
      <StationLocator searchQuery={searchQuery} />
      <OurFleet />
      <HowItWorks />
      <FAQ />
      <AppDownload />
    </div>
  );
};

export default FindBikes;
