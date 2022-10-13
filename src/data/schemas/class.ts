import { stubFalse } from 'lodash';
import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { armorProficiencySchema, toolProficiencySchema, weaponProficiencySchema } from './equipment';
import { featureSchema } from './feature';
import { attributeReferenceSchema, dieSizeSchema } from './general';
import { createProficiencyChoiceSchema } from './proficiency';
import { skillProficiencySchema } from './skills';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from './util';

export type ClassName = Opaque<string, 'class'>;
export type SubClassName = Opaque<string, 'subclass'>;

const subclassSchema = descriptionSchema.and(myzod.object({}));

const classSchema = descriptionSchema.and(
	myzod.object({
		startingGold: myzod.number(),
		hitDie: dieSizeSchema,
		proficiencies: myzod.object({
			savingThrows: myzod.array(attributeReferenceSchema),
			armor: myzod.array(armorProficiencySchema),
			weapons: myzod.array(weaponProficiencySchema),
			tools: createProficiencyChoiceSchema(toolProficiencySchema),
			skills: createProficiencyChoiceSchema(skillProficiencySchema),
		}),
		features: myzod.array(featureSchema),
		subclasses: myzod.object({
			level: myzod.number().default(3),
			options: myzod.array(subclassSchema),
		}),
	}),
);
export type Class = Infer<typeof classSchema>;

export const classReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as ClassName,
}));
export type ClassReference = Infer<typeof classReferenceSchema>;

export function parseClasses(classes: ReadonlyArray<unknown>) {
	return parse({
		schema: classSchema,
		data: classes,
		predicate: (parsedClasses) => parsedClasses.every(stubFalse),
	});
}

export function verifyClassReference(ref: ReadonlyDeep<ClassReference>, parsedClasses: ReadonlyArray<Class>) {
	return !!findReferencedElement(ref, parsedClasses);
}
