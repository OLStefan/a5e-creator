import {
	createProficiencyChoice,
	createReferenceProficiencyChoice,
	descriptionModel,
	sourcedDescriptionModel,
} from '@/models/base';
import { types } from 'mobx-state-tree';
import { attributeModel } from '../attribute';
import { anyEquipmentPieceModel, anyToolModel } from '../equipment';
import { languageModel } from '../language';
import { skillModel } from '../skill';

export const backgroundModel = types.compose(
	'background',
	sourcedDescriptionModel,
	types.model({
		feature: descriptionModel,
		advancement: types.string,
		proficencies: types.model({
			attributes: createProficiencyChoice(attributeModel),
			tools: types.maybe(createReferenceProficiencyChoice(anyToolModel)),
			skills: types.maybe(createReferenceProficiencyChoice(skillModel)),
			languages: types.maybe(createProficiencyChoice(languageModel)),
		}),
		suggestedEquipment: types.array(types.union(types.reference(anyEquipmentPieceModel), types.string)),
		connections: types.array(types.string),
		mementos: types.array(types.string),
	}),
);
