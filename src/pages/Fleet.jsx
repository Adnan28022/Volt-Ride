import React from "react";
import FleetHero from "../component/FleetHero";
import OurFleet from "../component/OurFleet";
import FleetFeatures from "../component/FleetFeatures";
import FleetColors from "../component/FleetColors";
import FleetSpecs from "../component/FleetSpecs";
import AppDownload from "../component/AppDownload";
import Support from "../component/Support";

const FleetPage = () => {
  return (
    <div>
      <FleetHero />
      <FleetFeatures />
      <OurFleet />
      <FleetColors />
      <FleetSpecs />
      <AppDownload />
      <Support />
    </div>
  );
};

export default FleetPage;
