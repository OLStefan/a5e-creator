import { additionalDescriptionModel, createAdditionalDescriptionReference } from '../util';

export const weaponPropertyModel = additionalDescriptionModel;

export const weaponPropertyReference = createAdditionalDescriptionReference(weaponPropertyModel, 'Weapon Property');
