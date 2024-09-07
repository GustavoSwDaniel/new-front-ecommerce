import React, {useEffect} from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import ProductCarousel from '../../components/Carousel';
import DailyOffers from '../../components/DailyOffers';
import Footer from '../../components/Footer';
import Departments from '../../components/Departments';
import { fetchProducts } from '../../slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../context/LoadingContext';

function Home() {
  const { items, status } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { setLoading } = useLoading();


  useEffect(() => {
    if (status === 'idle') {
      setLoading(true);
      dispatch(fetchProducts());
      setLoading(false);

    }
  }, [status, dispatch]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);

  return (
    <div>
      <Header />
      <Banner />
      <ProductCarousel items={items.data}/>
      <Departments/>
      <Footer />
    </div>
  );
}

export default Home;
