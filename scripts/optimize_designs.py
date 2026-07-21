#!/usr/bin/env python3
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "Pillow>=11.0.0,<13",
# ]
# ///

"""Generate responsive WebP assets from the design PNG masters.

Run with:
    uv run scripts/optimize_designs.py

The source files are never modified. Outputs are regenerated only when their
source is newer, unless --force is passed.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "src/lib/assets/designs"
OUTPUT_DIR = ROOT / "static/designs"
CARD_WIDTHS = (480, 960)
FULL_MAX_WIDTH = 2400
CARD_QUALITY = 82
FULL_QUALITY = 92
CONFIG = {
	"cardWidths": CARD_WIDTHS,
	"fullMaxWidth": FULL_MAX_WIDTH,
	"cardQuality": CARD_QUALITY,
	"fullQuality": FULL_QUALITY,
}


def should_generate(source: Path, output: Path, force: bool) -> bool:
	return force or not output.exists() or output.stat().st_mtime < source.stat().st_mtime


def resized(image: Image.Image, max_width: int) -> Image.Image:
	if image.width <= max_width:
		return image.copy()

	height = round(image.height * max_width / image.width)
	return image.resize((max_width, height), Image.Resampling.LANCZOS)


def save_webp(image: Image.Image, output: Path, quality: int) -> None:
	# RGB/RGBA avoids palette and color-mode surprises while retaining transparency.
	mode = "RGBA" if "A" in image.getbands() else "RGB"
	clean = image.convert(mode)
	temporary = output.with_suffix(".tmp.webp")
	# Method 4 keeps the full gallery run comfortably fast while retaining most
	# of WebP's compression benefit. The source PNGs are often very large.
	clean.save(temporary, "WEBP", quality=quality, method=6, optimize=True)
	temporary.replace(output)


def optimize(source: Path, force: bool) -> dict[str, object]:
	outputs: dict[str, str] = {}
	with Image.open(source) as opened:
		image = ImageOps.exif_transpose(opened)
		original_size = [image.width, image.height]

		for width in CARD_WIDTHS:
			output = OUTPUT_DIR / f"{source.stem}-{width}.webp"
			if should_generate(source, output, force):
				save_webp(resized(image, width), output, CARD_QUALITY)
			outputs[str(width)] = f"/designs/{output.name}"

		full_output = OUTPUT_DIR / f"{source.stem}-full.webp"
		if should_generate(source, full_output, force):
			save_webp(resized(image, FULL_MAX_WIDTH), full_output, FULL_QUALITY)
		outputs["full"] = f"/designs/{full_output.name}"

	return {
		"source": source.name,
		"sourceSize": original_size,
		"outputs": outputs,
	}


def main() -> None:
	parser = argparse.ArgumentParser(description=__doc__)
	parser.add_argument("--force", action="store_true", help="regenerate every output")
	args = parser.parse_args()

	OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
	sources = sorted(SOURCE_DIR.glob("*.png"))
	if not sources:
		raise SystemExit(f"No PNG files found in {SOURCE_DIR}")

	manifest_path = OUTPUT_DIR / "manifest.json"
	try:
		previous_manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
	except (FileNotFoundError, json.JSONDecodeError):
		previous_manifest = {}
	force = args.force or previous_manifest.get("config") != CONFIG

	designs = {source.stem: optimize(source, force) for source in sources}
	manifest = {"config": CONFIG, "designs": designs}
	manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")

	suffixes = (*map(str, CARD_WIDTHS), "full")
	expected = {f"{source.stem}-{suffix}.webp" for source in sources for suffix in suffixes}
	for output in OUTPUT_DIR.glob("*.webp"):
		if output.name not in expected:
			output.unlink()

	original_bytes = sum(source.stat().st_size for source in sources)
	generated = list(OUTPUT_DIR.glob("*.webp"))
	generated_bytes = sum(output.stat().st_size for output in generated)
	print(
		f"Generated {len(generated)} images from {len(sources)} masters: "
		f"{original_bytes / 1024 / 1024:.1f} MiB -> {generated_bytes / 1024 / 1024:.1f} MiB"
	)


if __name__ == "__main__":
	main()
