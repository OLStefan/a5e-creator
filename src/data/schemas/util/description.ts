import myzod, { Infer } from 'myzod';

export enum SourceBook {
	AG = "adventurer's guide",
	TT = 'trials & treasures',
	DDG = "dungeon delver's guide",
	ZG = 'adventures in Zeitgeist',
	GPG = 'gate pass gazette',
}
export const sourceReferenceSchema = myzod.object({
	book: myzod.enum(SourceBook),
	page: myzod.number().optional(),
});

export const descriptionSchema = myzod.object({
	name: myzod.string(),
	description: myzod.string(),
	source: sourceReferenceSchema,
});
export type Description = Infer<typeof descriptionSchema>;

export const additionalDescriptionSchema = descriptionSchema.and(
	myzod.object({
		asString: myzod.string().optional(),
	}),
);
export type AdditionalDescription = Infer<typeof additionalDescriptionSchema>;
