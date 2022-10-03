import { armorSchema, shieldSchema } from './armor';
import { anyWeaponSchema } from './weapons';

export * from './armor';
export * from './equipment';
export * from './weapons';
export * from './weaponProperties';
export * from './tools';

// TODO
export const anyEquipmentSchema = anyWeaponSchema.or(armorSchema).or(shieldSchema);
