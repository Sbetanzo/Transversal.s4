import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  usuario = ''
  password = ''

  constructor(
    private db: DbtaskService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    const existe = await this.db.existeSesionActiva()
    if (existe) this.router.navigate(['/home'])
  }

  async login() {
    if (!this.usuario || !this.password) {
      this.mostrarError('Completa todos los campos')
      return
    }

    const valido = await this.db.validarSesion(this.usuario, +this.password)
    if (valido) {
      this.router.navigate(['/home'], {
        state: { usuario: this.usuario }
      })
    } else {
      this.mostrarError('Credenciales incorrectas')
    }
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    })
    await alert.present()
  }

  async registrar() {
  if (!this.usuario || !this.password) {
    this.mostrarError('Completa todos los campos')
    return
  }

  try {
    await this.db.insertarSesion(this.usuario, +this.password)
    const alert = await this.alertCtrl.create({
      header: 'Registrado',
      message: 'Usuario creado correctamente',
      buttons: ['OK']
    })
    await alert.present()
  } catch (e) {
    this.mostrarError('No se pudo registrar')
  }
}

}
