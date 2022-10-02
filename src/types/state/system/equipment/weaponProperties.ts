import { DamageDescription } from "../general";
import { ShieldCategory } from "./equipment";

export enum WeaponProperty {
  Breaker = "breaker",
  Compounding = "compounding",
  Defensive = "defensive",
  DualWielding = "dual-wielding",
  Finesse = "finess",
  HandMounted = "hand-mounted",
  Heavy = "heavy",
  Loading = "loading",
  Mounted = "mounted",
  Parrying = "parrying",
  ParryingImmunity = "parrying immunity",
  Range = "range",
  Reach = "reach",
  Simple = "simple",
  Thrown = "thrown",
  Trip = "trip",
  TwoHanded = "two-handed",
  Versatile = "versatile",
  Vicious = "vicious",
}

interface BaseProperyDescription<Property extends WeaponProperty> {
  name: Property;
}

export interface BreakerPropertyDescription extends BaseProperyDescription<WeaponProperty.Breaker> {
  material?: string;
}

export interface DefensiveDescription extends BaseProperyDescription<WeaponProperty.Defensive> {
  max: ShieldCategory;
}

export interface LoadingDescription extends BaseProperyDescription<WeaponProperty.Loading> {
  amount?: number;
}
export interface MountedDescription extends BaseProperyDescription<WeaponProperty.Mounted> {
  damage: Pick<DamageDescription, "amount" | "die">;
  versatile?: Pick<DamageDescription, "amount" | "die">;
}

interface RangeDescription {
  normal: number;
  long: number;
}

export interface RangePropertyDescription extends BaseProperyDescription<WeaponProperty.Range>, RangeDescription {}

export interface ReachDescription extends BaseProperyDescription<WeaponProperty.Reach> {
  reach: number;
}

export interface ThrownDescription extends BaseProperyDescription<WeaponProperty.Thrown>, RangeDescription {}

export interface VersatileDescription extends BaseProperyDescription<WeaponProperty.Versatile> {
  damage: Pick<DamageDescription, "amount" | "die">;
}

interface ExtendedWeaponProperties {
  [WeaponProperty.Breaker]: BreakerPropertyDescription;
  [WeaponProperty.Defensive]: DefensiveDescription;
  [WeaponProperty.Loading]: LoadingDescription;
  [WeaponProperty.Mounted]: MountedDescription;
  [WeaponProperty.Range]: RangeDescription;
  [WeaponProperty.Reach]: ReachDescription;
  [WeaponProperty.Thrown]: ThrownDescription;
  [WeaponProperty.Versatile]: VersatileDescription;
}

export type WeaponPropertyDescription = {
  [Property in WeaponProperty]: Property extends keyof ExtendedWeaponProperties
    ? ExtendedWeaponProperties[Property]
    : BaseProperyDescription<Property>;
}[WeaponProperty];
