import React from 'react';
import { FormattedMessage } from 'react-intl';
import './QuizOptions.scss';

const QuizOptions = ({ filmData, incorrectOptions, generateNewPage, handleQuizSolve }) => {
  const [options, setOptions] = React.useState([]);
  const [answer, setAnswer] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState('');
  const [gameIsSolved, setGameIsSolved] = React.useState(false);

  React.useEffect(() => {
    // mezcla opciones de quiz cuando cambia la película
    if (filmData) {
      const optionsList = [filmData.title, ...incorrectOptions];
      const shuffledOptions = shuffleArray(optionsList);
      setOptions(shuffledOptions);
      setAnswer(filmData.title);
      setSelectedOption('');
      setGameIsSolved(false);
    }
  }, [filmData, incorrectOptions]);

  const shuffleArray = (array) => {
    // Algoritmo de mezcla el array aleatorio (Fisher-Yates) CHATGPT
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const selectOption = (option) => {
    // seleccionar una opción
    if (!gameIsSolved) {
      setSelectedOption(option);
    }
  };

  const getClassesForButton = (option) => {
    // añade las class a los botones
    if (gameIsSolved) {
      if (option === answer) {
        return 'btn--option-correct';
      } else if (option === selectedOption) {
        return 'btn--option-wrong';
      }
    } else {
      if (option === selectedOption) {
        return 'btn--option-select';
      }
    }
  };

  const handleSolve = () => {
    // Resuelve el quiz
    setGameIsSolved(true);
    handleQuizSolve(filmData?.title);
  };

  const generateNewGamePlay = () => {
    // Generar un nuevo juego
    setGameIsSolved(false);
    setSelectedOption('');
    generateNewPage();
  };

  return (
    <div className='quiz-options'>
      <div className='quiz-options__header'>
        <h3 className='quiz-options__title'>
          <FormattedMessage id='quiz:title' />
        </h3>
      </div>
      <div className='quiz-options__buttons'>
        {options.map((option, index) => (
          <button key={index} className={'btn quiz-options__button ' + getClassesForButton(option)} onClick={() => selectOption(option)}>
            {option}
          </button>
        ))}
      </div>
      <div className='quiz-options__solve'>
        <button className='btn quiz-options__solve-btn' onClick={generateNewGamePlay}>
          <FormattedMessage id='quiz:restart' />
        </button>
        <button className='btn btn--option-selected quiz-options__solve-btn' disabled={gameIsSolved} onClick={handleSolve}>
          <FormattedMessage id='quiz:solve' />
        </button>
      </div>
    </div>
  );
};

export default QuizOptions;
