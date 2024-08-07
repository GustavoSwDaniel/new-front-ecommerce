import React from 'react';

const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-purple-50">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Registro de Usuário</h2>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <div className="mb-4">
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
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                Confirmar Senha
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="password"
                id="confirm-password"
                placeholder="Confirme sua senha"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="name">
                Nome
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="name"
                placeholder="Digite seu nome"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="cpf">
                CPF
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="cpf"
                placeholder="Digite seu CPF"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="address">
                Endereço
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="address"
                placeholder="Digite seu endereço"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="state">
                Estado
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="state"
                placeholder="Estado"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="city">
                Cidade
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="city"
                placeholder="Cidade"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="zip">
                CEP
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="zip"
                placeholder="CEP"
              />
            </div>
            <div className="mb-4 col-span-2">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="complement">
                Complemento
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="complement"
                placeholder="Complemento"
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline"
              type="button"
            >
              Registrar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-700 hover:text-purple-800"
              href="#"
            >
              Já tem uma conta? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
