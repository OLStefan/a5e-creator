import { types } from 'mobx-state-tree';
import { damageDescriptionModel, specialDamageDescriptionModel } from '../general';
import { equipmentPieceModel, equipmentPieceReferenceModel, EquipmentType } from './base';
import { materialModel } from './material';
import { weaponPropertyReference } from './weaponProperties';

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
	types.model('BaseWeapon', {
		proficiency: types.enumeration(Object.values(WeaponCategory)),
		damage: types.union(damageDescriptionModel, specialDamageDescriptionModel),
		properties: types.array(weaponPropertyReference),
		type: types.literal(EquipmentType.Weapon),
		weaponType: types.enumeration(Object.values(WeaponType)),
		defaultMaterial: types.reference(materialModel),
	}),
);

const meleeWeaponModel = types.compose(
	'Melee Weapon',
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Melee), damage: damageDescriptionModel }),
);

const rangedWeaponModel = types.compose(
	'Ranged Weapon',
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Ranged), damage: damageDescriptionModel }),
);

const specialWeaponModel = types.compose(
	'Special Weapon',
	baseWeaponModel,
	types.model({ weaponType: types.literal(WeaponType.Special), damage: specialDamageDescriptionModel }),
);

export const anyWeaponModel = types.union(meleeWeaponModel, rangedWeaponModel, specialWeaponModel);

export const weaponReferenceModel = types.compose(
	'Weapon Reference',
	equipmentPieceReferenceModel,
	types.model({
		ref: types.reference(anyWeaponModel),
		material: types.reference(materialModel),
	}),
);
