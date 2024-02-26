import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import HomePage from './pages/HomePage/HomePage';
import FilmPage from './pages/FilmPage/FilmPage';
import QuizPage from './pages/QuizPage/QuizPage';
import Header from './components/Header/Header';
import './App.scss';
import English from './lang/en.json';
import Spanish from './lang/es.json';

export const LanguageSelector = React.createContext();

function App() {
  const [locale, setLocale] = React.useState(navigator.language);
  const [messages, setMessages] = React.useState(English);

  React.useEffect(() => {
    switch (locale) {
      case 'es-ES':
        setMessages(Spanish);
        break;
      default:
        setMessages(English);
    }
  }, [locale]);

  return (
    <div className='App'>
      <LanguageSelector.Provider value={{ language: locale, setLanguage: setLocale }}>
        <IntlProvider messages={messages} locale={locale}>
          <Header></Header>
          <h1>Hola</h1>
          <HashRouter>
            <Routes>
              <Route path='/' element={<HomePage></HomePage>}></Route>
              <Route path='/film-page' element={<FilmPage></FilmPage>}></Route>
              <Route path='/quiz' element={<QuizPage></QuizPage>}></Route>
            </Routes>
          </HashRouter>
        </IntlProvider>
      </LanguageSelector.Provider>
    </div>
  );
}

export default App;
