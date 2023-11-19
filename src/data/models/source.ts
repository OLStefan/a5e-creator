import sourceJson from '../resources/sources.json';

import { Instance, SnapshotIn, types } from 'mobx-state-tree';

export const sourceModel = types.model('source', {
	short: types.identifier,
	name: types.string,
});

export interface SourceSnapshot extends SnapshotIn<typeof sourceModel> {}
export interface Source extends Instance<typeof sourceModel> {}

export const sourceReferenceModel = types.model('sourceReference', {
	book: types.reference(sourceModel),
	page: types.maybe(types.refinement(types.integer, (page) => page >= 1)),
});

export const sourceListModel = types.array(sourceModel);

export function getSourceResources() {
	return sourceJson satisfies Array<SourceSnapshot>;
}
