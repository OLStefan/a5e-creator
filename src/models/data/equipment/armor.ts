import { types } from 'mobx-state-tree';
import { equipmentPieceModel, equipmentPieceReferenceModel, EquipmentType } from './base';
import { materialModel } from './material';

export enum ArmorType {
	Light = 'light',
	Medium = 'medium',
	Heavy = 'heavy',
	Shield = 'shield',
}

export enum ShieldType {
	Light = 'light',
	Medium = 'medium',
	Heavy = 'heavy',
	Tower = 'tower',
}

const baseArmorModel = types.compose(
	'baseArmor',
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.Armor),
		defaultMaterial: types.reference(materialModel),
		armorType: types.enumeration(Object.values(ArmorType)),
	}),
);

const armorModel = types.compose(
	'armor',
	baseArmorModel,
	types.model({
		armorType: types.enumeration([ArmorType.Light, ArmorType.Medium, ArmorType.Heavy]),
		ac: types.model({
			base: types.number,
			maxDexMode: types.optional(types.number, 0),
		}),
	}),
);

const shieldModel = types.compose(
	'shield',
	baseArmorModel,
	types.model({
		armorType: types.literal(ArmorType.Shield),
		shieldType: types.enumeration(Object.values(ShieldType)),
		ac: types.number,
	}),
);

export const anyArmorModel = types.union(armorModel, shieldModel);

export const armorReferenceModel = types.compose(
	'armorReference',
	equipmentPieceReferenceModel,
	types.model({
		ref: types.reference(anyArmorModel),
		material: types.reference(materialModel),
	}),
);
