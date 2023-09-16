import React, { useContext } from 'react';
import { useEffect, useState } from 'react';

const AppContext = React.createContext();
export const API_URL = 'https://www.omdbapi.com/?apikey=b70bb0cd&';

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: false, msg: '' });
  const [movie, setMovie] = useState([]);
  const [query, setQuery] = useState('hacker');

  useEffect(() => {
    const timer = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
    }, 800);

    return () => clearTimeout(timer);
  }, [query]);

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
      if (data.Response === 'True') {
        setIsLoading(false);
        setIsError({ show: false, msg: '' });
        setMovie(data.Search);
      } else {
        setIsError({ show: true, msg: data.Error });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider value={{ isLoading, movie, isError, query, setQuery }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
