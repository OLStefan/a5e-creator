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
	'vehicle',
	equipmentPieceModel,
	types
		.model({
			type: types.literal(EquipmentType.Vehicle),
			vehicleType: types.enumeration(Object.values(VehicleType)),
			size: types.enumeration([Size.Large, Size.Huge, Size.Gargantuan] as const),
			crew: types.optional(types.number, 1),
			ac: types.number,
			speed: types.union(
				types.literal('drawn'),
				types.model({
					movement: types.number,
					journey: types.number,
				}),
			),
			properties: types.array(types.reference(vehiclePropertyModel)),
			defaultMaterial: types.reference(materialModel),
		})
		.extend((self) => {
			const views = {
				get carryingCapacity() {
					const base = { crew: self.crew };

					switch (self.size) {
						case Size.Large:
							return { ...base, passengers: 3, supply: 40, bulky: 10, additional: 2000 };
						case Size.Huge:
							return { ...base, passengers: 6, supply: 80, bulky: 20, additional: 4000 };
						case Size.Gargantuan:
							return { ...base, passengers: self.crew, supply: 800, bulky: 200, additional: 40000 };
					}
				},
			};

			return { views };
		}),
);
