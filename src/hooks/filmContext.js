import React, { createContext, useContext, useState } from 'react';

const FilmContext = createContext();

export const useFilm = () => useContext(FilmContext);

export const FilmProvider = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  const setFilm = (film) => {
    setSelectedFilm(film);
  };

  return <FilmContext.Provider value={{ selectedFilm, setFilm }}>{children}</FilmContext.Provider>;
};
