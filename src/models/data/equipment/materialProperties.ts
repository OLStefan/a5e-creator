import { additionalDescriptionModel, createAdditionalDescriptionReference } from '@/models/base';

export const materialPropertyModel = additionalDescriptionModel.named('materialProperty');

export const materialPropertyReferenceModel = createAdditionalDescriptionReference(
	materialPropertyModel,
	'materialProperty',
);
