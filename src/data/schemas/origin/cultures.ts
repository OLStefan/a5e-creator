import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { featureSchema } from '../feature';
import { languageSchema } from '../language';
import { descriptionSchema, findReferencedElement, referenceSchema } from '../util';

export type CultureName = Opaque<string, 'culture'>;

const cultureSchema = descriptionSchema
	.and(
		myzod.object({
			features: myzod.array(featureSchema),
			languages: myzod.array(languageSchema),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as CultureName }));
export type Culture = Infer<typeof cultureSchema>;

export const cultureReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as CultureName,
}));
export type CultureReference = Infer<typeof cultureReferenceSchema>;

export function parseCultures(Cultures: ReadonlyArray<unknown>) {
	return myzod.array(cultureSchema).parse(Cultures);
}

export function verifyCultureReference(ref: ReadonlyDeep<CultureReference>, parsedCultures: ReadonlyArray<Culture>) {
	return !!findReferencedElement(ref, parsedCultures);
}
