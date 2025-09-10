import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import MenuBar from './components/MenuBar';

// Mock the MenuBar component
jest.mock('./components/MenuBar', () => {
  return jest.fn(() => <div data-testid="menubar">Mock MenuBar</div>);
});

describe('App', () => {
  test('renders MenuBar component', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    expect(screen.getByTestId('menubar')).toBeInTheDocument();
  });
});
