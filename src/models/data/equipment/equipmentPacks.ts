import { types } from 'mobx-state-tree';
import { anyAdventuringGearModel } from './adventuringGear';
import { equipmentPieceModel, EquipmentType } from './base';

export const equipmentPackModel = types.compose(
	'equipmentPack',
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.EquipmentPack),
		content: types.array(
			types.model({
				gear: types.reference(anyAdventuringGearModel),
				amount: types.optional(types.integer, 1),
			}),
		),
	}),
);
