import { isArray } from 'lodash';
import myzod, { AnyType, Infer } from 'myzod';
import { ReadonlyDeep } from 'type-fest';
import { findReferencedElement, referenceSchema } from './util';
import { Description } from './util/description';

export function createProficiencyChoiceSchema<T extends AnyType>(reference: T, allChoices: Array<Infer<T>>) {
	return myzod.object({
		allOf: myzod.array(reference).default([]),
		choice: myzod.object({
			options: myzod
				.literal('all')
				.or(myzod.array(reference))
				.default([])
				.map((options) => {
					if (isArray(options)) {
						return options;
					}

					return allChoices;
				}),
			amount: myzod.number({ min: 1 }).default(1),
		}),
	});
}

export function createIndividualProficiencySchema<Category extends string>(categories: Array<Category>) {
	return referenceSchema.and(
		myzod
			.object({ ref: myzod.literals(...categories) })
			.or(myzod.object({ ref: myzod.literal('Individual'), name: myzod.string() }))
			.or(myzod.object({ ref: myzod.literal('Type'), name: myzod.literals(...categories) })),
	);
}
export type IndividualProficiency = Infer<ReturnType<typeof createIndividualProficiencySchema>>;

export function verifyProficiency<Prof extends IndividualProficiency, Element extends Description>(
	ref: ReadonlyDeep<Prof>,
	descriptions: ReadonlyDeep<Array<Element>>,
) {
	if (ref.ref === 'Individual') {
		return 'name' in ref && !!findReferencedElement({ ref: ref.name }, descriptions);
	}
	return true;
}

export function verifyProficiencyChoice(
	ref: ReadonlyDeep<Infer<ReturnType<typeof createProficiencyChoiceSchema>>>,
	descriptions: ReadonlyDeep<Array<Description>>,
) {
	const allOfValid = ref.allOf.every((prof) => verifyProficiency(prof, descriptions));
	const choicesValid = ref.choice.options.every((prof) => verifyProficiency(prof, descriptions));

	return allOfValid && choicesValid;
}
