import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../../slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoading } from '../../context/LoadingContext';

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, status, error, total } = useSelector((state) => state.order);
  const { setLoading } = useLoading();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    dispatch(fetchUserOrders({ limit: itemsPerPage, offset }));
  }, [dispatch, offset]);

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [status, setLoading]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
    setOffset((page - 1) * itemsPerPage);
  };

  const handleViewDetails = (uuid) => {
    navigate(`/order/${uuid}`);
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  console.log(orders)

  const totalPages = Math.ceil(total / itemsPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-4">Meus Pedidos</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      {orders.data?.map((order, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <p className="font-bold text-gray-700">Pedido: {order.uuid} - {order.created_at}</p>
          <p className="text-green-600">{order.status}</p>
          <p className="text-gray-700">{order.payment_method}</p>
          <div className='flex mt-2'>
                {order.order_items?.map((order_item, index) =>(
                  <div key={index} className='flex'>
                    <img src={order_item.product.image_url} alt={order_item.product.name} className="w-20 h-20 object-contain mr-4" />
                  </div>
                ))}
              </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center bg-gray-100 p-4 rounded-lg shadow">
              <div>
                <h3 className="font-bold text-gray-700">Total: R$ {order.total_amount}</h3>
                <p className="text-gray-500">Método de Pagamento: {order.payment_method}</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => handleViewDetails(order.uuid)}
            className="mt-4 bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Ver Detalhes
          </button>
        </div>
      ))}
      <div className="flex justify-between">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Página Anterior
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50"
        >
          Próxima Página
        </button>
      </div>
      <button
        onClick={handleBackToProfile}
        className="mt-4 bg-gray-600 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 transition"
      >
        Voltar ao Perfil
      </button>
    </div>
  );
};

export default OrderList;
