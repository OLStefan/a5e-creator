import adventuringGearJson from '../../resources/equipment/adventuringGear.json';
import armorsJson from '../../resources/equipment/armors.json';
import materialPropertiesJson from '../../resources/equipment/materialProperties.json';
import materialsJson from '../../resources/equipment/materials.json';
import toolsJson from '../../resources/equipment/tools.json';
import weaponPropertiesJson from '../../resources/equipment/weaponProperties.json';
import weaponsJson from '../../resources/equipment/weapons.json';
import { AnyAdventuringGear, parseAdventuringGear } from './adventuringGear';
import { AnyArmor, parseArmors } from './armor';
import { Material, parseMaterials } from './material';
import { MaterialProperty, parseMaterialProperties } from './materialProperties';
import { AnyTool, parseTools } from './tools';
import { parseWeaponProperties, WeaponProperty } from './weaponProperties';
import { AnyWeapon, parseWeapons } from './weapons';

export interface Equipment {
	adventuringGear: Array<AnyAdventuringGear>;
	armors: Array<AnyArmor>;
	materialProperties: Array<MaterialProperty>;
	materials: Array<Material>;
	tools: Array<AnyTool>;
	weaponProperties: Array<WeaponProperty>;
	weapons: Array<AnyWeapon>;
}

export function parseEquipment(): Equipment {
	const adventuringGear = parseAdventuringGear(adventuringGearJson);

	const tools = parseTools(toolsJson);

	const materialProperties = parseMaterialProperties(materialPropertiesJson);
	const materials = parseMaterials(materialsJson, materialProperties);
	const armors = parseArmors(armorsJson, materials);
	const weaponProperties = parseWeaponProperties(weaponPropertiesJson);
	const weapons = parseWeapons(weaponsJson, weaponProperties, materials);

	return {
		adventuringGear,
		armors,
		materialProperties,
		materials,
		tools,
		weaponProperties,
		weapons,
	};
}
