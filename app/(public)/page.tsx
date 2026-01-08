import dynamic from "next/dynamic";

const CarouselComp = dynamic(() => import("@/components/home/CarouselComp"))
const RecommendedFoods = dynamic(() => import("@/components/home/RecommendedFoods"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const Home = () => {
  return (
    <div>
      <CarouselComp/>
      <RecommendedFoods/>
      <Testimonials/>
    </div>
  );
};

export default Home;
