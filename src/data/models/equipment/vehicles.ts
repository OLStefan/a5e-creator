import { mapValues, pick } from 'lodash';
import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { Size } from '../general';
import { EquipmentType, equipmentPieceModel } from './base';
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
				get personCapacity() {
					if (isPersonal(self)) {
						return {
							crew: 1,
							passengers: 0,
						};
					}

					const base = pick(self, 'crew');
					switch (self.size) {
						case Size.Large:
							return { ...base, passengers: 3 };
						case Size.Huge:
							return { ...base, passengers: 6 };
						case Size.Gargantuan:
							return { ...base, passengers: self.crew };
					}
				},
				get cargoCapacity() {
					const sizeBased = getSizeBasedCargoCapacity(self);

					if (isPersonal(self)) {
						return {
							...mapValues(sizeBased, (value) => value / 4),
						};
					}

					return sizeBased;
				},
				get carryingCapacity() {
					return {
						...views.personCapacity,
						...views.cargoCapacity,
					};
				},
			};

			return { views };
		}),
);

export interface Vehicle extends Instance<typeof vehicleModel> {}
export interface VehicleSnapshot extends SnapshotIn<typeof vehicleModel> {}

function isPersonal(vehicle: Pick<Vehicle, 'properties'>) {
	return vehicle.properties.some((prop) => prop.name === 'Personal');
}

function getSizeBasedCargoCapacity(vehicle: Pick<Vehicle, 'size'>) {
	switch (vehicle.size) {
		case Size.Large:
			return { supply: 40, bulky: 10, additionalCargo: 2000 };
		case Size.Huge:
			return { supply: 80, bulky: 20, additionalCargo: 4000 };
		case Size.Gargantuan:
			return { supply: 800, bulky: 200, additionalCargo: 40000 };
	}
}
