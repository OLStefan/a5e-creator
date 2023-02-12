import { dataModel, getResources } from './data';

test('parseData', () => {
	dataModel.create(getResources());
});
