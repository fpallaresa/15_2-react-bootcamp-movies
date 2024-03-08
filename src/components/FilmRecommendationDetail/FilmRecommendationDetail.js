import { FormattedMessage } from 'react-intl';
import './FilmRecommendationDetail.scss';
import RecommendationsCards from '../RecommendationsCards/RecommendationsCards';

const FilmRecommendationDetail = ({ recommendationData }) => {
  return (
    <section className='recommendation'>
      <div className='recommendation__header'>
        <h3 className='recommendation__title'>
          <FormattedMessage id='film:recommendation' />
        </h3>
      </div>
      <div className='recommendation__films'>
        {recommendationData && recommendationData.map((data) => <RecommendationsCards data={data} key={data.id} mediaType={data.media_type}/>)}
      </div>
    </section>
  );
};

export default FilmRecommendationDetail;
