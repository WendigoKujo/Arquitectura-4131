import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-municipalidad',
  templateUrl: './municipalidad.page.html',
  styleUrls: ['./municipalidad.page.scss'],
})
export class MunicipalidadPage implements OnInit {

  municipalidad = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    comuna: new FormControl('', Validators.required)
  
  });

  municipalidades: any[] = [];
  comunas: any[] = [];
  KEY_MUNICIPALIDADES = 'municipalidades';
  KEY_COMUNAS = 'comunas';

  constructor(private storage: StorageService, private alertController: AlertController,  private toastController: ToastController) { }

  async ngOnInit() {

    this.cargarDatos();
    this.municipalidad.controls.id.setValue(v4());
    this.comunas = await this.storage.getDatos(this.KEY_COMUNAS);
    
  };

  async cargarDatos(){

    this.municipalidades = await this.storage.getDatos(this.KEY_MUNICIPALIDADES);

  };

  async registrar(){

    if (this.municipalidad.controls.nombre.value?.trim() == "") {

      this.tostadaError('El Nombre no puede estar en blanco, ingrese algo!');
      return;

    };

    if (this.municipalidad.controls.direccion.value?.trim() == "") {

      this.tostadaError('La Direccion no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarId(this.KEY_MUNICIPALIDADES, this.municipalidad.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    if (await this.storage.validarNombre(this.KEY_MUNICIPALIDADES, this.municipalidad.controls.nombre.value) != undefined){

      this.tostadaError('La Municipalidad ya esta registrada, ingrese otra!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_MUNICIPALIDADES, this.municipalidad.value);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Municipalidad registrada con exito!');
      this.municipalidad.reset();
      this.municipalidad.controls.id.setValue(v4());
    };

  }

  async buscar(idBuscar: any) {
    var usuarioEncontrado = await this.storage.getDato(this.KEY_MUNICIPALIDADES, idBuscar);
    this.municipalidad.setValue(usuarioEncontrado);
  };

  async eliminar(rutEliminar: any, nombre: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar la Municipalidad De ' + nombre + '?',
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
             await this.storage.eliminar(this.KEY_MUNICIPALIDADES, rutEliminar);
             await this.cargarDatos();
             this.municipalidad.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  };

  async modificar() {
   
    await this.storage.actualizar(this.KEY_MUNICIPALIDADES, this.municipalidad.value);
    this.tostadaError('Municipalidad modificada!');
    await this.cargarDatos();
    this.municipalidad.reset();
    this.municipalidad.controls.id.setValue(v4());
    
  };

  limpiar(){

    this.municipalidad.reset();
    this.municipalidad.controls.id.setValue(v4());

  };

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  };

}
