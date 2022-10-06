import myzod, { Infer } from 'myzod';
import { dieSizeSchema } from './general';
import { proficiencyReferenceSchema } from './proficiency';
import { descriptionSchema } from './util/description';

export const classSchema = descriptionSchema.and(
	myzod.object({
		startingGold: myzod.number(),
		hitDie: dieSizeSchema,
		proficiencies: proficiencyReferenceSchema,
		features: myzod.array(myzod.object({})), // TODO
	}),
);
export type Class = Infer<typeof classSchema>;
