import { roundPercentage, formatDate, getClassForAverage } from '../../utils/utils';
import { Link } from 'react-router-dom';
import './FilmsCards.scss';

const FilmsCards = ({ film, index }) => {
  return (
    <div className='cards-film' key={index}>
      <Link to={`/film-page/${film.id}`} className='cards-film__card-link' title={film?.title || film?.name}>
        <img className='cards-film__card-img' src={`https://image.tmdb.org/t/p/w500${film?.poster_path}`} alt={film?.title} />
      </Link>
      <div className='cards-film__card-average'>
        <span className='cards-film__card-average-number'>
          {roundPercentage(film?.vote_average)} <span className='percent'>%</span>
        </span>
        <span className={getClassForAverage(roundPercentage(film?.vote_average))}></span>
      </div>
      <h4 className='cards-film__card-title'>
        <Link to={`/film-page/${film.id}`} className='cards-film__card-link' title={film?.title || film?.name}>
          {film?.title || film?.name}
        </Link>
      </h4>
      <span className='cards-film__card-date'>{formatDate(film?.release_date || film?.first_air_date)}</span>
    </div>
  );
};

export default FilmsCards;
