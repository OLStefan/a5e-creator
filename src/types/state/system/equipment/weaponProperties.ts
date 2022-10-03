import { isUndefined } from 'lodash';
import myzod, { Infer } from 'myzod';
import { descriptionSchema, sourceReferenceSchema } from '../general';

export enum WeaponProperty {
	Breaker = 'breaker',
	Compounding = 'compounding',
	Defensive = 'defensive',
	DualWielding = 'dual-wielding',
	Finesse = 'finess',
	HandMounted = 'hand-mounted',
	Heavy = 'heavy',
	Loading = 'loading',
	Mounted = 'mounted',
	Parrying = 'parrying',
	ParryingImmunity = 'parrying immunity',
	Range = 'range',
	Reach = 'reach',
	Simple = 'simple',
	Thrown = 'thrown',
	Trip = 'trip',
	TwoHanded = 'two-handed',
	Versatile = 'versatile',
	Vicious = 'vicious',
}

export const weaponPropertyDescriptionSchema = descriptionSchema.and(
	myzod.object({
		name: myzod.enum(WeaponProperty),
		source: sourceReferenceSchema,
	}),
);
export type WeaponPropertyDescription = Infer<typeof weaponPropertyDescriptionSchema>;

const additionalInformationRegex = /\$(\w+)/g;
export const weaponPropertyReferenceSchema = myzod
	.object({
		property: myzod.enum(WeaponProperty),
		additional: myzod.record(myzod.string().or(myzod.number())),
		asString: myzod.string(),
	})
	.withPredicate((description) => {
		const properties = [...description.asString.matchAll(additionalInformationRegex)].map(
			// Every map will have a group match here, since that is all the regex does
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			([, groupMatch]) => groupMatch!,
		);
		return properties.every((prop) => !isUndefined(description.additional[prop]));
	}, "Not all properties from 'asString' found in additional properties");

export type WeaponPropertyReference = Infer<typeof weaponPropertyReferenceSchema>;
