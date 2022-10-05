import myzod, { Infer } from 'myzod';

export enum Attributes {
	Str = 'strength',
	Dex = 'sexterity',
	Con = 'constitution',
	Int = 'intelligence',
	Wis = 'wisdom',
	Cha = 'charisma',
}

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

export const descriptionSchema = myzod.object({
	name: myzod.string(),
	description: myzod.string(),
});
export type Description = Infer<typeof descriptionSchema>;

export enum SourceBook {
	AG = "adventurer's guide",
	TT = 'trials & treasures',
	DDG = "dungeon delver's guide",
	ZG = 'adventures in Zeitgeist',
	GPG = 'gate pass gazette',
}
export const sourceReferenceSchema = myzod.object({
	book: myzod.enum(SourceBook),
	page: myzod.number().optional(),
});
