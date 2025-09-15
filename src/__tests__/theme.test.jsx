/* eslint-env vitest */
/* eslint-disable no-undef */
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ThemeProvider, themeToggler } from '../Context/ThemeToggler.jsx';
import { useContext } from 'react';

function TestComponent() {
  const { theme, handleToggleTheme } = useContext(themeToggler);
  return (
    <div>
      <span>{theme}</span>
      <button onClick={handleToggleTheme}>toggle</button>
    </div>
  );
}

test('persists theme to localStorage', () => {
  localStorage.clear();
  const { unmount } = render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  fireEvent.click(screen.getByText('toggle'));
  expect(localStorage.getItem('theme')).toBe('dark');
  unmount();
  render(
    <ThemeProvider>
      <TestComponent />
    </ThemeProvider>
  );
  expect(screen.getByText('dark')).toBeInTheDocument();
  cleanup();
});
