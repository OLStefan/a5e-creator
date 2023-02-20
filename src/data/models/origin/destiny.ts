import { types } from 'mobx-state-tree';
import { featureModel } from '../feature';
import { descriptionModel, sourcedDescriptionModel } from '../util';

export const destinyModel = types.compose(
	'Destiny',
	sourcedDescriptionModel,
	types.model({
		inspiration: types.model({
			source: descriptionModel,
			feature: featureModel,
		}),
		fullfillment: types.model({
			condition: types.string,
			feature: featureModel,
		}),
		motivations: types.array(descriptionModel),
	}),
);
