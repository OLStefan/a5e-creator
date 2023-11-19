import { additionalDescriptionModel, createAdditionalDescriptionReference } from '../util';

export const weaponPropertyModel = additionalDescriptionModel.named('weaponProperty');

export const weaponPropertyReference = createAdditionalDescriptionReference(weaponPropertyModel, 'weaponProperty');
