import { descriptionModel, sourcedDescriptionModel } from '@/models/base';
import { types } from 'mobx-state-tree';
import { featureModel } from '../feature';

export const destinyModel = types.compose(
	'destiny',
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
