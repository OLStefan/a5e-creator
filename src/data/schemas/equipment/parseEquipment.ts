import adventuringGearJson from '../../resources/equipment/adventuringGear.json';
import armorsJson from '../../resources/equipment/armors.json';
import materialPropertiesJson from '../../resources/equipment/materialProperties.json';
import materialsJson from '../../resources/equipment/materials.json';
import mountPropertiesJson from '../../resources/equipment/mountProperties.json';
import mountsJson from '../../resources/equipment/mounts.json';
import toolsJson from '../../resources/equipment/tools.json';
import vehiclePropertiesJson from '../../resources/equipment/vehicleProperties.json';
import vehiclesJson from '../../resources/equipment/vehicles.json';
import weaponPropertiesJson from '../../resources/equipment/weaponProperties.json';
import weaponsJson from '../../resources/equipment/weapons.json';
import { AnyAdventuringGear, parseAdventuringGear } from './adventuringGear';
import { AnyArmor, parseArmors } from './armor';
import { Material, parseMaterials } from './material';
import { MaterialProperty, parseMaterialProperties } from './materialProperties';
import { MountProperty, parseMountProperties } from './mountProperties';
import { Mount, parseMounts } from './mounts';
import { AnyTool, parseTools } from './tools';
import { parseVehicleProperties, VehicleProperty } from './vehicleProperties';
import { parseVehicles, Vehicle } from './vehicles';
import { parseWeaponProperties, WeaponProperty } from './weaponProperties';
import { AnyWeapon, parseWeapons } from './weapons';

export interface Equipment {
	adventuringGear: Array<AnyAdventuringGear>;
	armors: Array<AnyArmor>;
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

export function parseEquipment(): Equipment {
	const adventuringGear = parseAdventuringGear(adventuringGearJson);

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
