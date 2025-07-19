import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  usuario = ''
  password = ''

  constructor(
    private db: DbtaskService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async registrar() {
    if (!this.usuario || !this.password) {
      this.mostrarError('Completa todos los campos')
      return
    }

    try {
      await this.db.insertarSesion(this.usuario, +this.password)
      const alert = await this.alertCtrl.create({
        header: 'Éxito',
        message: 'Usuario registrado correctamente',
        buttons: ['OK']
      })
      await alert.present()
      this.router.navigate(['/login'])
    } catch (e) {
      this.mostrarError('Error al registrar usuario')
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
}
