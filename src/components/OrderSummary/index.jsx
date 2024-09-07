import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import Rating from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../slices/commentsSlice';
import { fetchOrderByUuid } from '../../slices/orderSlice';


Modal.setAppElement('#root');

const OrderSummary = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [product_id, setProductId] = useState(null)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBackToOrders = () => {
    navigate('/orders');
  };


  const openModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setRating(0);
    setComment('');
  };

  const submitRating = async () => {
    await dispatch(createComment({
      product_id: selectedItem.id,
      comment: comment,
      rating: rating
    }))

    await dispatch(fetchOrderByUuid(order.id));
    closeModal();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Pedido: {order.id}</h2>
      <p className="text-gray-500 font-bold">{order.date}</p>
      <p className="text-green-600 font-bold">{order.status}</p>
      <p className="text-gray-700 mb-4">{order.paymentMethod}</p>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        {order.items.map((item, index) => (
          <div key={index} className="flex mb-4">
            <img src={item.img} alt={item.name} className="w-16 h-16 object-contain mr-4" />
            <div>
              <h3 className="text-gray-700 font-bold">{item.name}</h3>
              <p className="text-gray-500">Quantidade: {item.quantity}</p>
              {!item.is_rated && (
                <button
                  className="mt-2 bg-orange-500 text-white py-1 px-2 rounded hover:bg-orange-600 transition"
                  onClick={() => openModal(item)}
                >
                  Avaliar Produto
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        <h3 className="text-lg font-bold text-gray-700">Endereço de entrega</h3>
        <p className="text-gray-700">{order.address}</p>
      </div>
      <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Total produto(s)</span>
          <span className="text-gray-700">R$ {order.totalProducts.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-700">Frete</span>
          <span className="text-gray-700">R$ {order.shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Total do pedido</span>
          <span>R$ {order.total.toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={handleBackToOrders}
        className="w-full bg-orange-600 text-white font-bold py-3 rounded hover:bg-orange-700 transition mt-4"
      >
        Voltar aos meus pedidos
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Avaliar Produto"
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto my-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Avaliar Produto</h2>
        {selectedItem && (
          <>
            <h3 className="text-lg font-bold text-gray-700 mb-2">{selectedItem.name}</h3>
            <Rating
              count={5}
              size={24}
              activeColor="#ffd700"
              value={rating}
              onChange={(newRating) => setRating(newRating)}
            />
            <textarea
              className="w-full p-3 mt-4 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              placeholder="Escreva seu comentário"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={submitRating}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mr-2"
              >
                Enviar Avaliação
              </button>
              <button
                onClick={closeModal}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderSummary;
  