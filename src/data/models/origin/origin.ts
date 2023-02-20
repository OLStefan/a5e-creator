import backgroundJson from '../../resources/origin/backgrounds.json';

import { types } from 'mobx-state-tree';
import { backgroundModel } from './background';

export const originModel = types.model({
	backgrounds: types.array(backgroundModel),
});

export function getOriginResources() {
	return {
		backgrounds: backgroundJson,
	} as NonNullable<Parameters<typeof originModel.create>[0]>;
}
