import Header from './Header';
import { screen, render } from '@testing-library/react';

describe('Header should', () => {

  it('render with children', () => {
    const children = (
      <>
        <p>1</p>
        <p>2</p>
        <p>3</p>
      </>
    );
    render(<Header>{children}</Header>);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('render without children', () => {
    render(<Header />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});