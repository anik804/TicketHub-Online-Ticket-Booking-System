import Banner from "@/layouts/Banner";
import CustomerTestimonials from "@/layouts/CustomerTestimonials";
import SpecialOffers from "@/layouts/SpecialOffers";

export default function Home() {
  return (
    <main>
      <Banner></Banner>
      <SpecialOffers/>
      <CustomerTestimonials/>
    </main>
  );
}
