import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import { render } from '@testing-library/react';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing (shallow test)', () => {
  shallow(<App />);
});

it('renders headline', () => {
  const { getByText } = render(<App />);
  expect(getByText('TODO List')).toBeInTheDocument();
});

it('matches snapshots', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

