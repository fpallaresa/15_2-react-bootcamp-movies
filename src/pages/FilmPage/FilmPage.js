import React from 'react';
import { useParams } from 'react-router-dom';
import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import FilmCastingDetail from '../../components/FilmCastingDetail/FilmCastingDetail';
import FilmRecommendationDetail from '../../components/FilmRecommendationDetail/FilmRecommendationDetail';
import { useLanguage } from '../../hooks/languageContext';

const FilmPage = () => {
  const { currentLanguage } = useLanguage();
  const { filmId, type } = useParams();
  const [filmData, setFilmData] = React.useState(null);
  const [filmDataCredits, setFilmDataCredits] = React.useState(null);
  const [castingData, setCastingData] = React.useState([]);
  const [recommendationData, setRecommendationData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const filmResponse = await fetch(`${process.env.REACT_APP_API_URL}${type}/${filmId}?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`);
        const filmData = await filmResponse.json();
        setFilmData(filmData);

        const creditsResponse = await fetch(`${process.env.REACT_APP_API_URL}${type}/${filmId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`);
        const creditsData = await creditsResponse.json();
        setFilmDataCredits(creditsData);

        const castData = creditsData.cast.filter((member) => member.known_for_department === 'Acting').slice(0, 10);
        setCastingData(castData);

        const recommendationsResponse = await fetch(`${process.env.REACT_APP_API_URL}${type}/${filmId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`);
        const recommendationsData = await recommendationsResponse.json();
        setRecommendationData(recommendationsData.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filmId, type, currentLanguage]);

  return (
    <div className='main'>
      {filmData && filmDataCredits && <FilmInfoDetail filmData={filmData} filmDataCredits={filmDataCredits} />}
      <FilmCastingDetail castingData={castingData} />
      <FilmRecommendationDetail recommendationData={recommendationData} />
    </div>
  );
};

export default FilmPage;
