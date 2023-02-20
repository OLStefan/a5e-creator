import { types } from 'mobx-state-tree';

export enum Attribute {
	Str = 'strength',
	Dex = 'dexterity',
	Con = 'constitution',
	Int = 'intelligence',
	Wis = 'wisdom',
	Cha = 'charisma',
}

export const attributeModel = types.enumeration(Object.values(Attribute));
