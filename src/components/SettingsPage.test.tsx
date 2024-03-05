import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SettingsPage from './SettingsPage';

describe('SettingsPage', () => {
  test('test structure', () => {
    render(<SettingsPage />);

    expect(screen.getByTestId('test-tobethebest-sidebar__container')).toBeInTheDocument();
    expect(screen.getByTestId('test-tobethebest-sidebar-header')).toBeInTheDocument();
  });

  test('test content', () => {
    render(<SettingsPage />);

    expect(screen.getByText('Settings')).toBeInTheDocument();
  });
});
