import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  instructor = new FormGroup({

    id: new FormControl('')

  });

  KEY_USUARIOS = 'usuarios';
  usuarios: any[] = [];
  usuario: any = {};

  constructor(private storage: StorageService) { }

  async ngOnInit() {

    this.usuarios = await this.storage.getDatos(this.KEY_USUARIOS);

  };

  pago(){

    

  }

}
