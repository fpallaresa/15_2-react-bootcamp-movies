import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import './MovieTrailersHomePage.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import TrailerCards from '../TrailersCards/TrailersCards';

const MovieTrailersHomePage = () => {
  const { currentLanguage } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [movieTrailersData, setMovieTrailersData] = useState({ results: [] });

  const apiUrl = `${process.env.REACT_APP_API_URL}discover/movie?sort_by=release_date.desc&vote_count.gte=1000&vote_average.gte=5&api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${currentPage}`;
  const [data, loading, error] = useFetch(apiUrl);

  useEffect(() => {
    if (data) {
      setMovieTrailersData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...data.results],
      }));
      setTotalPages(data.total_pages);
    }
  }, [data]);

  useEffect(() => {
    if (currentLanguage) {
      setMovieTrailersData({ results: [] });
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
    <section className='movie-trailers'>
      <div className='movie-trailers__header'>
        <h3 className='movie-trailers__title'>
          <FormattedMessage id='home:movie_trailers' />
        </h3>
      </div>
      <div className='movie-trailers__films'>{movieTrailersData && movieTrailersData?.results.map((film) => <TrailerCards film={film} key={film.id} />)}</div>
      <div className='button-container'>
        {currentPage < totalPages && (
          <button className='btn btn--uppercase' onClick={() => setCurrentPage(currentPage + 1)}>
            <FormattedMessage id='generic:more-button' />
          </button>
        )}
      </div>
    </section>
  );
};

export default MovieTrailersHomePage;
