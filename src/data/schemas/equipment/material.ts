import myzod, { Infer } from 'myzod';
import { Opaque } from 'type-fest';
import { descriptionSchema } from '../util/description';
import { referenceSchema } from '../util/reference';

export type MaterialName = Opaque<string, 'material'>;

const materialSchema = descriptionSchema
	.and(
		myzod.object({
			weightFactor: myzod.number().default(1),
			costFactor: myzod.number().default(1),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as MaterialName }));
export type Material = Infer<typeof materialSchema>;

export const materialReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as MaterialName,
}));
export type MaterialReference = Infer<typeof materialReferenceSchema>;
