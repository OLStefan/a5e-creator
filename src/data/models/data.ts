import { types } from 'mobx-state-tree';
import { equipmentModel, getEquipmentResources } from './equipment';
import { getOriginResources, originModel } from './origin';
import { getSkillResources, skillListModel } from './skill';

export const dataModel = types.model('Data', {
	equipment: equipmentModel,
	skills: skillListModel,
	origins: originModel,
});

export function getResources() {
	return { equipment: getEquipmentResources(), skills: getSkillResources(), origins: getOriginResources() };
}
