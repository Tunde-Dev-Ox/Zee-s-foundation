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
      <main className="bg-white">
      <Hero />
      <MissionSection />
      <div className="w-full h-[1px] bg-gray-200 mt-[6rem]"></div>
      <StorySection />
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
