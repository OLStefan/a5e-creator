import myzod, { Infer, ObjectShape, ObjectType } from 'myzod';
import { armorReferenceSchema } from './equipment/armor';
import { toolReferenceSchema } from './equipment/tools';
import { weaponReferenceSchema } from './equipment/weapons';
import { attributeReferenceSchema, descriptionSchema, dieSizeSchema, sourceReferenceSchema } from './general';
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
