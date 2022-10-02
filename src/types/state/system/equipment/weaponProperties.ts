import myzod, { Infer } from "myzod";

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

const baseWeaponPropertyDescriptionSchema = myzod.object({
  name: myzod.enum(WeaponProperty),
});

const breakerDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Breaker),
    material: myzod.string(),
  })
);
export type BreakerDescription = Infer<typeof breakerDescriptionSchema>;

const defensiveDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Defensive),
    max: myzod.string(), // TODO Shield PropertyEnum
  })
);
export type DefensiveDescription = Infer<typeof defensiveDescriptionSchema>;

const rangeDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Range),
    normal: myzod.number({ min: 0 }),
    long: myzod.number({ min: 0 }),
  })
);
export type RangeDescription = Infer<typeof rangeDescriptionSchema>;

const reachDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Reach),
    reach: myzod.number({ min: 0 }),
  })
);
export type ReachDescription = Infer<typeof reachDescriptionSchema>;

const thrownDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Thrown),
    normal: myzod.number({ min: 0 }),
    long: myzod.number({ min: 0 }),
  })
);
export type ThrownDescription = Infer<typeof thrownDescriptionSchema>;

const versatileDescriptionSchema = baseWeaponPropertyDescriptionSchema.and(
  myzod.object({
    name: myzod.literal(WeaponProperty.Versatile),
    damage: myzod.object({}), // TODO,
  })
);
export type VersatileDescription = Infer<typeof versatileDescriptionSchema>;

const BasePropertiesMapping = Object.values(WeaponProperty).reduce(
  (prev, curr) => ({ ...prev, [curr]: otherWeaponPropteryDescriptionSchemas }),
  {} as Record<WeaponProperty, typeof otherWeaponPropteryDescriptionSchemas>
);

const otherWeaponProperties = Object.values(WeaponProperty).filter(
  (property): property is Exclude<WeaponProperty, keyof typeof ExtendedWeaponProperties> =>
    property in ExtendedWeaponProperties
);
export const otherWeaponPropteryDescriptionSchemas = myzod.object({
  name: myzod.literals(...otherWeaponProperties),
});

const ExtendedWeaponProperties = {
  [WeaponProperty.Breaker]: breakerDescriptionSchema,
  [WeaponProperty.Defensive]: defensiveDescriptionSchema,
  [WeaponProperty.Range]: rangeDescriptionSchema,
  [WeaponProperty.Reach]: reachDescriptionSchema,
  [WeaponProperty.Thrown]: thrownDescriptionSchema,
  [WeaponProperty.Versatile]: versatileDescriptionSchema,
};

const AllWeaponPropertziesMapping = {
  ...BasePropertiesMapping,
  ...ExtendedWeaponProperties,
};

export const weaponPropertySchema = baseWeaponPropertyDescriptionSchema.map((weaponProperty) => {
  return AllWeaponPropertziesMapping[weaponProperty.name].parse(weaponProperty);
});
export type WeaponPropertyDescription = Infer<typeof weaponPropertySchema>;
