"""
Generates public/og-image.png (1200x630) and public/twitter-image.png (1200x600).

Kept in the repo so the social card can be regenerated or restyled without
touching application code. Run from the project root:

    python scripts/generate-og-image.py
"""
import os
import textwrap
from PIL import Image, ImageDraw, ImageFont

OUT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")

FONT_CANDIDATES = [
    "C:/Windows/Fonts/segoeuib.ttf",   # Segoe UI Bold
    "C:/Windows/Fonts/arialbd.ttf",    # Arial Bold
    "C:/Windows/Fonts/calibrib.ttf",
]
FONT_REGULAR = [
    "C:/Windows/Fonts/segoeui.ttf",
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/calibri.ttf",
]

NAVY = (15, 23, 42)
BLUE = (37, 99, 235)
INDIGO = (79, 70, 229)
WHITE = (255, 255, 255)
MUTED = (203, 213, 225)
DIM = (148, 163, 184)
LIGHT_BLUE = (147, 197, 253)

CHIPS = ["Fee Collection", "Attendance", "Exams & Results", "Payroll", "Library", "Transport"]
HEADLINE = "Run your entire school from a single dashboard"
SUBHEAD = (
    "VEDIK School ERP brings attendance, exams, fees, payroll, library, transport "
    "and hostel management together. Built for Indian schools."
)
FOOTER_LEFT = "18 modules  ·  3 role views  ·  No signup required"
FOOTER_RIGHT = "School ERP for India"


def font(paths, size):
    for p in paths:
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def diagonal_gradient(size, c1, c2, c3):
    """Three-stop diagonal gradient, drawn per-row then sheared by x offset."""
    w, h = size
    img = Image.new("RGB", size, c1)
    d = ImageDraw.Draw(img)
    for y in range(h):
        t = y / max(1, h - 1)
        if t < 0.5:
            u = t / 0.5
            col = tuple(int(c1[i] + (c2[i] - c1[i]) * u) for i in range(3))
        else:
            u = (t - 0.5) / 0.5
            col = tuple(int(c2[i] + (c3[i] - c2[i]) * u) for i in range(3))
        d.line([(0, y), (w, y)], fill=col)
    return img


def wrap(draw, text, fnt, max_w):
    words = text.split()
    lines, cur = [], ""
    for word in words:
        trial = (cur + " " + word).strip()
        if draw.textlength(trial, font=fnt) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def rounded_gradient_chip(size, radius, c1, c2):
    w, h = size
    tile = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(tile)
    for x in range(w):
        t = x / max(1, w - 1)
        d.line(
            [(x, 0), (x, h)],
            fill=tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3)) + (255,),
        )
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, w - 1, h - 1], radius=radius, fill=255)
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.paste(tile, (0, 0), mask)
    return out


def build(width=1200, height=630):
    base = diagonal_gradient((width, height), NAVY, (30, 58, 138), (55, 48, 163)).convert("RGBA")

    # Translucent shapes and the text sitting on them must be composited, not
    # drawn straight onto the RGB base: ImageDraw would overwrite the pixels and
    # turn every 20%-white chip into a flat grey block.
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)

    f_brand = font(FONT_CANDIDATES, 40)
    f_sub = font(FONT_REGULAR, 19)
    f_h1 = font(FONT_CANDIDATES, 52)
    f_body = font(FONT_REGULAR, 25)
    f_chip = font(FONT_REGULAR, 20)
    f_foot = font(FONT_REGULAR, 21)
    f_foot_b = font(FONT_CANDIDATES, 21)
    f_mark = font(FONT_CANDIDATES, 46)

    pad = 68
    y = pad

    # --- Brand row -------------------------------------------------------
    mark = rounded_gradient_chip((74, 74), 20, BLUE, INDIGO)
    overlay.paste(mark, (pad, y), mark)
    d = ImageDraw.Draw(overlay)
    d.text((pad, y + 14), "V", font=f_mark, fill=WHITE + (255,))

    d.text((pad + 94, y + 2), "VEDIK", font=f_brand, fill=WHITE + (255,))
    d.text((pad + 96, y + 48), "S C H O O L   S U I T E", font=f_sub, fill=LIGHT_BLUE + (255,))

    # Pill, right aligned
    pill_text = "Live interactive demo"
    tw = d.textlength(pill_text, font=f_sub)
    pw, ph = int(tw) + 44, 44
    px, py = width - pad - pw, y + 15
    d.rounded_rectangle([px, py, px + pw, py + ph], radius=22,
                        fill=(255, 255, 255, 38), outline=(255, 255, 255, 80), width=1)
    d.text((px + 22, py + 11), pill_text, font=f_sub, fill=(219, 234, 254, 255))

    # --- Chips -----------------------------------------------------------
    chip_h = 42
    cx = pad
    cy = height - pad - 96
    for chip in CHIPS:
        cw = int(d.textlength(chip, font=f_chip)) + 40
        if cx + cw > width - pad:
            break
        d.rounded_rectangle([cx, cy, cx + cw, cy + chip_h], radius=10,
                            fill=(255, 255, 255, 34), outline=(255, 255, 255, 46), width=1)
        d.text((cx + 20, cy + 10), chip, font=f_chip, fill=(226, 232, 240, 255))
        cx += cw + 12

    img = Image.alpha_composite(base, overlay)
    d = ImageDraw.Draw(img)

    # --- Headline --------------------------------------------------------
    y = pad + 74 + 46
    for line in wrap(d, HEADLINE, f_h1, width - pad * 2):
        d.text((pad, y), line, font=f_h1, fill=WHITE + (255,))
        y += 60

    y += 10
    for line in wrap(d, SUBHEAD, f_body, width - pad * 2 - 40):
        d.text((pad, y), line, font=f_body, fill=MUTED + (255,))
        y += 34

    # --- Footer ----------------------------------------------------------
    fy = height - pad - 6
    d.line([(pad, fy - 26), (width - pad, fy - 26)], fill=(255, 255, 255, 56), width=1)
    d.text((pad, fy), FOOTER_LEFT, font=f_foot, fill=DIM + (255,))
    right = FOOTER_RIGHT
    rw = d.textlength(right, font=f_foot_b)
    d.text((width - pad - rw, fy), right, font=f_foot_b, fill=(96, 165, 250, 255))

    return img.convert("RGB")


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    og = build(1200, 630)
    og_path = os.path.join(OUT_DIR, "og-image.png")
    og.save(og_path, "PNG", optimize=True)
    print("og-image.png     %6d bytes" % os.path.getsize(og_path))

    tw = build(1200, 600)
    tw_path = os.path.join(OUT_DIR, "twitter-image.png")
    tw.save(tw_path, "PNG", optimize=True)
    print("twitter-image.png %5d bytes" % os.path.getsize(tw_path))


if __name__ == "__main__":
    main()
