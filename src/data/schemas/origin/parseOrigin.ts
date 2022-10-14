import backgroundsJson from '../../resources/origin/backgrounds.json';
import culturesJson from '../../resources/origin/cultures.json';
import heritagesJson from '../../resources/origin/heritages.json';
import { Background, parseBackgrounds } from './backgrounds';
import { Culture, parseCultures } from './cultures';
import { Heritage, parseHeritages } from './heritages';

export interface Origin {
	heritages: Array<Heritage>;
	cultures: Array<Culture>;
	backgrounds: Array<Background>;
}

export function parseOrigin(): Origin {
	const cultures = parseCultures(culturesJson);
	const heritages = parseHeritages(heritagesJson, cultures);
	const backgrounds = parseBackgrounds(backgroundsJson);

	return { heritages, cultures, backgrounds };
}
