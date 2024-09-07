// src/components/Departments.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategory } from '../../slices/categorySlice';
import { useDispatch, useSelector } from 'react-redux';

const Departments = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getCategory());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex justify-center p-4 bg-purple-50">
      <div className="w-full max-w-screen-2xl">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">Departamentos</h2>
        <div className="flex justify-center overflow-x-auto">
          <div className="flex space-x-4 py-4">
            {categories.map(department => (
              <Link
                key={department.id}
                to={`/search?department=${department.uuid}&name=${department.name}`}
                className="flex-shrink-0 border border-purple-300 p-4 rounded bg-white flex flex-col items-center justify-center"
                style={{ width: '200px', height: '200px' }}
              >
                <img
                  src={department.image}
                  alt={department.name}
                  className="w-3/4 h-3/4 object-contain"
                  style={{ maxWidth: '160px', maxHeight: '160px' }}
                />
                <h3 className="text-lg font-bold text-purple-700 mt-2">{department.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
