import { sourcedDescriptionModel } from '@/models/base';
import { floor } from 'lodash';
import { types } from 'mobx-state-tree';

export enum EquipmentType {
	Weapon = 'weapon',
	Armor = 'armor',
	Tool = 'tool',
	AdventuringGear = 'adventuring gear',
	Mount = 'mount',
	Vehicle = 'vehicle',
	TradeGoods = 'trade good',
	LifestyleExpense = 'lifestyle expense',
	EquipmentPack = 'equipment pack',
}

export enum EquipmentQuality {
	Normal = 'normal',
	Fine = 'fine',
	Masterwork = 'masterwork',
}

export const equipmentPieceModel = types
	.compose(
		'equipmentPiece',
		sourcedDescriptionModel,
		types.model({
			weight: types.optional(types.number, 0),
			price: types.optional(types.number, 0),
			type: types.enumeration(Object.values(EquipmentType)),
		}),
	)
	.extend((self) => {
		const views = {
			get splitPrice() {
				const copper = ((self.price * 10) % 1) * 10;
				const silver = floor((self.price % 1) * 10);
				const gold = floor(self.price);

				return { gold, silver, copper };
			},
			get formattedPrice() {
				const { gold, silver, copper } = views.splitPrice;

				const copperString = copper ? `${copper} cp` : '';
				const silverString = silver ? `${silver} sp ` : '';
				const goldString = gold ? `${gold} gp ` : '';

				return `${goldString}${silverString}${copperString}`.trim();
			},
		};

		return { views };
	});

export const equipmentPieceReferenceModel = types.model('equipmentPieceReference', {
	ref: types.reference(equipmentPieceModel),
	quality: types.optional(types.enumeration(Object.values(EquipmentQuality)), EquipmentQuality.Normal),
	amount: types.optional(
		types.refinement(types.integer, (value) => value >= 1),
		1,
	),
});
