import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 text-center">
      <ul className="flex justify-center space-x-6 mb-4">
        <li><a href="#sobre-nos" className="hover:text-orange-400 transition-colors">Sobre Nós</a></li>
        <li><a href="#contato" className="hover:text-orange-400 transition-colors">Contato</a></li>
        <li><a href="#politica-privacidade" className="hover:text-orange-400 transition-colors">Política de Privacidade</a></li>
        <li><a href="#termos-uso" className="hover:text-orange-400 transition-colors">Termos de Uso</a></li>
      </ul>
      <p className="text-gray-300">&copy; 2024 - Meu E-commerce</p>
    </footer>
  );
};

export default Footer;
