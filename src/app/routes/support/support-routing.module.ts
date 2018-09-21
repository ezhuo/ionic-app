import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SupportPage } from './support';

const routes: Routes = [
  {
    path: '',
    component: SupportPage
  }
];

export const routedComponents = [];

export const entryComponents = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportPageRoutingModule { }
