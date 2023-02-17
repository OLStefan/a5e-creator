import { types } from 'mobx-state-tree';
import { descriptionModel } from './util';

export const skillModel = types.compose(
	descriptionModel,
	types.model({
		specialties: types.array(types.string),
	}),
);
