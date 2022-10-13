import { isEmpty, isUndefined } from 'lodash';
import myzod, { Infer } from 'myzod';
import { ReadonlyDeep } from 'type-fest';
import { AdditionalDescription, Description } from './description';

export const referenceSchema = myzod.object({
	ref: myzod.string(),
});
export type Reference = Infer<typeof referenceSchema>;

export const additionalReferenceSchema = referenceSchema.and(
	myzod.object({
		additional: myzod.record(myzod.string().or(myzod.number())).optional(),
	}),
);
export type AdditionalReference = Infer<typeof additionalReferenceSchema>;

export function findReferencedElement<Element extends Description>(
	ref: ReadonlyDeep<Reference>,
	parsedWeaponProperties: ReadonlyArray<Element>,
) {
	return parsedWeaponProperties.find(({ name }) => name === ref.ref);
}

const additionalInformationRegex = /\$(\w+)/g;
export function verifyAdditionalReferences<Ref extends AdditionalReference, Desc extends AdditionalDescription>(
	ref: ReadonlyDeep<Ref>,
	parsedDescriptions: ReadonlyArray<Desc>,
) {
	const referencedProperty = findReferencedElement(ref, parsedDescriptions);
	if (!referencedProperty) {
		return false;
	}

	if (isEmpty(referencedProperty.additionalString)) {
		return true;
	}

	const requiredProperties = [...referencedProperty.additionalString.matchAll(additionalInformationRegex)].map(
		// Every map will have a group match here, since that is all the regex does
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		([, groupMatch]) => groupMatch!,
	);
	return requiredProperties.every((prop) => !isUndefined(ref.additional?.[prop]));
}
