import React from 'react';
import { FormattedMessage } from 'react-intl';
import './FilmCastingDetail.scss';
import CastingCards from '../CastingCards/CastingCards';

const FilmCastingDetail = ({ castingData }) => {
  return (
    <section className='casting'>
      <div className='casting__header'>
        <h3 className='casting__title'>
          <FormattedMessage id='film:casting' />
        </h3>
      </div>
      <div className='casting__films'>
        {castingData && castingData.map((data) => <CastingCards data={data} key={data.id} />)}
      </div>
    </section>
  );
};

export default FilmCastingDetail;
