import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'details', loadChildren: './details/details.module#DetailsPageModule' },
    { path: 'events-by-category', loadChildren: './events-by-category/events-by-category.module#EventsByCategoryPageModule' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
