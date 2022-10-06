import { AnyAdventuringGear } from './adventuringGear';
import { AnyArmor } from './armor';
import { AnyTool } from './tools';
import { AnyWeapon } from './weapons';

export { AdventuringGearType, verifyAdventuringGearReference } from './adventuringGear';
export type {
	AdventuringGearName,
	AdventuringGearReference,
	AnyAdventuringGear,
	Container,
	Medicine,
	OtherAdventuringGear,
	Poison,
	SpellcastingFocus,
	SurvivalGear,
} from './adventuringGear';
export { ArmorType, ShieldType, verifyArmorReference } from './armor';
export type { AnyArmor, Armor, ArmorName, ArmorProficiency, Shield } from './armor';
export { EquipmentType } from './base';
export { verifyMaterialReference } from './material';
export type { Material, MaterialName, MaterialReference } from './material';
export { verifyMaterialPropertyReference } from './materialProperties';
export type { MaterialProperty, MaterialPropertyName, MaterialPropertyReference } from './materialProperties';
export { parseEquipment } from './parseEquipment';
export { ToolType, verifyToolReference } from './tools';
export type { AnyTool, ArtisanTool, GamingSet, MusicalInstrument, OtherTool, ToolName } from './tools';
export { verifyWeaponPropertyReference } from './weaponProperties';
export type { WeaponProperty, WeaponPropertyName, WeaponPropertyReference } from './weaponProperties';
export { verifyWeaponProficiency, verifyWeaponReference, WeaponCategory, WeaponType } from './weapons';
export type { AnyWeapon, MeleeWeapon, RangedWeapon, SpecialWeapon, WeaponName, WeaponProficiency } from './weapons';
// TODO: Mounts, Vehicles, Trade Goods, Lifestyle Expense

export type AnyEquipment = AnyArmor | AnyTool | AnyWeapon | AnyAdventuringGear;
