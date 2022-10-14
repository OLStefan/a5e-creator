import myzod, { Infer } from 'myzod';
import { descriptionSchema } from './util';

// TODO
export const featureSchema = descriptionSchema.and(myzod.object({}));
export type Feature = Infer<typeof featureSchema>;

export const featureSetSchema = myzod.object({});
export type FeatureSet = Infer<typeof featureSetSchema>;
