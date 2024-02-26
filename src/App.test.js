import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import App from './App';

export const LanguageSelector = React.createContext();

describe('App', () => {
  test('App', () => {
    const [locale, setLocale] = React.useState(navigator.language);
    render(
      <LanguageSelector.Provider value={{ language: locale, setLanguage: setLocale }}>
        <IntlProvider>
          <App />
        </IntlProvider>
      </LanguageSelector.Provider>
    );
    const title = screen.getByText('Hola');
    expect(title).toBeInTheDocument();
  });
});
