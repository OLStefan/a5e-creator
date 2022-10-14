import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import {
	AnyArmor,
	AnyWeapon,
	armorProficiencySchema,
	toolProficiencySchema,
	verifyArmorProficiency,
	verifyWeaponProficiency,
	weaponProficiencySchema,
} from './equipment';
import { AnyTool, ToolProficiency } from './equipment/tools';
import { featureSetSchema } from './feature';
import { attributeReferenceSchema, dieSizeSchema } from './general';
import { createProficiencyChoiceSchema, verifyProficiencyChoice } from './proficiency';
import { Skill, SkillProficiency, skillProficiencySchema } from './skills';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from './util';

export type ClassName = Opaque<string, 'class'>;
export type SubClassName = Opaque<string, 'subclass'>;

const subclassSchema = descriptionSchema.and(featureSetSchema);

function createClassSchema(parsedData: { tools: ReadonlyArray<AnyTool>; skills: ReadonlyArray<Skill> }) {
	const allToolProficiencies = parsedData.tools.map<ToolProficiency>(({ name }) => ({ ref: 'Individual', name }));
	const allSkillProficiencies = parsedData.skills.map<SkillProficiency>(({ name }) => ({ ref: name }));

	return descriptionSchema.and(
		myzod.object({
			startingGold: myzod.number(),
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
	classes: ReadonlyArray<unknown>,
	parsedData: {
		armors: ReadonlyArray<AnyArmor>;
		weapons: ReadonlyArray<AnyWeapon>;
		tools: ReadonlyArray<AnyTool>;
		skills: ReadonlyArray<Skill>;
	},
) {
	return parse({
		schema: createClassSchema(parsedData),
		data: classes,
		predicate: (parsedClasses) =>
			parsedClasses.every((aClass) => {
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
			}),
	});
}

export function verifyClassReference(ref: ReadonlyDeep<ClassReference>, parsedClasses: ReadonlyArray<Class>) {
	return !!findReferencedElement(ref, parsedClasses);
}
