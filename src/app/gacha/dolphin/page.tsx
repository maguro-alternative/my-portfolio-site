'use client';

import { useState } from 'react';
import { Gacha, GetRandomNumber } from '@/lib/gacha/logic';
import { GetConfig } from "@/lib/gacha/config";

export default function DolphinGacha() {
  const [results, setResults] = useState<{ rarity: string; name: string; iconType: number; }[]>([]);
  const [count, setCount] = useState(0);
  const config = GetConfig();
  const handleGacha = (count:number) => {
    setCount(prevCount => prevCount + count);
    const newResults: {
      rarity: string;
      name: string;
      iconType: number;
    }[] = [];
    for (let i = 0; i < count; i++) {
      const rescue = i === 9;
      const result = Gacha(config, rescue, GetRandomNumber());
      newResults.push(result);
    }
    setResults(newResults);
  };

  return (
    <div className='m-auto my-0'>
      <div className='tab_wrap'>
        <ul className='tab'>
          <li className='tab_item'>
          </li>
        </ul>
      </div>
      <div className='cacha_contents_wrapper'>
        <div className='rare_box'>
          <h3>
            <p className='kind'>10連ガチャ</p>
          </h3>
        </div>
        <p>ガチャを引いた回数: {count}</p>
        <button onClick={() => handleGacha(1)}>1回ガチャを引く</button>
        <button onClick={() => handleGacha(10)}>10連ガチャを引く</button>
        <h2>ガチャ結果</h2>
        <ul>
          {results.map((result: { rarity: string; name: string; iconType: number; }, i: number) => (
            <li key={i} className=''>
              <div className='icon-wrapper'>
                {result.rarity === 'ピックアップUR' ? <img src='./dolphin/gacha_rare_ur_pickup.png' /> : result.rarity === 'UR' ? <img src='./dolphin/gacha_rare_ur.png' /> : result.rarity === 'UR' ? <img src='./dolphin/gacha_rare_ur.png' /> : result.rarity === 'SSR' ? <img src='./dolphin/gacha_rare_ssr.png' /> : result.rarity === 'SR' ? <img src='./dolphin/gacha_rare_sr.png' /> : null}
              </div>
              <div className='icon-wrapper'>
                {result.iconType === 1 ? <img src='./dolphin/icon_wave.png'/> : result.iconType === 2 ? <img src='./dolphin/icon_sun.png'/> : result.iconType === 3 ? <img src='./dolphin/icon_gear.png'/> : result.iconType === 4 ? <img src='./dolphin/icon_moon.png'/> : result.iconType === 5 ? <img src='./dolphin/icon_wind.png'/> : null}
              </div>
              <div>
                {result.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
