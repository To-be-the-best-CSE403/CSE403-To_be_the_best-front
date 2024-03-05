import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerPage from './TrainerPage';

describe('TrainerPage', () => {
  test('test structure', () => {
    render(<TrainerPage />);

    expect(screen.getByTestId('test-tobethebest-sidebar__container')).toBeInTheDocument();
    expect(screen.getByTestId('test-tobethebest-sidebar-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-tobethebest-sidebar-trainer')).toBeInTheDocument();
  });

  test('test content', () => {
    render(<TrainerPage />);

    expect(screen.getByText('Trainer')).toBeInTheDocument();
    expect(screen.getByText('Challenge Bot')).toBeInTheDocument();
  });
});
