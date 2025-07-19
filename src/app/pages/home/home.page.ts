import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbtaskService } from 'src/app/services/dbtask.service';
import { SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  segmentValue = 'misdatos';
  usuario = '';
  private database!: SQLiteObject;

  perfilForm: FormGroup;
  experiencias: any[] = [];
  certificaciones: any[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private db: DbtaskService
  ) {
    const navState = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = navState?.['usuario'] || '';

    this.perfilForm = this.fb.group({
      nombre: [''],
      carrera: [''],
      email: [''],
      fechaNacimiento: [''],
    });
  }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.db.obtenerExperiencia().then((data) => (this.experiencias = data));
    this.db
      .obtenerCertificaciones()
      .then((data) => (this.certificaciones = data));
  }

  guardar() {
    const datos = this.perfilForm.value;
    console.log('Datos guardados:', datos);
  }

  limpiar() {
    this.perfilForm.reset();
  }

  cambiarVista() {
    this.router.navigate([`/${this.segmentValue}`]);
  }

  async eliminarExperiencia(id: number) {
    await this.db.eliminarExperiencia(id);
    this.cargarDatos();
  }

  async eliminarCertificacion(id: number) {
    await this.db.eliminarCertificacion(id);
    this.cargarDatos();
  }

  mostrarFormulario(tipo: 'experiencia' | 'certificacion') {
  this.router.navigate([`/${tipo === 'experiencia' ? 'experiencia' : 'certificaciones'}`])
  }

  mostrarRed() {
  this.router.navigate([`/explorar-red`])
  }

}
