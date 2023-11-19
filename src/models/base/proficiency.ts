import { upperFirst } from 'lodash';
import { IAnyComplexType, IAnyType, Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree';

export function createProficiency<Model extends IAnyComplexType, Category extends string>(
	model: Model,
	categories: Array<Category>,
	name: string,
) {
	return types.union(
		types.model(`individual${upperFirst(name)}Proficiency`, {
			type: types.literal('individual'),
			ref: types.reference(model),
		}),
		types.model(`category${upperFirst(name)}Proficiency`, {
			type: types.literal('categtory'),
			ref: types.enumeration(categories),
		}),
	);
}

export function createReferenceProficiencyChoice<Model extends IAnyComplexType>(model: Model) {
	return createProficiencyChoice(types.reference(model));
}

export interface ReferenceProficiencyChoice<Model extends IAnyComplexType>
	extends Instance<ReturnType<typeof createReferenceProficiencyChoice<Model>>> {}

export function createProficiencyChoice<Model extends IAnyType>(model: Model) {
	const optionArray = types.array(model);
	type optionSnapshotIn = SnapshotIn<typeof optionArray>;
	type optionSnapshotOut = SnapshotOut<typeof optionArray>;
	type optionInstance = Instance<typeof optionArray>;

	return types.model(`${model.name}ProficiencyChoice`, {
		allOf: types.array(model),
		choice: types.maybe(
			types.model({
				// Typescript does not manage to extract types from optionArray itself
				options: types.union<'all', 'all', 'all', optionSnapshotIn, optionSnapshotOut, optionInstance>(
					types.literal('all'),
					optionArray,
				),
				amount: types.optional(types.number, 1),
			}),
		),
	});
}
