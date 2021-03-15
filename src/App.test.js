import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import Login from './Login';
import Board from './Board';

test('Spectators display properly', () => {
     const result = render(<App />);
     const spectatorsElement = screen.getByText('Login');
     expect(spectatorsElement).toBeInTheDocument();
     const spectatorsElement2 = document.getElementById('input');
     fireEvent.change(spectatorsElement2, { target: {value: 'userA' } });
     fireEvent.click(spectatorsElement);
     expect(spectatorsElement2).not.toBeInTheDocument();
     const spectatorsElement3 = screen.getByText('Spectators:');
     expect(spectatorsElement3).toBeInTheDocument();
 });
 
 test('Leaderboard', () => {
     const result = render(<Board player2 = "userA" />);
     const hideElement = screen.getByText('View/Hide LeaderBoard');
     expect(hideElement).toBeInTheDocument();
     fireEvent.click(hideElement);
     const rankingElement = document.getElementById('LEADERBOARD');
     expect(rankingElement).not.toBeInTheDocument();
 });
 
 test('Login Button', () => {
     const result = render(<App />);
     const loginElement = screen.getByText('Login');
     expect(loginElement).toBeInTheDocument();
     const loginElement2 = document.getElementById('input');
     fireEvent.change(loginElement2, { target: {value: 'userA' } });
     fireEvent.click(loginElement);
     expect(loginElement2).not.toBeInTheDocument();
 });

