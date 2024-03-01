import OpenningHomePage from '../../components/OpenningHomePage/OpenningHomePage';
import TrendingHomePage from '../../components/TrendingHomePage/TrendingHomePage';
import MovieTrailersHomePage from '../../components/MovieTrailersHomePage/MovieTrailersHomePage';
import PopularHomePage from '../../components/PopularHomePage/PopularHomePage';
import JoinNowHomePage from '../../components/JoinNowHomePage/JoinNowHomePage';
import FreeToWatchHomePage from '../../components/FreeToWatchHomePage/FreeToWatchHomePage';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className='main'>
      <OpenningHomePage />
      <TrendingHomePage />
      <MovieTrailersHomePage />
      <PopularHomePage />
      <JoinNowHomePage />
      <FreeToWatchHomePage />
    </div>
  );
};

export default HomePage;
