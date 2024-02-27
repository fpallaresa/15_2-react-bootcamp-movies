import React from 'react';
import { FormattedMessage } from 'react-intl';
import { roundPercentage, formatDate, getClassForAverage } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';
import './TrendingHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';

const TrendingHomePage = () => {
  const { currentLanguage } = useLanguage();
  const apiUrl =
    currentLanguage === 'es'
      ? `${process.env.REACT_APP_API_URL}trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=es-ES`
      : `${process.env.REACT_APP_API_URL}trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

  const [trendingData] = useFetch(apiUrl);

  if (!trendingData) {
    return <div><FormattedMessage id='generic:loading' /></div>;
  }

  return (
    <section className='trending'>
      <div className='trending__header'>
        <h3 className='trending__title'>
          <FormattedMessage id='home:trending' />
        </h3>
        <div className='trending__filters'>
          <button className='btn btn--option-selected'>
            <FormattedMessage id='home:today' />
          </button>
          <button className='btn'>
            <FormattedMessage id='home:this_week' />
          </button>
        </div>
      </div>
      <div className='trending__films'>
        {trendingData.results.map((film, index) => (
          <div className='trending__card-film' key={index}>
            <img className='trending__card-img' src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`} alt={film?.title} />
            <div className='trending__card-average'>
              <span className='trending__card-average-number'>
                {roundPercentage(film?.vote_average)} <span className='percent'>%</span>
              </span>
              <span className={getClassForAverage(roundPercentage(film?.vote_average))}></span>
            </div>
            <h4 className='trending__card-title'>{film?.title || film?.name}</h4>
            <span className='trending__card-date'>{formatDate(film?.release_date || film?.first_air_date)}</span>
          </div>
        ))}
      </div>
      <div className='button-container'>
        <button className='btn btn--option-selected btn--uppercase'>
          <FormattedMessage id='generic:more-button' />
        </button>
      </div>
    </section>
  );
};

export default TrendingHomePage;
