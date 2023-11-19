import { types } from 'mobx-state-tree';
import { equipmentPieceModel, EquipmentType } from './base';

export const mountModel = types.compose(
	'mount',
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.Mount),
		speed: types.number,
		capacity: types.number,
		strength: types.number,
	}),
);
