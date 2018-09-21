import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard, configInc } from '@core';
import { environment } from '@env/environment';

const routes: Routes = [
    {
        path: 'app',
        loadChildren: './routes/tabs/tabs.module#TabsModule',
        canLoad: [AuthGuard],
        data: { app: true },
    },
    {
        path: 'account',
        loadChildren: './routes/account/account.module#AccountModule',
    },
    {
        path: 'support',
        loadChildren: './routes/support/support.module#SupportModule',
    },
    // passport
    {
        path: 'passport',
        loadChildren: './layout/passport/passport.module#LayoutPassportModule',
    },
    {
        path: 'tutorial',
        loadChildren: './routes/tutorial/tutorial.module#TutorialModule',
    },
    { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
    { path: '**', redirectTo: 'tutorial' },
    // { path: '', redirectTo: configInc.router.routeDefault, pathMatch: 'full' },
    // { path: '**', redirectTo: configInc.router.routeDefault },
];

const config: ExtraOptions = {
    useHash: environment.useHash,
    enableTracing: false,
};

export const routedComponents = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
    providers: [AuthGuard],
    declarations: [...routedComponents],
})
export class AppRoutingModule {}
