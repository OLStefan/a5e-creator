import myzod, { Infer } from 'myzod';
import { damageDescriptionSchema, specialdamageDescriptionSchema } from '../general';
import { referenceSchema } from '../reference';
import { equipmentPieceSchema, EquipmentType } from './base';
import { materialReferenceSchema } from './material';
import { WeaponProperty, weaponPropertyReferenceSchema } from './weaponProperties';

export enum WeaponProficiency {
	Simple = 'simple',
	Martial = 'martial',
	Rare = 'rare',
}

export enum WeaponType {
	Melee = 'melee',
	Ranged = 'ranged',
	Special = 'special',
}

const baseWeaponSchema = equipmentPieceSchema.and(
	myzod.object({
		proficiency: myzod.enum(WeaponProficiency),
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
	.withPredicate((meleeWeapon) => !meleeWeapon.properties.some(({ ref }) => ref === WeaponProperty.Range));
/**
 * Verified to have no 'range' property
 */
export type MeleeWeapon = Infer<typeof meleeWeaponSchema>;

const rangedWeaponSchema = baseWeaponSchema
	.and(
		myzod.object({
			weaponType: myzod.literal(WeaponType.Ranged),
			damage: damageDescriptionSchema,
		}),
	)
	.withPredicate((rangedWeapon) => rangedWeapon.properties.some(({ ref }) => ref === WeaponProperty.Range));
/**
 * Verified to have a 'range' property
 */
export type RangedWeapon = Infer<typeof rangedWeaponSchema>;

const specialWeaponSchema = baseWeaponSchema.and(
	myzod.object({
		weaponType: myzod.literal(WeaponType.Special),
		damage: specialdamageDescriptionSchema,
	}),
);
export type SpecialWeapon = Infer<typeof specialWeaponSchema>;

export const anyWeaponSchema = meleeWeaponSchema.or(rangedWeaponSchema).or(specialWeaponSchema);
export type AnyWeapon = Infer<typeof anyWeaponSchema>;

export const weaponReferenceSchema = referenceSchema.and(
	myzod
		.object({ ref: myzod.enum(WeaponProficiency) })
		.or(myzod.object({ ref: myzod.literal('Individual'), name: myzod.string() })),
);
export type WeaponReference = Infer<typeof weaponReferenceSchema>;
