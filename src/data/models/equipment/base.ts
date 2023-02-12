import { types } from 'mobx-state-tree';
import { descriptionModel } from '../util';

export enum EquipmentType {
	Weapon = 'weapon',
	Armor = 'armor',
	Tool = 'tool',
	AdventuringGear = 'adventuring gear',
	Mount = 'mount',
	Vehicle = 'vehicle',
	TradeGoos = 'trade good',
	LifestyleExpense = 'lifestyle expense',
	EquipmentPack = 'equipment pack',
}

export enum EquipmentQuality {
	Normal = 'normal',
	Fine = 'fine',
	Masterwork = 'masterwork',
}

export const equipmentPieceModel = types.compose(
	descriptionModel,
	types.model({
		weight: types.optional(types.number, 0),
		price: types.optional(types.number, 0),
		type: types.enumeration(Object.values(EquipmentType)),
	}),
);

export const equipmentPieceReferenceModel = types.model({
	ref: types.safeReference(equipmentPieceModel),
	quality: types.optional(types.enumeration(Object.values(EquipmentQuality)), EquipmentQuality.Normal),
	amount: types.optional(
		types.refinement(types.integer, (value) => value >= 1),
		1,
	),
});
