import classesJson from '../resources/classes.json';
import skillsJson from '../resources/skills.json';
import { parseClasses } from './class';
import { parseEquipment } from './equipment';
import { parseOrigin } from './origin';
import { parseSkills } from './skills';

export function parseData() {
	const equipment = parseEquipment();
	const skills = parseSkills(skillsJson);
	const origin = parseOrigin({ ...equipment, skills });
	const classes = parseClasses(classesJson, { ...equipment, skills });

	return {
		origin,
		equipment,
		skills,
		classes,
	};
}
