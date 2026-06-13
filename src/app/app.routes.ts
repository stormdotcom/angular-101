import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { userResolver } from './core/resolvers/user.resolver';
import { ParentComponent } from './features/parent/parent.component';
/**
 * Every feature route is lazy-loaded via `loadComponent`. Open the network
 * tab on first navigation to each — you'll see a separate JS chunk fetched.
 *
 * The /routing-basics and /lazy-loading routes use `loadChildren` to demo
 * child route lazy loading.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./layout/welcome.component').then(m => m.WelcomeComponent),
  },

  // Day 1
  {
    path: 'components-basics',
    component: ParentComponent,
  },
  {
    path: 'components-binding',
    loadComponent: () => import('./features/components-binding/components-binding.component').then(m => m.ComponentsBindingComponent),
  },
  {
    path: 'control-flow',
    loadComponent: () => import('./features/control-flow/control-flow.component').then(m => m.ControlFlowComponent),
  },
  {
    path: 'directive-custom',
    loadComponent: () => import('./features/directive-custom/directive-custom.component').then(m => m.DirectiveCustomComponent),
  },
  {
    path: 'routing-basics',
    loadChildren: () => import('./features/routing-basics/routing-basics.routes').then(m => m.ROUTING_BASICS_ROUTES),
  },

  // Day 2
  {
    path: 'form-basics',
    loadComponent: () => import('./features/form-basics/form-basics.component').then(m => m.FormBasicsComponent),
  },
  {
    path: 'form-validation',
    loadComponent: () => import('./features/form-validation/form-validation.component').then(m => m.FormValidationComponent),
  },
  {
    path: 'dynamic-forms',
    loadComponent: () => import('./features/dynamic-forms/dynamic-forms.component').then(m => m.DynamicFormsComponent),
  },

  // Day 3
  {
    path: 'api-service',
    loadComponent: () => import('./features/api-service/api-service.component').then(m => m.ApiServiceComponent),
  },
  {
    path: 'form-api-integration',
    loadComponent: () => import('./features/form-api-integration/form-api-integration.component').then(m => m.FormApiIntegrationComponent),
  },
  {
    path: 'interceptors',
    loadComponent: () => import('./features/interceptors/interceptors.component').then(m => m.InterceptorsComponent),
  },
  {
    path: 'error-handling-ui',
    loadComponent: () => import('./features/error-handling-ui/error-handling-ui.component').then(m => m.ErrorHandlingUiComponent),
  },

  // Day 4
  {
    path: 'parent-child',
    loadComponent: () => import('./features/parent-child/parent-child.component').then(m => m.ParentChildComponent),
  },
  {
    path: 'cross-component-data',
    loadComponent: () => import('./features/cross-component-data/cross-component-data.component').then(m => m.CrossComponentDataComponent),
  },
  {
    path: 'reusable-popup',
    loadComponent: () => import('./features/reusable-popup/reusable-popup.component').then(m => m.ReusablePopupComponent),
  },
  {
    path: 'popup-reuse-elsewhere',
    loadComponent: () => import('./features/popup-reuse-elsewhere/popup-reuse-elsewhere.component').then(m => m.PopupReuseElsewhereComponent),
  },
  {
    path: 'drawer',
    loadComponent: () => import('./features/drawer/drawer.component').then(m => m.DrawerFeatureComponent),
  },
  {
    path: 'popup-over-popup',
    loadComponent: () => import('./features/popup-over-popup/popup-over-popup.component').then(m => m.PopupOverPopupComponent),
  },
  {
    path: 'lazy-loading',
    loadChildren: () => import('./features/lazy-loading/lazy-loading.routes').then(m => m.LAZY_LOADING_ROUTES),
  },

  // Day 5 — foundations
  {
    path: 'route-guards',
    loadComponent: () => import('./features/route-guards/route-guards.component').then(m => m.RouteGuardsComponent),
  },
  {
    path: 'route-guards/secret',
    canActivate: [authGuard],
    loadComponent: () => import('./features/route-guards/secret-page.component').then(m => m.SecretPageComponent),
  },
  {
    path: 'resolvers',
    resolve: { user: userResolver },
    loadComponent: () => import('./features/resolvers/resolvers.component').then(m => m.ResolversComponent),
  },
  {
    path: 'pipes',
    loadComponent: () => import('./features/pipes/pipes.component').then(m => m.PipesComponent),
  },
  {
    path: 'environment-config',
    loadComponent: () => import('./features/environment-config/environment-config.component').then(m => m.EnvironmentConfigComponent),
  },
  {
    path: 'signal-store',
    loadComponent: () => import('./features/signal-store/signal-store.component').then(m => m.SignalStoreComponent),
  },

  { path: '**', redirectTo: '' },
];
