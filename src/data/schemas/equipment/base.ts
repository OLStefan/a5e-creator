import myzod, { Infer } from 'myzod';
import { descriptionSchema } from '../util/description';

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
		quality: myzod.enum(EquipmentQuality).default(EquipmentQuality.Normal),
	}),
);
export type EquipmentPiece = Infer<typeof equipmentPieceSchema>;
