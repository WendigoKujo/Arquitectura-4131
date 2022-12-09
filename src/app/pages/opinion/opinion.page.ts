import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { v4, validate } from 'uuid';

@Component({
  selector: 'app-opinion',
  templateUrl: './opinion.page.html',
  styleUrls: ['./opinion.page.scss'],
})
export class OpinionPage implements OnInit {

  opinion = new FormGroup({

    id: new FormControl('', Validators.required),
    valoracion: new FormControl('', Validators.required)

  });

  KEY_USUARIOS = 'usuarios';
  usuarios: any[] = [];
  KEY_OPINION = 'opinion';

  constructor(private storage: StorageService) { }

  async ngOnInit() {

    this.opinion.controls.id.setValue(v4());
    this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);

  };

  async registrar(){

    var registrado: any = await this.storage.agregar(this.KEY_OPINION, this.opinion.value);
    if (registrado != undefined) {
      this.opinion.reset();
      this.opinion.controls.id.setValue(v4());
    }

  }

}
