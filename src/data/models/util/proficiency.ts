import { IAnyType, types } from 'mobx-state-tree';

export function createProficiency<Model extends IAnyType, Category extends string>(
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

export function createProficiencyChoiceSchema<Model extends IAnyType>(model: Model) {
	return types.model({
		allOf: types.array(types.reference(model)),
		choice: types.maybe(
			types.model({
				options: types.union(types.literal('all'), types.array(types.reference(model))),
				amount: types.optional(types.number, 1),
			}),
		),
	});
}
