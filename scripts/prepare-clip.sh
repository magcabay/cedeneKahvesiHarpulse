#!/usr/bin/env bash
# Yapay zekâ aracından gelen klibi scroll ile oynatmaya hazırlar:
#  - her kare anahtar kare (geri sarma takılmaz), ses silinir, web için hızlı başlatma
#  - alt kenardaki filigran bandı kırpılır (CROP_BOTTOM piksel, varsayılan 56)
#  - ilk kareden poster görseli üretir
# Kullanım: scripts/prepare-clip.sh <kaynak.mp4> <numara>   örn: scripts/prepare-clip.sh ~/Desktop/kling.mp4 01
set -euo pipefail

src="$1"
num="$2"
crop_bottom="${CROP_BOTTOM:-56}"
out_dir="$(dirname "$0")/../public/assets"
mkdir -p "$out_dir"

vf="crop=iw:ih-${crop_bottom}:0:0,scale=1280:-2:flags=lanczos"

ffmpeg -v error -y -i "$src" -an -vf "$vf" \
  -c:v libx264 -preset slow -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart \
  "$out_dir/$num.mp4"

ffmpeg -v error -y -i "$out_dir/$num.mp4" -frames:v 1 -q:v 3 "$out_dir/$num-poster.jpg"

ls -lh "$out_dir/$num.mp4" "$out_dir/$num-poster.jpg"
