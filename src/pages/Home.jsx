import React from "react";
import HeroSection from "../component/HeroSection";
import HowItWorks from "../component/HowItWorks";
import OurFleet from "../component/OurFleet";
import WhyChooseUs from "../component/WhyChooseUs";
import Testimonials from "../component/Testimonials";
import AppDownload from "../component/AppDownload";
import Statistics from "../component/Statistics";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <OurFleet />
      <WhyChooseUs />
      <Testimonials />
      <AppDownload />
      <Statistics />
    </div>
  );
};

export default Home;
