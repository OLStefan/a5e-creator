import backgroundJson from '../../resources/origin/backgrounds.json';
import cultureJson from '../../resources/origin/cultures.json';
import destinyJson from '../../resources/origin/destinies.json';
import heritageJson from '../../resources/origin/heritages.json';

import { Instance, types } from 'mobx-state-tree';
import { backgroundModel } from './background';
import { cultureModel } from './culture';
import { destinyModel } from './destiny';
import { heritageModel } from './heritage';

export * from './background';
export * from './culture';
export * from './destiny';
export * from './heritage';

export const originDataModel = types.model('originData', {
	backgrounds: types.array(backgroundModel),
	destinies: types.array(destinyModel),
	cultures: types.array(cultureModel),
	heritages: types.array(heritageModel),
});

export interface Origin extends Instance<typeof originDataModel> {}

export function getOriginResources() {
	return {
		backgrounds: backgroundJson,
		destinies: destinyJson,
		cultures: cultureJson,
		heritages: heritageJson,
	} as NonNullable<Parameters<typeof originDataModel.create>[0]>;
}
