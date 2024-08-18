import React from "react";
import LandingPage from "./components/home/landing-page/LandingPage";
import OurServices from "./components/home/our-services/OurServices";


const  Home = () => {
  return (
    <React.Fragment>
      <LandingPage/>
      <OurServices/>
    </React.Fragment>
  );
}

export default Home;
