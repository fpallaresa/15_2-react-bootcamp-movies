import OpenningHomePage from '../../components/OpenningHomePage/OpenningHomePage'
import TrendingHomePage from '../../components/TrendingHomePage/TrendingHomePage';

import './HomePage.scss'

const HomePage = () => {
  return (
    <div className='main'>
      <OpenningHomePage />
      <TrendingHomePage />
    </div>
  );
};

export default HomePage;
