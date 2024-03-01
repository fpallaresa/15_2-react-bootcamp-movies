import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LanguageProvider } from './hooks/languageContext';
import { FilmProvider } from './hooks/filmContext';
import HomePage from './pages/HomePage/HomePage';
import FilmPage from './pages/FilmPage/FilmPage';
import QuizPage from './pages/QuizPage/QuizPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import './App.scss';
import English from './lang/en.json';
import Spanish from './lang/es.json';

const locale = navigator.language;
let defaultMessages = Spanish;
switch (locale) {
  case 'en-EN':
    defaultMessages = English;
    break;
  case 'es-ES':
    defaultMessages = Spanish;
    break;
  default:
    defaultMessages = English;
}

function App() {
  const [messages, setMessages] = React.useState(defaultMessages);

  return (
    <IntlProvider messages={messages} locale={locale}>
      <LanguageProvider>
        <FilmProvider>
          <div className='App'>
            <HashRouter>
              <Header setMessages={setMessages} spanishMessages={Spanish} englishMessages={English} />
              <Routes>
                <Route path='/' element={<HomePage />}></Route>
                <Route path='/film-page/:filmId' element={<FilmPage />}></Route>
                <Route path='/quiz' element={<QuizPage />}></Route>
              </Routes>
              <Footer />
            </HashRouter>
          </div>
        </FilmProvider>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default App;
