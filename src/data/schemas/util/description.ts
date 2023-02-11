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

export function createAdditionalDescriptionReference<T extends typeof additionalDescriptionModel>(
	model: T,
	name: string,
) {
	return types.model(`${name} Reference`, {
		ref: types.safeReference(model),
		additional: types.map(types.union(types.string, types.number)),
	});
}

// const additionalInformationRegex = /\$(\w+)/g;
// function verifyAdditionalProperties({
// 	additionalString,
// 	additionalProperties,
// }: {
// 	additionalString: string;
// 	additionalProperties?: Record<string, string | number>;
// }) {
// 	const requiredProperties = [...additionalString.matchAll(additionalInformationRegex)].map(
// 		// Every map will have a group match here, since that is all the regex does
// 		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// 		([, groupMatch]) => groupMatch!,
// 	);
// 	return requiredProperties.every((prop) => !isUndefined(additionalProperties?.[prop]));
// }
