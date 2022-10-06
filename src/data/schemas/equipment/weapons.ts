import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { damageDescriptionSchema, specialdamageDescriptionSchema } from '../general';
import { findReferencedElement, referenceSchema } from '../util/reference';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { Material, materialReferenceSchema, verifyMaterialReference } from './material';
import { verifyWeaponPropertyReference, WeaponProperty, weaponPropertyReferenceSchema } from './weaponProperties';

export enum WeaponCategory {
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
		material: materialReferenceSchema,
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

export const anyWeaponSchema = myzod.union([meleeWeaponSchema, rangedWeaponSchema, specialWeaponSchema]);
export type AnyWeapon = Infer<typeof anyWeaponSchema>;

export const weaponReferenceSchema = equipmentPieceReference.map((refObject) => ({
	...refObject,
	ref: refObject.ref as WeaponName,
}));
export type WeaponReference = Infer<typeof weaponReferenceSchema>;

export const weaponProficiencySchema = referenceSchema
	.and(
		myzod
			.object({ ref: myzod.enum(WeaponCategory) })
			.or(myzod.object({ ref: myzod.literal('Individual'), name: myzod.string() })),
	)
	.map((ref) => {
		if (ref.ref === 'Individual') {
			return { ...ref, name: ref.name as WeaponName };
		}
		return ref;
	});
export type WeaponProficiency = Infer<typeof weaponProficiencySchema>;

export function parseWeapons(
	weapons: ReadonlyArray<unknown>,
	parsedWeaponProperties: ReadonlyArray<WeaponProperty>,
	parsedMaterials: ReadonlyArray<Material>,
) {
	return myzod
		.array(anyWeaponSchema)
		.withPredicate((weapons) =>
			weapons.every(
				(weapon) =>
					verifyMaterialReference(weapon.material, parsedMaterials) &&
					weapon.properties.every((ref) => verifyWeaponPropertyReference(ref, parsedWeaponProperties)),
			),
		)
		.parse(weapons);
}

export function verifyWeaponReference(ref: ReadonlyDeep<WeaponReference>, parsedWeapons: ReadonlyArray<AnyWeapon>) {
	return !!findReferencedElement(ref, parsedWeapons);
}

export function verifyWeaponProficiency(ref: ReadonlyDeep<WeaponProficiency>, parsedWeapons: ReadonlyArray<AnyWeapon>) {
	if (ref.ref !== 'Individual') {
		return true;
	}

	return !!findReferencedElement(ref, parsedWeapons);
}
