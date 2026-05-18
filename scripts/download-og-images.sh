#!/bin/bash
# OG画像に使うキャラクター画像をダウンロードするスクリプト
# 使い方: bash scripts/download-og-images.sh

set -e

DOLPHIN_DIR="public/og-images/dolphin"
KAGURA_DIR="public/og-images/kagura"

mkdir -p "$DOLPHIN_DIR" "$KAGURA_DIR"

echo "=== Dolphin Wave キャラクター画像ダウンロード ==="

DOLPHIN_SLUGS=(
  iruka-sakimiya michiru-tojo anri-harunami utae-ayato kohari-sakimiya
  hayate-souma ellen-kazami hiori-nayuki schnee-weissberg mei-nagato
  minami-kurose kiri-izumi otsuki-hagane yuri-kurenashi
  shion-suminoe helly-lewis veena selena-lewis
  yume-yamaba kana-urami
  mashio-murahaya tomo-kukuri
  eines nacht sarah-anthony amadea-wolfa
  tsugumi-kamie haru-hanihara yuno muru-kurokuchi
)

for slug in "${DOLPHIN_SLUGS[@]}"; do
  if [ -f "$DOLPHIN_DIR/${slug}.png" ]; then
    echo "  SKIP $slug (already exists)"
    continue
  fi
  echo "  Downloading $slug..."
  curl -sL -o "$DOLPHIN_DIR/${slug}.png" \
    "https://hpgames.jp/dolphin-wave/assets/img/chara/${slug}/ogp.png" \
    && echo "    OK" || echo "    FAILED"
done

echo ""
echo "=== 閃乱カグラ キャラクター画像ダウンロード ==="

# hpgames.jp のキャラクター
KAGURA_HP_SLUGS=(
  asuka ikaruga katsuragi yagyu hibari ayame
  homura yomi hikage mirai haruka
  yumi murakumo yozakura minori
  renka hanabi kafuru kagura nalaku
  jasmine daidoji rin ryoki
  yuyaki ushimaru kumi misato nachi
  reo ginrei kureha tamayura suiren
  mai tsubaki meimei ranmaru fuga
  toki ui kazakiri hiyori amane
  miyabi murasaki imu ryobi ryona souji bashou ashiya ibuki
)

# hpgames.jp の特殊ファイル名マッピング
declare -A KAGURA_HP_SPECIAL
KAGURA_HP_SPECIAL[shiki]="chara_btn_siki"
KAGURA_HP_SPECIAL[senkou]="chara_btn_add_s"
KAGURA_HP_SPECIAL[gekkou]="chara_btn_add_g"
KAGURA_HP_SPECIAL[fubuki]="chara_btn_add_f"
KAGURA_HP_SPECIAL[daidoji-senpai]="chara_btn_daidoji"

for slug in "${KAGURA_HP_SLUGS[@]}"; do
  if [ -f "$KAGURA_DIR/${slug}.png" ]; then
    echo "  SKIP $slug (already exists)"
    continue
  fi
  echo "  Downloading $slug..."
  curl -sL -o "$KAGURA_DIR/${slug}.png" \
    "https://hpgames.jp/shinomas/share/images/chara_icon/chara_btn_${slug}.png" \
    && echo "    OK" || echo "    FAILED"
done

# 特殊ファイル名のキャラクター
for slug in "${!KAGURA_HP_SPECIAL[@]}"; do
  filename="${KAGURA_HP_SPECIAL[$slug]}"
  if [ -f "$KAGURA_DIR/${slug}.png" ]; then
    echo "  SKIP $slug (already exists)"
    continue
  fi
  echo "  Downloading $slug (special: $filename)..."
  curl -sL -o "$KAGURA_DIR/${slug}.png" \
    "https://hpgames.jp/shinomas/share/images/chara_icon/${filename}.png" \
    && echo "    OK" || echo "    FAILED"
done

# marv.jp のキャラクター (jpg)
KAGURA_MARV_SLUGS=(
  kurohoro syuri aimu hisui fuuma hijikata seimei muramasa
  chitose chiyo kanon aria kaede yugiri josui kagari tamaki
  karasu ukyou sakyou tachibana kosuzu kasumi motochika kuroud
  tsubame ageha yoshimitsu matsuri kochou chihaya kanzaki kisaragi
)

# marv.jp の特殊ファイル名マッピング
declare -A KAGURA_MARV_SPECIAL
KAGURA_MARV_SPECIAL[fuuma]="p_fuuma"

for slug in "${KAGURA_MARV_SLUGS[@]}"; do
  if [ -f "$KAGURA_DIR/${slug}.png" ]; then
    echo "  SKIP $slug (already exists)"
    continue
  fi
  echo "  Downloading $slug (marv.jp)..."
  curl -sL -o "$KAGURA_DIR/${slug}.jpg" \
    "https://www.marv.jp/product/kagura_nw/character/images/p_${slug}.jpg" \
    && echo "    OK" || echo "    FAILED"
done

# seesaawiki.jp のキャラクター (jpg) - ファイル名が特殊
declare -A KAGURA_SEESAA
KAGURA_SEESAA[hyouki]="f6caa85e03e5ac72"
KAGURA_SEESAA[miki]="afe34ed65f2e5940"
KAGURA_SEESAA[reki]="ac74582c5406486c"
KAGURA_SEESAA[aki]="a45e3385d207088e"
KAGURA_SEESAA[yuki]="a6d38c753ac2eda7"

for slug in "${!KAGURA_SEESAA[@]}"; do
  hash="${KAGURA_SEESAA[$slug]}"
  if [ -f "$KAGURA_DIR/${slug}.jpg" ]; then
    echo "  SKIP $slug (already exists)"
    continue
  fi
  # seesaawiki uses image01 or image02 - try both
  echo "  Downloading $slug (seesaawiki)..."
  curl -sL -o "$KAGURA_DIR/${slug}.jpg" \
    "https://image01.seesaawiki.jp/k/w/kagranw/${hash}.jpg" \
    || curl -sL -o "$KAGURA_DIR/${slug}.jpg" \
    "https://image02.seesaawiki.jp/k/w/kagranw/${hash}.jpg" \
    && echo "    OK" || echo "    FAILED"
done

echo ""
echo "=== ダウンロード完了 ==="
echo "Dolphin: $(ls -1 "$DOLPHIN_DIR" 2>/dev/null | wc -l) files"
echo "Kagura:  $(ls -1 "$KAGURA_DIR" 2>/dev/null | wc -l) files"
