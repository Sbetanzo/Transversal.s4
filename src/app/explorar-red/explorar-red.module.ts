import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExplorarRedPageRoutingModule } from './explorar-red-routing.module';

import { ExplorarRedPage } from './explorar-red.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorarRedPageRoutingModule
  ],
  declarations: [ExplorarRedPage]
})
export class ExplorarRedPageModule {}
