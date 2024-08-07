import React from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import ProductCarousel from '../../components/Carousel';
import DailyOffers from '../../components/DailyOffers';
import Footer from '../../components/Footer';
import Departments from '../../components/Departments';

function Home() {
  return (
    <div>
      <Header />
      <Banner />
      <ProductCarousel />
      <DailyOffers />
      <Departments/>
      <Footer />
    </div>
  );
}

export default Home;
