import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interface/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina ={};
  cargada: boolean = false; 
  equipo : any[];
  constructor(private http: HttpClient) {

      this.cargarInfo();
      this.cargarEquipo();

  }

  private cargarInfo(){

    //Leer archivos JSON
    this.http.get('assets/data/data-pagina.json')
          .subscribe((resp:InfoPagina) => {
            this.cargada = true;
            this.info = resp;
            
          })
  }

  private cargarEquipo(){
    //Leer archivos JSON
    this.http.get('https://angular-html-568e3.firebaseio.com/equipo.json')
    .subscribe((resp: any[]) => {
      this.equipo = resp;
      
    })
  }
}
