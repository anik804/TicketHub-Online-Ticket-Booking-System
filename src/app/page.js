import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import Newsletter from "@/layouts/Newsletter";
import FAQ from "@/layouts/FAQ";
import MoviesNowPlaying from "@/components/home/MoviesNowPlaying";
import RollingPartners from "@/components/home/RollingPartners";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <CategorySection></CategorySection>
      {/* New Section : Pranoy */}
      <MoviesNowPlaying/>
      <RollingPartners/>
      <HowItWorks></HowItWorks>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
    </main>
  );
}
