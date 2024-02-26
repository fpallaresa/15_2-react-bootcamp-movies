import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import TMDBlogo from '../../assets/tmdblogo.svg';
import './Header.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='header__info-box'>
        <img className='header__image' src={TMDBlogo} />
        <nav className='header__nav'>
          <NavLink to={'/films'}>
            <FormattedMessage id='home:movies' />
          </NavLink>
          <NavLink to={'/films'}>
            <FormattedMessage id='header:quiz' />
          </NavLink>
        </nav>
      </div>
      <div className='header__languages'>
        <span className='header__language'>ES</span>
        <span className='header__language'>EN</span>
      </div>
    </div>
  );
};

export default Header;
