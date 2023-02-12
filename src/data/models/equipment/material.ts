import { types } from 'mobx-state-tree';
import { descriptionModel } from '../util';
import { materialPropertyReferenceModel } from './materialProperties';

export const materialModel = types.compose(
	descriptionModel,
	types.model({
		weightFactor: types.optional(types.number, 1),
		costFactor: types.optional(types.number, 1),
		properties: types.array(materialPropertyReferenceModel),
	}),
);
