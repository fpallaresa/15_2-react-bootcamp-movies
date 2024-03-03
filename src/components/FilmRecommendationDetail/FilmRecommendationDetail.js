import React from 'react';
import { FormattedMessage } from 'react-intl';
import './FilmRecommendationDetail.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import RecommendationsCards from '../RecommendationsCards/RecommendationsCards';

const FilmRecommendationDetail = ({ filmId }) => {
  const { currentLanguage } = useLanguage();
  const [recommendationData, setRecommendationData] = React.useState({ results: [] });

  const FILM_DETAIL_CREDITS_API_URL = `${process.env.REACT_APP_API_URL}movie/${filmId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`;
  const [data, loading, error] = useFetch(FILM_DETAIL_CREDITS_API_URL);

  React.useEffect(() => {
    if (data) {
      setRecommendationData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...data.results],
      }));
    }
  }, [data]);

  React.useEffect(() => {
    if (currentLanguage) {
      setRecommendationData({ results: [] });
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
    <section className='recommendation'>
      <div className='recommendation__header'>
        <h3 className='recommendation__title'>
          <FormattedMessage id='film:recommendation' />
        </h3>
      </div>
      <div className='recommendation__films'>{recommendationData && recommendationData?.results.map((data) => <RecommendationsCards data={data} key={data.id} />)}</div>
    </section>
  );
};

export default FilmRecommendationDetail;
