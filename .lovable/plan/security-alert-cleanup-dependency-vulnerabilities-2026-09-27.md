# Security alert cleanup — dependency vulnerabilities

## What the scan found

All advisories trace back to five root causes:

| Root cause | Severity | Affects |
|---|---|---|
| `react-router-dom` 6.27.0 | High (XSS via open redirect) + moderates | Your routing — actually used |
| `lodash` (pulled in by `recharts`) | High (code injection) + prototype pollution | `recharts` only |
| `@babel/runtime` < 7.26.10 (ReDoS) | Moderate | Every Radix UI package, `recharts`, `cmdk`, `vaul` |
| `picomatch` < 2.3.2 (ReDoS, method injection) | High + moderate | `gh-pages` only (a local publishing tool — never ships to your site) |
| `react-router-dom` 6.27.0 | 2 moderates fixed only in v7 (SSR hydration, backslash redirect) | Not applicable to this site — it has no server-side rendering and builds no redirects from user input |

## Plan

1. **Remove unused template packages**: `recharts`, `cmdk`, `vaul`. Nothing in your pages imports them (verified — only leftover template files reference them). This removes the lodash and several Babel alert rows at the source. Delete the leftover `chart.tsx`, `command.tsx`, `drawer.tsx` template files.
2. **Upgrade `react-router-dom`** to the latest 6.x (6.30.4). This clears the high XSS advisory and several moderates. Routing usage here is basic (`Routes`, `Link`, `useNavigate`), so this is low-risk.
3. **Force safe versions** of remaining transitive packages via dependency overrides:
   - `@babel/runtime` → latest 7.x (clears all Radix UI moderate rows)
   - `picomatch` → ^2.3.2 (clears the gh-pages rows)
4. **Verify**: re-run the dependency scan (expect zero high/critical), confirm the build succeeds, and load the site in the preview to confirm all pages and the calculator still work.

## Not changing

- The two react-router advisories fixed only in v7 stay flagged but don't apply to this site (no SSR, no user-driven redirects). If you later want a fully clean report, upgrading to React Router v7 is a separate, larger change — happy to plan that on request.
- `gh-pages` stays so you keep the GitHub Pages publishing option; it never runs on your live site.

## Outcome

Zero high/critical vulnerabilities in dependencies; GitHub's Dependabot alerts for these packages can be dismissed after the update is pushed.
