import myzod, { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { descriptionSchema } from '../util/description';
import { additionalReferenceSchema, verifyAdditionalReferences } from '../util/reference';

export type MaterialPropertyName = Opaque<string, 'MaterialProperty'>;

export const materialPropertySchema = descriptionSchema
	.and(
		myzod.object({
			asString: myzod.string().optional(),
		}),
	)
	.map((desc) => ({ ...desc, name: desc.name as MaterialPropertyName }));
export type MaterialProperty = Infer<typeof materialPropertySchema>;

export const materialPropertyReferenceSchema = additionalReferenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as MaterialPropertyName,
}));

export type MaterialPropertyReference = Infer<typeof materialPropertyReferenceSchema>;

export function parseMaterialProperties(materials: ReadonlyArray<unknown>) {
	return myzod.array(materialPropertySchema).parse(materials);
}

export function verifyMaterialPropertyReference(
	ref: ReadonlyDeep<MaterialPropertyReference>,
	parsedMaterialProperties: ReadonlyArray<MaterialProperty>,
) {
	verifyAdditionalReferences(ref, parsedMaterialProperties);
}
