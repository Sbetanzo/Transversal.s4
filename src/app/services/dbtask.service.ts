// src/app/services/dbtask.service.ts
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbtaskService {
  private database!: SQLiteObject;

  constructor(private sqlite: SQLite, private platform: Platform) {}

private async getDatabase(): Promise<SQLiteObject> {
  if (!this.database) {
    await this.platform.ready()
    this.database = await this.sqlite.create({
      name: 'miapp.db',
      location: 'default'
    })
    await this.crearTablas(this.database)
  }
  return this.database
  }


  private async crearTablas(db: SQLiteObject) {
    await db.executeSql(`
    CREATE TABLE IF NOT EXISTS sesion_data (
      user_name TEXT PRIMARY KEY NOT NULL,
      password INTEGER NOT NULL,
      active INTEGER NOT NULL,
      nombre TEXT,
      carrera TEXT,
      email TEXT,
      fecha_nacimiento TEXT,
      foto TEXT
    )
    `, [])

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS experiencia (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        empresa TEXT,
        ano_inicio INTEGER,
        actualmente INTEGER,
        ano_termino INTEGER,
        cargo TEXT
      )
    `, [])

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS certificaciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        fecha_obtencion TEXT,
        tiene_vencimiento INTEGER,
        fecha_vencimiento TEXT
      )
    `, [])

    await db.executeSql(`
      CREATE TABLE IF NOT EXISTS perfil (
        user_name TEXT PRIMARY KEY,
        nombre TEXT,
        carrera TEXT,
        email TEXT,
        fechaNacimiento TEXT,
        fotoBase64 TEXT
      )
    `, [])

  }


  async insertarSesion(user_name: string, password: number) {
    const db = await this.getDatabase();
    const sql = `INSERT OR REPLACE INTO sesion_data(user_name, password, active) VALUES (?, ?, 1)`;
    return db.executeSql(sql, [user_name, password]);
  }

  async validarSesion(user_name: string, password: number): Promise<boolean> {
    const db = await this.getDatabase();
    const sql = `SELECT * FROM sesion_data WHERE user_name = ? AND password = ?`;
    const res = await db.executeSql(sql, [user_name, password]);
    return res.rows.length > 0;
  }

  async cerrarSesion(user_name: string) {
    const db = await this.getDatabase();
    const sql = `UPDATE sesion_data SET active = 0 WHERE user_name = ?`;
    return db.executeSql(sql, [user_name]);
  }

  async existeSesionActiva(): Promise<boolean> {
    const db = await this.getDatabase();
    const sql = `SELECT * FROM sesion_data WHERE active = 1`;
    const res = await db.executeSql(sql, []);
    return res.rows.length > 0;
  }

  async guardarExperiencia(data: any) {
    const db = await this.getDatabase();
    const sql = `INSERT INTO experiencia (empresa, ano_inicio, actualmente, ano_termino, cargo) VALUES (?, ?, ?, ?, ?)`;
    const params = [
      data.empresa,
      data.anoInicio,
      data.actualmente ? 1 : 0,
      data.anoTermino || null,
      data.cargo
    ];
    return db.executeSql(sql, params);
  }

  async obtenerExperiencia(): Promise<any[]> {
    const db = await this.getDatabase();
    const sql = `SELECT * FROM experiencia`;
    const res = await db.executeSql(sql, []);
    const datos = [];
    for (let i = 0; i < res.rows.length; i++) {
      datos.push(res.rows.item(i));
    }
    return datos;
  }

  async guardarCertificacion(data: any) {
    const db = await this.getDatabase();
    const sql = `INSERT INTO certificaciones (nombre, fecha_obtencion, tiene_vencimiento, fecha_vencimiento) VALUES (?, ?, ?, ?)`;
    const params = [
      data.nombre,
      data.fechaObtencion,
      data.tieneVencimiento ? 1 : 0,
      data.fechaVencimiento || null
    ];
    return db.executeSql(sql, params);
  }

  async obtenerCertificaciones(): Promise<any[]> {
    const db = await this.getDatabase();
    const sql = `SELECT * FROM certificaciones`;
    const res = await db.executeSql(sql, []);
    const datos = [];
    for (let i = 0; i < res.rows.length; i++) {
      datos.push(res.rows.item(i));
    }
    return datos;
  }

  async cerrarSesionActual() {
  const db = await this.getDatabase()
  await db.executeSql(`UPDATE sesion_data SET active = 0 WHERE active = 1`, [])
}

  async eliminarExperiencia(id: number) {
    const db = await this.getDatabase();
    return db.executeSql(`DELETE FROM experiencia WHERE id = ?`, [id]);
  }

  async eliminarCertificacion(id: number) {
    const db = await this.getDatabase();
    return db.executeSql(`DELETE FROM certificaciones WHERE id = ?`, [id]);
  }

async guardarPerfil(user_name: string, datos: any, fotoBase64: string | null) {
  const db = await this.getDatabase()
  const sql = `
    INSERT OR REPLACE INTO perfil (user_name, nombre, carrera, email, fechaNacimiento, fotoBase64)
    VALUES (?, ?, ?, ?, ?, ?)
  `
  const params = [
    user_name,
    datos.nombre,
    datos.carrera,
    datos.email,
    datos.fechaNacimiento,
    fotoBase64
  ]
  return db.executeSql(sql, params)
}

async obtenerPerfil(user_name: string): Promise<any> {
  const db = await this.getDatabase()
  const sql = `SELECT * FROM perfil WHERE user_name = ?`
  const res = await db.executeSql(sql, [user_name])
  if (res.rows.length > 0) return res.rows.item(0)
  return null
}


  async obtenerUsuarioActivo(): Promise<string | null> {
  const db = await this.getDatabase()
  const res = await db.executeSql(
    `SELECT user_name FROM sesion_data WHERE active = 1`,
    []
  )
  if (res.rows.length > 0) {
    return res.rows.item(0).user_name
  }
  return null
}

}
