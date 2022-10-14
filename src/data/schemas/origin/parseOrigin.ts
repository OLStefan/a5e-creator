import { ReadonlyDeep } from 'type-fest';
import backgroundsJson from '../../resources/origin/backgrounds.json';
import culturesJson from '../../resources/origin/cultures.json';
import destiniesJson from '../../resources/origin/destinies.json';
import heritagesJson from '../../resources/origin/heritages.json';
import { Equipment } from '../equipment';
import { Skill } from '../skills';
import { Background, parseBackgrounds } from './backgrounds';
import { Culture, parseCultures } from './cultures';
import { Destiny, parseDestinies } from './destiny';
import { Heritage, parseHeritages } from './heritages';

export interface Origin {
	heritages: Array<Heritage>;
	cultures: Array<Culture>;
	backgrounds: Array<Background>;
	destinies: Array<Destiny>;
}

export function parseOrigin(parsedData: ReadonlyDeep<Equipment & { skills: Array<Skill> }>): Origin {
	const cultures = parseCultures(culturesJson);
	const heritages = parseHeritages(heritagesJson, cultures);
	const backgrounds = parseBackgrounds(backgroundsJson, parsedData);
	const destinies = parseDestinies(destiniesJson);

	return { heritages, cultures, backgrounds, destinies };
}
