import { types } from 'mobx-state-tree';
import { attributeModel } from '../attribute';
import { anyEquipmentPieceModel, anyToolModel } from '../equipment';
import { languageModel } from '../language';
import { skillModel } from '../skill';
import {
	createProficiencyChoiceSchema,
	createReferenceProficiencyChoiceSchema,
	descriptionModel,
	sourcedDescriptionModel,
} from '../util';

export const backgroundModel = types.compose(
	'Background',
	sourcedDescriptionModel,
	types.model({
		feature: descriptionModel,
		advancement: types.string,
		proficencies: types.model({
			attributes: createProficiencyChoiceSchema(attributeModel),
			tools: types.maybe(createReferenceProficiencyChoiceSchema(anyToolModel)),
			skills: types.maybe(createReferenceProficiencyChoiceSchema(skillModel)),
			languages: types.maybe(createProficiencyChoiceSchema(languageModel)),
		}),
		suggestedEquipment: types.array(types.union(types.reference(anyEquipmentPieceModel), types.string)),
		connections: types.array(types.string),
		mementos: types.array(types.string),
	}),
);
