import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Renders navbar', () => {
  render(<App />);
  const linkElement = screen.getByText("Home Loans");
  expect(linkElement).toBeInTheDocument();
});
