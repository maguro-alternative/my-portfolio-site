export interface KaguraCharacter {
  name: string;
  reading: string;
  team: string;
  slug: string;
  imageUrl: string;
}

export const kaguraCharacters: KaguraCharacter[] = [
  // 国立半蔵学院
  { name: '飛鳥', reading: 'あすか', team: '国立半蔵学院', slug: 'asuka', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_asuka.png' },
  { name: '斑鳩', reading: 'いかるが', team: '国立半蔵学院', slug: 'ikaruga', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ikaruga.png' },
  { name: '葛城', reading: 'かつらぎ', team: '国立半蔵学院', slug: 'katsuragi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_katsuragi.png' },
  { name: '柳生', reading: 'やぎゅう', team: '国立半蔵学院', slug: 'yagyu', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_yagyu.png' },
  { name: '雲雀', reading: 'ひばり', team: '国立半蔵学院', slug: 'hibari', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_hibari.png' },
  { name: '菖蒲', reading: 'しょうぶ', team: '国立半蔵学院', slug: 'shobu', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_shobu.png' },

  // 焔紅蓮隊
  { name: '焔', reading: 'ほむら', team: '焔紅蓮隊', slug: 'homura', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_homura.png' },
  { name: '詠', reading: 'よみ', team: '焔紅蓮隊', slug: 'yomi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_yomi.png' },
  { name: '日影', reading: 'ひかげ', team: '焔紅蓮隊', slug: 'hikage', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_hikage.png' },
  { name: '未来', reading: 'みらい', team: '焔紅蓮隊', slug: 'mirai', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_mirai.png' },
  { name: '春花', reading: 'はるか', team: '焔紅蓮隊', slug: 'haruka', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_haruka.png' },

  // 死塾月閃女学館
  { name: '雪泉', reading: 'ゆみ', team: '死塾月閃女学館', slug: 'yumi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_yumi.png' },
  { name: '叢', reading: 'むらくも', team: '死塾月閃女学館', slug: 'murakumo', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_murakumo.png' },
  { name: '夜桜', reading: 'よざくら', team: '死塾月閃女学館', slug: 'yozakura', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_yozakura.png' },
  { name: '四季', reading: 'しき', team: '死塾月閃女学館', slug: 'shiki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_shiki.png' },
  { name: '美野里', reading: 'みのり', team: '死塾月閃女学館', slug: 'minori', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_minori.png' },

  // 死塾月閃女学館中等部
  { name: '閃光', reading: 'せんこう', team: '死塾月閃女学館中等部', slug: 'senkou', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_senkou.png' },
  { name: '月光', reading: 'げっこう', team: '死塾月閃女学館中等部', slug: 'gekkou', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_gekkou.png' },

  // 秘立蛇女子学園
  { name: '雅緋', reading: 'みやび', team: '秘立蛇女子学園', slug: 'miyabi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_miyabi.png' },
  { name: '紫', reading: 'むらさき', team: '秘立蛇女子学園', slug: 'murasaki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_murasaki.png' },
  { name: '忌夢', reading: 'いむ', team: '秘立蛇女子学園', slug: 'imu', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_imu.png' },
  { name: '両備', reading: 'りょうび', team: '秘立蛇女子学園', slug: 'ryobi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ryobi.png' },
  { name: '両奈', reading: 'りょうな', team: '秘立蛇女子学園', slug: 'ryona', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ryona.png' },
  { name: '総司', reading: 'そうじ', team: '秘立蛇女子学園', slug: 'souji', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_souji.png' },
  { name: '芭蕉', reading: 'ばしょう', team: '秘立蛇女子学園', slug: 'basho', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_basho.png' },
  { name: '芦屋', reading: 'あしや', team: '秘立蛇女子学園', slug: 'ashiya', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ashiya.png' },
  { name: '伊吹', reading: 'いぶき', team: '秘立蛇女子学園', slug: 'ibuki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ibuki.png' },

  // 巫神楽
  { name: '蓮華', reading: 'れんか', team: '巫神楽', slug: 'renka', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_renka.png' },
  { name: '華毘', reading: 'はなび', team: '巫神楽', slug: 'hanabi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_hanabi.png' },
  { name: '華風流', reading: 'かふる', team: '巫神楽', slug: 'kafuru', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_kafuru.png' },
  { name: '神楽', reading: 'かぐら', team: '巫神楽', slug: 'kagura', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_kagura.png' },
  { name: '奈楽', reading: 'ならく', team: '巫神楽', slug: 'naraku', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_naraku.png' },

  // 大会運営委員
  { name: 'ジャスミン', reading: 'じゃすみん', team: '大会運営委員', slug: 'jasmine', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_jasmine.png' },
  { name: '大道寺先輩', reading: 'だいどうじせんぱい', team: '大会運営委員', slug: 'daidoji-senpai', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_daidoji.png' },
  { name: '凛', reading: 'りん', team: '大会運営委員', slug: 'rin', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_rin.png' },
  { name: '両姫', reading: 'りょうき', team: '大会運営委員', slug: 'ryoki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ryoki.png' },
  { name: '雪不帰', reading: 'ふぶき', team: '大会運営委員', slug: 'fubuki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_fubuki.png' },

  // 遠野天狗ノ忍衆
  { name: '夕焼', reading: 'ゆうやき', team: '遠野天狗ノ忍衆', slug: 'yuyaki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_yuyaki.png' },
  { name: '牛丸', reading: 'うしまる', team: '遠野天狗ノ忍衆', slug: 'ushimaru', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ushimaru.png' },
  { name: '九魅', reading: 'くみ', team: '遠野天狗ノ忍衆', slug: 'kumi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_kumi.png' },
  { name: '深里', reading: 'みさと', team: '遠野天狗ノ忍衆', slug: 'misato', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_misato.png' },
  { name: '那智', reading: 'なち', team: '遠野天狗ノ忍衆', slug: 'nachi', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_nachi.png' },

  // ゾディアック星導会
  { name: '麗王', reading: 'れお', team: 'ゾディアック星導会', slug: 'reo', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_reo.png' },
  { name: '銀嶺', reading: 'ぎんれい', team: 'ゾディアック星導会', slug: 'ginrei', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ginrei.png' },
  { name: '紅葉', reading: 'くれは', team: 'ゾディアック星導会', slug: 'kureha', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_kureha.png' },
  { name: '玉響', reading: 'たまゆら', team: 'ゾディアック星導会', slug: 'tamayura', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_tamayura.png' },
  { name: '睡蓮', reading: 'すいれん', team: 'ゾディアック星導会', slug: 'suiren', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_suiren.png' },

  // NEWWAVE連合
  { name: '舞', reading: 'まい', team: 'NEWWAVE連合', slug: 'mai', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_mai.png' },
  { name: '椿', reading: 'つばき', team: 'NEWWAVE連合', slug: 'tsubaki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_tsubaki.png' },
  { name: '美苺', reading: 'めいめい', team: 'NEWWAVE連合', slug: 'meimei', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_meimei.png' },
  { name: '蘭丸', reading: 'らんまる', team: 'NEWWAVE連合', slug: 'ranmaru', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ranmaru.png' },
  { name: '風雅', reading: 'ふうが', team: 'NEWWAVE連合', slug: 'fuga', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_fuga.png' },

  // 天城封結衆
  { name: '鴇', reading: 'とき', team: '天城封結衆', slug: 'toki', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_toki.png' },
  { name: '羽衣', reading: 'うい', team: '天城封結衆', slug: 'ui', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_ui.png' },
  { name: '風切', reading: 'かざきり', team: '天城封結衆', slug: 'kazakiri', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_kazakiri.png' },
  { name: '日和', reading: 'ひより', team: '天城封結衆', slug: 'hiyori', imageUrl: 'https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_hiyori.png' },
];
