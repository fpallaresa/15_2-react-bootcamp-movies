import React from 'react';
import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import QuizOptions from '../../components/QuizOptions/QuizOptions';
import { useLanguage } from '../../hooks/languageContext';
import { generateRandom } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';

const QuizPage = () => {
  const { currentLanguage } = useLanguage();
  const [filmData, setFilmData] = React.useState(null);
  const [apiUrl, setApiUrl] = React.useState('');
  const [filmId, setFilmId] = React.useState('');
  const [incorrectOptions, setIncorrectOptions] = React.useState([]);
  const [key, setKey] = React.useState(0);
  const [filmTitle, setFilmTitle] = React.useState('??????');
  const [randomPage, setRandomPage] = React.useState('');

  React.useEffect(() => {
    if (currentLanguage && filmId) {
      const url = `${process.env.REACT_APP_API_URL}movie/${filmId}?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}`;
      setApiUrl(url);
    }
  }, [currentLanguage, filmId]);

  React.useEffect(() => {
    if (randomPage) {
      const url = `${process.env.REACT_APP_API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${randomPage}`;
      setApiUrl(url);
    }
  }, [randomPage, key]);

  React.useEffect(() => {
    const newRandomPage = generateRandom(1, 100);
    setRandomPage(newRandomPage);
  }, []);

  const [data, loading] = useFetch(apiUrl);

  React.useEffect(() => {
    if (!loading && data && data?.id !== filmId) {
      const randomFilmIndex = generateRandom(0, data.results.length);
      const randomFilm = data.results[randomFilmIndex];
      setFilmData(randomFilm);
      setFilmId(randomFilm.id);

      const optionsList = data.results.map((result) => result.title);
      const incorrectOptions = [];
      while (incorrectOptions.length < 3) {
        // iteramos hasta obtener 3 resultados random
        const randomIndex = generateRandom(0, optionsList.length);
        const randomOption = optionsList[randomIndex];
        if (randomOption !== randomFilm.title && !incorrectOptions.includes(randomOption)) {
          incorrectOptions.push(randomOption);
        }
      }
      setIncorrectOptions(incorrectOptions);
      setFilmTitle('??????');
    }
  }, [data]);

  React.useEffect(() => {
    if (data !== !data) {
      setFilmData(data);
    }
  }, [data]);

  const generateNewPage = React.useCallback(() => {
    // Fuerza nuevo renderizado de QuizOptions
    setKey((prevKey) => prevKey + 1);
  }, []);

  const handleQuizSolve = (correctAnswer) => {
    setFilmTitle(correctAnswer);
  };

  return (
    <div className='main'>
      {filmData && <FilmInfoDetail filmData={{ ...filmData, title: filmTitle }} />}
      {filmData && <QuizOptions filmData={filmData} incorrectOptions={incorrectOptions} generateNewPage={generateNewPage} handleQuizSolve={handleQuizSolve} />}
    </div>
  );
};

export default QuizPage;
