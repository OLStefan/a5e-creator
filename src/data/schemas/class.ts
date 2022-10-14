import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { attributeReferenceSchema } from './attributes';
import {
	anyEquipmentReferenceSchema,
	AnyTool,
	armorProficiencySchema,
	Equipment,
	ToolProficiency,
	toolProficiencySchema,
	verifyArmorProficiency,
	verifyEquipmentReference,
	verifyWeaponProficiency,
	weaponProficiencySchema,
} from './equipment';
import { featureSetSchema } from './feature';
import { dieSizeSchema } from './general';
import { createProficiencyChoiceSchema, verifyProficiencyChoice } from './proficiency';
import { Skill, SkillProficiency, skillProficiencySchema } from './skills';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from './util';

export type ClassName = Opaque<string, 'class'>;
export type SubClassName = Opaque<string, 'subclass'>;

const subclassSchema = descriptionSchema.and(featureSetSchema);

function createClassSchema(parsedData: ReadonlyDeep<{ tools: Array<AnyTool>; skills: Array<Skill> }>) {
	const allToolProficiencies = parsedData.tools.map<ToolProficiency>(({ name }) => ({ ref: 'Individual', name }));
	const allSkillProficiencies = parsedData.skills.map<SkillProficiency>(({ name }) => ({ ref: name }));

	return descriptionSchema.and(
		myzod.object({
			startingEquipment: myzod.object({
				gold: myzod.number(),
				equipment: myzod.array(
					myzod.object({
						name: myzod.string(),
						content: myzod.array(anyEquipmentReferenceSchema),
					}),
				),
			}),
			hitDie: dieSizeSchema,
			proficiencies: myzod.object({
				savingThrows: myzod.array(attributeReferenceSchema),
				armors: myzod.array(armorProficiencySchema),
				weapons: myzod.array(weaponProficiencySchema),
				tools: createProficiencyChoiceSchema(toolProficiencySchema, allToolProficiencies),
				skills: createProficiencyChoiceSchema(skillProficiencySchema, allSkillProficiencies),
			}),
			features: featureSetSchema,
			subclasses: myzod.object({
				level: myzod.number().default(3),
				options: myzod.array(subclassSchema),
			}),
		}),
	);
}
export type Class = Infer<ReturnType<typeof createClassSchema>>;

export const classReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as ClassName,
}));
export type ClassReference = Infer<typeof classReferenceSchema>;

export function parseClasses(
	classes: ReadonlyDeep<Array<unknown>>,
	parsedData: ReadonlyDeep<Equipment & { skills: Array<Skill> }>,
) {
	return parse({
		schema: createClassSchema(parsedData),
		data: classes,
		predicate: (parsedClasses) =>
			parsedClasses.every((aClass) => {
				return verifyStartingEquipment(aClass, parsedData) && verifyProficencies(aClass, parsedData);
			}),
	});
}

function verifyProficencies(
	aClass: ReadonlyDeep<Class>,
	parsedData: ReadonlyDeep<Equipment & { skills: Array<Skill> }>,
) {
	const armorProficienciesValid = aClass.proficiencies.armors.every((armorProf) =>
		verifyArmorProficiency(armorProf, parsedData.armors),
	);
	const weaponProficienciesValid = aClass.proficiencies.weapons.every((weaponProf) =>
		verifyWeaponProficiency(weaponProf, parsedData.weapons),
	);
	const toolProficienciesValid = verifyProficiencyChoice(aClass.proficiencies.tools, parsedData.tools);
	const skillProficienciesValid = verifyProficiencyChoice(aClass.proficiencies.skills, parsedData.skills);

	const proficienciesValid =
		armorProficienciesValid && weaponProficienciesValid && toolProficienciesValid && skillProficienciesValid;
	return proficienciesValid;
}

function verifyStartingEquipment(aClass: ReadonlyDeep<Class>, parsedData: ReadonlyDeep<Equipment>) {
	return aClass.startingEquipment.equipment.every((equipSet) =>
		equipSet.content.every((equip) => verifyEquipmentReference(equip, parsedData)),
	);
}

export function verifyClassReference(ref: ReadonlyDeep<ClassReference>, parsedClasses: ReadonlyDeep<Array<Class>>) {
	return !!findReferencedElement(ref, parsedClasses);
}
