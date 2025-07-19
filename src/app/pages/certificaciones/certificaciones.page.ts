import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.page.html',
  styleUrls: ['./certificaciones.page.scss']
})
export class CertificacionesPage {
  certForm: FormGroup
  mostrarVencimiento = false

  constructor(
    private fb: FormBuilder,
    private db: DbtaskService
  ) {
    this.certForm = this.fb.group({
      nombre: [''],
      fechaObtencion: [''],
      tieneVencimiento: [false],
      fechaVencimiento: ['']
    })

    this.certForm.get('tieneVencimiento')?.valueChanges.subscribe(valor => {
      this.mostrarVencimiento = valor
      if (!valor) {
        this.certForm.get('fechaVencimiento')?.reset()
      }
    })
  }

  guardar() {
    const datos = this.certForm.value
    this.db.guardarCertificacion(datos)
      .then(() => {
        console.log('Certificación guardada')
        this.limpiar()
      })
      .catch(e => console.error('Error al guardar certificación', e))
  }


  limpiar() {
    this.certForm.reset()
    this.mostrarVencimiento = false
  }
}
