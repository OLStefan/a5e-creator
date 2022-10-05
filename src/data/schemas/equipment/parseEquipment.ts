import adventuringGearJson from '../../resources/equipment/adventuringGear.json';
import armorsJson from '../../resources/equipment/armors.json';
import materialPropertiesJson from '../../resources/equipment/materialProperties.json';
import materialsJson from '../../resources/equipment/materials.json';
import toolsJson from '../../resources/equipment/tools.json';
import weaponPropertiesJson from '../../resources/equipment/weaponProperties.json';
import weaponsJson from '../../resources/equipment/weapons.json';
import { parseAdventuringGear } from './adventuringGear';
import { parseArmors } from './armor';
import { parseMaterials } from './material';
import { parseMaterialProperties } from './materialProperties';
import { parseTools } from './tools';
import { parseWeaponProperties } from './weaponProperties';
import { parseWeapons } from './weapons';

export function parseEquipment() {
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
