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

import { types } from 'mobx-state-tree';
import { anyAdventuringGearModel } from './adventuringGear';
import { anyArmorModel } from './armor';
import { equipmentPackModel } from './equipmentPacks';
import { materialModel } from './material';
import { materialPropertyModel } from './materialProperties';
import { mountPropertyModel } from './mountProperties';
import { mountModel } from './mounts';
import { anyToolModel } from './tools';
import { vehiclePropertyModel } from './vehicleProperties';
import { vehicleModel } from './vehicles';
import { weaponPropertyModel } from './weaponProperties';
import { anyWeaponModel } from './weapons';

export const equipmentModel = types.model({
	adventuringGear: types.array(types.reference(anyAdventuringGearModel)),
	armors: types.array(types.reference(anyArmorModel)),
	equipmentPacks: types.array(types.reference(equipmentPackModel)),
	materialProperties: types.array(types.reference(materialPropertyModel)),
	materials: types.array(types.reference(materialModel)),
	mountProperties: types.array(types.reference(mountPropertyModel)),
	mounts: types.array(types.reference(mountModel)),
	tools: types.array(types.reference(anyToolModel)),
	weaponProperties: types.array(types.reference(weaponPropertyModel)),
	weapons: types.array(types.reference(anyWeaponModel)),
	vehicleProperties: types.array(types.reference(vehiclePropertyModel)),
	vehicles: types.array(types.reference(vehicleModel)),
});

export function parseEquipment() {
	return equipmentModel.create({
		adventuringGear: adventuringGearJson,
		armors: armorsJson,
		equipmentPacks: equipmentPacksJson,
		materialProperties: materialPropertiesJson,
		materials: materialsJson,
		mountProperties: mountPropertiesJson,
		mounts: mountsJson,
		tools: toolsJson,
		vehicleProperties: vehiclePropertiesJson,
		vehicles: vehiclesJson,
		weaponProperties: weaponPropertiesJson,
		weapons: weaponsJson,
	} as any);
}
