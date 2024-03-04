import './CastingCards.scss';
import { handleImageError } from '../../utils/utils';

const CastingCards = ({ data, index }) => {
  return (
    <div className='cards-casting' key={index}>
      <img className='cards-casting__card-img' src={`https://image.tmdb.org/t/p/w400${data?.profile_path}`} onError={handleImageError} alt={data?.name} />
      <h4 className='cards-casting__card-title'>{data?.name}</h4>
      <span className='cards-casting__card-character'>{data?.character}</span>
    </div>
  );
};

export default CastingCards;
