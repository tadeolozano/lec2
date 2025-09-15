/* eslint-env vitest */
/* eslint-disable no-undef */
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi } from 'vitest';
import ProductDetails from '../components/productDetails.jsx';

afterEach(() => {
  vi.restoreAllMocks();
});

test('shows error message when API fails', async () => {
  vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('fail'));
  render(
    <MemoryRouter initialEntries={['/product/1']}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.getByText(/Failed to load product/)).toBeInTheDocument());
});
