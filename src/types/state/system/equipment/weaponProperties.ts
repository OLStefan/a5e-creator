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

export interface BreakerDescription extends BaseProperyDescription<WeaponProperty.Range> {}

export interface DefensiveDescription extends BaseProperyDescription<WeaponProperty.Range> {}

export interface RangeDescription extends BaseProperyDescription<WeaponProperty.Range> {}

export interface ReachDescription extends BaseProperyDescription<WeaponProperty.Range> {}

export interface ThrownDescription extends BaseProperyDescription<WeaponProperty.Range> {}

export interface VersatileDescription extends BaseProperyDescription<WeaponProperty.Range> {}

interface ExtendedWeaponProperties {
  [WeaponProperty.Breaker]: BreakerDescription;
  [WeaponProperty.Defensive]: DefensiveDescription;
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
