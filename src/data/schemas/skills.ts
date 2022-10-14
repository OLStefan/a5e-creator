import myzod, { Infer } from 'myzod';
import type { Opaque, ReadonlyDeep } from 'type-fest';
import { verifyProficiency } from './proficiency';
import { findReferencedElement, parse, referenceSchema } from './util';
import { descriptionSchema } from './util/description';

export type SkillName = Opaque<string, 'skill'>;

const skillSchema = descriptionSchema
	.and(
		myzod.object({
			specialties: myzod.array(myzod.string()).default([]),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as SkillName }));
export type Skill = Infer<typeof skillSchema>;

export const skillReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as SkillName,
}));
export type SkillReference = Infer<typeof skillReferenceSchema>;

export const skillProficiencySchema = skillReferenceSchema;
export type SkillProficiency = Infer<typeof skillProficiencySchema>;

export function parseSkills(skills: ReadonlyDeep<Array<unknown>>) {
	return parse({ schema: skillSchema, data: skills });
}

export function verifySkillReference(ref: ReadonlyDeep<SkillReference>, parsedSkills: ReadonlyDeep<Array<Skill>>) {
	return !!findReferencedElement(ref, parsedSkills);
}

export const verifySkillProficiency = verifyProficiency<SkillProficiency, Skill>;
