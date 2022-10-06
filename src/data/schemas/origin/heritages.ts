import myzod, { Infer } from 'myzod';
import { Size } from '../general';
import { descriptionSchema } from '../util/description';

const heritageSchema = descriptionSchema.and(
	myzod.object({
		age: myzod.string(),
		size: myzod.object({
			description: myzod.string(),
			category: myzod.enum(Size),
		}),
		speed: myzod.number(),
		baseFeatures: myzod.array(myzod.object({})), // TODO
		gifts: myzod.array(myzod.object({})), // TODO
		paragon: myzod.array(myzod.object({})), // TODO
		suggestedCultures: myzod.array(myzod.object({})), // TODO
	}),
);

export type Heritage = Infer<typeof heritageSchema>;
