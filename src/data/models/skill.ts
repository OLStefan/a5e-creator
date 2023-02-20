import skillsJson from '../resources/skills.json';

import { types } from 'mobx-state-tree';
import { sourcedDescriptionModel } from './util';

export const skillModel = types.compose(
	sourcedDescriptionModel,
	types.model({
		specialties: types.array(types.string),
	}),
);

export const skillListModel = types.array(skillModel);

export function getSkillResources() {
	return skillsJson as Array<NonNullable<Parameters<typeof skillModel.create>[0]>>;
}
