import { DamageDescription, SpecialDamageDescription } from "../general";
import { EquipmentPiece, EquipmentType, WeaponProficiency, WeaponRange } from "./equipment";
import { WeaponProperty, WeaponPropertyDescription } from "./weaponProperties";

interface BaseWeapon extends EquipmentPiece {
  name: string;
  proficiency: WeaponProficiency;
  damage: DamageDescription | SpecialDamageDescription;
  properties: Array<WeaponPropertyDescription>;
  type: EquipmentType.Weapon;
  weaponType: WeaponRange;
}

type MeleeWeaponProperties = Array<
  Exclude<WeaponPropertyDescription, Extract<WeaponPropertyDescription, { name: WeaponProperty.Range }>>
>;
type RangedWeaponProperties = [
  Extract<WeaponPropertyDescription, { name: WeaponProperty.Range }>,
  ...MeleeWeaponProperties
];

export interface RangedWeapon extends BaseWeapon {
  weaponType: WeaponRange.Ranged;
  properties: RangedWeaponProperties;
  damage: DamageDescription;
}

export interface MeleeWeapon extends BaseWeapon {
  weaponType: WeaponRange.Melee;
  properties: MeleeWeaponProperties;
  damage: DamageDescription;
}

export interface SpecialWeapon extends BaseWeapon {
  weaponType: WeaponRange.Special;
  specialProperties: string;
}

export type AnyWeapon = RangedWeapon | MeleeWeapon | SpecialWeapon;
