import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { v4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.pattern('([a-z]{2,70}@gmail.cl|[a-z]{2,40}@gmail.com)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])

  });

  KEY_USUARIOS = 'usuarios'

  administrador = {

    id: v4(),
    rut: '21.224.263-2',
    nombres: 'Esteban Jesus',
    apellidos: 'Saez Huincache',
    fecha_nacimiento: '2003-01-30',
    email: 'estsaez@gmail.com',
    direccion: 'Pasaje Roa Bustos 01971',
    telefono: '34218514',
    password: '123123123',
    genero: 'hombre',
    discapacidad: 'Ceguera Leve',
    enfermedad: 'hipertension',
    tipo_usuario: 'administrador',
    bono: []
  };

  constructor(private toastController: ToastController, private router: Router, private storage: StorageService) {

  }

  async ngOnInit() {
    await this.storage.agregarUsuario(this.KEY_USUARIOS, this.administrador)
  }

  async login(){

    var correoForm = this.usuario.controls.email.value;
    var passwordForm = this.usuario.controls.password.value;

    var usuarioLogin = await this.storage.validarLogin(this.KEY_USUARIOS, correoForm, passwordForm);

    if (usuarioLogin != undefined) {
      
      var navigationExtras: NavigationExtras = {

        state: {
          usuario: usuarioLogin
        }

      };

      this.router.navigate(['/home'], navigationExtras);
      this.limpiar();

    }else{

      this.tostadaError('Usuario o contraseña incorrectos!');

    }

  }

  limpiar(){
    this.usuario.reset();
  }

  async tostadaError(message: any) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

}