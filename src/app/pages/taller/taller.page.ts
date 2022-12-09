import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.page.html',
  styleUrls: ['./taller.page.scss'],
})
export class TallerPage implements OnInit {

  taller = new FormGroup({

    id: new FormControl('', Validators.required),
    nombre: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
    fecha: new FormControl('', Validators.required),
    descripcion: new FormControl('', [Validators.minLength(8), Validators.maxLength(50)]),
    estado_taller: new FormControl('', Validators.required),
    municipalidad: new FormControl('', Validators.required),
    sala: new FormControl('', Validators.required),
    instructor: new FormControl('', Validators.required),
    curso: new FormControl('', Validators.required),
    beneficiario: new FormControl([])

  });

  talleres: any[] = [];
  municipalidades: any[] = [];
  salas: any[] = [];
  cursos: any[] = [];
  KEY_TALLERES = 'talleres';
  KEY_MUNICIPALIDADES = 'municipalidades';
  KEY_SALAS = 'salas';
  KEY_CURSOS ='cursos'
  id_instructor: any;

  constructor(private storage: StorageService, private alertController: AlertController, private toastController: ToastController, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {

    this.id_instructor = this.activatedRoute.snapshot.paramMap.get('id');
    this.taller.controls.instructor.setValue(this.id_instructor);
    this.cargarDatos();
    this.taller.controls.id.setValue(v4());
    this.municipalidades = await this.storage.getDatos(this.KEY_MUNICIPALIDADES);
    this.salas = await this.storage.getDatos(this.KEY_SALAS);
    this.cursos = await this.storage.getDatos(this.KEY_CURSOS);

  };

  async cargarDatos(){

    this.talleres = await this.storage.getDatos(this.KEY_TALLERES);

  };

  async registrar(){

    if (this.taller.controls.nombre.value?.trim() == "") {

      this.tostadaError('El Nombre no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarId(this.KEY_TALLERES, this.taller.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_TALLERES, this.taller.value);
    if (registrado != undefined) {
      await this.cargarDatos();
      this.tostadaError('Taller registrado con exito!');
      this.taller.reset();
      this.taller.controls.id.setValue(v4());
      this.taller.controls.instructor.setValue(this.id_instructor);
    };

  };

  async buscar(idBuscar: any) {

    var usuarioEncontrado = await this.storage.getDato(this.KEY_TALLERES, idBuscar);
    this.taller.setValue(usuarioEncontrado);

  };

  async eliminar(rutEliminar: any, nombre: any) {
    const alert = await this.alertController.create({
      header: '¿Seguro que desea eliminar ' + nombre + '?',
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
             await this.storage.eliminar(this.KEY_TALLERES, rutEliminar);
             await this.cargarDatos();
             this.taller.controls.id.setValue(v4());
          },
        },
      ],
    });
    
    await alert.present();

  };

  async modificar() {
   
    await this.storage.actualizar(this.KEY_TALLERES, this.taller.value);
    this.tostadaError('Taller modificado!');
    await this.cargarDatos();
    this.taller.reset();
    this.taller.controls.id.setValue(v4());
    
  };

  limpiar(){

    this.taller.reset();
    this.taller.controls.id.setValue(v4());

  };

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  };

}
