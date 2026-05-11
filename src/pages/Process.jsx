import React from "react";
import HowItWorksHero from "../component/HowItWorksHero";
import DetailedJourney from "../component/DetailedJourney";
import HowItWorks from "../component/HowItWorks";
import Pricing from "../component/Pricing";
import SafetyRules from "../component/SafetyRules";
import FAQ from "../component/FAQ";
import AppDownload from "../component/AppDownload";
import Testimonials from "../component/Testimonials";
import ImpactStats from "../component/ImpactStats";

const Process = () => {
  return (
    <div>
      <HowItWorksHero />
      <HowItWorks />
      <Pricing />
      <SafetyRules />
      <FAQ />
      <AppDownload />
      <Testimonials />
      <ImpactStats />
    </div>
  );
};

export default Process;
