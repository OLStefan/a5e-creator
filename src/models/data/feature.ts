import { types } from 'mobx-state-tree';
import { descriptionModel, sourcedDescriptionModel } from '../base';

export const featureModel = types.compose('feature', descriptionModel, types.model({}));
export const sourcedFeatureModel = types.compose('sourcedFeature', sourcedDescriptionModel, featureModel);
