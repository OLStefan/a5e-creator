import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { featureSchema } from '../feature';
import { Size } from '../general';
import { descriptionSchema, findReferencedElement, referenceSchema } from '../util';
import { Culture, cultureReferenceSchema, verifyCultureReference } from './cultures';

export type HeritageName = Opaque<string, 'heritage'>;

const heritageSchema = descriptionSchema
	.and(
		myzod.object({
			age: myzod.string(),
			size: myzod.object({
				description: myzod.string(),
				category: myzod.enum(Size),
			}),
			speed: myzod.number(),
			baseFeatures: myzod.array(featureSchema),
			gifts: myzod.array(featureSchema),
			paragon: myzod.array(featureSchema),
			suggestedCultures: myzod.array(cultureReferenceSchema),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as HeritageName }));
export type Heritage = Infer<typeof heritageSchema>;

export const heritageReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as HeritageName,
}));
export type HeritageReference = Infer<typeof heritageReferenceSchema>;

export function parseHeritages(heritages: ReadonlyArray<unknown>, parsedCultures: ReadonlyArray<Culture>) {
	return myzod
		.array(heritageSchema)
		.withPredicate((parsedHeritages) =>
			parsedHeritages.every((heritage) =>
				heritage.suggestedCultures.every((ref) => verifyCultureReference(ref, parsedCultures)),
			),
		)
		.parse(heritages);
}

export function verifyHeritageReference(
	ref: ReadonlyDeep<HeritageReference>,
	parsedHeritages: ReadonlyArray<Heritage>,
) {
	return !!findReferencedElement(ref, parsedHeritages);
}
