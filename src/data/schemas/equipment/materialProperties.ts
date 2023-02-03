import { types } from 'mobx-state-tree';
import { additionalDescriptionModel } from '../util';

export const materialPropertyModel = additionalDescriptionModel;

export const materialPropertyReferenceModel = types.model({
	ref: types.reference(materialPropertyModel),
	additional: types.map(types.union(types.string, types.number)),
});
