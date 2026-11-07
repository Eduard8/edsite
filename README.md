## Comedy Site MVP

Website:
- `/videos` reads YouTube video entries from a remotely hosted JSON file.
- `/calendar` reads upcoming shows from Sanity.
- `/contact` posts to a hosted form endpoint (Formspree, Netlify Forms endpoint, or similar).

## Requirements

- Node.js 20+
- A hosted videos JSON URL
- A Sanity project with a public dataset
- A hosted form endpoint URL

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formspree.io/f/your-form-id
REMOTE_VIDEOS_JSON_URL=https://example.com/videos.json
COLOR_SCHEME=Boring
```

`NEXT_PUBLIC_SANITY_DATASET` is optional and defaults to `production`.

`COLOR_SCHEME` supports any key in `src/theme/colorSchemes.json` (currently: `Boring`, `Obnoxious`) and sets the default palette before user overrides.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Validate

```bash
npm run lint
npm run build
```

## Notes

- Videos are fetched from a remotely hosted JSON file and revalidated every 5 minutes.
- Video `title` and `description` are optional in JSON; if `title` is missing, the app resolves it from lightweight YouTube metadata, and if `description` is missing, it is left blank.
- Shows are fetched from the published Sanity dataset and revalidated every 5 minutes.
- Past shows are omitted. The public page lists the soonest upcoming shows.
- Add and edit shows at `/studio` after signing in to the Sanity project.
- Contact form includes a hidden honeypot field; enable provider-side spam filtering for best results.

### Remote Videos JSON

Recommended schema:

```json
{
	"videos": [
		{
			"id": "airport-bit",
			"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			"title": "Optional custom title",
			"description": "Optional custom description",
			"thumbnail": "https://example.com/custom-thumbnail.jpg"
		}
	]
}
```

- `url` is required and should be a full YouTube URL.
- `title`, `description`, and `thumbnail` are optional.
- If `thumbnail` is omitted, the site derives a standard YouTube thumbnail from the video URL.
- A public GitHub Gist raw URL works well as the remote JSON host.

### Shows in Sanity

Each show document has:

- `title` (required)
- `start` datetime (required)
- `end` datetime (optional)
- `allDay` boolean (optional)
- `description` (optional)
- `poster` image (optional)
- `venue` (optional)
- `mapsUrl` (optional). If it is omitted and `venue` is set, the site links to a Google Maps search for that venue.
- `ticketUrl` (optional)

Drafts stay off `/calendar` until they are published.

### Studio setup

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage).
2. Copy the project id into `NEXT_PUBLIC_SANITY_PROJECT_ID`. Set `NEXT_PUBLIC_SANITY_DATASET` if you are not using `production`.
3. In the Sanity project API settings, add CORS origins for `http://localhost:3000` and the production site origin, and allow credentials.
4. Open `/studio`, sign in with the Sanity account that owns the project, and publish a show.

The dataset can stay public for reads. The site does not need a read token.

`/calendar` loads shows through `CalendarProvider` in `src/application/ports/calendarProvider.ts`. The Sanity implementation is wired in `src/infrastructure/composition/createCalendarProvider.ts`.

## Themes

- Theme state is managed by `next-themes` with `Light`, `Dark`, and `System` modes.
- The active mode is written to a `data-theme` attribute on `<html>`.
- Existing `dark:*` classes are supported via a custom variant that maps to `data-theme="dark"`.

## Colour Schemes

- Colour scheme values are defined in `src/theme/colorSchemes.json` as hex token maps.
- Each scheme defines 5 colors from darkest to lightest.
- Each scheme can optionally define `fontFamily`; if omitted, the default app sans stack is used.
- Light and dark mode reuse the same 5 colors by flipping order automatically.
- Colour scheme state is persisted in local storage and applied on `<html>`.
- Default scheme comes from `COLOR_SCHEME` in environment config.

## Chaos Entry

- Home (`/`) is a mode-entry page with a large button: `press here to enter obnoxious mode`.
- Entering chaos mode applies the `Obnoxious` color scheme through the existing color-scheme provider (the theme engine remains extensible for future schemes).
- While chaos mode is active, a small `Normal mode` control appears in the top bar to switch back.

### Chaos Audio

- Optional local audio source: `public/audio/chaos-mode.mp3`.
- Audio starts only after user interaction when entering chaos mode, plays once, and stops when returning to normal mode.
- If the file is missing or browser playback is blocked, the UI still works and logs a warning in the console.

## UI Kit Swapping

- App and feature components should import primitives from `src/ui/facade/index.ts` only.
- The active UI kit is selected in `src/ui/composition/createUiFacade.ts`.
- Available adapters: `src/ui/adapters/shadcn` and `src/ui/adapters/mantine`.

Set the active kit with:

```bash
NEXT_PUBLIC_UI_KIT=shadcn
```

or

```bash
NEXT_PUBLIC_UI_KIT=mantine
```

If unset, the default is `shadcn`.

To add or swap kits later:

1. Add a new adapter folder, for example `src/ui/adapters/mantine`.
2. Implement the same exported primitive names as the current adapter.
3. Register the adapter in `src/ui/composition/createUiFacade.ts`.

This keeps application and page code unchanged during a kit migration.
