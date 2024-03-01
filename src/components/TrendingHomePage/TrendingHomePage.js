import React from 'react';
import { FormattedMessage } from 'react-intl';
import './TrendingHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import FilmsCards from '../FilmsCards/FilmsCards';

const TrendingHomePage = () => {
  const { currentLanguage } = useLanguage();
  const [filter, setFilter] = React.useState('day');
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [trendingData, setTrendingData] = React.useState({ results: [] });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
    setTotalPages(1);
    setTrendingData({ results: [] });
  };

  const apiUrl = `${process.env.REACT_APP_API_URL}trending/all/${filter}?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${currentPage}`;
  const [data, loading, error] = useFetch(apiUrl);

  React.useEffect(() => {
    if (data) {
      setTrendingData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...data.results],
      }));
      setTotalPages(data.total_pages);
    }
  }, [data]);

  React.useEffect(() => {
    if (currentLanguage) {
      setTrendingData({ results: [] });
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
      <div className='trending__films'>{trendingData && trendingData?.results.map((film) => <FilmsCards film={film} key={film.id} />)}</div>
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

export default TrendingHomePage;
