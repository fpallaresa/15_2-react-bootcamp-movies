import { roundPercentage } from '../../utils/utils';
import { Link, useNavigate } from 'react-router-dom';
import './RecommendationsCards.scss';

const RecommendationsCard = ({ data, index }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/film-page/${data.id}`, { replace: true });
    window.location.reload();
  };

  return (
    <div className='cards-recommendations' key={index}>
      <Link to={`/film-page/${data.id}`} onClick={handleClick}>
        <img className='cards-recommendations__card-img' src={`https://image.tmdb.org/t/p/w400${data?.backdrop_path}`} alt={data?.title} />
      </Link>
      <div className='cards-recommendations__card-info'>
        <Link to={`/film-page/${data.id}`} onClick={handleClick}>
          <h4 className='cards-recommendations__card-title'>{data?.title}</h4>
        </Link>
        <span className='cards-recommendations__card-average'>{roundPercentage(data?.vote_average)}%</span>
      </div>
    </div>
  );
};

export default RecommendationsCard;
