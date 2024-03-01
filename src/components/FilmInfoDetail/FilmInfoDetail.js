import { roundPercentage, formatDate, getClassForAverageDetail } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';
import { FormattedMessage } from 'react-intl';
import './FilmInfoDetail.scss';

const FilmInfoDetail = ({ filmId }) => {
  const FILM_DETAIL_API_URL = `${process.env.REACT_APP_API_URL}movie/${filmId}?api_key=${process.env.REACT_APP_API_KEY}`;
  const FILM_DETAIL_CREDITS_API_URL = `${process.env.REACT_APP_API_URL}movie/${filmId}/credits?api_key=${process.env.REACT_APP_API_KEY}`;

  // https://api.themoviedb.org/3/movie/19995?api_key=fbe51bd775fbac91e0675c9c47cfa7cc&language=es
  // https://api.themoviedb.org/3/movie/19995/credits?api_key=fbe51bd775fbac91e0675c9c47cfa7cc&language=es
  // https://www.themoviedb.org/movie/19995-avatar

  const [filmData] = useFetch(FILM_DETAIL_API_URL);
  const [filmDataCredits] = useFetch(FILM_DETAIL_CREDITS_API_URL);

  return (
    <div className='film-detail'>
      <img className='film-detail__img' src={`https://image.tmdb.org/t/p/w500${filmData?.poster_path}`} alt={filmData?.title} />
      <div className='film-detail__info'>
        <h1 className='film-detail__title'>{filmData?.title || filmData?.name}</h1>
        <p className='film-detail__technical_info'>
          <span className='film-detail__date'>{formatDate(filmData?.release_date || filmData?.first_air_date)}</span>
          <span className='film-detail__language'> ({filmData?.original_language})</span> |<span className='film-detail__genres'> {filmData?.genres.map((genre) => genre.name).join(', ')}</span>
        </p>
        <div className='film-detail__average'>
          <span className='film-detail__average-number'>
            {roundPercentage(filmData?.vote_average)} <span className='percent'>%</span>
          </span>
          <span className={getClassForAverageDetail(roundPercentage(filmData?.vote_average))}></span>
          <span className='film-detail__average-text'>
            <FormattedMessage id='film:user_score' />
          </span>
        </div>
        <p className='film-detail__tagline'>{filmData?.tagline}</p>
        <h2 className='film-detail__overview'>
          <FormattedMessage id='film:overview' />
        </h2>
        <p className='film-detail__overview-info'>{filmData?.overview}</p>
        <div className='film-detail__credits'>
          <div className='film-detail__credits-info'>
            <p className='film-detail__credits-name'>{filmDataCredits?.overview}</p>
            <p className='film-detail__credits-job'>{filmDataCredits?.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmInfoDetail;
