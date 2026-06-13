export interface SyllabusItem {
  path: string;
  title: string;
  mode: 'WORKED' | 'EXERCISE' | 'WORKED + EXERCISE';
  day: 1 | 2 | 3 | 4 | 5;
}

export const SYLLABUS: SyllabusItem[] = [
  { day: 1, path: 'components-binding',     title: '1. Components & Binding',      mode: 'WORKED' },
  { day: 1, path: 'control-flow',           title: '2. Control Flow',              mode: 'WORKED + EXERCISE' },
  { day: 1, path: 'directive-custom',       title: '3. Custom Directive',          mode: 'WORKED + EXERCISE' },
  { day: 1, path: 'routing-basics',         title: '4. Routing Basics',            mode: 'WORKED' },

  { day: 2, path: 'form-basics',            title: '5. Form Basics',               mode: 'WORKED + EXERCISE' },
  { day: 2, path: 'form-validation',        title: '6. Form Validation',           mode: 'WORKED + EXERCISE' },
  { day: 2, path: 'dynamic-forms',          title: '7. Dynamic Forms',             mode: 'WORKED + EXERCISE' },

  { day: 3, path: 'api-service',            title: '8. API Service',               mode: 'WORKED' },
  { day: 3, path: 'form-api-integration',   title: '9. Form + API',                mode: 'WORKED + EXERCISE' },
  { day: 3, path: 'interceptors',           title: '10. Interceptors',             mode: 'WORKED + EXERCISE' },
  { day: 3, path: 'error-handling-ui',      title: '11. Error Handling UI',        mode: 'WORKED + EXERCISE' },

  { day: 4, path: 'parent-child',           title: '12. Parent ↔ Child',           mode: 'WORKED' },
  { day: 4, path: 'cross-component-data',   title: '13. Cross-Component Data',     mode: 'WORKED + EXERCISE' },
  { day: 4, path: 'reusable-popup',         title: '14. Reusable Popup',           mode: 'WORKED' },
  { day: 4, path: 'popup-reuse-elsewhere',  title: '15. Popup Reuse Elsewhere',    mode: 'EXERCISE' },
  { day: 4, path: 'drawer',                 title: '16. Drawer',                   mode: 'WORKED' },
  { day: 4, path: 'popup-over-popup',       title: '17. Popup over Popup',         mode: 'WORKED + EXERCISE' },
  { day: 4, path: 'lazy-loading',           title: '18. Lazy Loading',             mode: 'WORKED' },

  { day: 5, path: 'route-guards',           title: '19. Route Guards',             mode: 'WORKED + EXERCISE' },
  { day: 5, path: 'resolvers',              title: '20. Resolvers',                mode: 'WORKED + EXERCISE' },
  { day: 5, path: 'pipes',                  title: '21. Pipes',                    mode: 'WORKED + EXERCISE' },
  { day: 5, path: 'environment-config',     title: '22. Environment Config',       mode: 'WORKED' },
  { day: 5, path: 'signal-store',           title: '23. Signal Store',             mode: 'WORKED + EXERCISE' },
];
