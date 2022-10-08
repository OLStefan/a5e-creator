import myzod, { Infer } from 'myzod';
import { descriptionSchema, referenceSchema } from '../util';

export enum EquipmentType {
	Weapon = 'weapon',
	Armor = 'armor',
	Tool = 'tool',
	AdventuringGear = 'adventuring gear',
	Mount = 'mount',
	Vehicle = 'vehicle',
	TradeGoos = 'trade good',
	LifestyleExpense = 'lifestyle expense',
}

export enum EquipmentQuality {
	Normal = 'normal',
	Fine = 'fine',
	Masterwork = 'masterwork',
}

export const equipmentPieceSchema = descriptionSchema.and(
	myzod.object({
		weight: myzod.number().default(0),
		price: myzod.number().default(0),
		type: myzod.enum(EquipmentType),
	}),
);
export type EquipmentPiece = Infer<typeof equipmentPieceSchema>;

export const equipmentPieceReference = referenceSchema.and(
	myzod.object({
		quality: myzod.enum(EquipmentQuality).default(EquipmentQuality.Normal),
	}),
);
export type EquipmentPieceReference = Infer<typeof equipmentPieceReference>;
