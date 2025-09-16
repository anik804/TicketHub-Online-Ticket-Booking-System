import CustomerTestimonials from "@/layouts/CustomerTestimonials";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import SpecialOffers from "@/layouts/SpecialOffers";
import WhyChooseUs from "@/layouts/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <SpecialOffers/>
      <CustomerTestimonials/>
      <WhyChooseUs></WhyChooseUs>
      <Partners></Partners>
      <HowItWorks></HowItWorks>
    </main>
  );
}
