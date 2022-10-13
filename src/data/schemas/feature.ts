import myzod, { Infer } from 'myzod';

// TODO
export const featureSchema = myzod.object({});
export type Feature = Infer<typeof featureSchema>;

export const featureSetSchema = myzod.object({});
export type FeatureSet = Infer<typeof featureSetSchema>;
