import languageJson from '@/resources/language.json';

import { types } from 'mobx-state-tree';

export const languageModel = types.enumeration('language', languageJson);

export function getLanguageResources() {
	return languageJson satisfies Array<NonNullable<Parameters<typeof languageModel.create>[0]>>;
}
