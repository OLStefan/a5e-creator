import { anyArmorSchema } from './armor';
import { anyToolSchema } from './tools';
import { anyWeaponSchema } from './weapons';

export * from './armor';
export * from './equipment';
export * from './tools';
export * from './weaponProperties';
export * from './weapons';

export const anyEquipmentSchema = anyWeaponSchema.or(anyArmorSchema).or(anyToolSchema);
