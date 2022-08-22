import Footer from './Footer';
import { screen, render } from '@testing-library/react';

describe('Footer should', () => {
  it('render', () => {
    render(<Footer />);
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});