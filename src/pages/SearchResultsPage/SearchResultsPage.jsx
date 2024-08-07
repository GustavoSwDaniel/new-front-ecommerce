import React from 'react';
import SearchResults from '../../components/SearchResults';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const SearchResultsPage = () => {
  return (
    <div>
      <Header/>
      <SearchResults />
      <Footer/>
    </div>
  );
};

export default SearchResultsPage;
