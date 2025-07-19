import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { MisDatosPage } from './mis-datos.page'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [MisDatosPage],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: MisDatosPage }])
  ]
})
export class MisDatosPageModule {}

