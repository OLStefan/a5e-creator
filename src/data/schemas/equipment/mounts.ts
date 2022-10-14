import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { findReferencedElement, parse } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { MountProperty, mountPropertyReferenceSchema, verifyMountPropertyReference } from './mountProperties';

export type MountName = Opaque<string, 'mount'>;

const mountSchema = equipmentPieceSchema
	.and(
		myzod.object({
			type: myzod.literal(EquipmentType.Mount),
			speed: myzod.number(),
			capacity: myzod.number(),
			strength: myzod.number(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as MountName }));
export type Mount = Infer<typeof mountSchema>;

export const mountReferenceSchema = equipmentPieceReference
	.and(myzod.object({ property: mountPropertyReferenceSchema.optional() }))
	.map((refObject) => ({
		...refObject,
		ref: refObject.ref as MountName,
	}));
export type MountReference = Infer<typeof mountReferenceSchema>;

export function parseMounts(mounts: ReadonlyArray<unknown>) {
	return parse({ schema: mountSchema, data: mounts });
}

export function verifyMountReference(
	ref: ReadonlyDeep<MountReference>,
	parsedMounts: ReadonlyArray<Mount>,
	parsedMountProperties: ReadonlyArray<MountProperty>,
) {
	const verifiedProperty = !ref.property || verifyMountPropertyReference(ref.property, parsedMountProperties);
	return verifiedProperty && !!findReferencedElement(ref, parsedMounts);
}
