import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { LanguageProvider } from './hooks/languageContext';
import HomePage from './pages/HomePage/HomePage';
import FilmPage from './pages/FilmPage/FilmPage';
import QuizPage from './pages/QuizPage/QuizPage';
import Header from './components/Header/Header';
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
        <div className='App'>
          <HashRouter>
            <Header setMessages={setMessages}></Header>
            <Routes>
              <Route path='/' element={<HomePage />}></Route>
              <Route path='/film-page' element={<FilmPage />}></Route>
              <Route path='/quiz' element={<QuizPage />}></Route>
            </Routes>
          </HashRouter>
        </div>
      </LanguageProvider>
    </IntlProvider>
  );
}

export default App;
