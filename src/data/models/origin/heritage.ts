import { types } from 'mobx-state-tree';
import { sourcedFeatureModel } from '../feature';
import { Size } from '../general';
import { sourcedDescriptionModel } from '../util';
import { cultureModel } from './culture';

export const heritageModel = types.compose(
	'heritage',
	sourcedDescriptionModel,
	types.model({
		age: types.string,
		size: types.model({
			description: types.string,
			category: types.enumeration(Object.values(Size)),
		}),
		speed: types.number,
		baseFeatures: types.array(sourcedFeatureModel),
		gifts: types.model({
			description: types.string,
			options: types.array(sourcedFeatureModel),
		}),
		paragonFeatures: types.model({
			description: types.string,
			options: types.array(sourcedFeatureModel),
		}),
		suggestedCultures: types.array(types.reference(cultureModel)),
	}),
);
