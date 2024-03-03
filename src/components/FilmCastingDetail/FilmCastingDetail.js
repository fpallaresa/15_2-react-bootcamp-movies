import React from 'react';
import { FormattedMessage } from 'react-intl';
import './FilmCastingDetail.scss';
import { useLanguage } from '../../hooks/languageContext';
import useFetch from '../../hooks/useFetch';
import CastingCards from '../CastingCards/CastingCards';

const FilmCastingDetail = ({ filmId }) => {
  const { currentLanguage } = useLanguage();
  const [castingData, setCastingData] = React.useState({ results: [] });

  const FILM_DETAIL_CREDITS_API_URL = `${process.env.REACT_APP_API_URL}movie/${filmId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`;
  const [data, loading, error] = useFetch(FILM_DETAIL_CREDITS_API_URL);

  React.useEffect(() => {
    if (data) {
      const castData = data.cast.filter((member) => member.known_for_department === 'Acting').slice(0, 10);
      setCastingData((prevData) => ({
        ...prevData,
        results: [...prevData.results, ...castData],
      }));
    }
  }, [data]);

  React.useEffect(() => {
    if (currentLanguage) {
      setCastingData({ results: [] });
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
    <section className='casting'>
      <div className='casting__header'>
        <h3 className='casting__title'>
          <FormattedMessage id='film:casting' />
        </h3>
      </div>
      <div className='casting__films'>{castingData && castingData?.results.map((data) => <CastingCards data={data} key={data.id} />)}</div>
    </section>
  );
};

export default FilmCastingDetail;
