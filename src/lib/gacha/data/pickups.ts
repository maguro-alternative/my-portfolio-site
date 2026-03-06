import { GachaConfig, Rarity } from '../types';

export const defaultGachaConfig: GachaConfig = {
  weights: [
    { rarity: Rarity.PICKUP_UR_DOLPHIN, probability: 0.01 },
    { rarity: Rarity.UR_DOLPHIN, probability: 0.01 },
    { rarity: Rarity.SSR_DOLPHIN, probability: 0.05 },
    { rarity: Rarity.SR_DOLPHIN, probability: 0.4 },
    { rarity: Rarity.PICKUP_UR_MEMORY, probability: 0.01 },
    { rarity: Rarity.UR_MEMORY, probability: 0.02 },
    { rarity: Rarity.SSR_MEMORY, probability: 0.1 },
    { rarity: Rarity.SR_MEMORY, probability: 0.4 },
  ],
  pickups: [
    { name: '咲宮　入華(メイド水着/ドルフィンフェス)', weight: 0.5 },
    { name: '咲宮　小針(メイド水着/ドルフィンフェス)', weight: 0.5 },
    { name: 'メイド姉妹のお給仕タイム！(ドルフィンフェス)', weight: 1 },
  ],
};
