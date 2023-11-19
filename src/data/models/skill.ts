import skillsJson from '../resources/skills.json';

import { Instance, SnapshotIn, types } from 'mobx-state-tree';
import { sourcedDescriptionModel } from './util';

export const skillModel = types.compose(
	'skill',
	sourcedDescriptionModel,
	types.model({
		specialties: types.array(types.string),
	}),
);

export interface SkillSnapshot extends SnapshotIn<typeof skillModel> {}
export interface Skill extends Instance<typeof skillModel> {}

export const skillListModel = types.array(skillModel);

export function getSkillResources() {
	return skillsJson satisfies Array<SkillSnapshot>;
}
