import { IAnyComplexType, isValidReference } from 'mobx-state-tree';
import { dataModel, getResources } from './data';
import { AdventuringGearType, Equipment } from './equipment';
import { OriginData } from './origin';
import { ReferenceProficiencyChoice, SourcedDescription } from './util';

test('parseData', () => {
	const data = dataModel.create(getResources());

	validateEquipment(data.equipment);
	validateOrigins(data.origins);
});

function validateEquipment(equipment: Equipment) {
	Object.values(equipment)
		.flatMap((list) => list)
		.forEach((item: SourcedDescription) => {
			expect(isValidReference(() => item.source.book)).toBe(true);
		});

	equipment.adventuringGear.forEach((advGear) => {
		switch (advGear.gearType) {
			case AdventuringGearType.SpellcastingFocus:
			case AdventuringGearType.Container:
			case AdventuringGearType.Miscellaneous:
				if (!!advGear.defaultMaterial) {
					validateRef(advGear.defaultMaterial);
				}
		}
	});

	equipment.armors.forEach((armor) => {
		validateRef(armor.defaultMaterial);
	});

	equipment.equipmentPacks.forEach((pack) => {
		pack.content.forEach(validateRef);
	});

	equipment.materials.forEach((material) => {
		material.properties.forEach((prop) => {
			validateRef(prop.ref);
		});
	});

	equipment.vehicles.forEach((vehicle) => {
		validateRef(vehicle.defaultMaterial);

		vehicle.properties.forEach(validateRef);
	});

	equipment.weapons.forEach((weapon) => {
		validateRef(weapon.defaultMaterial);

		weapon.properties.forEach(validateRef);
	});
}

function validateOrigins(origin: OriginData) {
	Object.values(origin)
		.flatMap((list) => list)
		.forEach((item: SourcedDescription) => {
			expect(isValidReference(() => item.source.book)).toBe(true);
		});

	origin.backgrounds.forEach((background) => {
		if (background.proficencies.tools) {
			validateReferenceProficiencyChoice(background.proficencies.tools);
		}
		if (background.proficencies.skills) {
			validateReferenceProficiencyChoice(background.proficencies.skills);
		}
	});

	origin.heritages.forEach((heritage) => {
		heritage.suggestedCultures.forEach(validateRef);
	});
}

function validateReferenceProficiencyChoice<Model extends IAnyComplexType>(
	profChoice: ReferenceProficiencyChoice<Model>,
) {
	profChoice.allOf.forEach(validateRef);
	const choices = profChoice.choice?.options;
	if (!!choices && choices !== 'all') {
		choices.forEach((item) => {
			expect(isValidReference(() => item)).toBe(true);
		});
	}
}

function validateRef(item: unknown) {
	expect(isValidReference(() => item)).toBe(true);
}
