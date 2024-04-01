import Footer from "components/Footer";
import Header from "components/Header";
import FAQs from "components/landing-page/FAQs";
import PricingStartNow from "components/pricing/PricingStartNow";
import React from "react";

function page() {
  return (
    <div>
      <Header />
      <PricingStartNow />
      <FAQs />
      <Footer />
    </div>
  );
}

export default page;
