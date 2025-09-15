/* eslint-env vitest */
/* eslint-disable no-undef */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AddToCart from '../components/addToCart.jsx';

describe('Cart operations', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('cart', JSON.stringify([{ id: 1, title: 'Test', price: 10, quantity: 1 }]));
  });

  test('removes item from cart', async () => {
    render(<AddToCart />);
    await waitFor(() => screen.getByText('Test'));
    fireEvent.click(screen.getByText('Remove'));
    await waitFor(() => screen.getByText(/Your cart is empty/));
  });

  test('increases and decreases quantity', async () => {
    render(<AddToCart />);
    const quantity = await waitFor(() => screen.getByText(/Quantity/));
    expect(quantity.textContent).toMatch('Quantity: 1');
    fireEvent.click(screen.getByText('+'));
    await waitFor(() => expect(screen.getByText(/Quantity/).textContent).toMatch('Quantity: 2'));
    fireEvent.click(screen.getByText('-'));
    await waitFor(() => expect(screen.getByText(/Quantity/).textContent).toMatch('Quantity: 1'));
  });
});
