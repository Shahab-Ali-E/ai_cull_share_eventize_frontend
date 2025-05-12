import Footer from "@/components/footer";
import CTASection from "@/components/LandingPages/Home/CTASection";
import FeaturesList from "@/components/LandingPages/Home/Features";
import HomeHeroSection from "@/components/LandingPages/Home/HomeHeroSection";
import ServicesSection from "@/components/LandingPages/Home/ServiceSection";
import Navbar from "@/components/navbar";

const Home = () => {
  return (
    <div className="flex flex-col text-primary overflow-hidden">
      {/* nav bar */}
      <Navbar />

      <main className="flex flex-col space-y-14">
        <HomeHeroSection />
        <FeaturesList /> 
        <ServicesSection />
        <CTASection />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
