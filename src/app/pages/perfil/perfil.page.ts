import { Component } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera'
import { DbtaskService } from 'src/app/services/dbtask.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss']
})
export class PerfilPage {
  perfilForm: FormGroup
  animando = false
  fotoBase64: string | null = null
  usuario: string | null = null

  constructor(private fb: FormBuilder, private db: DbtaskService) {
    this.perfilForm = this.fb.group({
      nombre: [''],
      carrera: [''],
      email: [''],
      fechaNacimiento: ['']
    })
  }

async ngOnInit() {
  this.usuario = await this.db.obtenerUsuarioActivo()
  if (!this.usuario) return

  const perfil = await this.db.obtenerPerfil(this.usuario)
  if (perfil) {
    this.perfilForm.setValue({
      nombre: perfil.nombre,
      carrera: perfil.carrera,
      email: perfil.email,
      fechaNacimiento: perfil.fechaNacimiento
    })
    this.fotoBase64 = perfil.fotoBase64
  }
}



  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    })
    this.fotoBase64 = `data:image/jpeg;base64,${image.base64String}`
  }

  async guardar() {
    const datos = this.perfilForm.value
    if (!this.usuario) {
      console.error('Usuario no válido')
      return
    }
    await this.db.guardarPerfil(this.usuario, datos, this.fotoBase64)

    console.log('Perfil guardado en DB')
  }

  limpiar() {
    this.perfilForm.reset()
    this.fotoBase64 = null
    this.animando = true
    setTimeout(() => (this.animando = false), 600)
  }
}
