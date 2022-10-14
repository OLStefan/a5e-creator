import myzod, { Infer } from 'myzod';
import { referenceSchema } from './util';

export enum Attribute {
	Str = 'strength',
	Dex = 'dexterity',
	Con = 'constitution',
	Int = 'intelligence',
	Wis = 'wisdom',
	Cha = 'charisma',
}

export const allAttributeReferences = Object.values(Attribute).map((attr) => ({ ref: attr }));

export const attributeSchema = myzod.enum(Attribute);

export const attributeReferenceSchema = referenceSchema.and(myzod.object({ ref: myzod.enum(Attribute) }));
export type LanguageReference = Infer<typeof attributeReferenceSchema>;
export const attributeProficiencySchema = attributeReferenceSchema;
export type LanguageProficiency = Infer<typeof attributeReferenceSchema>;
