import { types } from 'mobx-state-tree';
import { descriptionModel, sourcedDescriptionModel } from './util';

export const featureModel = types.compose(descriptionModel, types.model({}));
export const sourcedFeatureModel = types.compose(sourcedDescriptionModel, featureModel);
