import myzod, { AnyType, Infer } from 'myzod';
import { ReadonlyDeep } from 'type-fest';
import { findReferencedElement, referenceSchema } from './util';
import { Description } from './util/description';

export function createProficiencyChoiceSchema<T extends AnyType>(reference: T) {
	return myzod.object({
		allOf: myzod.array(reference).default([]),
		choice: myzod.object({ options: myzod.array(reference).default([]), amount: myzod.number().default(1) }),
	});
}

export function createIndividualProficiencySchema<Category extends string>(categories: Array<Category>) {
	return referenceSchema.and(
		myzod
			.object({ ref: myzod.literals(...categories) })
			.or(myzod.object({ ref: myzod.literal('Individual'), name: myzod.string() })),
	);
}
type IndividualProficiency = Infer<ReturnType<typeof createIndividualProficiencySchema>>;

export function verifyProficiency<Prof extends IndividualProficiency, Element extends Description>(
	ref: ReadonlyDeep<Prof>,
	descriptions: ReadonlyArray<Element>,
) {
	if (ref.ref !== 'Individual') {
		return true;
	}

	return !!findReferencedElement(ref, descriptions);
}
