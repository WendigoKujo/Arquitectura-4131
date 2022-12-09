import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-material',
  templateUrl: './material.page.html',
  styleUrls: ['./material.page.scss'],
})
export class MaterialPage implements OnInit {

  material = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)])

  });

  materiales: any[] = [];
  KEY_MATERIALES = 'materiales'

  constructor(private storage: StorageService, private toastController: ToastController, private alertController: AlertController) { }

  async ngOnInit() {

    this.cargarDatos();
    this.material.controls.id.setValue(v4());

  }

  async cargarDatos(){

    this.materiales = await this.storage.getDatos(this.KEY_MATERIALES);

  };

  async registrar(){

    if (this.material.controls.nombre.value?.trim() == "") {

      this.tostadaError('El Nombre no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarId(this.KEY_MATERIALES, this.material.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    if (await this.storage.validarNombre(this.KEY_MATERIALES, this.material.controls.nombre.value) != undefined){

      this.tostadaError('El Material ya esta registrado, ingrese otra!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_MATERIALES, this.material.value);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Material registrado con exito!');
      this.material.reset();
      this.material.controls.id.setValue(v4());
    };
    
  };

  async buscar(idBuscar: any) {
    var usuarioEncontrado = await this.storage.getDato(this.KEY_MATERIALES, idBuscar);
    this.material.setValue(usuarioEncontrado);
  };

  async eliminar(rutEliminar: any, nombre: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar el Material ' + nombre + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('NO ELIMINA!');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => {
             await this.storage.eliminar(this.KEY_MATERIALES, rutEliminar);
             await this.cargarDatos();
             this.material.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  };

  async modificar() {
   
    await this.storage.actualizar(this.KEY_MATERIALES, this.material.value);
    this.tostadaError('Material modificado con exito!');
    await this.cargarDatos();
    this.material.reset();
    this.material.controls.id.setValue(v4());
    
  };

  limpiar(){

    this.material.reset();
    this.material.controls.id.setValue(v4());

  }

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  };

}
