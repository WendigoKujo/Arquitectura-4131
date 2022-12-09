import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-comuna',
  templateUrl: './comuna.page.html',
  styleUrls: ['./comuna.page.scss'],
})
export class ComunaPage implements OnInit {

  comuna = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)])

  });

  comunas: any [] = [];
  KEY_COMUNAS = 'comunas';

  constructor(private storage: StorageService, private toastController: ToastController, private alertController: AlertController) { }

  async ngOnInit() {

    await this.cargarDatos();
    this.comuna.controls.id.setValue(v4());

  }

  async cargarDatos(){

    this.comunas = await this.storage.getDatos(this.KEY_COMUNAS);

  };

  async registrar(){

    if (this.comuna.controls.nombre.value?.trim() == "") {

      this.tostadaError('El Nombre no puede estar en blanco, escriba algo!');
      return;

    };

    if (await this.storage.validarNombre(this.KEY_COMUNAS, this.comuna.controls.nombre.value) != undefined){

      this.tostadaError('La Comuna ya esta registrada, ingrese otra!');
      return;

    };

    if (await this.storage.validarId(this.KEY_COMUNAS, this.comuna.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_COMUNAS, this.comuna.value);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Comuna registrada con exito!');
      this.comuna.reset();
      this.comuna.controls.id.setValue(v4());
    }

  }

  async buscar(idBuscar: any) {
    var usuarioEncontrado = await this.storage.getDato(this.KEY_COMUNAS, idBuscar);
    this.comuna.setValue(usuarioEncontrado);
  }

  async eliminar(rutEliminar: any, nombre: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar la Comuna ' + nombre + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('NO ELIMINA!');
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async() => {
             await this.storage.eliminar(this.KEY_COMUNAS, rutEliminar);
             await this.cargarDatos();
             this.comuna.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  }

  async modificar() {
   
    await this.storage.actualizar(this.KEY_COMUNAS, this.comuna.value);
    this.tostadaError('Comuna modificada!');
    await this.cargarDatos();
    this.comuna.reset();
    this.comuna.controls.id.setValue(v4());
    
  }

  limpiar(){

    this.comuna.reset();
    this.comuna.controls.id.setValue(v4());

  }

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  }

}
