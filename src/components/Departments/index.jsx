import React from 'react';
import { Link } from 'react-router-dom';
import gameImage from "../../assets/Departments/games.png";
import computadoresImage from "../../assets/Departments/computadores.png";

const departments = [
  { id: 1, name: 'Computadores', img: computadoresImage },
  { id: 2, name: 'Games', img: gameImage },
  { id: 3, name: 'Sala', img: computadoresImage },
  { id: 4, name: 'Quarto', img: computadoresImage },
  { id: 5, name: 'Cozinha', img: computadoresImage },
  { id: 6, name: 'Eletrodomesticos', img: computadoresImage },
  { id: 7, name: 'Celulares', img: computadoresImage },
  { id: 8, name: 'Carro', img: computadoresImage },
];

const Departments = () => {
  return (
    <div className="flex justify-center p-4 bg-purple-50">
      <div className="w-full max-w-screen-2xl">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">Departamentos</h2>
        <div className="flex justify-center overflow-x-auto">
          <div className="flex space-x-4 py-4">
            {departments.map(department => (
              <Link
                key={department.id}
                to={`/search?department=${department.name.toLowerCase()}`}
                className="flex-shrink-0 border border-purple-300 p-4 rounded bg-white flex flex-col items-center justify-center"
                style={{ width: '200px', height: '200px' }}
              >
                <img
                  src={department.img}
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
