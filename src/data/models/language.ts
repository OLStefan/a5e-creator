import { types } from 'mobx-state-tree';

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

export const languageModel = types.enumeration(Object.values(Language));
