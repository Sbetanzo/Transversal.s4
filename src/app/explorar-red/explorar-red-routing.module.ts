import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplorarRedPage } from './explorar-red.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorarRedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorarRedPageRoutingModule {}
