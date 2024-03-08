import { roundPercentage, handleImageError } from '../../utils/utils';
import { Link } from 'react-router-dom';
import './RecommendationsCards.scss';

const RecommendationsCard = ({ data, index, mediaType }) => {
  return (
    <div className='cards-recommendations' key={index}>
      <Link to={`/film-page/${data.id}/${mediaType}`}>
        <img className='cards-recommendations__card-img' src={`https://image.tmdb.org/t/p/w400${data?.backdrop_path}`} onError={handleImageError} alt={data?.title || data?.name} />
      </Link>
      <div className='cards-recommendations__card-info'>
        <Link to={`/film-page/${data.id}`} >
          <h4 className='cards-recommendations__card-title'>{data?.title || data?.name}</h4>
        </Link>
        <span className='cards-recommendations__card-average'>{roundPercentage(data?.vote_average)}%</span>
      </div>
    </div>
  );
};

export default RecommendationsCard;
