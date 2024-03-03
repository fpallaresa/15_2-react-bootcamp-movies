import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import FilmCastingDetail from '../../components/FilmCastingDetail/FilmCastingDetail';
import FilmRecommendationDetail from '../../components/FilmRecommendationDetail/FilmRecommendationDetail';
import './FilmPage.scss';
import { useParams } from 'react-router-dom';

const FilmPage = () => {
  const { filmId } = useParams();

  return (
    <div className='main'>
      <FilmInfoDetail filmId={filmId} />
      <FilmCastingDetail filmId={filmId} />
      <FilmRecommendationDetail filmId={filmId} />
    </div>
  );
};

export default FilmPage;
