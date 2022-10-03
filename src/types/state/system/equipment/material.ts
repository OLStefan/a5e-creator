import myzod, { Infer } from 'myzod';
import { descriptionSchema } from '../general';

export enum Material {
	Adamantine = 'adamantine',
	Bone = 'bone',
	Bronze = 'brone',
	Cloth = 'cloth',
	ColdIron = 'cold iron',
	Hide = 'hide',
	Iron = 'iron',
	Leather = 'leather',
	Mithral = 'mithral',
	Silver = 'silver',
	Steel = 'steel',
	Stone = 'stone',
	Wood = 'wood',
}

export const materialDescriptionSchema = descriptionSchema.and(
	myzod.object({
		name: myzod.enum(Material),
	}),
);
export type MaterialDescription = Infer<typeof materialDescriptionSchema>;

export const materialReferenceSchema = myzod.object({ material: myzod.enum(Material) });
export type MaterialReference = Infer<typeof materialReferenceSchema>;
