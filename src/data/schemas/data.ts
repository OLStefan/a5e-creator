import { types } from 'mobx-state-tree';
import { equipmentModel, getEquipmentResources } from './equipment';

export const dataModel = types.model({
	equipment: equipmentModel,
});

export function getResources() {
	return { equipment: getEquipmentResources() };
}
