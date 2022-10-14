import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { featureSchema } from '../feature';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from '../util';

export type DestinyName = Opaque<string, 'destiny'>;

const destinySchema = descriptionSchema
	.and(
		myzod.object({
			inspiration: myzod.object({
				source: descriptionSchema.omit(['source']),
				feature: featureSchema.omit(['source']),
			}),
			fullfillment: myzod.object({
				condition: myzod.string(),
				feature: featureSchema.omit(['source']),
			}),
			motivations: myzod.array(descriptionSchema.omit(['source'])),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as DestinyName }));
export type Destiny = Infer<typeof destinySchema>;

export const destinyReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as DestinyName,
}));
export type DestinyReference = Infer<typeof destinyReferenceSchema>;

export function parseDestinies(destinyies: ReadonlyDeep<Array<unknown>>) {
	return parse({ schema: destinySchema, data: destinyies });
}

export function verifyDestinyReference(
	ref: ReadonlyDeep<DestinyReference>,
	parsedDestinies: ReadonlyDeep<Array<Destiny>>,
) {
	return !!findReferencedElement(ref, parsedDestinies);
}
