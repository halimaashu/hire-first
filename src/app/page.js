import Advertisement from "@/components/Adverticement";
import Banner from "@/components/Banner";
import FeaturesSection from "@/components/FeaturesSection";
import GlobalTalentSection from "@/components/GlobalTalentSection";
import SmartJobDiscovery from "@/components/SmartJobDiscovery";
// import Bannertop from "@/components/Bannertop";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* <Bannertop /> */}
      <Banner />
      <GlobalTalentSection/>
      <SmartJobDiscovery/>
      <FeaturesSection />
      <Advertisement/>
     
    </div>
  );
}
