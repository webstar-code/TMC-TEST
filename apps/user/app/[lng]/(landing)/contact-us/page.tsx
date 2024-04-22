import Footer from "components/Footer";
import Header from "components/Header";
import Contact from "components/landing-page/Contact";
import Support from "components/landing-page/Support";

function page() {
  return (
    <div>
      <Header />
      <div className="mt-16">
        <Contact />
        <Support />
      </div>
      <Footer />
    </div>
  );
}

export default page;
