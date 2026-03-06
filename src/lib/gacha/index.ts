export * from './types';
export * from './constants';
export * from './logic';
export * from './simulator';
export { characters } from './data/characters';
export { defaultGachaConfig } from './data/pickups';

import { GachaSimulator } from './simulator';
import { characters } from './data/characters';
import { defaultGachaConfig } from './data/pickups';

export function createDefaultSimulator(): GachaSimulator {
  return new GachaSimulator(characters, defaultGachaConfig);
}

export { type ConfigItem } from './config';
export { GetConfig } from './config';
export { Gacha, GetRandomNumber } from './logic';
