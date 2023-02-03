import { additionalDescriptionModel, createAdditionalDescriptionReference } from '../util';

export const materialPropertyModel = additionalDescriptionModel;

export const materialPropertyReferenceModel = createAdditionalDescriptionReference(materialPropertyModel);
