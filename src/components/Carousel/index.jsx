// src/components/ProductCarousel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductCarousel = ({ items }) => {
  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex justify-center p-4 bg-purple-50">
      <div className="w-full max-w-screen-2xl">
        <Carousel
          responsive={responsive}
          autoPlay={true}
          infinite={true}
          centerMode={false}
          partialVisible={true}
          containerClass="carousel-container"
          itemClass="p-4"
        >
          {items?.map((product) => (
            <div
              key={product.sku}
              className="border border-orange-500 bg-white rounded-lg shadow-lg hover:bg-orange-50 transition-colors relative flex flex-col items-center w-full h-96 cursor-pointer"
              onClick={() => handleItemClick(product.sku)}
            >
              <div className="w-full h-3/4 flex items-center justify-center overflow-hidden">
                <img src={product.image_url} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-purple-800 font-bold mt-2 text-center text-sm">
                {product.name} - {product.price}
              </p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
