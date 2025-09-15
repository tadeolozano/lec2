/* eslint-env vitest */
/* eslint-disable no-undef */
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App.jsx';
import { ThemeProvider } from '../Context/ThemeToggler.jsx';

test('renders cart page via routing with stored item', async () => {
  localStorage.setItem('cart', JSON.stringify([{ id: 1, title: 'Integrated', price: 10 }]));
  window.history.pushState({}, '', '/cart');
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
  await waitFor(() => expect(screen.getByText('Integrated')).toBeInTheDocument());
});
