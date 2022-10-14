import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { damageDescriptionSchema, specialdamageDescriptionSchema } from '../general';
import { createIndividualProficiencySchema, verifyProficiency } from '../proficiency';
import { findReferencedElement, parse } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { Material, materialReferenceSchema, verifyMaterialReference } from './material';
import { verifyWeaponPropertyReference, WeaponProperty, weaponPropertyReferenceSchema } from './weaponProperties';

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

export type WeaponName = Opaque<string, 'weapon'>;

const baseWeaponSchema = equipmentPieceSchema.and(
	myzod.object({
		proficiency: myzod.enum(WeaponCategory),
		damage: damageDescriptionSchema.or(specialdamageDescriptionSchema),
		properties: myzod.array(weaponPropertyReferenceSchema),
		type: myzod.literal(EquipmentType.Weapon),
		weaponType: myzod.enum(WeaponType),
		defaultMaterial: materialReferenceSchema,
	}),
);

const meleeWeaponSchema = baseWeaponSchema
	.and(
		myzod.object({
			weaponType: myzod.literal(WeaponType.Melee),
			damage: damageDescriptionSchema,
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as WeaponName }));
export type MeleeWeapon = Infer<typeof meleeWeaponSchema>;

const rangedWeaponSchema = baseWeaponSchema
	.and(
		myzod.object({
			weaponType: myzod.literal(WeaponType.Ranged),
			damage: damageDescriptionSchema,
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as WeaponName }));
export type RangedWeapon = Infer<typeof rangedWeaponSchema>;

const specialWeaponSchema = baseWeaponSchema
	.and(
		myzod.object({
			weaponType: myzod.literal(WeaponType.Special),
			damage: specialdamageDescriptionSchema,
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as WeaponName }));
export type SpecialWeapon = Infer<typeof specialWeaponSchema>;

const anyWeaponSchema = myzod.union([meleeWeaponSchema, rangedWeaponSchema, specialWeaponSchema]);
export type AnyWeapon = Infer<typeof anyWeaponSchema>;

export const weaponReferenceSchema = equipmentPieceReference
	.and(myzod.object({ material: materialReferenceSchema.optional() }))
	.map((refObject) => ({
		...refObject,
		ref: refObject.ref as WeaponName,
	}));
export type WeaponReference = Infer<typeof weaponReferenceSchema>;

export const weaponProficiencySchema = createIndividualProficiencySchema(Object.values(WeaponCategory)).map((ref) => {
	if (ref.ref === 'Individual') {
		return { ...ref, name: ref.name as WeaponName };
	}
	return ref;
});
export type WeaponProficiency = Infer<typeof weaponProficiencySchema>;

export function parseWeapons(
	weapons: ReadonlyDeep<Array<unknown>>,
	parsedWeaponProperties: ReadonlyDeep<Array<WeaponProperty>>,
	parsedMaterials: ReadonlyDeep<Array<Material>>,
) {
	return parse({
		schema: anyWeaponSchema,
		data: weapons,
		predicate: (parsedWeapons) =>
			parsedWeapons.every(
				(weapon) =>
					verifyMaterialReference(weapon.defaultMaterial, parsedMaterials) &&
					weapon.properties.every((ref) => verifyWeaponPropertyReference(ref, parsedWeaponProperties)),
			),
	});
}

export function verifyWeaponReference(
	ref: ReadonlyDeep<WeaponReference>,
	parsedWeapons: ReadonlyDeep<Array<AnyWeapon>>,
	parsedMaterials: ReadonlyDeep<Array<Material>>,
) {
	const verifiedMaterial = !ref.material || verifyMaterialReference(ref.material, parsedMaterials);
	return verifiedMaterial && !!findReferencedElement(ref, parsedWeapons);
}

export const verifyWeaponProficiency = verifyProficiency<WeaponProficiency, AnyWeapon>;
