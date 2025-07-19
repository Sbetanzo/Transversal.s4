import { Component } from '@angular/core'

@Component({
  selector: 'app-config',
  templateUrl: './config.page.html',
  styleUrls: ['./config.page.scss']
})
export class ConfigPage {
  notificaciones = true
  darkMode = false

toggleDarkMode(event: any) {
  this.darkMode = event.detail.checked

  if (this.darkMode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}


}
