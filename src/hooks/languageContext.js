import React from 'react';

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState('es');

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  return <LanguageContext.Provider value={{ currentLanguage, handleLanguageChange }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
};
