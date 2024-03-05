import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Pokemon, Move } from '@smogon/calc';
import BattlePage from './BattlePage';

const attacker = new Pokemon(1, 'Pikachu', {});
const defender = new Pokemon(1, 'Charmander', {});
const moves = [
  new Move(1, 'Thunderbolt', {}),
  new Move(1, 'Quick Attack', {}),
  new Move(1, 'Thunder', {}),
  new Move(1, 'Agility', {}),
];

describe('BattlePage', () => {
  test('test structure', () => {
    render(<BattlePage attacker={attacker} defender={defender} moves={moves} />);

    expect(screen.getByTestId('test-tobethebest-sidebar__container')).toBeInTheDocument();
    expect(screen.getByTestId('test-tobethebest-sidebar-header')).toBeInTheDocument();
    expect(screen.getByTestId('test-tobethebest-movesuggestion')).toBeInTheDocument();
  });

  test('test content', () => {
    render(<BattlePage attacker={attacker} defender={defender} moves={moves} />);

    expect(screen.getByText('Battle')).toBeInTheDocument();
    expect(screen.getByText('MOVES')).toBeInTheDocument();
    expect(screen.getByText('EFFECTIVENESS')).toBeInTheDocument();
    expect(screen.getByText('DAMAGE')).toBeInTheDocument();
  });
});
