import { Infer } from 'myzod';
import { anyArmorSchema } from './armor';
import { anyToolSchema } from './tools';
import { anyWeaponSchema } from './weapons';

export { ArmorType, ShieldType } from './armor';
export type { AnyArmor, Armor, Shield } from './armor';
export { EquipmentType } from './base';
export { Material, materialDescriptionSchema } from './material';
export type { MaterialDescription, MaterialReference } from './material';
export { ToolType } from './tools';
export type { AnyTool, ArtisanTool, GamingSet, MusicalInstrument, OtherTool } from './tools';
export { WeaponProperty, weaponPropertyDescriptionSchema } from './weaponProperties';
export type { WeaponPropertyDescription, WeaponPropertyReference } from './weaponProperties';
export { WeaponProficiency, WeaponType } from './weapons';
export type { AnyWeapon, MeleeWeapon, RangedWeapon, SpecialWeapon } from './weapons';

export const anyEquipmentSchema = anyWeaponSchema.or(anyArmorSchema).or(anyToolSchema);
export type AnyEquipment = Infer<typeof anyEquipmentSchema>;
