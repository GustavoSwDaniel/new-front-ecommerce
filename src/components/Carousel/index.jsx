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

const ProductCarousel = () => {
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
          itemClass="p-4" // Adiciona padding horizontal e vertical entre os itens
        >
          {[
            { id: 1, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 2, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'Notebook Samsung Galaxy Book3 360', price: 'R$ 3.999,99' },
            { id: 3, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 4, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 5, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 6, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 7, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
            { id: 8, img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg', name: 'PlayStation 3', price: 'R$ 1.200,00' },
          ].map((product, index) => (
            <div key={index} className="border border-orange-500 bg-white rounded-lg shadow-lg hover:bg-orange-50 transition-colors relative flex flex-col items-center w-full h-96 cursor-pointer" onClick={() => handleItemClick(product.id)}>
              <div className="w-full h-3/4 flex items-center justify-center overflow-hidden">
                <img src={product.img} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-purple-800 font-bold mt-2 text-center text-sm">{product.name} - {product.price}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
