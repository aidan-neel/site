---
name: add-design-song
description: Add new poster/design PNG masters to this Svelte gallery with generated responsive WebPs, gallery metadata, verified Spotify links, expected local MP3 references, and fade-in/fade-out audio behavior. Use when the user supplies new design names, source images, songs, or asks to update the visual archive.
---

# Add design and song entries

Use this workflow for new visual archive entries in this repository.

## Workflow

1. Inspect the repository before editing:
   - Design masters live in `src/lib/assets/designs/*.png`.
   - Gallery records live in `src/routes/+page.svelte` in the `designs` array.
   - Responsive outputs and their source dimensions are tracked in `static/designs/manifest.json`.
   - Local audio files live in `static/audio/` and are referenced as `/audio/<filename>.mp3`.
2. Confirm each requested PNG master exists. Resolve obvious filename typos from the supplied filename, but preserve the actual on-disk stem in the record's `image` field.
3. Add one `Design` record per master. Use an empty string for a requested blank description, the current date for new entries, and a human-readable title. Add `songTitle`, `artist`, `songUrl`, and `audioFile` when a song is supplied. The MP3 may be arriving separately; reference the expected path without fabricating the file.
4. Search for the exact song and artist on Spotify. Prefer a canonical `https://open.spotify.com/track/<id>` URL. If Spotify does not expose a reliable canonical result, use an exact Spotify search URL and make that limitation explicit in the handoff; never guess a track ID.
5. Generate all responsive outputs with the project command:

   ```sh
   pnpm optimize:designs
   ```

   This produces `-480.webp`, `-960.webp`, and `-full.webp` outputs and refreshes the manifest. Do not hand-edit generated WebPs or the manifest.

6. Keep the gallery audio lifecycle intact:
   - Audio fades in after the configured startup delay.
   - Closing the lightbox must invalidate playback and fade the current, playing audio to zero before disposal.
   - Opening another design, page exit, visibility changes, and focus changes must not allow stale fade timers or stale audio to affect the new design.
   - Use a cancellable fade and a playback identity/token when changing this logic.
7. Remove an entry entirely when the user asks to remove a design; do not remove its source asset or generated outputs unless explicitly requested.
8. Validate with:

   ```sh
   pnpm check
   pnpm exec prettier --check src/routes/+page.svelte static/designs/manifest.json
   ```

   Also verify all three generated WebPs exist for every new stem and inspect `git status` for unexpected deletions.

## Entry pattern

```ts
{
  title: 'Human-readable title',
  description: '',
  date: 'M/D/YYYY',
  image: 'source-stem',
  songTitle: 'Exact song title',
  artist: 'Exact artist name',
  songUrl: 'https://open.spotify.com/track/…',
  audioFile: '/audio/source-stem.mp3'
}
```

Keep entries ordered newest first, matching the surrounding gallery. Do not add local MP3 files unless the user provides them or explicitly asks for audio acquisition.
