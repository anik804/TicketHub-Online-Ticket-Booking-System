import CustomerTestimonials from "@/layouts/CustomerTestimonials";
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
    </main>
  );
}
