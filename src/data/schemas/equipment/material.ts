import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { descriptionSchema } from '../util/description';
import { findReferencedElement, referenceSchema } from '../util/reference';
import {
	MaterialProperty,
	materialPropertyReferenceSchema,
	verifyMaterialPropertyReference,
} from './materialProperties';

export type MaterialName = Opaque<string, 'material'>;

const materialSchema = descriptionSchema
	.and(
		myzod.object({
			weightFactor: myzod.number().default(1),
			costFactor: myzod.number().default(1),
			properties: myzod.array(materialPropertyReferenceSchema),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as MaterialName }));
export type Material = Infer<typeof materialSchema>;

export const materialReferenceSchema = referenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as MaterialName,
}));
export type MaterialReference = Infer<typeof materialReferenceSchema>;

export function parseMaterials(
	materials: ReadonlyArray<unknown>,
	parsedMaterialProperties: ReadonlyArray<MaterialProperty>,
) {
	return myzod
		.array(materialSchema)
		.withPredicate((materials) =>
			materials.every((material) =>
				material.properties.every((ref) => verifyMaterialPropertyReference(ref, parsedMaterialProperties)),
			),
		)
		.parse(materials);
}

export function verifyMaterialReference(
	ref: ReadonlyDeep<MaterialReference>,
	parsedMaterials: ReadonlyArray<Material>,
) {
	return !!findReferencedElement(ref, parsedMaterials);
}
