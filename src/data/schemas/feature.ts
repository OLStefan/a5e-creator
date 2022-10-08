import myzod, { Infer } from 'myzod';

// TODO
export const featureSchema = myzod.object({});
export type Feature = Infer<typeof featureSchema>;
