import React from 'react';

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              type="email"
              id="email"
              placeholder="Digite seu email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
            </label>
            <input
              className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
              type="password"
              id="password"
              placeholder="Digite sua senha"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Entrar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-700 hover:text-purple-800"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
