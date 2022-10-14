import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { Size } from '../general';
import { createIndividualProficiencySchema, verifyProficiency } from '../proficiency';
import { findReferencedElement, parse } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';
import { Material, materialReferenceSchema, verifyMaterialReference } from './material';
import { VehicleProperty, vehiclePropertyReferenceSchema, verifyVehiclePropertyReference } from './vehicleProperties';

export type VehicleName = Opaque<string, 'vehicle'>;

export enum VehicleType {
	Land = 'land',
	Water = 'water',
	Air = 'air',
}

const vehicleSchema = equipmentPieceSchema
	.and(
		myzod.object({
			type: myzod.literal(EquipmentType.Vehicle),
			vehicleType: myzod.enum(VehicleType),
			// carrying capacity (crew/cargo/supply) is only dependent on size, so not tracked separately
			size: myzod.enum(Size),
			ac: myzod.number(),
			speed: myzod.literal('Drawn').or(
				myzod.object({
					movement: myzod.number(),
					journey: myzod.number(),
				}),
			),
			properties: myzod.array(vehiclePropertyReferenceSchema),
			defaultMaterial: materialReferenceSchema,
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as VehicleName }));
export type Vehicle = Infer<typeof vehicleSchema>;

export const vehicleReferenceSchema = equipmentPieceReference
	.and(myzod.object({ material: materialReferenceSchema.optional() }))
	.map((refObject) => ({
		...refObject,
		ref: refObject.ref as VehicleName,
	}));
export type VehicleReference = Infer<typeof vehicleReferenceSchema>;

export const vehicleProficiencySchema = createIndividualProficiencySchema(Object.values(VehicleType)).map((ref) => {
	if (ref.ref === 'Individual') {
		return { ...ref, name: ref.name as VehicleName };
	}
	return ref;
});
export type VehicleProficiency = Infer<typeof vehicleProficiencySchema>;

export function parseVehicles(
	vehicles: ReadonlyArray<unknown>,
	parsedVehicleProperties: ReadonlyArray<VehicleProperty>,
	parsedMaterials: ReadonlyArray<Material>,
) {
	return parse({
		schema: vehicleSchema,
		data: vehicles,
		predicate: (parsedWeapons) =>
			parsedWeapons.every(
				(weapon) =>
					verifyMaterialReference(weapon.defaultMaterial, parsedMaterials) &&
					weapon.properties.every((ref) => verifyVehiclePropertyReference(ref, parsedVehicleProperties)),
			),
	});
}

export function verifyVehicleReference(
	ref: ReadonlyDeep<VehicleReference>,
	parsedVehicles: ReadonlyArray<Vehicle>,
	parsedMaterials: ReadonlyArray<Material>,
) {
	const verifiedMaterial = !ref.material || verifyMaterialReference(ref.material, parsedMaterials);
	return verifiedMaterial && !!findReferencedElement(ref, parsedVehicles);
}

export const verifyVehicleProficiency = verifyProficiency<VehicleProficiency, Vehicle>;
