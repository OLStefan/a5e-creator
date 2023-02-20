import { types } from 'mobx-state-tree';
import { Size } from '../general';
import { equipmentPieceModel, EquipmentType } from './base';
import { materialModel } from './material';
import { vehiclePropertyModel } from './vehicleProperties';

export enum VehicleType {
	Land = 'land',
	Water = 'water',
	Air = 'air',
}

export const vehicleModel = types.compose(
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.Vehicle),
		vehicleType: types.enumeration(Object.values(VehicleType)),
		// carrying capacity (crew/cargo/supply) is only dependent on size, so not tracked separately
		size: types.enumeration(Object.values(Size)),
		ac: types.number,
		speed: types.union(
			types.literal('Drawn'),
			types.model({
				movement: types.number,
				journey: types.number,
			}),
		),
		properties: types.array(types.reference(vehiclePropertyModel)),
		defaultMaterial: types.reference(materialModel),
	}),
);
