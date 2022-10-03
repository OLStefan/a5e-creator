import myzod, { Infer } from 'myzod';
import { Material } from './material';
import { anyWeaponSchema } from './weapons';

export enum EquipmentType {
	Weapon = 'weapon',
	Armor = 'armor',
	Tool = 'tool',
}

export const equipmentPieceSchema = myzod.object({
	name: myzod.string(),
	description: myzod.string(),
	weight: myzod.number(),
	price: myzod.number(),
	type: myzod.enum(EquipmentType),
	material: myzod.enum(Material).optional(),
});
export type EquipmentPiece = Infer<typeof equipmentPieceSchema>;

export const anyEquipmentPieceSchema = anyWeaponSchema;
