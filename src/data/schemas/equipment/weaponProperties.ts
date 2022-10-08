import { Infer } from 'myzod';
import { Opaque } from 'type-fest';
import { additionalDescriptionSchema, additionalReferenceSchema, parse, verifyAdditionalReferences } from '../util';

export type WeaponPropertyName = Opaque<string, 'WeaponProperty'>;

export const weaponPropertySchema = additionalDescriptionSchema.map((desc) => ({
	...desc,
	name: desc.name as WeaponPropertyName,
}));
export type WeaponProperty = Infer<typeof weaponPropertySchema>;

export const weaponPropertyReferenceSchema = additionalReferenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as WeaponPropertyName,
}));

export type WeaponPropertyReference = Infer<typeof weaponPropertyReferenceSchema>;

export function parseWeaponProperties(weaponProperties: ReadonlyArray<unknown>) {
	return parse({ schema: weaponPropertySchema, data: weaponProperties });
}

export const verifyWeaponPropertyReference = verifyAdditionalReferences<WeaponPropertyReference, WeaponProperty>;
