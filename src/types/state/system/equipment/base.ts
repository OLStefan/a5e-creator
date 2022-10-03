import myzod from 'myzod';
import { descriptionSchema, sourceReferenceSchema } from '../general';
import { materialReferenceSchema } from './material';

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

export const equipmentPieceSchema = descriptionSchema.and(
	myzod.object({
		weight: myzod.number(),
		price: myzod.number(),
		type: myzod.enum(EquipmentType),
		material: materialReferenceSchema.optional(),
		source: sourceReferenceSchema,
	}),
);
