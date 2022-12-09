import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  datos: any[] = [];

  isAuthenticated = new BehaviorSubject(false);

  constructor(private storage: Storage) {
    storage.create();
  }

  async agregarUsuario(key: any, dato: any){

    var varRut = await this.validarRut(key, dato.rut);
    var varCorreo = await this.validarCorreo(key, dato.correo);

    if (varRut == undefined && varCorreo == undefined) {

      this.datos = await this.storage.get(key) || [];
      this.datos.push(dato);
      await this.storage.set(key, this.datos);
      return true;

    }else{

      return false;

    }

  };

  async agregar(key: any, dato: any){
    
    this.datos = await this.storage.get(key) || [];

    this.datos.push(dato);
    await this.storage.set(key, this.datos);
    return dato;

  };

  async getDato(key: any, identificador: any){

    this.datos = await this.storage.get(key) || [];
    return this.datos.find(dato => dato.id == identificador);

  };

  async getDatos(key: any){
    this.datos = await this.storage.get(key) || [];
    return this.datos;
  };

  async eliminar(key: any, identificador: any){

    this.datos = await this.storage.get(key) || [];

    this.datos.forEach((value, index) => {
      if (value.id == identificador) {
        this.datos.splice(index, 1);
      }
    });

    await this.storage.set(key, this.datos);

  };

  async actualizar(key: any, dato: any){

    this.datos = await this.storage.get(key) || [];

    var index = this.datos.findIndex(value => value.id == dato.id);
    this.datos[index] = dato;

    await this.storage.set(key, this.datos);

  }

  async validarLogin(key: any, correo: any, password: any){

    this.datos = await this.storage.get(key) || [];

    var usuarioLogin = this.datos.find( dato => dato.email == correo && dato.password == password);
    if (usuarioLogin != undefined){
      
      this.isAuthenticated.next(true);
      return usuarioLogin;

    }

  }

  async validarNombre(key: any, nombre: any){

    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.nombre == nombre );

  }

  async validarRut(key: any, rut: any){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.rut == rut)
  }

  async validarCorreo(key: any, correo: any){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.correo == correo);
  }

  async validarId(key: any, id: any){
    this.datos = await this.storage.get(key) || [];
    return this.datos.find( dato => dato.id == id);
  }

  getAuth(){

    return this.isAuthenticated.value;

  }

}
