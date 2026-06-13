import { Routes } from '@angular/router';

export const LAZY_LOADING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./lazy-loading.component').then(m => m.LazyLoadingComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadComponent: () => import('./lazy-home.component').then(m => m.LazyHomeComponent),
      },
      {
        path: 'sub',
        // Nested lazy chunk — note the network tab fires another chunk fetch
        // the first time you navigate here.
        loadChildren: () => import('./sub/sub.routes').then(m => m.SUB_ROUTES),
      },
    ],
  },
];
