import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.page.html',
  styleUrls: ['./experiencia.page.scss']
})
export class ExperienciaPage {
  experienciaForm: FormGroup
  mostrarAnoTermino = true

  constructor(
    private fb: FormBuilder,
    private db: DbtaskService
  ) {
    this.experienciaForm = this.fb.group({
      empresa: [''],
      anoInicio: [''],
      actualmente: [false],
      anoTermino: [''],
      cargo: ['']
    })

    this.experienciaForm.get('actualmente')?.valueChanges.subscribe((valor) => {
      this.mostrarAnoTermino = !valor
      if (valor) {
        this.experienciaForm.get('anoTermino')?.reset()
      }
    })
  }

  guardar() {
    const data = this.experienciaForm.value
    this.db.guardarExperiencia(data)
      .then(() => {
        console.log('Experiencia guardada')
        this.limpiar()
      })
      .catch(e => {
        console.error('Error al guardar experiencia', e)
      })
  }


  limpiar() {
    this.experienciaForm.reset()
    this.mostrarAnoTermino = true
  }
}
