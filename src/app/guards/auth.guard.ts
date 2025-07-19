import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { DbtaskService } from '../services/dbtask.service'

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private db: DbtaskService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    const activo = await this.db.existeSesionActiva()
    if (!activo) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  }
}
