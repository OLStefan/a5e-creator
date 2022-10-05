import myzod, { Infer } from 'myzod';

export const referenceSchema = myzod.object({
	ref: myzod.string(),
});
export type Reference = Infer<typeof referenceSchema>;

export const additionalReferenceSchema = referenceSchema.and(
	myzod.object({
		additional: myzod.record(myzod.string().or(myzod.number())),
	}),
);
export type AdditionalReference = Infer<typeof additionalReferenceSchema>;
