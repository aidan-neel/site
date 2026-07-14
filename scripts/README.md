# Asset scripts

Generate responsive gallery images after adding or changing a PNG master:

```sh
pnpm run optimize:designs
```

The script keeps the masters in `src/lib/assets/designs` untouched and writes
generated WebP files to `static/designs`. It requires
[uv](https://docs.astral.sh/uv/), which installs Pillow in an isolated cache on
the first run.

Refresh the locally hosted Google Font files and generated `@font-face` rules:

```sh
pnpm run sync:fonts
```
