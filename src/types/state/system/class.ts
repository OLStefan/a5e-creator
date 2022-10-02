import { ArmorCategory, WeaponProficiency } from "./equipment";
import { Attributes, DieSize } from "./general";

export interface Class {
  name: string;
  description: string;
  startingGold: string;
  hitDie: DieSize;
  proficiencies: {
    savingThrows: Array<Attributes>;
    armor: Array<ArmorCategory>;
    weapons: {
      categories?: Array<WeaponProficiency>;
      individualWeapons?: Array<string>;
    };
    tools: [];
  };
}
