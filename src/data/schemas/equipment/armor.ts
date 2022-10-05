import myzod, { Infer } from 'myzod';
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

const baseArmorSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.Armor),
		material: materialReferenceSchema,
		armorType: myzod.enum(ArmorType),
	}),
);

const armorSchema = baseArmorSchema.and(
	myzod.object({
		armorType: myzod.literals(ArmorType.Light, ArmorType.Medium, ArmorType.Heavy),
		ac: myzod.object({
			base: myzod.number(),
			maxDexMod: myzod.number().optional(),
		}),
	}),
);
export type Armor = Infer<typeof armorSchema>;

const shieldSchema = baseArmorSchema.and(
	myzod.object({
		armorType: myzod.literal(ArmorType.Shield),
		shieldType: myzod.enum(ShieldType),
		ac: myzod.number(),
	}),
);
export type Shield = Infer<typeof shieldSchema>;

export const anyArmorSchema = armorSchema.or(shieldSchema);
export type AnyArmor = Infer<typeof anyArmorSchema>;
