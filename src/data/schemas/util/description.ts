import myzod, { Infer } from 'myzod';
import { sourceReferenceSchema } from '../general';

export const descriptionSchema = myzod.object({
	name: myzod.string(),
	description: myzod.string(),
	source: sourceReferenceSchema,
});
export type Description = Infer<typeof descriptionSchema>;
