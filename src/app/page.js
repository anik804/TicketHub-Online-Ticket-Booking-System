import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import SpecialOffers from "@/components/home/SpecialOffers";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import Newsletter from "@/layouts/Newsletter";
import FAQ from "@/layouts/FAQ";
import MoviesNowPlaying from "@/components/home/MoviesNowPlaying";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <CategorySection></CategorySection>
      <MoviesNowPlaying/> {/* New Section : Pranoy */}
      <HowItWorks></HowItWorks>
      <SpecialOffers />
      <WhyChooseUs></WhyChooseUs>
      <CustomerTestimonials />
      <Partners></Partners>
      <FAQ></FAQ>
      <Newsletter></Newsletter>
    </main>
  );
}
