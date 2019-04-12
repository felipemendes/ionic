import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'siri-shortcuts', loadChildren: './siri-shortcuts/siri-shortcuts.module#SiriShortcutsPageModule' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
