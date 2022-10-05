import myzod, { Infer, MappedType } from 'myzod';
import { armorReferenceSchema } from './equipment/armor';
import { toolReferenceSchema } from './equipment/tools';
import { weaponReferenceSchema } from './equipment/weapons';
import { attributeReferenceSchema, dieSizeSchema } from './general';
import { skillReferenceSchema } from './skills';
import { descriptionSchema } from './util/description';

function createProficiencyChoiceSchema<T extends object>(reference: MappedType<T>) {
	return myzod.object({
		allOf: myzod.array(reference),
		choice: myzod.array(reference),
	});
}

export const classSchema = descriptionSchema.and(
	myzod.object({
		startingGold: myzod.number(),
		hitDie: dieSizeSchema,
		proficiencies: myzod.object({
			savingThrows: myzod.array(attributeReferenceSchema),
			armor: myzod.array(armorReferenceSchema),
			weapons: myzod.array(weaponReferenceSchema),
			tools: createProficiencyChoiceSchema(toolReferenceSchema),
			skills: createProficiencyChoiceSchema(skillReferenceSchema),
		}),
		features: myzod.array(myzod.object({})), // TODO
	}),
);
export type Class = Infer<typeof classSchema>;
