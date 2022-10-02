import { Except, NonNegativeInteger } from "type-fest";

export type DieSize = "d4" | "d6" | "d8" | "d10" | "d12" | "d100";

export enum Attributes {
  Str = "strength",
  Dex = "sexterity",
  Con = "constitution",
  Int = "intelligence",
  Wis = "wisdom",
  Cha = "charisma",
}

export enum DamageType {
  Acid = "acid",
  Bludgeoning = "bludgeoning",
  Cold = "cold",
  Fire = "fire",
  Force = "force",
  Lightning = "lightning",
  Necrotic = "necrotic",
  Piercing = "piercing",
  Poison = "poison",
  Psychic = "psychic",
  Radiant = "radiant",
  Slashing = "slashing",
  Thunder = "thunder",
}

export type DamageDescription = {
  die: DieSize;
  amount: NonNegativeInteger<number>;
  damageType: DamageType;
  type: "Normal";
};

export interface SpecialDamageDescription extends Partial<Except<DamageDescription, "type">> {
  type: "Special";
}
