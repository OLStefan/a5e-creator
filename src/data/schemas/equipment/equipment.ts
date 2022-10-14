import { Infer } from 'myzod';
import { LastArrayElement, ReadonlyDeep } from 'type-fest';
import adventuringGearJson from '../../resources/equipment/adventuringGear.json';
import armorsJson from '../../resources/equipment/armors.json';
import equipmentPacksJson from '../../resources/equipment/equipmentPacks.json';
import materialPropertiesJson from '../../resources/equipment/materialProperties.json';
import materialsJson from '../../resources/equipment/materials.json';
import mountPropertiesJson from '../../resources/equipment/mountProperties.json';
import mountsJson from '../../resources/equipment/mounts.json';
import toolsJson from '../../resources/equipment/tools.json';
import vehiclePropertiesJson from '../../resources/equipment/vehicleProperties.json';
import vehiclesJson from '../../resources/equipment/vehicles.json';
import weaponPropertiesJson from '../../resources/equipment/weaponProperties.json';
import weaponsJson from '../../resources/equipment/weapons.json';
import { findReferencedElement } from '../util';
import { adventuringGearReferenceSchema, AnyAdventuringGear, parseAdventuringGear } from './adventuringGear';
import { AnyArmor, armorReferenceSchema, parseArmors } from './armor';
import { EquipmentPack, equipmentPackReferenceSchema, parseEquipmentPacks } from './equipmentPacks';
import { Material, parseMaterials } from './material';
import { MaterialProperty, parseMaterialProperties } from './materialProperties';
import { MountProperty, parseMountProperties } from './mountProperties';
import { Mount, mountReferenceSchema, parseMounts } from './mounts';
import { AnyTool, parseTools, toolReferenceSchema } from './tools';
import { parseVehicleProperties, VehicleProperty } from './vehicleProperties';
import { parseVehicles, Vehicle, vehicleReferenceSchema } from './vehicles';
import { parseWeaponProperties, WeaponProperty } from './weaponProperties';
import { AnyWeapon, parseWeapons, weaponReferenceSchema } from './weapons';

export interface Equipment {
	adventuringGear: Array<AnyAdventuringGear>;
	armors: Array<AnyArmor>;
	equipmentPacks: Array<EquipmentPack>;
	materialProperties: Array<MaterialProperty>;
	materials: Array<Material>;
	mountProperties: Array<MountProperty>;
	mounts: Array<Mount>;
	tools: Array<AnyTool>;
	weaponProperties: Array<WeaponProperty>;
	weapons: Array<AnyWeapon>;
	vehicleProperties: Array<VehicleProperty>;
	vehicles: Array<Vehicle>;
}

export type AnyEquipment = Exclude<
	LastArrayElement<Equipment[keyof Equipment]>,
	Material | MaterialProperty | MountProperty | VehicleProperty | WeaponProperty
>;

export function parseEquipment(): Equipment {
	const adventuringGear = parseAdventuringGear(adventuringGearJson);
	const equipmentPacks = parseEquipmentPacks(equipmentPacksJson, adventuringGear);

	const tools = parseTools(toolsJson);

	const mountProperties = parseMountProperties(mountPropertiesJson);
	const mounts = parseMounts(mountsJson);

	const materialProperties = parseMaterialProperties(materialPropertiesJson);
	const materials = parseMaterials(materialsJson, materialProperties);
	const armors = parseArmors(armorsJson, materials);
	const vehicleProperties = parseVehicleProperties(vehiclePropertiesJson);
	const vehicles = parseVehicles(vehiclesJson, vehicleProperties, materials);
	const weaponProperties = parseWeaponProperties(weaponPropertiesJson);
	const weapons = parseWeapons(weaponsJson, weaponProperties, materials);

	return {
		adventuringGear,
		armors,
		equipmentPacks,
		materialProperties,
		materials,
		mountProperties,
		mounts,
		tools,
		vehicleProperties,
		vehicles,
		weaponProperties,
		weapons,
	};
}

export const anyEquipmentReferenceSchema = armorReferenceSchema
	.or(toolReferenceSchema)
	.or(weaponReferenceSchema)
	.or(adventuringGearReferenceSchema)
	.or(vehicleReferenceSchema)
	.or(mountReferenceSchema)
	.or(equipmentPackReferenceSchema);
export type AnyEquipmentReference = Infer<typeof anyEquipmentReferenceSchema>;
export function verifyEquipmentReference(
	ref: ReadonlyDeep<AnyEquipmentReference>,
	parsedData: ReadonlyDeep<Equipment>,
) {
	const allParsedEquipment = [
		...parsedData.armors,
		...parsedData.equipmentPacks,
		...parsedData.mounts,
		...parsedData.tools,
		...parsedData.vehicles,
		...parsedData.weapons,
	];
	return !!findReferencedElement(ref, allParsedEquipment);
}
