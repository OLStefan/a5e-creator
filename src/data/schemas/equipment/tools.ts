import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { createIndividualProficiencySchema, verifyProficiency } from '../proficiency';
import { findReferencedElement } from '../util';
import { equipmentPieceReference, equipmentPieceSchema, EquipmentType } from './base';

export type ToolName = Opaque<string, 'tool'>;

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

const artisanToolSchema = baseToolSchema
	.and(
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
	)
	.map((desc) => ({ ...desc, name: desc.name as ToolName }));
export type ArtisanTool = Infer<typeof artisanToolSchema>;

const gamingSetSchema = baseToolSchema
	.and(
		myzod.object({
			toolType: myzod.literal(ToolType.Gaming),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as ToolName }));
export type GamingSet = Infer<typeof gamingSetSchema>;

const musicalInstrumentSchema = baseToolSchema
	.and(
		myzod.object({
			toolType: myzod.literal(ToolType.Gaming),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as ToolName }));
export type MusicalInstrument = Infer<typeof musicalInstrumentSchema>;

const otherToolSchema = baseToolSchema
	.and(
		myzod.object({
			toolType: myzod.literal(ToolType.Gaming),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as ToolName }));
export type OtherTool = Infer<typeof otherToolSchema>;

const anyToolSchema = myzod.union([artisanToolSchema, gamingSetSchema, musicalInstrumentSchema, otherToolSchema]);
export type AnyTool = Infer<typeof anyToolSchema>;

export const toolReferenceSchema = equipmentPieceReference.map((refObject) => ({
	...refObject,
	ref: refObject.ref as ToolName,
}));
export type ToolReference = Infer<typeof toolReferenceSchema>;

export const toolProficiencySchema = createIndividualProficiencySchema(Object.values(ToolType)).map((ref) => {
	if (ref.ref === 'Individual') {
		return { ...ref, name: ref.name as ToolName };
	}
	return ref;
});
export type ToolProficiency = Infer<typeof toolProficiencySchema>;

export function parseTools(tools: ReadonlyArray<unknown>) {
	return myzod.array(anyToolSchema).parse(tools);
}

export function verifyToolReference(ref: ReadonlyDeep<ToolReference>, parsedTools: ReadonlyArray<AnyTool>) {
	return !!findReferencedElement(ref, parsedTools);
}

export const verifyToolProficiency = verifyProficiency<ToolProficiency, AnyTool>;
