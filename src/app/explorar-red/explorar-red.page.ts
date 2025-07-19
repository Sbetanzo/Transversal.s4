import { Component, OnInit } from '@angular/core'
import { GetapiService } from '../users/getapi.service'

@Component({
  selector: 'app-explorar-red',
  templateUrl: './explorar-red.page.html',
  styleUrls: ['./explorar-red.page.scss']
})
export class ExplorarRedPage implements OnInit {
  usuarios: any[] = []

  constructor(private api: GetapiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe(res => {
      this.usuarios = res.results
    })
  }
}
