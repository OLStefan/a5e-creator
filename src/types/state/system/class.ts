import myzod, { Infer, ObjectShape, ObjectType } from 'myzod';
import { ArmorType, WeaponProficiency } from './equipment';
import { toolReferenceSchema } from './equipment/tools';
import { Attributes, descriptionSchema, dieSizeSchema, sourceReferenceSchema } from './general';
import { skillReferenceSchema } from './skills';

function createProficiencyChoiceSchema<T extends ObjectShape>(reference: ObjectType<T>) {
	return myzod.object({
		allOf: myzod.array(reference),
		choice: myzod.array(reference),
	});
}

export const classSchema = descriptionSchema.and(
	myzod.object({
		source: sourceReferenceSchema,
		startingGold: myzod.number(),
		hitDie: dieSizeSchema,
		proficiencies: myzod.object({
			savingThrows: myzod.array(myzod.enum(Attributes)),
			armor: myzod.array(myzod.enum(ArmorType)),
			weapons: myzod.object({
				categories: myzod.array(myzod.enum(WeaponProficiency)),
				individual: myzod.array(myzod.string()),
			}),
			tools: createProficiencyChoiceSchema(toolReferenceSchema),
			skills: createProficiencyChoiceSchema(skillReferenceSchema),
		}),
		features: myzod.array(myzod.object({})), // TODO
	}),
);
export type Class = Infer<typeof classSchema>;
