import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { roundPercentage, formatDate, getClassForAverage } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';
import './TrendingHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';
import { usePagination } from '../../hooks/usePagination';

const TrendingHomePage = () => {
  const { currentLanguage } = useLanguage();
  const [filter, setFilter] = useState('day');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const apiUrl = `${process.env.REACT_APP_API_URL}trending/all/${filter}?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage === 'es' ? 'es-ES' : 'en-US'}`;

  const [trendingData] = useFetch(apiUrl);
  const [visibleItems, showMore, hasMore] = usePagination(trendingData?.results);

  if (!trendingData) {
    return (
      <div>
        <FormattedMessage id='generic:loading' />
      </div>
    );
  }

  return (
    <section className='trending'>
      <div className='trending__header'>
        <h3 className='trending__title'>
          <FormattedMessage id='home:trending' />
        </h3>
        <div className='trending__filters'>
          <button className={`btn ${filter === 'day' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('day')}>
            <FormattedMessage id='home:today' />
          </button>
          <button className={`btn ${filter === 'week' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('week')}>
            <FormattedMessage id='home:this_week' />
          </button>
        </div>
      </div>
      <div className='trending__films'>
        {visibleItems.map((film, index) => (
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
        {hasMore && (
          <button className='btn btn--option-selected btn--uppercase' onClick={showMore}>
            <FormattedMessage id='generic:more-button' />
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingHomePage;
