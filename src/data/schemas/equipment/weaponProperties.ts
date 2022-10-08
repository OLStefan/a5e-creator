import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { additionalDescriptionSchema, additionalReferenceSchema, verifyAdditionalReferences } from '../util';

export type WeaponPropertyName = Opaque<string, 'WeaponProperty'>;

export const weaponPropertySchema = additionalDescriptionSchema
	.and(
		myzod.object({
			asString: myzod.string().optional(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as WeaponPropertyName }));
export type WeaponProperty = Infer<typeof weaponPropertySchema>;

export const weaponPropertyReferenceSchema = additionalReferenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as WeaponPropertyName,
}));

export type WeaponPropertyReference = Infer<typeof weaponPropertyReferenceSchema>;

export function parseWeaponProperties(weaponProperties: ReadonlyArray<unknown>) {
	return myzod.array(weaponPropertySchema).parse(weaponProperties);
}

export function verifyWeaponPropertyReference(
	ref: ReadonlyDeep<WeaponPropertyReference>,
	parsedWeaponProperties: ReadonlyArray<WeaponProperty>,
) {
	verifyAdditionalReferences(ref, parsedWeaponProperties);
}
