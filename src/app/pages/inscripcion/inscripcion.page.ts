import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.page.html',
  styleUrls: ['./inscripcion.page.scss'],
})
export class InscripcionPage implements OnInit {

  inscripcion = new FormGroup({

    id: new FormControl('', Validators.required),
    fecha: new FormControl(''),
    descripcion: new FormControl(''),
    beneficiario: new FormControl(''),
    taller: new FormControl(''),
    nombre_taller: new FormControl('')

  });

  fecha: any = new Date().toDateString();
  talleres: any[] = [];
  KEY_INSCRIPCIONES = 'inscripciones';
  KEY_TALLERES = 'talleres';
  KEY_USUARIOS = 'usuarios';
  id_beneficiario: any;
  beneficiario: any = {};

  constructor(private storage: StorageService, private toastController: ToastController, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {

    this.id_beneficiario = this.activatedRoute.snapshot.paramMap.get('id');
    this.beneficiario = await this.storage.getDato(this.KEY_USUARIOS, this.id_beneficiario);
    this.inscripcion.controls.beneficiario.setValue(this.beneficiario.nombres);
    this.inscripcion.controls.id.setValue(v4());
    this.inscripcion.controls.fecha.setValue(this.fecha);
    this.talleres = await this.storage.getDatos(this.KEY_TALLERES);

  };

  async registrar(descripcion: any, taller: any, nombre_taller: any){

    this.inscripcion.controls.descripcion.setValue(descripcion);
    this.inscripcion.controls.taller.setValue(taller);
    this.inscripcion.controls.nombre_taller.setValue(nombre_taller);

    if (await this.storage.validarId(this.KEY_TALLERES, this.inscripcion.controls.id.value) != undefined){

      this.tostadaError('El ID ya esta registrado, ingrese otro!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_INSCRIPCIONES, this.inscripcion.value);
    if (registrado != undefined) {
      this.tostadaError('Inscripcion exitosa!');
      this.inscripcion.reset();
      this.inscripcion.controls.id.setValue(v4());
      this.inscripcion.controls.fecha.setValue(this.fecha);
      this.inscripcion.controls.beneficiario.setValue(this.beneficiario.nombres);
    };

  };

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  };

}
