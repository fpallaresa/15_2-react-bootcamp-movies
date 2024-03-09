import React from 'react';
import FilmInfoDetail from '../../components/FilmInfoDetail/FilmInfoDetail';
import QuizOptions from '../../components/QuizOptions/QuizOptions';
import { useLanguage } from '../../hooks/languageContext';
import { generateRandom } from '../../utils/utils';
import useFetch from '../../hooks/useFetch';

const QuizPage = () => {
  const { currentLanguage } = useLanguage();
  const [filmData, setFilmData] = React.useState(null);
  const [apiTopRatedUrl, setApiTopRatedUrl] = React.useState('');
  const [incorrectOptions, setIncorrectOptions] = React.useState([]);
  const [filmTitle, setFilmTitle] = React.useState('??????');
  const [randomPage, setRandomPage] = React.useState('');
  const [randomFilmIndex, setRandomFilmIndex] = React.useState(null);

  React.useEffect(() => {
    if (randomPage) {
      const url = `${process.env.REACT_APP_API_URL}movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=${currentLanguage}&page=${randomPage}`;
      setApiTopRatedUrl(url);
    }
  }, [randomPage, currentLanguage]);

  React.useEffect(() => {
    const newRandomPage = generateRandom(1, 100);
    setRandomPage(newRandomPage);
  }, []);

  const [topRatedData, loading] = useFetch(apiTopRatedUrl);

  React.useEffect(() => {
    const newRandomFilmIndex = generateRandom(0, 20);
    setRandomFilmIndex(newRandomFilmIndex);
  }, []);

  React.useEffect(() => {
    if (!loading && topRatedData && randomFilmIndex !== null) {
      const randomFilm = topRatedData.results[randomFilmIndex];
      setFilmData(randomFilm);

      const optionsList = topRatedData.results.map((result) => result.title);
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
  }, [topRatedData, randomFilmIndex]);

  const generateNewPage = () => {
    // Fuerza nuevo renderizado de QuizOptions
    setRandomPage(randomPage + 1);
  };

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
