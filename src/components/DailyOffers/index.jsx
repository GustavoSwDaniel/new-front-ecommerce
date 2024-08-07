import React from 'react';
import { useNavigate } from 'react-router-dom';

const DailyOffers = () => {
  const offers = [
    { id: 1, name: "Mouse Gamer Razer Deathadder Essential", price: "R$ 226,90", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
    { id: 2, name: "Impressora 3D Creality K1", price: "R$ 2.829,99", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
    { id: 3, name: "Microfone Gamer HyperX QuadCast S", price: "R$ 799,90", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
    { id: 4, name: "Console PlayStation 5 Slim", price: "R$ 3.254,07", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Sony-PlayStation-3-2001A-wController-L.jpg/640px-Sony-PlayStation-3-2001A-wController-L.jpg" },
  ];

  const navigate = useNavigate();

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="flex justify-center p-4 bg-purple-50">
      <div className="w-full max-w-screen-2xl">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">Ofertas do Dia</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {offers.map(offer => (
            <div key={offer.id} className="border border-purple-300 p-4 rounded bg-white relative cursor-pointer" onClick={() => handleItemClick(offer.id)}>
              <img src={offer.img} alt={offer.name} className="mb-4" />
              <h3 className="text-lg font-bold text-purple-700">{offer.name}</h3>
              <p className="text-xl text-orange-500">{offer.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyOffers;
