import { types } from 'mobx-state-tree';

export enum SourceBook {
	AG = 'AG',
	TT = 'TT',
	DDG = 'DDG',
	ZG = 'ZG',
	GPG = 'GPG',
	Homebrew = 'homebrew',
}

export const sourceReferenceModel = types.model({
	book: types.enumeration(Object.values(SourceBook)),
	page: types.maybe(types.refinement(types.integer, (page) => page >= 1)),
});

export const descriptionModel = types.model({
	name: types.identifier,
	description: types.optional(types.string, ''),
	source: sourceReferenceModel,
	disabled: types.maybe(types.boolean),
});

export const additionalDescriptionModel = types.compose(
	descriptionModel,
	types.model({
		additionalString: types.optional(types.string, ''),
	}),
);
