import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  usuario: any;

  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit() {
    this.usuario = this.router.getCurrentNavigation()?.extras.state?.['usuario'];
  }

}
 