import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { findReferencedElement, referenceSchema } from '../util/reference';
import { equipmentPieceSchema, EquipmentType } from './base';

export type AdventuringGearName = Opaque<string, 'adventuringGear'>;

export enum AdventuringGearType {
	Medicine = 'medicinal',
	SpellcastingFocus = 'spellcasting focus',
	Poison = 'poison',
	SurvivalGear = 'survival gear',
	Container = 'container',
	Miscellaneous = 'miscellaneous',
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
			AdventuringGearType: myzod.literal(AdventuringGearType.Medicine),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Medicine = Infer<typeof medicineSchema>;

const spellcastingFocusSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			AdventuringGearType: myzod.literal(AdventuringGearType.SpellcastingFocus),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type SpellcastingFocus = Infer<typeof spellcastingFocusSchema>;

const poisonSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			AdventuringGearType: myzod.literal(AdventuringGearType.Poison),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Poison = Infer<typeof poisonSchema>;

const survivalGearSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			AdventuringGearType: myzod.literal(AdventuringGearType.SurvivalGear),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type SurvivalGear = Infer<typeof survivalGearSchema>;

const containerSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			AdventuringGearType: myzod.literal(AdventuringGearType.Container),
			capacity: myzod.string(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type Container = Infer<typeof containerSchema>;

const otherAdventuringGearSchema = baseAdventuringGearSchema
	.and(
		myzod.object({
			AdventuringGearType: myzod.literal(AdventuringGearType.Miscellaneous),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as AdventuringGearName }));
export type OtherAdventuringGear = Infer<typeof otherAdventuringGearSchema>;

export const anyAdventuringGearSchema = myzod.union([
	medicineSchema,
	spellcastingFocusSchema,
	poisonSchema,
	survivalGearSchema,
	containerSchema,
	otherAdventuringGearSchema,
]);
export type AnyAdventuringGear = Infer<typeof anyAdventuringGearSchema>;

export const adventuringGearReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as AdventuringGearName,
}));
export type AdventuringGearReference = Infer<typeof adventuringGearReferenceSchema>;

export function parseAdventuringGear(AdventuringGears: ReadonlyArray<unknown>) {
	return myzod.array(anyAdventuringGearSchema).parse(AdventuringGears);
}

export function verifyAdventuringGearReference(
	ref: ReadonlyDeep<AdventuringGearReference>,
	parsedAdventuringGears: ReadonlyArray<AnyAdventuringGear>,
) {
	return !!findReferencedElement(ref, parsedAdventuringGears);
}
