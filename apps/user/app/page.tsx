'use client'
import Header from "components/Header";
import AboutUs from "components/landing-page/AboutUs";
import Contact from "components/landing-page/Contact";
import DesignedForUtility from "components/landing-page/DesignedForUtility";
import HeroSection from "components/landing-page/HeroSection";
import HowItWorks from "components/landing-page/HowItWorks";
import Services from "components/landing-page/Services";
import StartNow from "components/landing-page/StartNow";
import Support from "components/landing-page/Support";
import WhyUse from "components/landing-page/WhyUse";


export default function Home() {
  return (
    <>
      <div>
        <Header />
        <HeroSection />
        <Services />
        <WhyUse />
        <HowItWorks />
        <DesignedForUtility />
        <StartNow />
        <AboutUs />
        {/* <Contact /> */}
        {/* <Support /> */}
      </div>
    </>
  );
}
