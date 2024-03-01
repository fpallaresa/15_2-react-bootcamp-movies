import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaPlay } from 'react-icons/fa6';
import './TrailersCards.scss';

const TrailersCards = ({ film }) => {
  const [youtubeKey, setYoutubeKey] = React.useState('');

  React.useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${film.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        let trailer = data.results.find((video) => video.type === 'Trailer');
        if (!trailer) trailer = data.results.find((video) => video.type === 'Clip');
        if (!trailer && data.results.length > 0) trailer = data.results[0];
        if (trailer) setYoutubeKey(trailer.key);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };

    fetchTrailer();
  }, [film.id]);

  const youtubeURL = `https://www.youtube.com/watch?v=${youtubeKey}`;

  return (
    <div className='trailer-cards'>
      <a className='trailer-cards__link' href={youtubeURL} title={film?.title || film?.name} target='_blank' rel='noreferrer'>
        <span className='trailer-cards__icon'>
          <FaPlay />
        </span>
        <FormattedMessage id='trailer:youtube_button' />
      </a>
      <h4 className='trailer-cards__card-title'>
        <a className='trailer-cards__card-link' title={film?.title || film?.name}>{film?.title || film?.name}</a>
      </h4>
      <p className='trailer-cards__card-description'>
        <FormattedMessage id='trailer:oficial_trailers' />
      </p>
    </div>
  );
};

export default TrailersCards;
