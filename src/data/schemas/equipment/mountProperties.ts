import { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from '../util';

export type MountPropertyName = Opaque<string, 'mountProperty'>;

export const mountPropertySchema = descriptionSchema.map((desc) => ({
	...desc,
	name: desc.name as MountPropertyName,
}));
export type MountProperty = Infer<typeof mountPropertySchema>;

export const mountPropertyReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as MountPropertyName,
}));

export type MountPropertyReference = Infer<typeof mountPropertyReferenceSchema>;

export function parseMountProperties(mountProperties: ReadonlyArray<unknown>) {
	return parse({ schema: mountPropertySchema, data: mountProperties });
}

export function verifyMountPropertyReference(
	ref: ReadonlyDeep<MountPropertyReference>,
	parsedMountProperties: ReadonlyArray<MountProperty>,
) {
	return !!findReferencedElement(ref, parsedMountProperties);
}
