import { types } from 'mobx-state-tree';
import { damageDescriptionModel, specialDamageDescriptionModel } from '../general';
import { createProficiency } from '../proficiency';
import { equipmentPieceModel, equipmentPieceReferenceModel, EquipmentType } from './base';
import { materialModel } from './material';
import { weaponPropertyModel } from './weaponProperties';

export enum WeaponCategory {
	Improvised = 'improvised',
	Simple = 'simple',
	Martial = 'martial',
	Rare = 'rare',
}

export enum WeaponType {
	Melee = 'melee',
	Ranged = 'ranged',
	Special = 'special',
}

const baseWeaponModel = types.compose(
	equipmentPieceModel,
	types.model({
		proficiency: types.enumeration(Object.values(WeaponCategory)),
		damage: types.union(damageDescriptionModel, specialDamageDescriptionModel),
		properties: types.array(types.reference(weaponPropertyModel)),
		type: types.literal(EquipmentType.Weapon),
		weaponType: types.enumeration(Object.values(WeaponType)),
		defaultMaterial: types.reference(materialModel),
	}),
);

const meleeWeaponModel = types.compose(
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Melee), damage: damageDescriptionModel }),
);

const rangedWeaponModel = types.compose(
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Ranged), damage: damageDescriptionModel }),
);

const specialWeaponModel = types.compose(
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Special), damage: specialDamageDescriptionModel }),
);

export const anyWeaponModel = types.union(meleeWeaponModel, rangedWeaponModel, specialWeaponModel);

export const weaponReferenceModel = types.compose(
	equipmentPieceReferenceModel,
	types.model({
		ref: types.reference(anyWeaponModel),
		material: types.reference(materialModel),
	}),
);

export const weaponProficiencyModel = createProficiency(anyWeaponModel, Object.values(WeaponCategory));
