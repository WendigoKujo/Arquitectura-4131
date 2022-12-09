import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-sala',
  templateUrl: './sala.page.html',
  styleUrls: ['./sala.page.scss'],
})
export class SalaPage implements OnInit {

  sala = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1,4}[0-9]{1,2}')]),
    fecha: new FormControl('', Validators.required)

  });

  salas: any[] = [];
  KEY_SALAS = 'salas';

  constructor(private storage: StorageService, private toastController: ToastController, private alertController: AlertController) { }

  ngOnInit() {

    this.cargarDatos();
    this.sala.controls.id.setValue(v4());

  };

  async cargarDatos(){

    this.salas = await this.storage.getDatos(this.KEY_SALAS);

  };

  async registrar(){

    if (this.sala.controls.nombre.value?.trim() == "") {

      this.tostadaError('El Nombre no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarId(this.KEY_SALAS, this.sala.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    if (await this.storage.validarNombre(this.KEY_SALAS, this.sala.controls.nombre.value) != undefined){

      this.tostadaError('La Sala ya esta registrada, ingrese otra!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_SALAS, this.sala.value);
    console.log(registrado);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Sala registrada con exito!');
      this.sala.reset();
      this.sala.controls.id.setValue(v4());
    };
    
  }

  async buscar(idBuscar: any) {
    var usuarioEncontrado = await this.storage.getDato(this.KEY_SALAS, idBuscar);
    this.sala.setValue(usuarioEncontrado);
  };

  async eliminar(rutEliminar: any, nombre: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar la Sala ' + nombre + '?',
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
             await this.storage.eliminar(this.KEY_SALAS, rutEliminar);
             await this.cargarDatos();
             this.sala.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  };

  async modificar() {
   
    await this.storage.actualizar(this.KEY_SALAS, this.sala.value);
    this.tostadaError('Sala modificada!');
    await this.cargarDatos();
    this.sala.reset();
    this.sala.controls.id.setValue(v4());
    
  };

  limpiar(){

    this.sala.reset();
    this.sala.controls.id.setValue(v4());

  }

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  }

}
