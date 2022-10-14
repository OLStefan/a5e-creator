import { isString } from 'lodash';
import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { allAttributeReferences, attributeReferenceSchema } from '../attributes';
import {
	anyEquipmentReferenceSchema,
	AnyTool,
	Equipment,
	ToolProficiency,
	toolProficiencySchema,
	verifyEquipmentReference,
} from '../equipment';
import { allLanguageProficiencies, languageProficiencySchema } from '../language';
import { createProficiencyChoiceSchema } from '../proficiency';
import { Skill, SkillProficiency, skillProficiencySchema } from '../skills';
import { descriptionSchema, findReferencedElement, parse, referenceSchema } from '../util';

export type BackgroundName = Opaque<string, 'background'>;

function createBackgroundSchema(parsedData: ReadonlyDeep<{ tools: Array<AnyTool>; skills: Array<Skill> }>) {
	const allToolProficiencies = parsedData.tools.map<ToolProficiency>(({ name }) => ({ ref: 'Individual', name }));
	const allSkillProficiencies = parsedData.skills.map<SkillProficiency>(({ name }) => ({ ref: name }));

	return descriptionSchema
		.and(
			myzod.object({
				feature: descriptionSchema.omit(['source']),
				advancement: myzod.string(),
				proficencies: myzod.object({
					attributes: createProficiencyChoiceSchema(attributeReferenceSchema, allAttributeReferences),
					tools: createProficiencyChoiceSchema(toolProficiencySchema, allToolProficiencies),
					skills: createProficiencyChoiceSchema(skillProficiencySchema, allSkillProficiencies),
					languages: createProficiencyChoiceSchema(languageProficiencySchema, allLanguageProficiencies),
				}),
				suggestedEquipment: myzod.array(anyEquipmentReferenceSchema.or(myzod.string())),
				connections: myzod.array(myzod.string()),
				mementos: myzod.array(myzod.string()),
			}),
		)
		.map((desc) => ({ ...desc, name: desc.name as BackgroundName }));
}
export type Background = Infer<ReturnType<typeof createBackgroundSchema>>;

export const backgroundReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as BackgroundName,
}));
export type BackgroundReference = Infer<typeof backgroundReferenceSchema>;

export function parseBackgrounds(
	backgrounds: ReadonlyDeep<Array<unknown>>,
	parsedData: ReadonlyDeep<Equipment & { skills: Array<Skill> }>,
) {
	return parse({
		schema: createBackgroundSchema(parsedData),
		data: backgrounds,
		predicate: (parsedBackgrounds) =>
			parsedBackgrounds.every((background) =>
				background.suggestedEquipment.every((ref) => isString(ref) || verifyEquipmentReference(ref, parsedData)),
			),
	});
}

export function verifyBackgroundReference(
	ref: ReadonlyDeep<BackgroundReference>,
	parsedBackgrounds: ReadonlyDeep<Array<Background>>,
) {
	return !!findReferencedElement(ref, parsedBackgrounds);
}
