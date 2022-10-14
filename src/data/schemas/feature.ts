import myzod, { Infer } from 'myzod';
import { descriptionSchema } from './util';

// TODO
export const featureSchema = descriptionSchema.and(myzod.object({}));
export type Feature = Infer<typeof featureSchema>;

const levels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] as const;

export const featureSetSchema = myzod.partial(
	myzod.record(myzod.array(featureSchema)).pick(levels.map((l) => `${l}` as const)),
);
export type FeatureSet = Infer<typeof featureSetSchema>;
