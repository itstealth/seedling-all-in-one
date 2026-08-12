"""Derive clean artwork from the composited source images.

Two problems are baked into pixels, so no CSS can reach them:

  * public/people/*.png carry a ring + ribbon (alumni) or a ring + leaf sprig
    (leadership) drawn around the photograph.
  * public/campus/sia-collage.webp is a 2x2 grid of four photos, which reads
    as mush once scaled down to a card.

This lifts the inner circular photograph out of each badge, and lifts a single
frame out of the collage. Originals are left untouched; results are written
alongside them.

Run: python3 scripts/crop-portraits.py
"""

from PIL import Image, ImageDraw
from pathlib import Path

PUBLIC = Path(__file__).resolve().parent.parent / "public"
PEOPLE = PUBLIC / "people"

# (file, left, top, right, bottom) of the inner photo circle, measured off the
# badge artwork. Alumni badges share one geometry; leadership badges another.
CROPS = [
    ("harshil.png", 30, 31, 208, 209),
    ("abhishek.png", 30, 31, 208, 209),
    ("shashank.png", 30, 31, 208, 209),
    ("preeti.png", 118, 33, 376, 291),
    ("sandeep.png", 118, 34, 376, 292),
]

# Supersample the mask so the circular edge is smooth rather than stair-stepped.
SS = 4


def circular(img: Image.Image) -> Image.Image:
    size = img.size
    mask = Image.new("L", (size[0] * SS, size[1] * SS), 0)
    ImageDraw.Draw(mask).ellipse((0, 0, size[0] * SS, size[1] * SS), fill=255)
    mask = mask.resize(size, Image.LANCZOS)

    out = img.convert("RGBA")
    out.putalpha(mask)
    return out


def main() -> None:
    for name, *box in CROPS:
        src = PEOPLE / name
        img = Image.open(src).convert("RGBA").crop(tuple(box))
        dest = PEOPLE / f"{src.stem}-portrait.png"
        circular(img).save(dest)
        print(f"{name} {img.size} -> {dest.name}")

    # Top-left frame of the collage: students in a corridor, which matches the
    # single-subject framing of the other two school cards.
    collage = Image.open(PUBLIC / "campus" / "sia-collage.webp").convert("RGB")
    w, h = collage.size
    frame = collage.crop((0, 0, w // 2, h // 2))
    dest = PUBLIC / "campus" / "sia-card.jpg"
    frame.save(dest, quality=88)
    print(f"sia-collage.webp {frame.size} -> {dest.name}")


if __name__ == "__main__":
    main()
