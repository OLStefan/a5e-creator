import myzod, { Infer } from 'myzod';
import { referenceSchema } from './util';

export enum Language {
	Abyssal = 'abyssal',
	Aquan = 'aquan',
	Auran = 'auran',
	Celestial = 'celestial',
	Common = 'common',
	DeepSpeech = 'deep speech',
	Draconic = 'draconic',
	Dwarvish = 'dwarvish',
	Elvish = 'elvish',
	Giant = 'giant',
	Gnoll = 'gnoll',
	Gnomish = 'gnomish',
	Goblin = 'goblin',
	Halfling = 'halfling',
	Ignan = 'ignan',
	Infernal = 'infernal',
	Orc = 'orc',
	Primordial = 'primordial',
	Sylvan = 'sylvan',
	Terran = 'terran',
	Undercommon = 'undercommon',
}

export const allLanguageProficiencies = Object.values(Language).map((attr) => ({ ref: attr }));

export const languageSchema = myzod.enum(Language);

export const languageReferenceSchema = referenceSchema.and(myzod.object({ ref: myzod.enum(Language) }));
export type LanguageReference = Infer<typeof languageReferenceSchema>;
export const languageProficiencySchema = languageReferenceSchema;
export type LanguageProficiency = Infer<typeof languageReferenceSchema>;
