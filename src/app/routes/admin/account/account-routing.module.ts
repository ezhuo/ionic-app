import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountPage } from './account';

const routes: Routes = [
  {
    path: '',
    component: AccountPage
  }
];

export const routedComponents = [AccountPage];

export const entryComponents = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountPageRoutingModule { }
