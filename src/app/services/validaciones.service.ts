import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesService {

  constructor() { }

  validarRut(rut: any): boolean {

    //Se le quitan los puntos y guion al rut completo.
    var rutSimple = rut.replace('.', '').replace('.', '').replace('-', '');
    //Se le quita el digito verificador, dejando solo los numeros del rut.
    rutSimple = rutSimple.substring(0, rutSimple.length - 1);
    //Se separan los numeros del rut en reversa en un arreglo.
    var rutArreglo: any[] = rutSimple.split('').reverse();

    var acumulador: number = 0;
    var multiplo: number = 2;

    //Se crea un ciclo para recorrer los numeros del rut individualmente.
    for (let digito of rutArreglo){

      //Se suma al acumulador el digito correspondiente multiplicada por el multiplo.
      acumulador = acumulador + digito * multiplo;
      //El multiplo aumenta en 1.
      multiplo++;

      //Si el multiplo supera el numero 7, se reseteara a su numero inicial (2).
      if (multiplo > 7) {
        multiplo = 2;
      }

    }

    //Calculamos el resto del numero obtenido del acumulador, en 11.
    var resto: number = acumulador % 11;
    //Calculamos el Digito Verificador, restandole a 11 el resto calculado anteriormente.
    var dvCalculado: any = 11 - resto;

    //Si el Digito Verificador es igual o supera 11, su valor sera 0.
    if (dvCalculado >= 11) {
      dvCalculado = '0';

    //Si el Digito Verificador es igual a 10, la variable sera 'K'.
    } else if(dvCalculado == 10){
      dvCalculado = 'K'
    }

    //Recuperamos el Digito Verificador del rut ingresado y lo convertimos en mayuscula, para luego compararlo con el Digito Verificador calculado.
    var dvRut: string = rut.substring(rut.length - 1).toUpperCase(); 

    //Comparamos los dos digitos verificadores, si son iguales devolveremos un True, y si son distintos devolveremos un False.
    if (dvRut == dvCalculado.toString()) {
      return true;
    } else {
      return false;
    }

  };

  validarEdad(edad: any, fecha_nacimiento: any){

    var fn = new Date(fecha_nacimiento);
    var timeDiff = Math.abs(Date.now() - fn.getTime());
    var edadAlumno = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);

    if (edadAlumno >= edad) {
      return true;
    } else {
      return false;
    }

  };

}
