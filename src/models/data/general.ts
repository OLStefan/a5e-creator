import { types } from 'mobx-state-tree';
import { partial } from '../base/partial';

export enum DamageType {
	Acid = 'acid',
	Bludgeoning = 'bludgeoning',
	Cold = 'cold',
	Fire = 'fire',
	Force = 'force',
	Lightning = 'lightning',
	Necrotic = 'necrotic',
	Piercing = 'piercing',
	Poison = 'poison',
	Psychic = 'psychic',
	Radiant = 'radiant',
	Slashing = 'slashing',
	Thunder = 'thunder',
}

export enum Size {
	Tiny = 'tiny',
	Small = 'small',
	Medium = 'medium',
	Large = 'large',
	Huge = 'huge',
	Gargantuan = 'gargantuan',
}

export const dieSizeModel = types.enumeration('dieSize', ['d4', 'd6', 'd8', 'd10', 'd12', 'd100']);

const baseDamageDescriptionModel = types.model('baseDamageDescription', {
	die: dieSizeModel,
	amount: types.optional(types.integer, 1),
	static: types.optional(types.integer, 0),
	damageType: types.enumeration(Object.values(DamageType)),
});

export const damageDescriptionModel = types.compose(
	'damageDescription',
	baseDamageDescriptionModel,
	types.model({
		type: types.maybe(types.literal('normal')),
	}),
);

export const specialDamageDescriptionModel = types.compose(
	'specialDamageDescription',
	partial(baseDamageDescriptionModel),
	types.model({
		type: types.literal('special'),
	}),
);
