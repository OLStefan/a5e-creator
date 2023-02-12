import { types } from 'mobx-state-tree';
import { equipmentPieceModel, EquipmentType } from './base';
import { materialModel } from './material';

export enum AdventuringGearType {
	Medicine = 'medicinal',
	SpellcastingFocus = 'spellcasting focus',
	Poison = 'poison',
	SurvivalGear = 'survival gear',
	Container = 'container',
	Miscellaneous = 'miscellaneous gear',
}

const baseAdventuringGearSchema = types.compose(
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.AdventuringGear),
		gearType: types.enumeration(Object.values(AdventuringGearType)),
	}),
);

const medicineModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.Medicine),
	}),
);
const spellcastinFocuesModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.SpellcastingFocus),
		defaultMaterial: types.safeReference(materialModel),
	}),
);
const poisonModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.Poison),
	}),
);
const survivalGearModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.SurvivalGear),
	}),
);
const containerModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.Container),
		capacity: types.string,
		defaultMaterial: types.maybe(types.safeReference(materialModel)),
	}),
);
const miscAdventuringGearModel = types.compose(
	baseAdventuringGearSchema,
	types.model({
		gearType: types.literal(AdventuringGearType.Miscellaneous),
		defaultMaterial: types.maybe(types.safeReference(materialModel)),
	}),
);

export const anyAdventuringGearModel = types.union(
	medicineModel,
	spellcastinFocuesModel,
	poisonModel,
	survivalGearModel,
	containerModel,
	miscAdventuringGearModel,
);
