import { parseEquipment } from './equipment';

export function parseData() {
	const equipment = parseEquipment();
	return {
		equipment,
	};
}
