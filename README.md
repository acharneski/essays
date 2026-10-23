# ohio-family.lawyer

A static, evidence-first publication and advocacy hub on Ohio family law. See `idea.md` for the full plan.

## Stack

- Eleventy 3 (native ESM), Markdown + Nunjucks
- Pagefind for static search (built after Eleventy)
- Plain CSS with design tokens, small ES modules, and no client framework
- No third-party requests (enforced by the CSP in `src/_headers`)

## Commands

```sh
pnpm install
pnpm dev        # local server; drafts visible
pnpm build      # production build + search index; drafts excluded
pnpm validate   # front-matter schema check
pnpm links      # internal link check (run after build)
pnpm test       # validate + lint + build
```

Search only works after `pnpm build`, because Pagefind indexes the built site.

## Content model

| Folder | Type | URL |
| :-- | :-- | :-- |
| `src/content/news/YYYY-MM-DD-slug.md` | news | `/news/slug/` |
| `src/content/essays/slug.md` | essay | `/essays/slug/` |
| `src/content/briefs/slug.md` | brief | `/briefs/slug/` |
| `src/content/guides/slug.md` | guide | `/resources/guides/slug/` (TODO: add data file) |
| `src/content/foundations/slug.md` | foundation | `/foundations/slug/` |
| `src/content/pages/slug.md` | page | `/slug/` |

Status workflow:

- `draft`: visible only in `pnpm dev`, never built.
- `published`: built normally.
- `archived`: built, with an archived notice.

Use `{% callout "objections" %}…{% endcallout %}` for the house-style boxes. Available kinds: `objections`, `not-claim`, `law-as-of`, `protections`, `clinical`, `verify`, `note`.

Data lives in `src/_data/`: `site.js` (navigation, crisis lines, rubric), `reformAgenda.json` (12 priorities; one page is generated per priority), and `bills.json` (the tracker).

## Before launch

- [ ] Replace the placeholder bill in `bills.json` with verified records.
- [ ] Migrate essay text (see `who-decides-who-counts.md` and Appendix C of `idea.md`).
  - [ ] Strip saved-from comments, extension scripts, and placeholder metadata.
- [ ] Verify shared-parenting legislation status (priority 2).
- [ ] Set `site.newsletter.action` once the provider account exists.
- [ ] Complete funding and conflict-of-interest disclosure on `/about/`.
- `review`: built, with a "Sources pending" notice (claims still awaiting a primary source).