import { isUndefined } from 'lodash';
import myzod, { Infer } from 'myzod';
import { Opaque } from 'type-fest';
import { descriptionSchema } from '../util/description';
import { additionalReferenceSchema } from '../util/reference';

export type WeaponPropertyName = Opaque<string, 'WeaponProperty'>;

export const weaponPropertySchema = descriptionSchema
	.and(
		myzod.object({
			asString: myzod.string().optional(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as WeaponPropertyName }));
export type WeaponProperty = Infer<typeof weaponPropertySchema>;

const additionalInformationRegex = /\$(\w+)/g;
export const weaponPropertyReferenceSchema = additionalReferenceSchema
	.and(
		myzod.object({
			asString: myzod.string(),
		}),
	)
	.map((refObject) => ({ ...refObject, ref: refObject.ref as WeaponPropertyName }))
	.withPredicate((description) => {
		const properties = [...description.asString.matchAll(additionalInformationRegex)].map(
			// Every map will have a group match here, since that is all the regex does
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			([, groupMatch]) => groupMatch!,
		);
		return properties.every((prop) => !isUndefined(description.additional[prop]));
	}, "Not all properties from 'asString' found in additional properties");

export type WeaponPropertyReference = Infer<typeof weaponPropertyReferenceSchema>;
