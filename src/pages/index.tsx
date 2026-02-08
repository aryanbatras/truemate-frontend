import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import AppleCardsCarouselDemo from "../components/AppleCardsCarouselDemo";
import Loader from "../components/styled-components/Loader";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <AppleCardsCarouselDemo />
      <StatsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
