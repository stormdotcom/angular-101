import { Routes } from '@angular/router';

export const SUB_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./lazy-sub.component').then(m => m.LazySubComponent),
  },
];
