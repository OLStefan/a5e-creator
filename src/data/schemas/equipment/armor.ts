import myzod, { Infer } from 'myzod';
import { Opaque } from 'type-fest';
import { referenceSchema } from '../util/reference';
import { equipmentPieceSchema, EquipmentType } from './base';
import { materialReferenceSchema } from './material';

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

export type ArmorName = Opaque<string, 'armor'>;

const baseArmorSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.Armor),
		material: materialReferenceSchema,
		armorType: myzod.enum(ArmorType),
	}),
);

const armorSchema = baseArmorSchema
	.and(
		myzod.object({
			armorType: myzod.literals(ArmorType.Light, ArmorType.Medium, ArmorType.Heavy),
			ac: myzod.object({
				base: myzod.number(),
				maxDexMod: myzod.number().optional(),
			}),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as ArmorName }));
export type Armor = Infer<typeof armorSchema>;

const shieldSchema = baseArmorSchema
	.and(
		myzod.object({
			armorType: myzod.literal(ArmorType.Shield),
			shieldType: myzod.enum(ShieldType),
			ac: myzod.number(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as ArmorName }));
export type Shield = Infer<typeof shieldSchema>;

export const anyArmorSchema = armorSchema.or(shieldSchema);
export type AnyArmor = Infer<typeof anyArmorSchema>;

export const armorReferenceSchema = referenceSchema
	.and(
		myzod
			.object({ ref: myzod.literals(ArmorType.Light, ArmorType.Medium, ArmorType.Heavy) })
			.or(myzod.object({ ref: myzod.literal(ArmorType.Shield), shieldType: myzod.enum(ShieldType).optional() })),
	)
	.map((desc) => ({ ...desc, name: desc.ref as ArmorName }));
export type ArmorReference = Infer<typeof armorReferenceSchema>;
