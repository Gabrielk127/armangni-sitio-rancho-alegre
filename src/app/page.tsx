import Header from "@/components/header";
import PageEffects from "@/components/page-effects";
import FloatingCta from "@/components/floating-cta";
import Footer from "@/components/footer";
import Hero from "@/components/sections/hero";
import Numbers from "@/components/sections/numbers";
import Location from "@/components/sections/location";
import LeadStrip from "@/components/sections/lead-strip";
import House from "@/components/sections/house";
import HouseGallery from "@/components/sections/house-gallery";
import Structure from "@/components/sections/structure";
import LeadMid from "@/components/sections/lead-mid";
import Terrain from "@/components/sections/terrain";
import Infra from "@/components/sections/infra";
import Ideal from "@/components/sections/ideal";
import Lead from "@/components/sections/lead";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Numbers />
        <Location />
        <LeadStrip />
        <House />
        <HouseGallery />
        <Structure />
        <LeadMid />
        <Terrain />
        <Infra />
        <Ideal />
        <Lead />
      </main>
      <Footer />
      <FloatingCta />
      <PageEffects />
    </>
  );
}
