import React from "react";
import SafetyHero from "../component/SafetyHero";
import SafetyFeatures from "../component/SafetyFeatures";
import SafetyGuidelines from "../component/SafetyGuidelines";
import FAQ from "../component/FAQ";
import AppDownload from "../component/AppDownload";
import TrustBadges from "../component/TrustBadges";
import Support from "../component/Support";

const Safety = () => {
  return (
    <div>
      <SafetyHero />
      <SafetyFeatures />
      <SafetyGuidelines />
      <Support />
      <FAQ />
      <AppDownload />
      <TrustBadges />
    </div>
  );
};

export default Safety;
