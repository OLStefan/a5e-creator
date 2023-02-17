import { types } from 'mobx-state-tree';
import { equipmentModel, getEquipmentResources } from './equipment';
import { getSkillResources, skillListModel } from './skills';

export const dataModel = types.model('Data', {
	equipment: equipmentModel,
	skills: skillListModel,
});

export function getResources() {
	return { equipment: getEquipmentResources(), skills: getSkillResources() };
}
