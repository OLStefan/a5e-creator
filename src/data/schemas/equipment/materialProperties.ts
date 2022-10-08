import { Infer } from 'myzod';
import { Opaque, ReadonlyDeep } from 'type-fest';
import { additionalDescriptionSchema, additionalReferenceSchema, parse, verifyAdditionalReferences } from '../util';

export type MaterialPropertyName = Opaque<string, 'MaterialProperty'>;

export const materialPropertySchema = additionalDescriptionSchema.map((desc) => ({
	...desc,
	name: desc.name as MaterialPropertyName,
}));
export type MaterialProperty = Infer<typeof materialPropertySchema>;

export const materialPropertyReferenceSchema = additionalReferenceSchema.map((refObject) => ({
	...refObject,
	ref: refObject.ref as MaterialPropertyName,
}));

export type MaterialPropertyReference = Infer<typeof materialPropertyReferenceSchema>;

export function parseMaterialProperties(materialProperties: ReadonlyArray<unknown>) {
	return parse({ schema: materialPropertySchema, data: materialProperties });
}

export function verifyMaterialPropertyReference(
	ref: ReadonlyDeep<MaterialPropertyReference>,
	parsedMaterialProperties: ReadonlyArray<MaterialProperty>,
) {
	verifyAdditionalReferences(ref, parsedMaterialProperties);
}
