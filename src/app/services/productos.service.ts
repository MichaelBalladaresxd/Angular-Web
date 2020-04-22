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
    return new Promise(( resolve , reject)=>{
      this.http.get('https://angular-html-568e3.firebaseio.com/productos_idx.json').
      subscribe((resp: ProductosInterface[])=>{
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    })
  }


  getProducto(id: string){
   return this.http.get(`https://angular-html-568e3.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino : string){

    if (this.productos.length === 0) {
      //cargar productos 
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino);
      })

    } else {
      this.filtrarProductos(termino);
    }
  
  }


  private filtrarProductos(termino:string){
    console.log(this.productos);
    this.productosFiltrado = [];
    this.productos.forEach(prod => {
      if (prod.categoria.indexOf( termino ) >=0 || prod.titulo.indexOf(termino)) {
        this.productosFiltrado.push(prod);
      }
    })
  }
}
