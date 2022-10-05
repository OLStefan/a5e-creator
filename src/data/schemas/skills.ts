import { Infer } from 'myzod';
import type { Opaque } from 'type-fest';
import { descriptionSchema } from './util/description';
import { referenceSchema } from './util/reference';

export type SkillName = Opaque<string, 'skill'>;

const skillSchema = descriptionSchema.map((desc) => ({ ...desc, name: desc.name as SkillName }));
export type Skill = Infer<typeof skillSchema>;

export const skillReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as SkillName,
}));
export type SkillReference = Infer<typeof skillReferenceSchema>;
