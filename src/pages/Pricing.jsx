import React from "react";
import PricingHero from "../component/PricingHero";
import Pricing from "../component/Pricing";
import SavingsCalculator from "../component/SavingsCalculator";
import FeatureComparison from "../component/FeatureComparison";
import BookingProcess from "../component/BookingProcess";

const PricingPage = () => {
  return (
    <div>
      <PricingHero />
      <Pricing />
      <SavingsCalculator />
      <FeatureComparison />
      <BookingProcess />
    </div>
  );
};

export default PricingPage;
