import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosInterface } from '../interface/productos.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos : ProductosInterface[] = [];
  productosFiltrado: ProductosInterface[] = [];

  constructor(private http:HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){
    this.http.get('https://angular-html-568e3.firebaseio.com/productos_idx.json').
    subscribe((resp: ProductosInterface[])=>{
      this.productos = resp;
      this.cargando = false;
    })
  }


  getProducto(id: string){
   return this.http.get(`https://angular-html-568e3.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino : string){
   this.productosFiltrado = this.productos.filter(producto =>{
      return true;
    });

    console.log( this.productosFiltrado);
  }
}
