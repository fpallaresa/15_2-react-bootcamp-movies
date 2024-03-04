import React from 'react';
import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import { useLanguage } from '../../hooks/languageContext';
import { generateRandom } from '../../utils/utils';

const QuizPage = () => {
  const { currentLanguage } = useLanguage();
  const [filmData, setFilmData] = React.useState(null);

  React.useEffect(() => {
    const fetchRandomFilm = async () => {
      try {
        const randomPage = generateRandom(1, 100);
        const filmResponse = await fetch(`${process.env.REACT_APP_API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${randomPage}`);
        const filmDataPage = await filmResponse.json();
        const randomFilmIndex = generateRandom(0, filmDataPage.results.length);
        const randomFilm = filmDataPage.results[randomFilmIndex];

        setFilmData(randomFilm);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRandomFilm();
  }, [currentLanguage]);

  return <div className='main'>{filmData && <FilmInfoDetail filmData={filmData} />}</div>;
};

export default QuizPage;
