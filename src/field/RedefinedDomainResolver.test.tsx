import React from 'react';
import { render, screen } from '@testing-library/react';
import RedefinedDomainResolver from './RedefinedDomainResolver';

test('renders learn react link', () => {
  render(<RedefinedDomainResolver />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
