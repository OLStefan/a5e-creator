import myzod, { Infer } from 'myzod';

export enum SourceBook {
	AG = 'AG',
	TT = 'TT',
	DDG = 'DDG',
	ZG = 'ZG',
	GPG = 'GPG',
	Homebrew = 'homebrew',
}
export const sourceReferenceSchema = myzod.object({
	book: myzod.enum(SourceBook),
	page: myzod.number().optional(),
});

export const descriptionSchema = myzod.object({
	name: myzod.string(),
	description: myzod.string().default(''),
	source: sourceReferenceSchema,
	disabled: myzod.literal(false).optional(),
});
export type Description = Infer<typeof descriptionSchema>;

export const additionalDescriptionSchema = descriptionSchema.and(
	myzod.object({
		additionalString: myzod.string().default(''),
	}),
);
export type AdditionalDescription = Infer<typeof additionalDescriptionSchema>;
