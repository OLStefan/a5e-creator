import myzod, { AnyType } from 'myzod';
import { armorProficiencySchema } from './equipment/armor';
import { toolReferenceSchema } from './equipment/tools';
import { weaponProficiencySchema } from './equipment/weapons';
import { attributeReferenceSchema } from './general';
import { skillReferenceSchema } from './skills';

function createProficiencyChoiceSchema<T extends AnyType>(reference: T) {
	return myzod
		.object({
			allOf: myzod.array(reference).default([]),
			choice: myzod.array(reference).default([]),
		})
		.default({
			allOf: [],
			choice: [],
		});
}
export const proficiencyReferenceSchema = myzod.object({
	savingThrows: createProficiencyChoiceSchema(attributeReferenceSchema),
	armor: createProficiencyChoiceSchema(armorProficiencySchema),
	weapons: createProficiencyChoiceSchema(weaponProficiencySchema),
	tools: createProficiencyChoiceSchema(toolReferenceSchema),
	skills: createProficiencyChoiceSchema(skillReferenceSchema),
});
