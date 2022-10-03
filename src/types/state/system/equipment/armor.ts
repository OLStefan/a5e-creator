import myzod, { Infer } from 'myzod';
import { equipmentPieceSchema, EquipmentType } from './equipment';
import { Material } from './material';

export enum ArmorCategory {
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

export const armorSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.Armor),
		armorType: myzod.literals(ArmorCategory.Light, ArmorCategory.Medium, ArmorCategory.Heavy),
		ac: myzod.object({
			base: myzod.number(),
			maxDexMod: myzod.number().optional(),
		}),
		material: myzod.enum(Material),
	}),
);
export type Armor = Infer<typeof armorSchema>;

export const shieldSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.Armor),
		armorType: myzod.literal(ArmorCategory.Shield),
		shieldType: myzod.enum(ShieldType),
		ac: myzod.number(),
		material: myzod.enum(Material),
	}),
);
export type Shield = Infer<typeof shieldSchema>;
