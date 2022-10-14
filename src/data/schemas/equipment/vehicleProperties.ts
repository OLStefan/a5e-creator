import { Infer } from 'myzod';
import { Opaque } from 'type-fest';
import { additionalDescriptionSchema, additionalReferenceSchema, parse, verifyAdditionalReferences } from '../util';

export type VehiclePropertyName = Opaque<string, 'vehicleProperty'>;

export const vehiclePropertySchema = additionalDescriptionSchema.map((desc) => ({
	...desc,
	name: desc.name as VehiclePropertyName,
}));
export type VehicleProperty = Infer<typeof vehiclePropertySchema>;

export const vehiclePropertyReferenceSchema = additionalReferenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as VehiclePropertyName,
}));

export type VehiclePropertyReference = Infer<typeof vehiclePropertyReferenceSchema>;

export function parseVehicleProperties(vehicleProperties: ReadonlyArray<unknown>) {
	return parse({ schema: vehiclePropertySchema, data: vehicleProperties });
}

export const verifyVehiclePropertyReference = verifyAdditionalReferences<VehiclePropertyReference, VehicleProperty>;
