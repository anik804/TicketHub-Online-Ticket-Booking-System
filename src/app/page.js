import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import CustomerTestimonials from "@/layouts/CustomerTestimonials";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import SpecialOffers from "@/layouts/SpecialOffers";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import Newsletter from "@/layouts/Newsletter";

export default function Home() {
  return (
    <main className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
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
