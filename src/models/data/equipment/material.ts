import { sourcedDescriptionModel } from '@/models/base';
import { types } from 'mobx-state-tree';
import { materialPropertyReferenceModel } from './materialProperties';

export const materialModel = types.compose(
	'material',
	sourcedDescriptionModel,
	types.model({
		weightFactor: types.optional(types.number, 1),
		costFactor: types.optional(types.number, 1),
		properties: types.array(materialPropertyReferenceModel),
	}),
);
