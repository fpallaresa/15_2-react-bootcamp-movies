import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('App', () => {
    render(<App />);
    const title = screen.getByText('Quiz');
    expect(title).toBeInTheDocument();
  });
});
