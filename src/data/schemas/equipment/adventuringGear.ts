import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { findReferencedElement, parse } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { materialReferenceSchema } from './material';

export type AdventuringGearName = Opaque<string, 'adventuringGear'>;

export enum AdventuringGearType {
	Medicine = 'medicinal',
	SpellcastingFocus = 'spellcasting focus',
	Poison = 'poison',
	SurvivalGear = 'survival gear',
	Container = 'container',
	Miscellaneous = 'miscellaneous gear',
}

const baseAdventuringGearSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.AdventuringGear),
		gearType: myzod.enum(AdventuringGearType),
	}),
);

const medicineSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.Medicine),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Medicine = Infer<typeof medicineSchema>;

const spellcastingFocusSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.SpellcastingFocus),
			defaultMaterial: materialReferenceSchema,
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type SpellcastingFocus = Infer<typeof spellcastingFocusSchema>;

const poisonSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.Poison),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Poison = Infer<typeof poisonSchema>;

const survivalGearSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.SurvivalGear),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type SurvivalGear = Infer<typeof survivalGearSchema>;

const containerSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.Container),
			capacity: myzod.string(),
			defaultMaterial: materialReferenceSchema.optional(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Container = Infer<typeof containerSchema>;

const otherAdventuringGearSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			gearType: myzod.literal(AdventuringGearType.Miscellaneous),
			defaultMaterial: materialReferenceSchema.optional(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type OtherAdventuringGear = Infer<typeof otherAdventuringGearSchema>;

const anyAdventuringGearSchema = myzod.union([
	medicineSchema,
	spellcastingFocusSchema,
	poisonSchema,
	survivalGearSchema,
	containerSchema,
	otherAdventuringGearSchema,
]);
export type AnyAdventuringGear = Infer<typeof anyAdventuringGearSchema>;

export const adventuringGearReferenceSchema = equipmentPieceReference.map((refObject) => ({
	...refObject,
	ref: refObject.ref as AdventuringGearName,
}));
export type AdventuringGearReference = Infer<typeof adventuringGearReferenceSchema>;

export function parseAdventuringGear(adventuringGear: ReadonlyArray<unknown>) {
	return parse({ schema: anyAdventuringGearSchema, data: adventuringGear });
}

export function verifyAdventuringGearReference(
	ref: ReadonlyDeep<AdventuringGearReference>,
	parsedAdventuringGears: ReadonlyArray<AnyAdventuringGear>,
) {
	return !!findReferencedElement(ref, parsedAdventuringGears);
}
