import React from 'react';

const FilmContext = React.createContext();

export const useFilm = () => React.useContext(FilmContext);

export const FilmProvider = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = React.useState(null);

  const setFilm = (film) => {
    setSelectedFilm(film);
  };

  return <FilmContext.Provider value={{ selectedFilm, setFilm }}>{children}</FilmContext.Provider>;
};
