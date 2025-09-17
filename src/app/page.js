import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import CustomerTestimonials from "@/components/home/CustomerTestimonials";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import SpecialOffers from "@/components/home/SpecialOffers";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import Newsletter from "@/layouts/Newsletter";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <CategorySection></CategorySection>
      <SpecialOffers/>
      <CustomerTestimonials/>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <Newsletter></Newsletter>
      <HowItWorks></HowItWorks>
    </main>
  );
}
