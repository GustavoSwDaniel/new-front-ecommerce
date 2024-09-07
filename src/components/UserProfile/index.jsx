import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../slices/userSlice';
import { fetchUserOrders, fetchOrderByUuid } from '../../slices/orderSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faHeadset, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';



const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, status: userStatus, error: userError } = useSelector((state) => state.user);
  const { orders, orderDetails, status: ordersStatus, error: ordersError } = useSelector((state) => state.order);
  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUser());
    }
    if (ordersStatus === 'idle') {
      dispatch(fetchUserOrders({limit: 12, offset: 0}));
    }
  }, [userStatus, ordersStatus, dispatch]);

  useEffect(() => {
    if (orders.data.length > 0) {
      dispatch(fetchOrderByUuid(orders.data[0].uuid));
    }
  }, [orders, dispatch]);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (userStatus === 'loading' || ordersStatus === 'loading') {
    return <div>Loading...</div>;
  }

  if (userStatus === 'failed') {
    return <div>Error: {userError}</div>;
  }

  if (ordersStatus === 'failed') {
    return <div>Error: {ordersError}</div>;
  }

  const lastOrder = orderDetails || {
    uuid: 'N/A',
    status: 'N/A',
    payment_method: 'N/A',
    order_items: [],
    address: {},
  };

  const createdFormatted = orderDetails && orderDetails.created_at  ? format(new Date(orderDetails.created_at), 'dd/MM/yyyy HH:mm:ss') : 'Data não disponível';

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">Bem-vindo, {userInfo.name || 'Usuário'} {userInfo.last_name}</h1>
            <p className="text-gray-500">{userInfo.email || 'email@example.com'}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Resumo do Seu Último Pedido</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
          <p className="font-bold text-gray-700">Pedido: {lastOrder.uuid}</p>
          <p className="text-gray-500">{createdFormatted}</p> 
          <p className="text-green-600">{lastOrder.status}</p>
          <p className="text-gray-700">Pagamento: {lastOrder.payment_method}</p> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {lastOrder.order_items.map((item, index) => (
              <div key={index} className="flex items-center bg-white p-4 rounded-lg shadow">
                <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-contain mr-4" />
                <div>
                  <h3 className="font-bold text-gray-700">{item.product.name}</h3>
                  <p className="text-gray-500">Quantidade: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => handleViewOrderDetails(lastOrder.uuid)}
            className="mt-4 bg-orange-600 text-white font-bold py-2 px-4 rounded hover:bg-orange-700 transition"
          >
            Ver Detalhes do Pedido
          </button>
        </div>
        <h2 className="text-2xl font-bold text-purple-700 mt-8 mb-4">Atalhos</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link to="/orders" className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition text-center">
            <FontAwesomeIcon icon={faShoppingCart} className="text-3xl text-orange-600 mb-2" />
            <p className="font-bold text-gray-700">Meus Pedidos</p>
          </Link>
          <Link to="/wishlist" className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition text-center">
            <FontAwesomeIcon icon={faHeart} className="text-3xl text-orange-600 mb-2" />
            <p className="font-bold text-gray-700">Favoritos</p>
          </Link>
          <Link to="/support" className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition text-center">
            <FontAwesomeIcon icon={faHeadset} className="text-3xl text-orange-600 mb-2" />
            <p className="font-bold text-gray-700">Atendimento</p>
          </Link>
          <Link to="/profile/edit" className="bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition text-center">
            <FontAwesomeIcon icon={faFileAlt} className="text-3xl text-orange-600 mb-2" />
            <p className="font-bold text-gray-700">Editar Perfil</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
