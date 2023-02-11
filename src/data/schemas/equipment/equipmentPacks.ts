import { types } from 'mobx-state-tree';
import { Opaque } from 'type-fest';
import { anyAdventuringGearModel } from './adventuringGear';
import { equipmentPieceModel, EquipmentType } from './base';

export type EquipmentPackName = Opaque<string, 'tool'>;

export const equipmentPackModel = types.compose(
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.EquipmentPack),
		content: types.array(
			types.model({
				gear: types.safeReference(anyAdventuringGearModel),
				amount: types.optional(types.integer, 1),
			}),
		),
	}),
);
