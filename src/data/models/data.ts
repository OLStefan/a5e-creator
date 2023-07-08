import { Instance, types } from 'mobx-state-tree';
import { equipmentModel } from './equipment';
import { getLanguageResources, languageModel } from './language';
import { getOriginResources, originModel } from './origin';
import { getSkillResources, skillListModel } from './skill';
import { getSourceResources, sourceListModel } from './source';

export const dataModel = types.model('Data', {
	sources: sourceListModel,
	languages: types.array(languageModel),
	equipment: equipmentModel,
	skills: skillListModel,
	origins: originModel,
});

export interface Data extends Instance<typeof dataModel> {}

export function getResources() {
	return {
		sources: getSourceResources(),
		languages: getLanguageResources(),
		// equipment: getEquipmentResources(),
		skills: getSkillResources(),
		origins: getOriginResources(),
	};
}
