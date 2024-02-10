/**
 * From https://github.com/smogon/pokemon-showdown/blob/master/sim/teams.ts
 * Subset of the Pokemon Showdown Teams API with only the packing function
 */

type StatIDExceptHP = 'atk' | 'def' | 'spa' | 'spd' | 'spe';
type StatID = 'hp' | StatIDExceptHP;
type StatsTable = {[stat in StatID]: number};

export interface PokemonSet {
	/**
	 * Nickname. Should be identical to its base species if not specified
	 * by the player, e.g. "Minior".
	 */
	name: string;
	/**
	 * Species name (including forme if applicable), e.g. "Minior-Red".
	 * This should always be converted to an id before use.
	 */
	species: string;
	/**
	 * This can be an id, e.g. "whiteherb" or a full name, e.g. "White Herb".
	 * This should always be converted to an id before use.
	 */
	item: string;
	/**
	 * This can be an id, e.g. "shieldsdown" or a full name,
	 * e.g. "Shields Down".
	 * This should always be converted to an id before use.
	 */
	ability: string;
	/**
	 * Each move can be an id, e.g. "shellsmash" or a full name,
	 * e.g. "Shell Smash"
	 * These should always be converted to ids before use.
	 */
	moves: string[];
	/**
	 * This can be an id, e.g. "adamant" or a full name, e.g. "Adamant".
	 * This should always be converted to an id before use.
	 */
	nature: string;
	gender: string;
	/**
	 * Effort Values, used in stat calculation.
	 * These must be between 0 and 255, inclusive.
	 *
	 * Also used to store AVs for Let's Go
	 */
	evs: StatsTable;
	/**
	 * Individual Values, used in stat calculation.
	 * These must be between 0 and 31, inclusive.
	 *
	 * These are also used as DVs, or determinant values, in Gens
	 * 1 and 2, which are represented as even numbers from 0 to 30.
	 *
	 * In Gen 2-6, these must match the Hidden Power type.
	 *
	 * In Gen 7+, Bottle Caps means these can either match the
	 * Hidden Power type or 31.
	 */
	ivs: StatsTable;
	/**
	 * This is usually between 1 and 100, inclusive,
	 * but the simulator supports levels up to 9999 for testing purposes.
	 */
	level: number;
	/**
	 * While having no direct competitive effect, certain Pokemon cannot
	 * be legally obtained as shiny, either as a whole or with certain
	 * event-only abilities or moves.
	 */
	shiny?: boolean;
	/**
	 * This is technically "Friendship", but the community calls this
	 * "Happiness".
	 *
	 * It's used to calculate the power of the moves Return and Frustration.
	 * This value must be between 0 and 255, inclusive.
	 */
	happiness?: number;
	/**
	 * The pokeball this Pokemon is in. Like shininess, this property
	 * has no direct competitive effects, but has implications for
	 * event legality. For example, any Rayquaza that knows V-Create
	 * must be sent out from a Cherish Ball.
	 *
	 * TODO: actually support this in the validator, switching animations,
	 * and the teambuilder.
	 */
	pokeball?: string;
	/**
	 * Hidden Power type. Optional in older gens, but used in Gen 7+
	 * because `ivs` contain post-Battle-Cap values.
	 */
	hpType?: string;
	/**
	 * Dynamax Level. Affects the amount of HP gained when Dynamaxed.
	 * This value must be between 0 and 10, inclusive.
	 */
	dynamaxLevel?: number;
	gigantamax?: boolean;
	/**
	 * Tera Type
	 */
	teraType?: string;
}

export const Teams = new class Teams {
	pack(team: PokemonSet[] | null): string {
		if (!team) return '';

		function getIv(ivs: StatsTable, s: keyof StatsTable): string {
			return ivs[s] === 31 || ivs[s] === undefined ? '' : ivs[s].toString();
		}

		let buf = '';
		for (const set of team) {
			if (buf) buf += ']';

			// name
			buf += (set.name || set.species);

			// species
			const id = this.packName(set.species || set.name);
			buf += '|' + (this.packName(set.name || set.species) === id ? '' : id);

			// item
			buf += '|' + this.packName(set.item);

			// ability
			buf += '|' + this.packName(set.ability);

			// moves
			buf += '|' + set.moves.map(this.packName).join(',');

			// nature
			buf += '|' + (set.nature || '');

			// evs
			let evs = '|';
			if (set.evs) {
				evs = '|' + (set.evs['hp'] || '') + ',' + (set.evs['atk'] || '') + ',' + (set.evs['def'] || '') + ',' + (set.evs['spa'] || '') + ',' + (set.evs['spd'] || '') + ',' + (set.evs['spe'] || '');
			}
			if (evs === '|,,,,,') {
				buf += '|';
			} else {
				buf += evs;
			}

			// gender
			if (set.gender) {
				buf += '|' + set.gender;
			} else {
				buf += '|';
			}

			// ivs
			let ivs = '|';
			if (set.ivs) {
				ivs = '|' + getIv(set.ivs, 'hp') + ',' + getIv(set.ivs, 'atk') + ',' + getIv(set.ivs, 'def') +
					',' + getIv(set.ivs, 'spa') + ',' + getIv(set.ivs, 'spd') + ',' + getIv(set.ivs, 'spe');
			}
			if (ivs === '|,,,,,') {
				buf += '|';
			} else {
				buf += ivs;
			}

			// shiny
			if (set.shiny) {
				buf += '|S';
			} else {
				buf += '|';
			}

			// level
			if (set.level && set.level !== 100) {
				buf += '|' + set.level;
			} else {
				buf += '|';
			}

			// happiness
			if (set.happiness !== undefined && set.happiness !== 255) {
				buf += '|' + set.happiness;
			} else {
				buf += '|';
			}

			if (set.pokeball || set.hpType || set.gigantamax ||
				(set.dynamaxLevel !== undefined && set.dynamaxLevel !== 10) || set.teraType) {
				buf += ',' + (set.hpType || '');
				buf += ',' + this.packName(set.pokeball || '');
				buf += ',' + (set.gigantamax ? 'G' : '');
				buf += ',' + (set.dynamaxLevel !== undefined && set.dynamaxLevel !== 10 ? set.dynamaxLevel : '');
				buf += ',' + (set.teraType || '');
			}
		}

		return buf;
	}

	/** Very similar to toID but without the lowercase conversion */
	packName(name: string | undefined | null) {
		if (!name) return '';
		return name.replace(/[^A-Za-z0-9]+/g, '');
	}
}

export default Teams;