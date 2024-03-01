import TMDBlogofooter from '../../assets/tmdblogo-footer.svg';
import './Footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <img className='footer__img' src={TMDBlogofooter} />
    </div>
  );
};

export default Footer;
