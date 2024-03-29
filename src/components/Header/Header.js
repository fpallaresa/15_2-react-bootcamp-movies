import React from 'react';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TMDBlogo from '../../assets/tmdblogo.svg';
import './Header.scss';
import { useLanguage } from '../../hooks/languageContext';

const Header = ({ setMessages, spanishMessages, englishMessages }) => {
  const { currentLanguage, handleLanguageChange } = useLanguage();

  const changeLanguage = (language) => {
    handleLanguageChange(language);
    setMessages(language === 'es' ? spanishMessages : englishMessages);
  };

  return (
    <div className='header'>
      <div className='header__container'>
        <div className='header__info-box'>
          <img className='header__image' src={TMDBlogo} alt='TMDB Logo' />
          <nav className='header__nav'>
            <NavLink to={'/'}>
              <FormattedMessage id='header:movies' />
            </NavLink>
            <NavLink to={'/quiz'}>
              <FormattedMessage id='header:quiz' />
            </NavLink>
          </nav>
        </div>
        <div className='header__language-box'>
          <button className={`header__language ${currentLanguage === 'es' ? 'header__language--active' : ''}`} onClick={() => changeLanguage('es')}>
            <FormattedMessage id='header:spanish' />
          </button>
          <button className={`header__language ${currentLanguage === 'en' ? 'header__language--active' : ''}`} onClick={() => changeLanguage('en')}>
            <FormattedMessage id='header:english' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
