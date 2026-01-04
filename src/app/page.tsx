import Header from './components/header/Header';
import Footer from "./components/footer/Footer";
import BankDetailsCard from "./components/card/BankDetailsCard";
import Hero from "./components/hero/Hero";
import MissionSection from "./components/section/missionSection/MissionSection";
import StorySection from "./components/section/storySection/StorySection";
import MapSection from "./components/section/mapSection/MapSection";
import ProblemSection from "./components/section/problemSection/ProblemSection";
import HelpSection from "./components/section/helpSection/HelpSection";
import FounderStorySection from "./components/section/founderStorySection/FounderStorySection";
import TakeAction from "./components/section/takeAction/TakeAction";
import MissionBanner from "./components/section/missionBanner/MissionBanner";

export default function Home() {

  return (
    <div className="overflow-x-hidden w-full">
      <Header variant="transparent" />
      <main id="main-content" className="bg-white">
        <Hero />
        <MissionSection />
        <div className="w-full h-[1px] bg-gray-200 mt-[6rem] max-[768px]:mt-0"></div>
        <StorySection
          title='Our story'
          content="Zira Childcare Foundation's mission is to empower families raising children with special needs across Africa. We provide critical resources, support networks, and educational guidance, ensuring families have the tools they need to help their children thrive. Our 100% volunteer-run organization connects parents, caregivers, and professionals, all while creating inclusive communities where every child's story is valued and celebrated. Join us in making a difference, one family at a time."
        />
        <MapSection />
        <ProblemSection />
        <HelpSection />
        <BankDetailsCard />
        <FounderStorySection />
        <TakeAction />
        <MissionBanner />
        <Footer />
      </main>
    </div>
  );
}
