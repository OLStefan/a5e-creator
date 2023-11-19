import { additionalDescriptionModel, createAdditionalDescriptionReference } from '@/models/base';

export const weaponPropertyModel = additionalDescriptionModel.named('weaponProperty');

export const weaponPropertyReference = createAdditionalDescriptionReference(weaponPropertyModel, 'weaponProperty');
