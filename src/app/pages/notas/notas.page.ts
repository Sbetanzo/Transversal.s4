import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss']
})
export class NotasPage implements OnInit {
  asignaturas = [
    { nombre: 'Matemáticas', nota1: 5.8, nota2: 4.2, nota3: 0, nota: 0 },
    { nombre: 'Lenguaje', nota1: 6.1, nota2: 4.5, nota3: 0, nota: 0 },
    { nombre: 'Programación', nota1: 5.4, nota2: 3.7, nota3: 0, nota: 0 }
  ]

  promedio = 0

  ngOnInit() {
    this.asignaturas.forEach(asig => {
      const necesaria = 4.0 * 3 - (asig.nota1 + asig.nota2)
      asig.nota3 = Math.max(0, Math.min(7, +necesaria.toFixed(1)))
      asig.nota = +((asig.nota1 + asig.nota2 ) / 2).toFixed(2)
    })

    this.calcularPromedio()
  }

  calcularPromedio() {
    const total = this.asignaturas.reduce((acc, a) => acc + a.nota, 0)
    this.promedio = +(total / this.asignaturas.length).toFixed(2)
  }
}
