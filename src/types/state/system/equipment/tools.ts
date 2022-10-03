import myzod, { Infer } from 'myzod';
import { equipmentPieceSchema, EquipmentType } from './equipment';

export enum ToolType {
	Artisan = "artisan's tool",
	Gaming = 'gaming set',
	Musical = 'muscial instrument',
	Other = 'miscellaneous tools',
}

const baseToolSchema = equipmentPieceSchema.and(
	myzod.object({
		type: myzod.literal(EquipmentType.Tool),
		toolType: myzod.enum(ToolType),
	}),
);

const artisanToolSchema = baseToolSchema.and(
	myzod.object({
		toolType: myzod.literal(ToolType.Artisan),
		genericTrade: myzod.object({
			material: myzod.object({
				amount: myzod.number(),
				name: myzod.string(),
			}),
			time: myzod.object({
				amount: myzod.number(),
				unit: myzod.literals('hours', 'weeks', 'month'),
				delay: myzod.string().optional(),
			}),
		}),
		profit: myzod.tuple([myzod.number(), myzod.number(), myzod.number()]),
	}),
);
export type ArtisanTool = Infer<typeof artisanToolSchema>;

const gamingSetSchema = baseToolSchema.and(
	myzod.object({
		toolType: myzod.literal(ToolType.Gaming),
	}),
);
export type GamingSet = Infer<typeof gamingSetSchema>;

const musicalInstrumentSchema = baseToolSchema.and(
	myzod.object({
		toolType: myzod.literal(ToolType.Gaming),
	}),
);
export type MusicalInstrument = Infer<typeof musicalInstrumentSchema>;

const otherToolSchema = baseToolSchema.and(
	myzod.object({
		toolType: myzod.literal(ToolType.Gaming),
	}),
);
export type OtherTool = Infer<typeof otherToolSchema>;

export const anyToolSchema = artisanToolSchema.or(gamingSetSchema).or(musicalInstrumentSchema).or(otherToolSchema);
export type AnyTool = Infer<typeof anyToolSchema>;
