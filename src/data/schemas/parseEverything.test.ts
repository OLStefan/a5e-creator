import classesJson from '../resources/classes.json';
import skillsJson from '../resources/skills.json';
import { parseClasses } from './class';
import { parseEquipment } from './equipment';
import { parseSkills } from './skills';

test('parseClasses', () => {
	const equipment = parseEquipment();
	const skills = parseSkills(skillsJson);

	parseClasses(classesJson, { ...equipment, skills });
});
