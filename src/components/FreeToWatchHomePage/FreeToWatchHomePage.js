import React from 'react';
import { FormattedMessage } from 'react-intl';
import './FreeToWatchHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import FilmsCards from '../FilmsCards/FilmsCards';

const FreeToWatchHomePage = () => {
  const { currentLanguage } = useLanguage();
  const [filter, setFilter] = React.useState('movie');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [watchData, setWatchData] = React.useState({ results: [] });

  const getWatchRegion = (language) => {
    return language.toLowerCase() === 'en' ? 'US' : 'ES';
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setTotalPages(1);
    setWatchData({ results: [] });
  };

  const apiUrl = `${process.env.REACT_APP_API_URL}discover/${filter}?sort_by=release_date.desc&vote_count.gte=1000&vote_average.gte=5&watch_region=${getWatchRegion(currentLanguage)}&with_watch_monetization_types=free&api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${currentPage}`;
  const [data, loading, error] = useFetch(apiUrl);

  React.useEffect(() => {
    if (data) {
      setWatchData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...data.results],
      }));
      setTotalPages(data.total_pages);
    }
  }, [data]);

  React.useEffect(() => {
    if (currentLanguage) {
      setWatchData({ results: [] });
    }
  }, [currentLanguage]);

  if (loading) {
    return (
      <div>
        <FormattedMessage id='generic:loading' />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className='watch'>
      <div className='watch__header'>
        <h3 className='watch__title'>
          <FormattedMessage id='home:free_watch' />
        </h3>
        <div className='watch__filters'>
          <button className={`btn ${filter === 'movie' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('movie')}>
            <FormattedMessage id='header:movies' />
          </button>
          <button className={`btn ${filter === 'tv' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('tv')}>
            <FormattedMessage id='home:television' />
          </button>
        </div>
      </div>
      <div className='watch__films'>
        {watchData && watchData?.results.map((film) => (
          <FilmsCards film={film} key={film.id} mediaType={filter === 'movie' ? 'movie' : 'tv'} />
        ))}
      </div>
      <div className='button-container'>
        {currentPage < totalPages && (
          <button className='btn btn--option-selected btn--uppercase' onClick={() => setCurrentPage(currentPage + 1)}>
            <FormattedMessage id='generic:more-button' />
          </button>
        )}
      </div>
    </section>
  );
};

export default FreeToWatchHomePage;
