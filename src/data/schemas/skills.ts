import myzod, { Infer } from 'myzod';
import { descriptionSchema, sourceReferenceSchema } from './general';
import { referenceSchema } from './reference';

export enum Skill {
	Acrobatics = 'acrobatics',
	AnimalHandling = 'animal handling',
	Arcana = 'arcana',
	Athletics = 'athletics',
	Culture = 'culture',
	Deception = 'deception',
	History = 'history',
	Insight = 'insight',
	Initmidation = 'initmidation',
	Investigation = 'investigation',
	Medicine = 'medicine',
	Nature = 'nature',
	Perception = 'perception',
	Performance = 'performance',
	Persuasion = 'persuasion',
	Religion = 'religion',
	SleightOfHand = 'sleight of hand',
	Stealth = 'stealth',
	Survival = 'survival',
}

export const skillReferenceSchema = referenceSchema.and(myzod.object({ ref: myzod.enum(Skill) }));
export type SkillReference = Infer<typeof skillReferenceSchema>;

export const skillDescription = descriptionSchema.and(
	myzod.object({
		name: myzod.enum(Skill),
		source: sourceReferenceSchema,
	}),
);
export type SkillDescription = Infer<typeof skillDescription>;
