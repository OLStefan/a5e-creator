import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { featureSchema } from '../feature';
import { languageSchema } from '../language';
import { descriptionSchema, findReferencedElement, referenceSchema } from '../util';

export type BackgroundName = Opaque<string, 'background'>;

const backgroundSchema = descriptionSchema
	.and(
		myzod.object({
			features: myzod.array(featureSchema),
			languages: myzod.array(languageSchema),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as BackgroundName }));
export type Background = Infer<typeof backgroundSchema>;

export const backgroundReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as BackgroundName,
}));
export type BackgroundReference = Infer<typeof backgroundReferenceSchema>;

export function parseBackgrounds(backgrounds: ReadonlyArray<unknown>) {
	return myzod.array(backgroundSchema).parse(backgrounds);
}

export function verifyBackgroundReference(
	ref: ReadonlyDeep<BackgroundReference>,
	parsedbackgrounds: ReadonlyArray<Background>,
) {
	return !!findReferencedElement(ref, parsedbackgrounds);
}
