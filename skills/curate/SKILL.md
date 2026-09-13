---
name: curate
description: Turn a visual prompt into a substantial, sourced collection of poster and graphic-design references on the local moodboard. Use when invoked as /curate followed by a prompt, or whenever the user asks to find visual inspiration, poster references, print-design references, or moodboard material.
---

# Curate graphic references

Treat the text after `/curate` as a visual research brief. Research the prompt, add a substantial set of verified references to the moodboard, and leave the page ready to browse. The app itself has no AI or curation interface; this skill is the curator.

Example:

```text
/curate old financial report posters with that cool style where they had to look good pre-internet
```

## What belongs

Prioritize designed visual artifacts that can influence Aidan's poster work:

- Posters, annual reports, editorial spreads, record sleeves, exhibition catalogs, broadsides, advertisements, information graphics, typography specimens, packaging, and scanned print ephemera.
- Strong composition, typography, image treatment, color systems, print texture, grids, or information hierarchy.
- Historical references and contemporary studio work are both useful when they answer the prompt.

Do not fill the board with generic photography, isolated objects, AI-generated images, Pinterest reposts, social posts, stock imagery, or references that only match the prompt's subject without offering a useful graphic idea.

## Repository structure

- The tracked collection lives in `src/lib/moodboard.ts`.
- The page lives at `src/routes/moodboard/+page.svelte`.
- References use remote image URLs by default, so curation does not add binary assets to Git.
- Optional downloaded copies belong in `static/moodboard/`, which is intentionally ignored by Git.
- The homepage exposes the moodboard only during local development.

## Workflow

1. Read `src/lib/moodboard.ts` and the user's exact prompt. Search existing prompts and references to avoid duplicate artifacts and source URLs.
2. Convert the request into one concise prompt label and a one-sentence visual brief. Preserve the user's intent and language; do not flatten a specific request into a generic category like "vintage."
3. Research broadly before selecting. Build a candidate pool at least twice the target size, then keep the strongest and most varied results.
4. Add 16-30 references for a normal `/curate` request. Use fewer only when reliable source material is genuinely scarce or the user asks for a small set.
5. Prefer primary sources in this order: creator or studio site, museum or institutional archive, digitized library collection, reputable design archive, then stable editorial coverage.
6. For every candidate, verify both the canonical source page and the direct HTTPS image URL. The image URL must resolve without authentication and return an image content type. Avoid expiring query signatures and pages masquerading as image URLs.
7. Attribute conservatively. Use the artifact's designer or studio when known, followed by the holding archive when useful. Never infer or invent credits.
8. Write a concise `note` that identifies the transferable graphic move: grid, type scale, crop, density, palette, printing method, texture, diagram system, or relationship between elements. Do not merely describe the subject.
9. Add the results as one `MoodboardPrompt` in `src/lib/moodboard.ts`. Use the direct remote URL in `image` and the canonical page in `source`. Update `moodboardUpdated` to the current date.
10. Do not download images unless the user explicitly asks for local copies or a source blocks hotlinking. If downloading is necessary, store files under `static/moodboard/`, keep them ignored, and preserve the canonical source URL.
11. Run `pnpm check` and targeted Prettier checks. Report the prompt label, reference count, major source collections, and any links that could not be made reliable.

## Selection bar

The finished set should have range without becoming random. For a 20-reference prompt, aim for:

- Several unmistakable anchors that define the requested style.
- Multiple eras, studios, or archives when the prompt allows it.
- A mix of dense and sparse compositions, image-led and type-led work, and different production constraints.
- No more than three pieces from one creator, campaign, or source collection unless the user asks for depth on that body of work.
- No near-duplicate pages, alternate crops, or low-resolution thumbnails added just to increase the count.

## Data pattern

```ts
{
	title: 'Artifact title',
	creator: 'Designer or studio / holding archive',
	image: 'https://stable-image-host.example/artifact.jpg',
	source: 'https://canonical-source.example/artifact',
	note: 'The specific visual principle worth borrowing.'
}
```

Source quality and attribution are part of the curation. If a compelling artifact has no reliable renderable image URL, leave it out rather than adding a broken card.
