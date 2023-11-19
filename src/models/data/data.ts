import { Instance, types } from 'mobx-state-tree';
import { getSourceResources, sourceListModel } from '../base/source';
import { equipmentDataModel, getEquipmentResources } from './equipment';
import { getLanguageResources, languageModel } from './language';
import { getOriginResources, originDataModel } from './origin';
import { getSkillResources, skillListModel } from './skill';

export const dataModel = types.model('data', {
	sources: sourceListModel,
	languages: types.array(languageModel),
	equipment: equipmentDataModel,
	skills: skillListModel,
	origins: originDataModel,
});

export interface Data extends Instance<typeof dataModel> {}

export function getResources() {
	return {
		sources: getSourceResources(),
		languages: getLanguageResources(),
		equipment: getEquipmentResources(),
		skills: getSkillResources(),
		origins: getOriginResources(),
	};
}
