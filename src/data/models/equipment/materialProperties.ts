import { additionalDescriptionModel, createAdditionalDescriptionReference } from '../util';

export const materialPropertyModel = additionalDescriptionModel.named('materialProperty');

export const materialPropertyReferenceModel = createAdditionalDescriptionReference(
	materialPropertyModel,
	'materialProperty',
);
