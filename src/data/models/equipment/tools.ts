import { types } from 'mobx-state-tree';
import { Opaque } from 'type-fest';
import { equipmentPieceModel, EquipmentType } from './base';

export type ToolName = Opaque<string, 'tool'>;

export enum ToolType {
	Artisan = "artisan's tool",
	Gaming = 'gaming set',
	Musical = 'muscial instrument',
	Other = 'miscellaneous tool',
}

const baseToolModel = types.compose(
	'baseTool',
	equipmentPieceModel,
	types.model({
		type: types.literal(EquipmentType.Tool),
		toolType: types.enumeration(Object.values(ToolType)),
	}),
);

const artisanToolModel = types.compose(
	'artisanTool',
	baseToolModel,
	types.model({
		toolType: types.literal(ToolType.Artisan),
		genericTrade: types.model({
			material: types.model({
				amount: types.number,
				name: types.string,
			}),
			time: types.model({
				amount: types.number,
				unit: types.enumeration(['hours', 'weeks', 'month']),
				additional: types.maybe(types.string),
			}),
			profit: types.model({
				easy: types.number,
				middle: types.number,
				hard: types.number,
			}),
		}),
	}),
);

const gamingSetModel = types.compose(
	'gamingSet',
	baseToolModel,
	types.model({
		toolType: types.literal(ToolType.Gaming),
	}),
);
const musicalInstrumentModel = types.compose(
	'muscicalInstrument',
	baseToolModel,
	types.model({
		toolType: types.literal(ToolType.Musical),
	}),
);
const miscToolModel = types.compose(
	'miscTool',
	baseToolModel,
	types.model({
		toolType: types.literal(ToolType.Other),
	}),
);

export const anyToolModel = types.union(artisanToolModel, gamingSetModel, musicalInstrumentModel, miscToolModel);
