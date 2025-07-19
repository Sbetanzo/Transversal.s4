import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-mis-datos',
  templateUrl: './mis-datos.page.html',
  styleUrls: ['./mis-datos.page.scss']
})
export class MisDatosPage {
  perfilForm: FormGroup
  experiencias: any[] = []
  certificaciones: any[] = []

  constructor(
    private fb: FormBuilder,
    private db: DbtaskService
  ) {

    this.perfilForm = this.fb.group({
      nombre: [''],
      carrera: [''],
      email: [''],
      fechaNacimiento: ['']
    })
  }
  ngOnInit() {
    this.cargarDatos()
  }
  cargarDatos() {
  this.db.obtenerExperiencia().then(data => this.experiencias = data)
  this.db.obtenerCertificaciones().then(data => this.certificaciones = data)
  }

  guardar() {
    const datos = this.perfilForm.value
    console.log('Datos guardados:', datos)
  }

  limpiar() {
    this.perfilForm.reset()
  }
}
