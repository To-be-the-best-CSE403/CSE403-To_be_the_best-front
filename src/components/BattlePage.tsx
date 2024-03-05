import { Dex } from '@pkmn/sim';
import { Pokemon, Move, Generations, Result, calculate } from '@smogon/calc';
import { getMoveEffectiveness } from '@smogon/calc/src/mechanics/util';
import { GEN } from '@src/constants';

interface BattlePageProps {
  attacker: Pokemon | undefined;
  defender: Pokemon | undefined;
  moves: Move[] | undefined;
}

export default function BattlePage({ attacker, defender, moves }: BattlePageProps) {
  const displayEffectiveness = (effectiveness: number) => {
    if (effectiveness < 1) {
      return <p style={{ color: 'red' }}>Not very effective</p>;
    } else if (effectiveness === 1) {
      return <p style={{ color: 'gray' }}>Neutral</p>;
    } else if (effectiveness > 1) {
      return <p style={{ color: 'green' }}>Super effective</p>;
    }
  };

  const displayDamage = (result: Result) => {
    if (result.range()[0] === 0 && result.range()[1] === 0) {
      return 'N/A';
    }
    return result.range().join(' - ') + ' %';
  };

  const displayMoves = () => {
    return moves.map((move, i) => {
      const result = calculate(GEN, attacker, defender, move);

      const moveEffectiveness = defender.types
        .map(type => getMoveEffectiveness(Generations.get(GEN), move, type))
        .reduce((a, b) => a * b, 1);

      const damage = displayDamage(result);
      const effectiveness = damage === 'N/A' ? 'N/A' : displayEffectiveness(moveEffectiveness);

      return (
        <div id="tobethebest-movesuggestion-grid__row" key={i}>
          <div id="tobethebest-movesuggestion-grid__item">
            <p>{move.name}</p>
            <p>{displayType(move.type)}</p>
            </div>
          <div id="tobethebest-movesuggestion-grid__item">{effectiveness}</div>
          <div id="tobethebest-movesuggestion-grid__item">{damage}</div>
        </div>
      );
    });
  };

  const displayPokemon = (pokemon: Pokemon) => {
    return (
      <div id="tobethebest-movesuggestion-pokemon">
        <p>{pokemon.name}</p>
        <p>{pokemon.types.map(type => displayType(type))}</p>
      </div>
    );
  };

  const displayType = (type: string) => {
    return (
      <img
        src={`https://play.pokemonshowdown.com/sprites/types/${type}.png`}
        alt={type}
        height="14"
        width="32"
        className="pixelated"
      />
    );
  };

  const displaySuggestions = () => {
    if (attacker && defender && moves) {
      return (
        <>
          <div id="tobethebest-movesuggestion-header">
            {displayPokemon(attacker)}
            <p>VS</p>
            {displayPokemon(defender)}
          </div>
          <div id="tobethebest-movesuggestion-grid">
            <div id="tobethebest-movesuggestion-grid__row">
              {['Moves', 'Effectiveness', 'Damage'].map(header => (
                <div id="tobethebest-movesuggestion-grid__header">{header.toUpperCase()}</div>
              ))}
            </div>
            {displayMoves()}
          </div>
        </>
      );
    } else {
      return <p>Not in battle</p>;
    }
  };

  return (
    <div id="tobethebest-sidebar__container" data-testid="test-tobethebest-sidebar__container">
      <div id="tobethebest-sidebar-header" data-testid="test-tobethebest-sidebar-header">
        Battle
      </div>
      <div id="tobethebest-movesuggestion" className="tobethebest-sidebar__component">
        <h2>Move Suggestion</h2>
        {displaySuggestions()}
      </div>
    </div>
  );
}
