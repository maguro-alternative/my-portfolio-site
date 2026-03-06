import type { Character, GachaConfig, GachaResult } from './types';
import { RANDOM_PRECISION, RANDOM_RANGE } from './constants';
import { createGachaTable, createRescueTable, drawFromTable } from './logic';

export class GachaSimulator {
  private characters: Character[];
  private config: GachaConfig;

  constructor(characters: Character[], config: GachaConfig) {
    this.characters = characters;
    this.config = config;
  }

  generateRandomValue(): number {
    return Number((Math.random() * RANDOM_RANGE).toFixed(RANDOM_PRECISION));
  }

  draw(rescue = false, randomValue?: number): GachaResult {
    const rval = randomValue ?? this.generateRandomValue();
    const table = rescue
      ? createRescueTable(this.characters, this.config)
      : createGachaTable(this.characters, this.config);

    return drawFromTable(table, rval);
  }

  drawMultiple(count: number, rescueLastDraw = false): GachaResult[] {
    const results: GachaResult[] = [];

    for (let i = 0; i < count; i++) {
      const isLastDraw = i === count - 1;
      const useRescue = rescueLastDraw && isLastDraw;
      results.push(this.draw(useRescue));
    }

    return results;
  }

  draw10x(): GachaResult[] {
    return this.drawMultiple(10, true);
  }
}
