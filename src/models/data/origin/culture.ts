import { createProficiencyChoice, sourcedDescriptionModel } from '@/models/base';
import { types } from 'mobx-state-tree';
import { sourcedFeatureModel } from '../feature';
import { languageModel } from '../language';

export const cultureModel = types.compose(
	'culture',
	sourcedDescriptionModel,
	types.model({
		features: types.array(sourcedFeatureModel),
		languages: createProficiencyChoice(languageModel),
	}),
);
