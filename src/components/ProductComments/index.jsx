import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { getComments } from '../../slices/commentsSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProductComments = () => {
  const { comments, status, error, total } = useSelector((state) => state.comments);
  const { item } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (item && item.id) {
      console.log("Dispatching getComments with product_id:", item.id);
      dispatch(getComments({ product_id: item.id, limit: 12, offset }));
    } else {
      console.log("Item or item.id is not defined", item);
    }
  }, [item, offset, dispatch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 mx-auto">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 border-b-2 border-purple-200 pb-2">Comentários</h2>
      <div className="space-y-6">
        {comments.data.map((comment, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
            <div>
              <p className="font-bold">{comment.user.name}</p>
            </div>
            <div className="flex items-center mb-2">
              {[...Array(5)].map((star, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={`mr-1 ${i < comment.rating ? 'text-orange-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="text-sm text-blue-400">
              <p>Avaliado em {comment.created_at}</p>
            </div>
            <div className="mt-6">
              <p className="text-gray-800 leading-relaxed">{comment.comment}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro!</p>}
      </div>
    </div>
  );
};

export default ProductComments;
