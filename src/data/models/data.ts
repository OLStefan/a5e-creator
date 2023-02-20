import sourceJson from '../resources/sources.json';

import { types } from 'mobx-state-tree';
import { equipmentModel, getEquipmentResources } from './equipment';
import { getOriginResources, originModel } from './origin';
import { getSkillResources, skillListModel } from './skill';
import { sourceModel } from './util';

export const dataModel = types.model('Data', {
	sources: types.array(sourceModel),
	equipment: equipmentModel,
	skills: skillListModel,
	origins: originModel,
});

export function getResources() {
	return {
		sources: sourceJson,
		equipment: getEquipmentResources(),
		skills: getSkillResources(),
		origins: getOriginResources(),
	};
}
