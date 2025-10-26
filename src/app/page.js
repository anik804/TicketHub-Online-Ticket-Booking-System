import CategorySection from "@/layouts/CategorySection";
import Banner from "@/layouts/Banner";
import HowItWorks from "@/layouts/HowItWorks";
import Partners from "@/layouts/Partners";
import WhyChooseUs from "@/layouts/WhyChooseUs";
import MoviesNowPlaying from "@/components/home/MoviesNowPlaying";
import RollingPartners from "@/components/home/RollingPartners";
import GetAnswers from "@/layouts/GetAnswers";
import PhotoGallery from "@/components/home/PhotoGallery";
import FeedbackSection from "@/layouts/FeedbackSection";


export default function Home() {
  return (
    <main className="overflow-hidden" >
      <Banner></Banner>
      <CategorySection></CategorySection>
      <MoviesNowPlaying />
      <RollingPartners />
      <PhotoGallery/>
       <FeedbackSection/>
      
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <Partners></Partners>

      <GetAnswers></GetAnswers>
    </main>
  );
}
