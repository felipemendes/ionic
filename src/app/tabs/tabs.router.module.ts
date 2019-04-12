import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPage,
        children: [
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
            path: 'next-events',
            children: [
            {
                path: '',
                loadChildren: '../next-events/next-events.module#NextEventsPageModule'
            }
            ]
        },
        {
            path: 'city',
            children: [
            {
                path: '',
                loadChildren: '../city/city.module#CityPageModule'
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
            redirectTo: '/tabs/featured',
            pathMatch: 'full'
        }
        ]
    },
    {
        path: '',
        redirectTo: '/tabs/featured',
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
