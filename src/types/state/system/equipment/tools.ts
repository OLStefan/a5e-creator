import { EquipmentPiece, EquipmentType } from './equipment';

export enum ToolType {
	Artisan = "artisan's tool",
	Gaming = 'gaming set',
	Musical = 'muscial ionstrument',
	Other = 'miscellanous tools',
}

interface BaseTool extends EquipmentPiece {
	type: EquipmentType.Tool;
	toolType: ToolType;
}

export interface ArtisanTool extends BaseTool {
	toolType: ToolType.Artisan;
	genericTrade: {
		material: {
			amount: number;
			name: string;
		};
		time: {
			amount: number;
			unit: string;
		};
		profit: [number, number, number];
	};
}

export interface GamingSet extends BaseTool {
	toolType: ToolType.Gaming;
}
export interface MusicalInstrument extends BaseTool {
	toolType: ToolType.Musical;
}
export interface OtherTool extends BaseTool {
	toolType: ToolType.Other;
}

export type AnyTool = ArtisanTool;
