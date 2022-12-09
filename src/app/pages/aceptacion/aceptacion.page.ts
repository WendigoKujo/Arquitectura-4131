import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-aceptacion',
  templateUrl: './aceptacion.page.html',
  styleUrls: ['./aceptacion.page.scss'],
})
export class AceptacionPage implements OnInit {

  KEY_INSCRIPCIONES = 'inscripciones';
  inscripciones: any[] = [];

  constructor(private storage: StorageService, private alertController: AlertController, private toastController: ToastController) { }

  async ngOnInit() {

    this.cargarDatos();

  };

  async cargarDatos(){

    this.inscripciones = await this.storage.getDatos(this.KEY_INSCRIPCIONES);

  };

  async eliminar1(rutEliminar: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea Aceptar?',
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
             await this.storage.eliminar(this.KEY_INSCRIPCIONES, rutEliminar);
             await this.cargarDatos();
          },
        },
      ],
    });
    
    await alert.present();

  };

  async eliminar2(rutEliminar: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea Rechazar?',
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
             await this.storage.eliminar(this.KEY_INSCRIPCIONES, rutEliminar);
             await this.cargarDatos();
          },
        },
      ],
    });
    
    await alert.present();

  };

}
