# Angular 19 — Hands-on Syllabus

A learning scaffold for Angular 19, organised as **one route per topic**. Each
topic has a short description, a worked example, and (often) an
`## EXERCISE` section with `// TODO(you): ...` markers where you fill in
gaps yourself.

## Stack pins

- Angular 19 — **standalone components only**, no NgModules
- `ChangeDetectionStrategy.OnPush` everywhere
- Routing via `app.routes.ts` with lazy-loaded routes (`loadComponent` / `loadChildren`)
- **Reactive Forms** (no template-driven, no Signal Forms)
- **Tailwind v3** for utilities + **SCSS** files per component for custom styles
- `provideHttpClient(withInterceptors([...]))` with **functional interceptors**
- Fake API: <https://jsonplaceholder.typicode.com>
- Signals for component-local UI state (loading/error/toggles)
- Modern control flow only — `@if` / `@for (… ; track ...)` / `@switch`

## Running

```bash
npm install        # already done by the scaffold
npm start          # ng serve at http://localhost:4200
npm run build      # production build
```

## Project layout

```
src/app/
  core/              singleton services, interceptors, models, guards, resolvers
    interceptors/    auth.interceptor.ts, error.interceptor.ts
    services/        api, user, auth, ui-state, username, notes-store
    models/          user.model.ts
    guards/          auth.guard.ts
    resolvers/       user.resolver.ts
  shared/            reusable dumb components, directives, pipes
    components/      modal, drawer, confirm-dialog, topic-header
    directives/      highlight.directive.ts
    pipes/           initials.pipe.ts
  features/          one folder per syllabus topic, each lazy-loaded
  layout/            shell with side-nav + welcome
src/environments/    environment.ts (dev) + environment.prod.ts
```

## The 4-day plan

The side-nav IS the syllabus. Topics are ordered to build on each other.

### Day 1 — Fundamentals & Structure
| # | Route                       | Mode              | What you learn |
| - | --------------------------- | ----------------- | -------------- |
| 1 | `/components-binding`       | WORKED            | Interpolation, property/event binding, `@Input`/`@Output` |
| 2 | `/control-flow`             | WORKED + EXERCISE | `@if`, `@for` (with `track`), `@switch` |
| 3 | `/directive-custom`         | WORKED + EXERCISE | Attribute directive — hover highlight |
| 4 | `/routing-basics`           | WORKED            | Route params, child routes, `router-outlet` |

### Day 2 — Forms
| # | Route                       | Mode              | What you learn |
| - | --------------------------- | ----------------- | -------------- |
| 5 | `/form-basics`              | WORKED + EXERCISE | `FormBuilder`, every common control type |
| 6 | `/form-validation`          | WORKED + EXERCISE | built-in + custom + cross-field + async validators |
| 7 | `/dynamic-forms`            | WORKED + EXERCISE | `FormArray` — add/remove rows at runtime |

### Day 3 — Services, API, Interceptors
| # | Route                       | Mode              | What you learn |
| - | --------------------------- | ----------------- | -------------- |
| 8 | `/api-service`              | WORKED            | Typed HttpClient wrapper + signal-driven UI |
| 9 | `/form-api-integration`     | WORKED + EXERCISE | GET → patchValue, POST submit, exercise: PUT |
| 10| `/interceptors`             | WORKED + EXERCISE | Auth + error functional interceptors |
| 11| `/error-handling-ui`        | WORKED + EXERCISE | Loading skeletons, inline errors, retry, empty |

### Day 4 — Composition, Overlays, Communication, Lazy Loading
| # | Route                       | Mode              | What you learn |
| - | --------------------------- | ----------------- | -------------- |
| 12| `/parent-child`             | WORKED            | `[(value)]` two-way binding |
| 13| `/cross-component-data`     | WORKED + EXERCISE | Sibling↔sibling via shared signal store |
| 14| `/reusable-popup`           | WORKED            | Generic `<app-modal>` with `<ng-content>` |
| 15| `/popup-reuse-elsewhere`    | EXERCISE          | Same modal, different feature |
| 16| `/drawer`                   | WORKED            | Slide-in drawer driven by a signal |
| 17| `/popup-over-popup`         | WORKED + EXERCISE | Stacked dialogs, ESC order, return result |
| 18| `/lazy-loading`             | WORKED            | `loadChildren` + nested lazy chunks |

### Day 5 — Foundations (added because you'll need them)
| # | Route                       | Mode              | Why |
| - | --------------------------- | ----------------- | --- |
| 19| `/route-guards`             | WORKED + EXERCISE | Gating routes with `CanActivate` |
| 20| `/resolvers`                | WORKED + EXERCISE | Pre-fetch data before the route activates |
| 21| `/pipes`                    | WORKED + EXERCISE | Custom pipe + `async` pipe |
| 22| `/environment-config`       | WORKED            | `environment.ts` for API base URL |
| 23| `/signal-store`             | WORKED + EXERCISE | Mini-store pattern with `signal()` + `computed()` |

## Verifying lazy loading

1. `npm start`, open <http://localhost:4200>
2. DevTools → Network → filter to **JS**
3. Click `/form-basics` — a new `chunk-XXXX.js` appears.
4. Click `/lazy-loading` then `Sub` inside it — a *nested* chunk loads only then.

## Exercise checklist

Tick these off as you finish them:

- [ ] 2. `/control-flow` — implement `filteredFruits` computed signal
- [ ] 3. `/directive-custom` — write `appDisableWhile` directive
- [ ] 5. `/form-basics` — add a `phone` field with pattern validation
- [ ] 6. `/form-validation` — write a `noSpaces` custom validator
- [ ] 7. `/dynamic-forms` — wire Remove + per-row validation
- [ ] 9. `/form-api-integration` — implement Update (PUT)
- [ ] 10. `/interceptors` — add a loading interceptor
- [ ] 11. `/error-handling-ui` — design an empty state
- [ ] 13. `/cross-component-data` — add a second consumer
- [ ] 15. `/popup-reuse-elsewhere` — open the shared modal here too
- [ ] 17. `/popup-over-popup` — make confirm dialog return a Promise
- [ ] 19. `/route-guards` — write a role-based `adminGuard`
- [ ] 20. `/resolvers` — make the resolver read `:id` + handle errors
- [ ] 21. `/pipes` — write a `relativeTime` pipe
- [ ] 23. `/signal-store` — add a `charCount` computed + a `removeOldestIfOver` method

## A note on Node 24

The Angular CLI prints `Node: 24.x (Unsupported)`. Angular 19 still runs fine on
Node 24 in practice. If you want the warning gone, switch to Node 22 LTS.
