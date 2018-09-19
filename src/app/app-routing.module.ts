import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core';
import { environment } from '@env/environment';

const routes: Routes = [
    {
        path: 'app',
        loadChildren: './routes/routes.module#RoutesModule',
        data: { app: true },
    },
    // passport
    {
        path: 'passport',
        loadChildren: './layout/passport/passport.module#LayoutPassportModule',
    },
    {
        path: 'tutorial',
        loadChildren: './layout/tutorial/tutorial.module#TutorialModule',
    },
    { path: '', redirectTo: 'tutorial', pathMatch: 'full' },
    { path: '**', redirectTo: 'tutorial' },
];

const config: ExtraOptions = { useHash: environment.useHash };

export const routedComponents = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule],
    providers: [AuthGuard],
    declarations: [...routedComponents],
})
export class AppRoutingModule {}
