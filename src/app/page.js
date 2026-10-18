import Advertisement from "@/components/Adverticement";
import Banner from "@/components/Banner";
import BrowseByCategory from "@/components/Browsebycategory";
import FaqSection from "@/components/FaqSection";
import FeaturesSection from "@/components/FeaturesSection";
import FinalCta from "@/components/FinalCta";
import GlobalTalentSection from "@/components/GlobalTalentSection";
import HowItWorks from "@/components/HowItWorks";
import SmartJobDiscovery from "@/components/SmartJobDiscovery";
import SuccessStories from "@/components/SuccessStories";
// import Bannertop from "@/components/Bannertop";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <Bannertop /> */}
      <Banner />
      <BrowseByCategory/>
      <GlobalTalentSection/>
      <SmartJobDiscovery/>
      {/* HowItWorks.jsx */}
      <HowItWorks/>
      <FeaturesSection />
      <Advertisement/>
      <SuccessStories/>
      <FaqSection/>
      <FinalCta/>
     
    </div>
  );
}
