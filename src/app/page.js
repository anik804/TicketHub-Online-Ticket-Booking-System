import Banner from "@/layouts/Banner";
import CustomerTestimonials from "@/layouts/CustomerTestimonials";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import SpecialOffers from "@/layouts/SpecialOffers";
import WhyChooseUs from "@/layouts/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <SpecialOffers/>
      <CustomerTestimonials/>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <HowItWorks></HowItWorks>
    </main>
  );
}
