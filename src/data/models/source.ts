import sourceJson from '../resources/sources.json';

import { types } from 'mobx-state-tree';

export const sourceModel = types.model('source', {
	short: types.identifier,
	name: types.string,
});

export const sourceReferenceModel = types.model('sourceReference', {
	book: types.reference(sourceModel),
	page: types.maybe(types.refinement(types.integer, (page) => page >= 1)),
});

export const sourceListModel = types.array(sourceModel);

export function getSourceResources() {
	return sourceJson as Array<NonNullable<Parameters<typeof sourceModel.create>[0]>>;
}
