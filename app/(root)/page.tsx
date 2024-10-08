import React from "react";
import LandingPage from "../components/home/landing-page/LandingPage";
import OurServices from "../components/home/our-services/OurServices";
import FrequentyAskedQuestions from "../components/home/frequently-asked-questions/FrequentyAskedQuestions";
import Testimonials from "../components/home/testimonials/Testimonials";
import LatestBlogs from "../components/home/latest-blogs/LatestBlogs";
import FeaturedProperties from "../components/home/featured-properties/FeaturedProperties";
import Footer from "../components/footer/Footer";
import { getCurrentUser } from "@/lib/actions/user-actions";


const  Home = async () => {
  const user = await getCurrentUser();

  return (
    <React.Fragment>
      <LandingPage/>
      <OurServices/>
      <FeaturedProperties user={user}/>
      <LatestBlogs/>
      <Testimonials/>
      <FrequentyAskedQuestions user={user}/>
      <Footer/>
    </React.Fragment>
  );
}

export default Home;
