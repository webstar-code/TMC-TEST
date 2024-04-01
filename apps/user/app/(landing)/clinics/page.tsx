import Footer from "components/Footer";
import Header from "components/Header";
import BoostPatientsSatisfaction from "components/clinics/BoostPatientsSatisfaction";
import ClinicsHeroSection from "components/clinics/ClinicsHeroSection";
import ClinicsHowItWorks from "components/clinics/ClinicsHowItWorks";
import ClinicsServices from "components/clinics/ClinicsServices";
import ClinicsWhyUse from "components/clinics/ClinicsWhyUse";
import FAQs from "components/landing-page/FAQs";
import React from "react";

function page() {
  return (
    <div>
      <Header />
      <ClinicsHeroSection />
      <ClinicsServices />
      <ClinicsWhyUse />
      <ClinicsHowItWorks />
      <BoostPatientsSatisfaction />
      <FAQs />
      <Footer />
    </div>
  );
}

export default page;
