import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { ValidacionesService } from 'src/app/services/validaciones.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup({

    id: new FormControl('', Validators.required),
    rut: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nombres: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]),
    apellidos: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(80)]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern('([a-z]{2,70}@gmail.cl|[a-z]{2,40}@gmail.com)')]),
    direccion: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(60)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern('[0-9]{8}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
    genero: new FormControl('', [Validators.required]),
    discapacidad: new FormControl('', [Validators.minLength(5), Validators.maxLength(40)]),
    enfermedad: new FormControl('', [Validators.minLength(5), Validators.maxLength(50)]),
    tipo_usuario: new FormControl('beneficiario', [Validators.required]),
    bono: new FormControl([])

  });

  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';

  constructor(private storage: StorageService, private validaciones: ValidacionesService, private toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.usuario.controls.id.setValue(v4());
  }

  async registrar(){

    if (!this.validaciones.validarRut(this.usuario.controls.rut.value)) {
      this.tostadaError('El Rut no existe, ingrese uno correcto!');
      return;
    }

    if (!this.validaciones.validarEdad(50, this.usuario.controls.fecha_nacimiento.value)) {
  
      this.tostadaError('No tiene la edad minima para registrarse en el sistema!');
      return;

    };

    if (this.usuario.controls.nombres.value?.trim() == "") {

      this.tostadaError('Los nombres no pueden estar en blanco, ingrese algo!');
      return;

    };

    if (this.usuario.controls.apellidos.value?.trim() == "") {

      this.tostadaError('Los apellidos no pueden estar en blanco, ingrese algo!');
      return;

    };

    if (this.usuario.controls.direccion.value?.trim() == "") {

      this.tostadaError('La direccion no puede estar en blanco, ingrese algo!');
      return;

    };

    if (this.usuario.controls.password.value?.trim() == "") {

      this.tostadaError('La contraseña no puede estar en blanco, ingrese algo!');
      return;

    };

    if (await this.storage.validarRut(this.KEY_USUARIOS, this.usuario.controls.rut.value) != undefined){

      this.tostadaError('El Rut ya esta registrado, ingrese otro!');
      return;

    };

    if (await this.storage.validarCorreo(this.KEY_USUARIOS, this.usuario.controls.email.value) != undefined){

      this.tostadaError('El correo ya esta registrado, ingrese otro!');
      return;

    };

    var registrado: any = await this.storage.agregar(this.KEY_USUARIOS, this.usuario.value);
    if (registrado) {
      this.tostadaError('Alumno registrado con exito!');
      this.usuario.reset();
      this.usuario.controls.id.setValue(v4());
      this.router.navigate(['/login'])
    }

  }

  async tostadaError(message: any){

    const toast = await this.toastController.create({

      message,
      duration: 3000

    });

    toast.present();

  }

}
