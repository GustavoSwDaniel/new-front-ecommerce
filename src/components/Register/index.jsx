import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    email: '',
    cpf: '',
    street: '',
    cep: '',
    city: '',
    state: '',
    number: '',
    village: '',
    number_phone: '',
    phone_type: 'Cell',
    complement: '',
    password: '',
    confirm_password: '',
  });

  const [loading, setLoading] = useState(false); // Estado de carregamento

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(formData.password)) {
      alert('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um dígito e um caractere especial.');
      return;
    }

    if (formData.password !== formData.confirm_password) {
      alert('As senhas não correspondem.');
      return;
    }

    const userData = {
      name: formData.name,
      last_name: formData.last_name,
      email: formData.email,
      cpf: formData.cpf,
      phones: [
        {
          type: formData.phone_type,
          number: formData.number_phone,
        },
      ],
      address: {
        street: formData.street,
        cep: formData.cep,
        city: formData.city,
        state: formData.state,
        village: formData.village,
        number: formData.number,
        complement: formData.complement,
      },
      password: formData.password,
    };

    setLoading(true); // Ativa o estado de carregamento

    dispatch(createUser(userData)).then((result) => {
      setLoading(false); // Desativa o estado de carregamento
      if (result.meta.requestStatus === 'fulfilled') {
        alert('Usuário registrado com sucesso!');
        navigate('/login');
      } else {
        alert(`Erro ao registrar usuário: ${result.payload}`);
      }
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-50 p-4">
      <div className="w-full max-w-5xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-purple-700 text-center">Registro de Usuário</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="confirm_password">
                Confirmar Senha
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="password"
                id="confirm_password"
                placeholder="Confirme sua senha"
                value={formData.confirm_password}
                onChange={handleChange}
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
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="last_name">
                Sobrenome
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="last_name"
                placeholder="Digite seu sobrenome"
                value={formData.last_name}
                onChange={handleChange}
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
                value={formData.cpf}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="number_phone">
                Telefone
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="number_phone"
                placeholder="Digite seu telefone"
                value={formData.number_phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="phone_type">
                Tipo de Telefone
              </label>
              <select
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                id="phone_type"
                value={formData.phone_type}
                onChange={handleChange}
              >
                <option value="Cell">Celular</option>
                <option value="Landline">Telefone Fixo</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="street">
                Endereço
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="street"
                placeholder="Digite seu endereço"
                value={formData.street}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="number">
                Número da Casa
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="number"
                placeholder="Número da casa"
                value={formData.number}
                onChange={handleChange}
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
                value={formData.state}
                onChange={handleChange}
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
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="cep">
                CEP
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="cep"
                placeholder="CEP"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-3">
              <label className="block text-purple-700 text-sm font-bold mb-2" htmlFor="complement">
                Complemento
              </label>
              <input
                className="w-full p-3 border rounded bg-gray-100 text-gray-700 focus:outline-none focus:bg-white"
                type="text"
                id="complement"
                placeholder="Complemento"
                value={formData.complement}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              className={`bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:shadow-outline ${
                loading ? 'cursor-not-allowed' : ''
              }`}
              type="submit"
              disabled={loading} // Desativa o botão enquanto carrega
            >
              {loading ? 'Carregando...' : 'Registrar'}
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-purple-700 hover:text-purple-800"
              href="#"
            >
              Já tem uma conta? Login
            </a>
          </div>
        </form>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p className="text-red-500 mt-4">Erro: {error}</p>}
      </div>
    </div>
  );
};

export default Register;
