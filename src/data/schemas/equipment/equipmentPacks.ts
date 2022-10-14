import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { findReferencedElement, parse } from '../util';
import { adventuringGearReferenceSchema, AnyAdventuringGear, verifyAdventuringGearReference } from './adventuringGear';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';

export type EquipmentPackName = Opaque<string, 'tool'>;

const equipmentPackSchema = equipmentPieceSchema
	.and(
		myzod.object({
			type: myzod.literal(EquipmentType.EquipmentPack),
			content: myzod.array(adventuringGearReferenceSchema),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as EquipmentPackName }));
export type EquipmentPack = Infer<typeof equipmentPackSchema>;

export const equipmentPackReferenceSchema = equipmentPieceReference.map((refObject) => ({
	...refObject,
	ref: refObject.ref as EquipmentPackName,
}));
export type EquipmentPackReference = Infer<typeof equipmentPackReferenceSchema>;

export function parseEquipmentPacks(
	equipmentPacks: ReadonlyDeep<Array<unknown>>,
	parsedGear: ReadonlyDeep<Array<AnyAdventuringGear>>,
) {
	return parse({
		schema: equipmentPackSchema,
		data: equipmentPacks,
		predicate: (parsedPacks) =>
			parsedPacks.every((pack) => pack.content.every((ref) => verifyAdventuringGearReference(ref, parsedGear))),
	});
}

export function verifyEquipmentPackReference(
	ref: ReadonlyDeep<EquipmentPackReference>,
	parsedEquipmentPacks: ReadonlyDeep<Array<EquipmentPack>>,
) {
	return !!findReferencedElement(ref, parsedEquipmentPacks);
}
