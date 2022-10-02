import { AnyWeapon } from "./weapons";

export interface EquipmentPiece {
  name: string;
  weight: number;
  price: number;
  type: EquipmentType;
}

export enum EquipmentType {
  Weapon = "weapon",
  Armor = "armor",
  Tool = "tool",
}

export enum WeaponProficiency {
  Simple = "simple",
  Martial = "martial",
  Rare = "rare",
}

export enum WeaponRange {
  Melee = "melee",
  Ranged = "ranged",
  Special = "special",
}

export enum ArmorCategory {
  Light = "light",
  Medium = "medium",
  Heavy = "heavy",
  Shield = "shield",
}

export enum ShieldCategory {
  Light = "light",
  Medium = "medium",
  Heavy = "heavy",
  Tower = "tower",
}

export interface Armor extends EquipmentPiece {
  type: EquipmentType.Armor;
}
export interface Tool extends EquipmentPiece {
  type: EquipmentType.Tool;
}

export type AnyEquipment = AnyWeapon;
