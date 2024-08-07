import React from 'react';
import UserProfile from '../../components/UserProfile';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const UserProfilePage = () => {
  return (
    <div>
      <Header/>
      <UserProfile />
      <Footer/>
    </div>
  );
};

export default UserProfilePage;
