'use client';
import Header from './components/header/page';
import Footer from "./components/footer/page";
import DonationCard from "./components/card/donationCard/page";
import Hero from "./components/hero/page";
import MissionSection from "./components/section/missionSection/page";
import StorySection from "./components/section/storySection/page";
import MapSection from "./components/section/mapSection/page";
import ProblemSection from "./components/section/problemSection/page";
import HelpSection from "./components/section/helpSection/page";
import FounderStorySection from "./components/section/founderStorySection/page";
import TakeAction from "./components/section/takeAction/page";
import MissionBanner from "./components/section/missionBanner/page";

export default function Home() {

  return (
    <div className="overflow-x-hidden w-full">
      <Header variant="transparent"/>
      <main id="main-content" className="bg-white">
      <Hero />
      <MissionSection />
      <div className="w-full h-[1px] bg-gray-200 mt-[6rem] max-[768px]:mt-0"></div>
      <StorySection 
       title='Our story'
       content="Zee's Foundation's mission is to empower families raising children with special needs across Africa. We provide critical resources, support networks, and educational guidance, ensuring families have the tools they need to help their children thrive. Our 100% volunteer-run organization connects parents, caregivers, and professionals, all while creating inclusive communities where every child's story is valued and celebrated. Join us in making a difference, one family at a time."
      />
      <MapSection />
      <ProblemSection />
      <HelpSection />
      <DonationCard />
      <FounderStorySection />
      <TakeAction />
      <MissionBanner />
      <Footer />
    </main>
    </div>
  );
}
