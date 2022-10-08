import myzod, { Infer } from 'myzod';
import type { Opaque, ReadonlyDeep } from 'type-fest';
import { verifyProficiency } from './proficiency';
import { descriptionSchema } from './util/description';
import { findReferencedElement, referenceSchema } from './util';

export type SkillName = Opaque<string, 'skill'>;

const skillSchema = descriptionSchema.map((desc) => ({ ...desc, name: desc.name as SkillName }));
export type Skill = Infer<typeof skillSchema>;

export const skillReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as SkillName,
}));
export type SkillReference = Infer<typeof skillReferenceSchema>;

export const skillProficiencySchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as SkillName | 'any',
}));
export type SkillProficiency = Infer<typeof skillProficiencySchema>;

export function parseSkills(skills: ReadonlyArray<unknown>) {
	return myzod.array(skillSchema).parse(skills);
}

export function verifySkillReference(ref: ReadonlyDeep<SkillReference>, parsedSkills: ReadonlyArray<Skill>) {
	return !!findReferencedElement(ref, parsedSkills);
}

export function verifySkillProficiency(ref: ReadonlyDeep<SkillProficiency>, parsedSkills: ReadonlyArray<Skill>) {
	if (ref.ref === 'any') {
		return true;
	}
	return verifyProficiency(ref, parsedSkills);
}
