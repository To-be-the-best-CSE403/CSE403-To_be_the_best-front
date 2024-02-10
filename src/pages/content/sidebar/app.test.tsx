import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

describe('contentSidebar', () => {
  test('test structure', () => {
    render(<App />);

    // Test that the toggle element exists and has the correct id
    const toggle = screen.getByTestId('test-tobethebest-toggle');
    expect(toggle).toBeInTheDocument();
    expect(toggle.id).toBe('tobethebest-toggle');

    // Test that the sidebar element exists and has the correct id
    const sidebar = screen.getByTestId('test-tobethebest-sidebar');
    expect(sidebar).toBeInTheDocument();
    expect(sidebar.id).toBe('tobethebest-sidebar');

    // Test that the sidebar container element exists and has the correct id
    const sidebarContainer = screen.getByTestId('test-tobethebest-sidebar__container');
    expect(sidebarContainer).toBeInTheDocument();
    expect(sidebarContainer.id).toBe('tobethebest-sidebar__container');

    // Test that the sidebar header element exists and has the correct id
    const sidebarHeader = screen.getByTestId('test-tobethebest-sidebar-header');
    expect(sidebarHeader).toBeInTheDocument();
    expect(sidebarHeader.id).toBe('tobethebest-sidebar-header');

    // Test that the sidebar teambuilder element exists and has the correct id
    const sidebarTeambuilder = screen.getByTestId('test-tobethebest-sidebar-teambuilder');
    expect(sidebarTeambuilder).toBeInTheDocument();
    expect(sidebarTeambuilder.id).toBe('tobethebest-sidebar-teambuilder');

    // Test that the sidebar resources element exists and has the correct id
    const sidebarResources = screen.getByTestId('test-tobethebest-sidebar-resources');
    expect(sidebarResources).toBeInTheDocument();
    expect(sidebarResources.id).toBe('tobethebest-sidebar-resources');
  });

  test('test content', () => {
    render(<App />);

    // Test that the toggle div contains a child paragraph
    const toggle = screen.getByTestId('test-tobethebest-toggle');
    const toggleParagraph = toggle.querySelector('p#tobethebest-toggle__text');
    expect(toggleParagraph).toBeInTheDocument();
    expect(toggleParagraph.textContent).toBe('ToBeTheBest');

    // Test that the sidebar header contains a child h1
    const sidebarHeader = screen.getByTestId('test-tobethebest-sidebar-header');
    const sidebarHeaderH1 = sidebarHeader.querySelector('h1');
    expect(sidebarHeaderH1).toBeInTheDocument();
    expect(sidebarHeaderH1.textContent).toBe('ToBeTheBest');

    // Test that the sidebar teambuilder contains a child h2 and button
    const sidebarTeambuilder = screen.getByTestId('test-tobethebest-sidebar-teambuilder');
    const sidebarTeambuilderH2 = sidebarTeambuilder.querySelector('h2');
    expect(sidebarTeambuilderH2).toBeInTheDocument();
    expect(sidebarTeambuilderH2.textContent).toBe('Team Builder');
    const sidebarTeambuilderButton = sidebarTeambuilder.querySelector('button');
    expect(sidebarTeambuilderButton).toBeInTheDocument();
    expect(sidebarTeambuilderButton.textContent).toBe('Create Team');

    // Test that the sidebar resources contains a child h2 and three buttons
    const sidebarResources = screen.getByTestId('test-tobethebest-sidebar-resources');
    const sidebarResourcesH2 = sidebarResources.querySelector('h2');
    expect(sidebarResourcesH2).toBeInTheDocument();
    expect(sidebarResourcesH2.textContent).toBe('Resources');
    const sidebarResourcesButtons = sidebarResources.querySelectorAll('button');
    expect(sidebarResourcesButtons).toHaveLength(3);
    expect(sidebarResourcesButtons[0].textContent).toBe('Website');
    expect(sidebarResourcesButtons[1].textContent).toBe('Wiki');
    expect(sidebarResourcesButtons[2].textContent).toBe('Github');

  });
});

