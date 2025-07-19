import { Component } from '@angular/core';
import { DbtaskService } from './services/dbtask.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(
    private db: DbtaskService,
    private router: Router
  ) {}

   async cerrarSesion() {
    await this.db.cerrarSesionActual()
    this.router.navigate(['/login'])
  }
}
