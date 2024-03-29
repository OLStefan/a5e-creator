import adventuringGearJson from '@/resources/equipment/adventuringGear.json';
import armorsJson from '@/resources/equipment/armors.json';
import equipmentPacksJson from '@/resources/equipment/equipmentPacks.json';
import materialPropertiesJson from '@/resources/equipment/materialProperties.json';
import materialsJson from '@/resources/equipment/materials.json';
import mountPropertiesJson from '@/resources/equipment/mountProperties.json';
import mountsJson from '@/resources/equipment/mounts.json';
import toolsJson from '@/resources/equipment/tools.json';
import vehiclePropertiesJson from '@/resources/equipment/vehicleProperties.json';
import vehiclesJson from '@/resources/equipment/vehicles.json';
import weaponPropertiesJson from '@/resources/equipment/weaponProperties.json';
import weaponsJson from '@/resources/equipment/weapons.json';

import { Instance, SnapshotIn, types } from 'mobx-state-tree';
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

export * from './adventuringGear';
export * from './armor';
export * from './base';
export * from './equipmentPacks';
export * from './material';
export * from './materialProperties';
export * from './mountProperties';
export * from './mounts';
export * from './tools';
export * from './vehicleProperties';
export * from './vehicles';
export * from './weaponProperties';
export * from './weapons';

// TODO: Trade Goods, Lifestyle Expense

export const equipmentDataModel = types.model('equipmentData', {
	adventuringGear: types.array(anyAdventuringGearModel),
	armors: types.array(anyArmorModel),
	equipmentPacks: types.array(equipmentPackModel),
	materialProperties: types.array(materialPropertyModel),
	materials: types.array(materialModel),
	mountProperties: types.array(mountPropertyModel),
	mounts: types.array(mountModel),
	tools: types.array(anyToolModel),
	weaponProperties: types.array(weaponPropertyModel),
	weapons: types.array(anyWeaponModel),
	vehicleProperties: types.array(vehiclePropertyModel),
	vehicles: types.array(vehicleModel),
});

export interface EquipmentSnapshot extends SnapshotIn<typeof equipmentDataModel> {}
export interface Equipment extends Instance<typeof equipmentDataModel> {}

export const anyEquipmentPieceModel = types.union(
	anyAdventuringGearModel,
	anyArmorModel,
	equipmentPackModel,
	mountModel,
	anyToolModel,
	vehicleModel,
	anyWeaponModel,
);

export function getEquipmentResources() {
	return {
		materials: materialsJson,
		adventuringGear: adventuringGearJson,
		armors: armorsJson,
		equipmentPacks: equipmentPacksJson,
		materialProperties: materialPropertiesJson,
		mountProperties: mountPropertiesJson,
		mounts: mountsJson,
		tools: toolsJson,
		vehicleProperties: vehiclePropertiesJson,
		vehicles: vehiclesJson,
		weaponProperties: weaponPropertiesJson,
		weapons: weaponsJson,
	} as EquipmentSnapshot;
}
