# NAT Entertainment

A React + Vite business website with a cinematic homepage, movie/TV discovery, official trailers, a local watchlist, subscription comparison, and an IPTV reseller program. The former About and Services pages were removed; their old URLs redirect to the homepage.

## Run locally

```powershell
npm ci
Copy-Item .env.example .env.local
```

Set `VITE_TMDB_API_KEY` in `.env.local` to your TMDB API key, then run:

```powershell
npm run dev
```

If `.env.local` already exists, edit it instead of overwriting it. Restart Vite after changing environment configuration.

Vite environment variables are **public client configuration**, included in the browser bundle. They are not a place to store secret tokens. Environment files are ignored by Git except `.env.example`. For deployment, set this variable in your hosting build environment and rebuild.

Without a valid key, discovery shows an explicit configuration/error notice. Business pages, plan comparison, and contact/order links continue to work. Existing saved titles remain accessible.

## Features

- Cinema-red design, responsive layouts, purposeful motion, native scrolling, and reduced-motion support.
- Branded page-transition curtain between routes, scroll reveals on every page, wave section dividers, and button fill-sweep hovers.
- The logo is an inline SVG component (`src/components/Logo.jsx`); `public/favicon.svg` uses the same mark.
- `/#/discover`: movie/TV trending and top-rated collections, debounced title search, server-side genre discovery, popularity/rating/date sorting, and pagination.
- Search uses TMDB relevance; genre/sort controls are disabled during search. Select **Explore all** or a genre to use discovery sorting. Highest-rated discovery requires at least 200 votes.
- Title dialogs show available synopsis, genres, rating, cast, related titles, and an official YouTube trailer when TMDB supplies one. Embeds load only after a click, without autoplay. A direct YouTube link is available if an embed is blocked.
- `/#/watchlist`: save/remove titles, review them later, and clear the list with confirmation. Movie and series IDs are stored separately.
- Subscription cards and comparison share plan data. Monthly/annual pricing and Telegram, WhatsApp, and email order flows are preserved.
- Shared TMDB requests are cancellable, deduplicated, cached for five minutes, and time out after 15 seconds. Loading, empty results, malformed responses, connection failures, and retry states are explicit.

### Watchlist limitations

The watchlist is versioned in this browser's localStorage under `nat-watchlist-v1`. It is not an account, does not sync across devices, and can be lost if browser data is cleared. Other tabs on the same origin receive storage updates. If storage is blocked, changes work for the current visit and an error explains that they were not persisted. Corrupt/incompatible saved data is reported; clear the list to reset it.

### Content and attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. Metadata and permitted imagery are sourced from [TMDB](https://www.themoviedb.org/). Discovery titles are **not proof of availability on NAT**; visitors should contact support to confirm specific titles. Trailers belong to their respective publishers. This site does not host or play full movies.

The original design draws on cinematic presentation and participatory discovery principles from [Revenant](https://www.awwwards.com/sites/revenant), [Lady Bird](https://www.awwwards.com/sites/lady-bird), and the [experimental A24 nominee](https://www.awwwards.com/sites/a24). It does not reproduce those sites or claim an award.

## Validation

```powershell
npm run test
npm run lint
npm run build
npm run preview
```

Tests use Node's built-in test runner and cover persisted watchlist validation, media identity, and plan/pricing consistency. Browser verification should also cover:

1. Home and every business/discovery route at desktop, tablet, and narrow mobile sizes; no page-level horizontal overflow.
2. Movie/TV switching, search debounce and stale-result prevention, filters, sorting, result pagination, empty results, API errors, and retries.
3. Save a movie and TV series, reload, open a second tab, remove a title, and cancel/confirm clearing. Test denied storage and corrupt saved data.
4. Open details/order dialogs with a keyboard, tab through them, press Escape, and verify focus returns to the triggering control.
5. Check official/no-trailer states, and ensure trailers do not load before a click.
6. Compare monthly/annual totals, open all plan order dialogs, and check unchanged contact destinations.
7. Enable reduced motion; verify static poster motion and usable content. Pause the poster reel, hover/focus it, and verify it pauses when offscreen.
8. Check mobile menu visibility and keyboard behavior, and that `/#/about` and `/#/services` redirect to the homepage.

Account login, backend payments, cloud watchlists, and full movie playback are intentionally outside this frontend's scope.
