import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import './FilmPage.scss';
import { useParams } from 'react-router-dom';

const FilmPage = () => {
  const { filmId } = useParams();

  return <FilmInfoDetail filmId={filmId} />;
};

export default FilmPage;
