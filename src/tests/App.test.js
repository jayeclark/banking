import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders boilerplate text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Bad bank app/i);
  expect(linkElement).toBeInTheDocument();
});
