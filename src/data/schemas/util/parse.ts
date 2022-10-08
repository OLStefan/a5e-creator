import { stubTrue } from 'lodash';
import myzod, { AnyType, Infer } from 'myzod';
import { ReadonlyDeep } from 'type-fest';
import { descriptionSchema, SourceBook } from './description';

export const disabledSchema = myzod.pick(descriptionSchema, ['name', 'source']).and(
	myzod.object({
		disabled: myzod.literal(true),
	}),
);

export function parse<Schema extends AnyType>({
	schema,
	data,
	predicate = stubTrue,
	allowedBooks = Object.values(SourceBook),
}: ReadonlyDeep<{
	schema: Schema;
	data: Array<unknown>;
	predicate?: (parsedStuff: Array<Infer<Schema>>) => boolean;
	allowedBooks?: Array<SourceBook>;
}>) {
	return myzod
		.array(schema.or(disabledSchema))
		.map((elements) => elements.filter((e) => allowedBooks.includes(e.source.book)))
		.map((elements) => {
			const disabledEntries = elements.filter((g) => g.disabled).map(({ name }) => name);
			return elements.filter((g): g is Infer<Schema> => !disabledEntries.includes(g.name));
		})
		.withPredicate(predicate)
		.parse(data);
}
