import Banner from "@/components/homepage/Banner";
import Fits from "@/components/homepage/Fits";
import Footer from "@/components/shared/Footer";
import React from "react";

const page = () => {
  return (
    <>
      <Banner />
      {/* <Fits fitsData={[]} /> */}
      <Fits />
      <Footer />
    </>
  );
};

export default page;
