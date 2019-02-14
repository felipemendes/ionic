import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'next-events',
        children: [
          {
            path: '',
            loadChildren: '../next-events/next-events.module#NextEventsPageModule'
          }
        ]
      },
      {
        path: 'featured',
        children: [
          {
            path: '',
            loadChildren: '../featured/featured.module#FeaturedPageModule'
          }
        ]
      },
      {
        path: 'today',
        children: [
          {
            path: '',
            loadChildren: '../today/today.module#TodayPageModule'
          }
        ]
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            loadChildren: '../categories/categories.module#CategoriesPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/next-events',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/next-events',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
