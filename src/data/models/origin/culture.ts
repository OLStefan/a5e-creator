import { types } from 'mobx-state-tree';
import { sourcedFeatureModel } from '../feature';
import { languageModel } from '../language';
import { createProficiencyChoice, sourcedDescriptionModel } from '../util';

export const cultureModel = types.compose(
	'Culture',
	sourcedDescriptionModel,
	types.model({
		features: types.array(sourcedFeatureModel),
		languages: createProficiencyChoice(languageModel),
	}),
);
