import { IAnyComplexType, IAnyType, types } from 'mobx-state-tree';

export function createProficiency<Model extends IAnyComplexType, Category extends string>(
	model: Model,
	categories: Array<Category>,
	name: string,
) {
	return types.union(
		types.model(`Individual ${name} Proficiency`, {
			type: types.literal('Individual'),
			ref: types.reference(model),
		}),
		types.model(`Category ${name} Proficiency`, {
			type: types.literal('Categtory'),
			ref: types.enumeration(categories),
		}),
	);
}

export function createReferenceProficiencyChoice<Model extends IAnyComplexType>(model: Model) {
	return createProficiencyChoice(types.reference(model));
}

export function createProficiencyChoice<Model extends IAnyType>(model: Model) {
	return types.model({
		allOf: types.array(model),
		choice: types.maybe(
			types.model({
				options: types.union(types.literal('all'), types.array(model)),
				amount: types.optional(types.number, 1),
			}),
		),
	});
}
