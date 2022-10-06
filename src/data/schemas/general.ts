import myzod, { Infer } from 'myzod';
import { referenceSchema } from './util/reference';

export enum Attribute {
	Str = 'strength',
	Dex = 'sexterity',
	Con = 'constitution',
	Int = 'intelligence',
	Wis = 'wisdom',
	Cha = 'charisma',
}

export const attributeReferenceSchema = referenceSchema.and(myzod.object({ ref: myzod.enum(Attribute) }));

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

export const dieSizeSchema = myzod.literals('d4', 'd6', 'd8', 'd10', 'd12', 'd100');
export type DieSize = Infer<typeof dieSizeSchema>;

export const damageDescriptionSchema = myzod.object({
	die: dieSizeSchema,
	amount: myzod.number({ min: 0 }),
	damageType: myzod.enum(DamageType),
	type: myzod.literal('normal'),
});
export type DamageDescription = Infer<typeof damageDescriptionSchema>;

export const specialdamageDescriptionSchema = myzod.partial(myzod.omit(damageDescriptionSchema, ['type'])).and(
	myzod.object({
		type: myzod.literal('special'),
	}),
);
export type SpecialDamageDescription = Infer<typeof specialdamageDescriptionSchema>;
