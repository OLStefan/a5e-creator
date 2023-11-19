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

const baseAdventuringGearModel = types.compose(
	'baseAdventuringGear',
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.AdventuringGear),
		gearType: types.enumeration(Object.values(AdventuringGearType)),
	}),
);

const medicineModel = types.compose('medecine',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.Medicine),
	}),
);
const spellcastinFocusModel = types.compose('spellcastingFocus',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.SpellcastingFocus),
		defaultMaterial: types.reference(materialModel),
	}),
);
const poisonModel = types.compose('poison',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.Poison),
	}),
);
const survivalGearModel = types.compose('survivalGear',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.SurvivalGear),
	}),
);
const containerModel = types.compose('container',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.Container),
		capacity: types.string,
		defaultMaterial: types.maybe(types.reference(materialModel)),
	}),
);
const miscAdventuringGearModel = types.compose('miscAdventuringGear',
	baseAdventuringGearModel,
	types.model({
		gearType: types.literal(AdventuringGearType.Miscellaneous),
		defaultMaterial: types.maybe(types.reference(materialModel)),
	}),
);

export const anyAdventuringGearModel = types.union(
	medicineModel,
	spellcastinFocusModel,
	poisonModel,
	survivalGearModel,
	containerModel,
	miscAdventuringGearModel,
);
