import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { findReferencedElement, parse, referenceSchema } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { Material, materialReferenceSchema, verifyMaterialReference } from './material';

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
		defaultMaterial: materialReferenceSchema,
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

const anyArmorSchema = myzod.union([armorSchema, shieldSchema]);
export type AnyArmor = Infer<typeof anyArmorSchema>;

export const armorReferenceSchema = equipmentPieceReference
	.and(myzod.object({ material: materialReferenceSchema }))
	.map((refObject) => ({
		...refObject,
		ref: refObject.ref as ArmorName,
	}));
export type ArmorReference = Infer<typeof armorReferenceSchema>;

export const armorProficiencySchema = referenceSchema.and(myzod.object({ ref: myzod.enum(ArmorType) }));
export type ArmorProficiency = Infer<typeof armorProficiencySchema>;

export function parseArmors(armors: ReadonlyArray<unknown>, parsedMaterials: ReadonlyArray<Material>) {
	return parse({
		schema: anyArmorSchema,
		data: armors,
		predicate: (parsedArmors) =>
			parsedArmors.every((armor) => verifyMaterialReference(armor.defaultMaterial, parsedMaterials)),
	});
}

export function verifyArmorReference(
	ref: ReadonlyDeep<ArmorReference>,
	parsedArmors: ReadonlyArray<AnyArmor>,
	parsedMaterials: ReadonlyArray<Material>,
) {
	return !!findReferencedElement(ref, parsedArmors) && verifyMaterialReference(ref.material, parsedMaterials);
}
