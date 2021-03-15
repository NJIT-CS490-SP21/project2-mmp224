import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Login from './Login';
import Board from './Board';

 test('reset button dissapears', () => {
   const result = render(<App />);
   const resetButtonElement = screen.getByText('Reset');
   expect(resetButtonElement).toBeInTheDocument();
   fireEvent.click(resetButtonElement);
   expect(resetButtonElement).not.toBeInTheDocument();
 });
 
 test('Login Button', () => {
     const result = render(<App />);
     const loginElement = screen.getByText('');
     
 });

// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
