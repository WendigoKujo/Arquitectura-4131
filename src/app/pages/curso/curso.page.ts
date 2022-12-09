import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.page.html',
  styleUrls: ['./curso.page.scss'],
})
export class CursoPage implements OnInit {

  curso = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
    fecha_inicio: new FormControl('', [Validators.required]),
    fecha_termino: new FormControl('', [Validators.required]),
    horario: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}:[0-9]{1,2}-[0-9]{1,2}:[0-9]{1,2}')]),
    material: new FormControl('', Validators.required)

  });

  cursos: any[] = [];
  materiales: any[] = [];
  KEY_CURSOS = 'cursos';
  KEY_MATERIALES = 'materiales'

  constructor(private storage: StorageService, private toastController: ToastController, private alertController: AlertController) { }

  async ngOnInit() {

    this.cargarDatos();
    this.curso.controls.id.setValue(v4());
    this.materiales = await this.storage.getDatos(this.KEY_MATERIALES);

  }

  async cargarDatos(){

    this.cursos = await this.storage.getDatos(this.KEY_CURSOS);

  };

  async registrar(){

    if (this.curso.controls.horario.value?.trim() == "") {

      this.tostadaError('El Horario no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarId(this.KEY_CURSOS, this.curso.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_CURSOS, this.curso.value);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Curso registrado con exito!');
      this.curso.reset();
      this.curso.controls.id.setValue(v4());
    };

  };

  async buscar(idBuscar: any) {
    var usuarioEncontrado = await this.storage.getDato(this.KEY_CURSOS, idBuscar);
    this.curso.setValue(usuarioEncontrado);
  };

  async eliminar(rutEliminar: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar el Curso ?',
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
             await this.storage.eliminar(this.KEY_CURSOS, rutEliminar);
             await this.cargarDatos();
             this.curso.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  };

  async modificar() {
   
    await this.storage.actualizar(this.KEY_CURSOS, this.curso.value);
    this.tostadaError('Curso modificado!');
    await this.cargarDatos();
    this.curso.reset();
    this.curso.controls.id.setValue(v4());
    
  };

  limpiar(){

    this.curso.reset();
    this.curso.controls.id.setValue(v4());

  };

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  };

}
