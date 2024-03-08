import React from 'react';
import { FormattedMessage } from 'react-intl';
import './PopularHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import FilmsCards from '../FilmsCards/FilmsCards';

const PopularHomePage = () => {
  const { currentLanguage } = useLanguage();
  const [filter, setFilter] = React.useState('movie');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [popularData, setPopularData] = React.useState({ results: [] });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setTotalPages(1);
    setPopularData({ results: [] });
  };

  const apiUrl = `${process.env.REACT_APP_API_URL}${filter}/popular?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${currentPage}`;
  const [data, loading, error] = useFetch(apiUrl);

  React.useEffect(() => {
    if (data) {
      setPopularData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...data.results],
      }));
      setTotalPages(data.total_pages);
    }
  }, [data]);

  React.useEffect(() => {
    if (currentLanguage) {
      setPopularData({ results: [] });
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
    <section className='popular'>
      <div className='popular__header'>
        <h3 className='popular__title'>
          <FormattedMessage id='home:popular' />
        </h3>
        <div className='popular__filters'>
          <button className={`btn ${filter === 'movie' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('movie')}>
            <FormattedMessage id='header:movies' />
          </button>
          <button className={`btn ${filter === 'tv' ? 'btn--option-selected' : ''}`} onClick={() => handleFilterChange('tv')}>
            <FormattedMessage id='home:television' />
          </button>
        </div>
      </div>
      <div className='popular__films'>{popularData && popularData?.results.map((film) => <FilmsCards film={film} key={film.id} mediaType={filter === 'movie' ? 'movie' : 'tv'} />)}</div>
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

export default PopularHomePage;
