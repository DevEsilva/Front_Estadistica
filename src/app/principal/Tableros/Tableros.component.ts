import { Component, Input, OnInit } from '@angular/core';
import { CatalogosService } from '../Servicios/catalogos.service';
import { TablerosService } from '../Servicios/tableros.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anemia',
  templateUrl: './Tableros.component.html',
  styleUrls: ['./Tableros.component.css']
})
export class AnemiaComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer,private catalogoService: CatalogosService,private tableroService: TablerosService) { }


  ngOnInit(): void {
    this.Tableros(this.tableroService.getTablero());
    this.tableroService.tableroChanged.subscribe((newValue) => {
      this.Tableros(newValue);
      // Aquí puedes recargar el componente o realizar cualquier acción necesaria
    });

   // this.currentTablero = this.serviceTablero.getTablero();
  }


  tablerito!: SafeResourceUrl;
  titulo!: string;
  tituloDescarga!: string;
  urlDescarga!: SafeResourceUrl;
  tamanioLargo!: string;

  @Input() tableritos: string = '';


  Tableros(valor:string) {
   
    this.catalogoService.Tablero(this.tableroService.getTablero()).subscribe(
      (data) => {
        this.tablerito = this.sanitizer.bypassSecurityTrustResourceUrl(data.urlpwb) ,
        this.tamanioLargo = data.pixelesAlto+"px",
        this.titulo = data.nombretablero,
        this.tituloDescarga =data.nombredescarga,
        this.urlDescarga =this.sanitizer.bypassSecurityTrustResourceUrl(data.urldescarga)
      },
      (error) => {
        console.error('Error al obtener Cargos', error);
      }
    );
  }

}
