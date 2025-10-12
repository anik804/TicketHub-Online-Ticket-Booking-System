import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import MoviesNowPlaying from "@/components/home/MoviesNowPlaying";
import RollingPartners from "@/components/home/RollingPartners";
import GetAnswers from "@/layouts/GetAnswers";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <CategorySection></CategorySection>
      {/* New Section : Pranoy */}
      <MoviesNowPlaying />
      <RollingPartners />
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <GetAnswers></GetAnswers>
    </main>
  );
}
