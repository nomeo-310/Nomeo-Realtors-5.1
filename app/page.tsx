import React from "react";
import LandingPage from "./components/home/landing-page/LandingPage";
import OurServices from "./components/home/our-services/OurServices";
import FrequentyAskedQuestions from "./components/home/frequently-asked-questions/FrequentyAskedQuestions";
import Testimonials from "./components/home/testimonials/Testimonials";
import LatestBlogs from "./components/home/latest-blogs/LatestBlogs";
import FeaturedProperties from "./components/home/featured-properties/FeaturedProperties";
import Footer from "./components/footer/Footer";


const  Home = () => {

  return (
    <React.Fragment>
      <LandingPage/>
      <OurServices/>
      <FeaturedProperties/>
      <LatestBlogs/>
      <Testimonials/>
      <FrequentyAskedQuestions/>
      <Footer/>
    </React.Fragment>
  );
}

export default Home;
