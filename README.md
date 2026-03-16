## Comedy Site MVP

Website:
- `/videos` reads YouTube video entries from a remotely hosted JSON file.
- `/calendar` reads upcoming shows from Google Calendar.
- `/contact` posts to a hosted form endpoint (Formspree, Netlify Forms endpoint, or similar).

## Requirements

- Node.js 20+
- A hosted videos JSON URL
- A public Google Calendar and API key with Calendar API enabled
- A hosted form endpoint URL

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:

```bash
GOOGLE_CALENDAR_API_KEY=your_api_key
GOOGLE_CALENDAR_ID=your_public_calendar_id
NEXT_PUBLIC_CONTACT_FORM_ACTION=https://formspree.io/f/your-form-id
REMOTE_VIDEOS_JSON_URL=https://example.com/videos.json
COLOR_SCHEME=Boring
```

`GOOGLE_CALENDAR_ID` is usually the calendar email-like ID from Google Calendar settings.

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
- Calendar data is fetched using the Google Calendar Events API and revalidated every 5 minutes.
- Ticket links are derived from `source.url` when present, otherwise from links found in event descriptions.
- Map links are derived from the event location field.
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

## Future Provider Swaps

To switch away from Google Calendar later, add a new provider implementing `CalendarProvider` in `src/application/ports/calendarProvider.ts` and wire it in `src/infrastructure/composition/createCalendarProvider.ts`.

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
