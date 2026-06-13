import { Routes } from '@angular/router';

export const ROUTING_BASICS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./routing-basics.component').then(m => m.RoutingBasicsComponent),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'overview' },
      {
        path: 'overview',
        loadComponent: () => import('./routing-basics-overview.component').then(m => m.RoutingBasicsOverviewComponent),
      },
      {
        path: 'detail/:id',
        loadComponent: () => import('./routing-basics-detail.component').then(m => m.RoutingBasicsDetailComponent),
        children: [
          {
            path: ':sectionId',
   loadComponent: () => import('./routing-basics-detail-section.component')
  .then(m => m.RoutingBasicsDetailSectionComponent),
          },
        ]
      },
    ],
  },
];
